import { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import Box from "@mui/material/Box";
import Paper from "@mui/material/Paper";
import Stack from "@mui/material/Stack";
import Avatar from "@mui/material/Avatar";
import Typography from "@mui/material/Typography";
import Chip from "@mui/material/Chip";
import Alert from "@mui/material/Alert";
import PeopleAltRounded from "@mui/icons-material/PeopleAltRounded";
import { alpha } from "@mui/material/styles";
import api from "../api/api";
import LoadingState from "./ui/LoadingState";
import { brand, gradients, liftShadow } from "../theme/tokens";

interface Member {
    id: string;
    fullName: string;
    avatarUrl: string | null;
    isCreator: boolean;
    joinedAt: string;
}

const GroupMembersHover = ({ groupId }: { groupId: string }) => {
    const [open, setOpen] = useState(false);

    const { data: members, isPending, isError } = useQuery({
        queryKey: ["group-members", groupId],
        queryFn: async () => {
            const response = await api.get<Member[]>(
                `/api/boards/${groupId}/members`
            );
            return response.data;
        },
        enabled: open
    });

    return (
        <Box
            sx={{ position: "relative", display: "inline-block" }}
            onMouseEnter={() => setOpen(true)}
            onMouseLeave={() => setOpen(false)}
        >
            <Box
                component="span"
                tabIndex={0}
                onFocus={() => setOpen(true)}
                onBlur={(event) => {
                    if (!event.currentTarget.parentElement?.contains(event.relatedTarget as Node)) {
                        setOpen(false);
                    }
                }}
                sx={{
                    display: "inline-flex",
                    alignItems: "center",
                    gap: 1,
                    px: 2.5,
                    py: 1.1,
                    borderRadius: 999,
                    cursor: "pointer",
                    fontFamily: "'Rubik', sans-serif",
                    fontWeight: 600,
                    color: brand.tealDeep,
                    backgroundColor: alpha(brand.white, 0.8),
                    border: `1.5px solid ${alpha(brand.teal, 0.45)}`,
                    transition: "background .2s ease",
                    "&:hover, &:focus-visible": { backgroundColor: brand.mintWhisper, outline: "none" },
                    "&:focus-visible": { boxShadow: `0 0 0 4px ${alpha(brand.teal, 0.2)}` }
                }}
            >
                <PeopleAltRounded aria-hidden="true" fontSize="small" />
                משתתפי הקבוצה
            </Box>

            {open && (
                <Box
                    sx={{
                        position: "absolute",
                        top: "100%",
                        left: 0,
                        pt: 1,
                        zIndex: (theme) => theme.zIndex.modal,
                        width: { xs: "min(300px, calc(100vw - 48px))", sm: 300 }
                    }}
                >
                    <Paper sx={{ borderRadius: 5, overflow: "hidden", boxShadow: liftShadow, border: `1px solid ${alpha(brand.teal, 0.14)}` }}>
                        <Typography
                            variant="h4"
                            component="h4"
                            sx={{ px: 2.5, py: 1.5, background: gradients.mintPanel, color: brand.tealInk }}
                        >
                            משתתפי הקבוצה
                        </Typography>
                        <Box sx={{ p: 1.5, maxHeight: 300, overflowY: "auto" }}>
                            {isPending ? (<LoadingState compact message="טוען משתתפים..." />)
                                : isError ? (<Alert severity="error">לא ניתן לטעון משתתפים</Alert>)
                                    : (
                                        <Stack sx={{ gap: 0.5 }}>
                                            {members?.map(member => (
                                                <Stack
                                                    direction="row"
                                                    key={member.id}
                                                    sx={{ alignItems: "center", gap: 1.25, px: 1, py: 0.75, borderRadius: 3, "&:hover": { backgroundColor: brand.pinkWhisper } }}
                                                >
                                                    {member.avatarUrl ? (
                                                        <Avatar
                                                            src={member.avatarUrl}
                                                            alt=""
                                                            sx={{ width: 34, height: 34 }}
                                                        />
                                                    ) : (
                                                        <Avatar sx={{ width: 34, height: 34, fontSize: "0.95rem" }}>
                                                            {member.fullName.charAt(0)}
                                                        </Avatar>
                                                    )}
                                                    <Typography component="span" sx={{ fontWeight: 500, flex: 1, minWidth: 0 }} noWrap>
                                                        {member.fullName}
                                                    </Typography>
                                                    {member.isCreator && (<Chip label="יוצר הקבוצה" size="small" color="primary" />)}
                                                </Stack>
                                            ))}
                                        </Stack>
                                    )}
                        </Box>
                    </Paper>
                </Box>
            )}
        </Box>
    );
};

export default GroupMembersHover;
