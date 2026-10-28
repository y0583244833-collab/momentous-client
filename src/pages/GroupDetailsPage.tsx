import { Link, useParams } from "react-router";
import { useQuery } from "@tanstack/react-query";
import { useState } from "react";
import Box from "@mui/material/Box";
import Stack from "@mui/material/Stack";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";
import Chip from "@mui/material/Chip";
import Dialog from "@mui/material/Dialog";
import DialogContent from "@mui/material/DialogContent";
import useMediaQuery from "@mui/material/useMediaQuery";
import { useTheme, alpha } from "@mui/material/styles";
import ArrowForwardRounded from "@mui/icons-material/ArrowForwardRounded";
import AddRounded from "@mui/icons-material/AddRounded";
import PersonAddAlt1Rounded from "@mui/icons-material/PersonAddAlt1Rounded";
import EditRounded from "@mui/icons-material/EditRounded";
import PhotoCameraRounded from "@mui/icons-material/PhotoCameraRounded";
import CalendarMonthRounded from "@mui/icons-material/CalendarMonthRounded";
import AutoStoriesRounded from "@mui/icons-material/AutoStoriesRounded";
import TuneRounded from "@mui/icons-material/TuneRounded";
import CloseRounded from "@mui/icons-material/CloseRounded";
import { getGroupById } from "../api/groupsApi";
import type { Group } from "../types/group.types";
import GroupInfo from "../components/GroupInfo";
import NewMemoryPage from "./NewMemoryPage";
import MemoriesSection from "../components/MemoriesSection";
import InviteMembersForm from "../components/InviteMembersForm";
import GroupMembersHover from "../components/GroupMembersHover";
import PageContainer from "../components/ui/PageContainer";
import LoadingState from "../components/ui/LoadingState";
import ErrorState from "../components/ui/ErrorState";
import SectionCard from "../components/ui/SectionCard";
import { brand, gradients, softShadow } from "../theme/tokens";
const formatDate = (date: string) => {
    const parsed = new Date(date);

    if (Number.isNaN(parsed.getTime())) {
        return "תאריך לא זמין";
    }

    return parsed.toLocaleDateString("he-IL", {
        day: "numeric",
        month: "long",
        year: "numeric"
    });
};

const BackToGroups = () => (
    <Button component={Link} to="/groups" variant="outlined" color="secondary" startIcon={<ArrowForwardRounded />}>
        חזרה לקבוצות
    </Button>
);

const GroupDetailsPage = () => {
    const { groupId } = useParams<{ groupId: string }>();
    const [showMemoryModal, setShowMemoryModal] = useState(false);
    const [showInviteModal, setShowInviteModal] = useState(false);
    const theme = useTheme();
    const fullScreenDialog = useMediaQuery(theme.breakpoints.down("sm"));

    const {
        data: group,
        isPending,
        isError
    } = useQuery<Group>({
        queryKey: ["group", groupId],
        queryFn: () => getGroupById(groupId!),
        enabled: Boolean(groupId)
    });

    if (!groupId) {
        return (
            <PageContainer>
                <ErrorState message="מזהה הקבוצה חסר." action={<BackToGroups />} />
            </PageContainer>
        );
    }
    if (isPending) {
        return (
            <PageContainer>
                <LoadingState message="טוענים את פרטי הקבוצה..." />
            </PageContainer>
        );
    }
    if (isError || !group) {
        return (
            <PageContainer>
                <ErrorState
                    titleComponent="h1"
                    title="לא הצלחנו לטעון את הקבוצה"
                    message="ייתכן שהקבוצה אינה קיימת או שאין לך הרשאה לצפות בה."
                    action={<BackToGroups />}
                />
            </PageContainer>
        );
    }

    return (
        <PageContainer>

            <Box component="nav" sx={{ mb: 2.5 }}>
                <Button component={Link} to="/groups" color="secondary" startIcon={<ArrowForwardRounded />}>
                    חזרה לכל הקבוצות
                </Button>
            </Box>

            <Box
                component="section"
                sx={{
                    position: "relative",
                    borderRadius: { xs: 6, md: 8 },
                    overflow: "hidden",
                    minHeight: { xs: 260, md: 360 },
                    display: "flex",
                    alignItems: "flex-end",
                    boxShadow: softShadow,
                    mb: { xs: 3, md: 4 }
                }}
            >
                {group.coverImageUrl ? (
                    <Box
                        component="img"
                        src={group.coverImageUrl}
                        alt={`תמונת הכיסוי של ${group.name}`}
                        sx={{ position: "absolute", inset: 0, width: "100%", height: "100%", objectFit: "cover" }}
                    />
                ) : (
                    <Stack
                        sx={{ alignItems: "center", justifyContent: "center", position: "absolute", inset: 0, background: gradients.placeholder, color: brand.white, pb: 10 }}
                    >
                        <PhotoCameraRounded aria-hidden="true" sx={{ fontSize: 48, opacity: 0.9 }} />
                        <Typography sx={{ fontWeight: 600 }}>עדיין לא נוספה תמונת כיסוי</Typography>
                    </Stack>
                )}
                <Box aria-hidden="true" sx={{ position: "absolute", inset: 0, background: gradients.heroOverlay }} />

                <Box sx={{ position: "relative", p: { xs: 2.5, md: 4.5 }, color: brand.white, width: "100%" }}>
                    <Chip
                        label={group.eventTypeLabel}
                        size="small"
                        sx={{ mb: 1.5, backgroundColor: brand.pink, color: brand.white }}
                    />

                    <Typography variant="h1" sx={{ color: brand.white, textShadow: "0 2px 18px rgba(0,0,0,0.25)" }}>{group.name}</Typography>
                    <Stack direction="row" sx={{ alignItems: "center", gap: 1, mt: 1, opacity: 0.92 }}>
                        <CalendarMonthRounded aria-hidden="true" fontSize="small" />
                        <Typography component="p"> תאריך האירוע: {formatDate(group.eventDate)}</Typography>
                    </Stack>
                </Box>
            </Box>

            <GroupInfo group={group} />

            <SectionCard
                sx={{ mt: 3 }}
                tone="white"
                icon={<AutoStoriesRounded />}
                title="הזיכרונות שלנו"
                subtitle={<>{group.memoriesCount} זיכרונות בקבוצה</>}
                action={
                    <Button
                        type="button"
                        variant="contained"
                        color="primary"
                        startIcon={<AddRounded />}
                        onClick={() => setShowMemoryModal(true)}
                    >הוספת זיכרון</Button>
                }
            >
                <MemoriesSection key={groupId} groupId={groupId} />
            </SectionCard>

            <SectionCard sx={{ mt: 3 }} tone="mint" icon={<TuneRounded />} title="ניהול הקבוצה">
                <Stack direction={{ xs: "column", sm: "row" }} sx={{ alignItems: { xs: "stretch", sm: "center" }, gap: 1.5, flexWrap: "wrap" }}>
                    {group.isCreator && (
                        <Button
                            type="button"
                            variant="contained"
                            color="secondary"
                            startIcon={<PersonAddAlt1Rounded />}
                            onClick={() => setShowInviteModal(true)}
                        >
                            הזמנת משתתפים
                        </Button>
                    )}
                    <GroupMembersHover groupId={group.id} />

                    {group.isCreator && (
                        <Button component={Link} to={`/groups/${group.id}/edit`} variant="outlined" color="primary" startIcon={<EditRounded />}>
                            עריכת פרטי הקבוצה
                        </Button>
                    )}
                </Stack>
            </SectionCard>

            {showMemoryModal && (
                <Dialog
                    open
                    fullWidth
                    maxWidth="sm"
                    fullScreen={fullScreenDialog}
                    scroll="paper"
                    slotProps={{ paper: { "aria-label": "הוספת זיכרון" } }}
                >
                    <DialogContent sx={{ p: 0 }}>
                        <NewMemoryPage onClose={() => setShowMemoryModal(false)} />
                    </DialogContent>
                </Dialog>
            )}
            {group.isCreator && showInviteModal && (
                <Dialog
                    open
                    fullWidth
                    maxWidth="sm"
                    fullScreen={fullScreenDialog}
                    scroll="paper"
                    slotProps={{ paper: { "aria-label": "הזמנת משתתפים" } }}
                >
                    <DialogContent sx={{ p: { xs: 2.5, sm: 4 }, position: "relative" }}>
                        <Box sx={{ display: "flex", justifyContent: "flex-end", mb: 1 }}>
                            <Button
                                type="button"
                                color="secondary"
                                startIcon={<CloseRounded />}
                                onClick={() => setShowInviteModal(false)}
                                sx={{ backgroundColor: alpha(brand.teal, 0.08), "&:hover": { backgroundColor: alpha(brand.teal, 0.16) } }}
                            >
                                סגירה
                            </Button>
                        </Box>

                        <InviteMembersForm groupId={groupId} />
                    </DialogContent>
                </Dialog>
            )}
        </PageContainer>
    );
};

export default GroupDetailsPage;
