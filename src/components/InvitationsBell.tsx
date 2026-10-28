import { useState } from "react";
import { useNavigate } from "react-router";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import Box from "@mui/material/Box";
import Paper from "@mui/material/Paper";
import Stack from "@mui/material/Stack";
import IconButton from "@mui/material/IconButton";
import Badge from "@mui/material/Badge";
import Typography from "@mui/material/Typography";
import Alert from "@mui/material/Alert";
import NotificationsNoneRounded from "@mui/icons-material/NotificationsNoneRounded";
import CloseRounded from "@mui/icons-material/CloseRounded";
import MarkEmailReadRounded from "@mui/icons-material/MarkEmailReadRounded";
import { alpha } from "@mui/material/styles";
import { getMyInvitations, acceptInvitation, declineInvitation } from "../api/invitationsApi";
import InvitationCard from "./InvitationCard";
import LoadingState from "./ui/LoadingState";
import PaginationBar from "./ui/PaginationBar";
import { brand, gradients, liftShadow } from "../theme/tokens";

const InvitationsBell = () => {
    const [open, setOpen] = useState(false);
    const [page, setPage] = useState(1);
    const [error, setError] = useState("");
    const navigate = useNavigate();
    const queryClient = useQueryClient();

    const { data, isPending, isError } = useQuery({
        queryKey: ["invitations", page],
        queryFn: () => getMyInvitations(page),
        refetchInterval: 30000
    });
    const refresh = () => {
        setPage(1);
        queryClient.invalidateQueries({ queryKey: ["invitations"] });
        queryClient.invalidateQueries({ queryKey: ["groups"] });
    };

    const accept = useMutation({ mutationFn: acceptInvitation, onSuccess: refresh });

    const decline = useMutation({
        mutationFn: declineInvitation, onSuccess: refresh
    });

    const handleAccept = (id: string) => {
        setError("");

        accept.mutate(id, {
            onSuccess: (group) => {
                setOpen(false);
                navigate(`/groups/${group.id}`);
            },
            onError: () => setError("אישור ההזמנה נכשל")
        });
    };

    const handleDecline = (id: string) => {
        setError("");

        decline.mutate(id, {
            onError: () => setError("דחיית ההזמנה נכשלה")
        });
    };

    const count = data?.total ?? 0;
    const busy = accept.isPending || decline.isPending;

    return (
        <Box sx={{ position: { xs: "static", sm: "relative" } }} dir="rtl">
            <IconButton
                type="button"
                aria-label={`הזמנות ממתינות: ${count}`}
                aria-expanded={open}
                onClick={() => setOpen(!open)}
                sx={{
                    color: open ? brand.white : brand.pinkDeep,
                    background: open ? gradients.pinkButton : brand.pinkWhisper,
                    border: `1px solid ${alpha(brand.pink, 0.2)}`,
                    "&:hover": { background: open ? gradients.pinkButton : brand.pinkMist }
                }}
            >
                <Badge
                    badgeContent={count > 99 ? "99+" : count}
                    invisible={count <= 0}
                    color="secondary"
                    overlap="circular"
                >
                    <NotificationsNoneRounded />
                </Badge>
            </IconButton>

            {open && (
                <Paper
                    sx={{
                        position: "absolute",
                        zIndex: (theme) => theme.zIndex.modal,
                        top: { xs: 68, sm: "calc(100% + 12px)" },
                        right: { xs: 12, sm: 0 },
                        left: { xs: 12, sm: "auto" },
                        width: { sm: 360 },
                        maxHeight: { xs: "calc(100vh - 90px)", sm: 520 },
                        display: "flex",
                        flexDirection: "column",
                        borderRadius: 6,
                        overflow: "hidden",
                        border: `1px solid ${alpha(brand.pink, 0.14)}`,
                        boxShadow: liftShadow
                    }}
                >
                    <Stack
                        direction="row"
                        sx={{ alignItems: "center", justifyContent: "space-between", px: 2.5, py: 1.75, background: gradients.pinkPanel, borderBottom: `1px solid ${alpha(brand.pink, 0.12)}` }}
                    >
                        <Typography variant="h3" component="h3">ההזמנות שלי</Typography>
                        <IconButton type="button" size="small" aria-label="סגירה" onClick={() => setOpen(false)}>
                            <CloseRounded fontSize="small" />
                        </IconButton>
                    </Stack>

                    <Stack sx={{ gap: 1.5, p: 2, overflowY: "auto", flex: 1 }}>
                        {isPending ? (<LoadingState compact message="טוען הזמנות..." />)
                            : isError ? (<Alert severity="error">טעינת ההזמנות נכשלה</Alert>)
                                : !data?.items.length ? (
                                    <Stack sx={{ alignItems: "center", gap: 1, py: 3, color: "text.secondary" }}>
                                        <MarkEmailReadRounded sx={{ fontSize: 40, color: brand.mint }} />
                                        <Typography sx={{ fontWeight: 500 }}>אין הזמנות חדשות</Typography>
                                    </Stack>
                                )
                                    : (data.items.map(invitation => (
                                        <InvitationCard
                                            key={invitation.id}
                                            invitation={invitation}
                                            onAccept={handleAccept}
                                            onDecline={handleDecline}
                                            disabled={busy}
                                        />
                                    ))
                                    )}
                    </Stack>

                    {error && <Alert severity="error" role="alert" sx={{ mx: 2, mb: 2 }}>{error}</Alert>}

                    {data && data.totalPages > 1 && (
                        <Box sx={{ pb: 2 }}>
                            <PaginationBar
                                compact
                                label={<>עמוד {page} מתוך {data.totalPages}</>}
                                prevDisabled={page === 1 || busy}
                                nextDisabled={page >= data.totalPages || busy}
                                onPrev={() => setPage(page - 1)}
                                onNext={() => setPage(page + 1)}
                            />
                        </Box>
                    )}
                </Paper>
            )}
        </Box>
    );
};

export default InvitationsBell;
