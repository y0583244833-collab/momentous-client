
import type { ReactNode } from "react";
import Grid from "@mui/material/Grid";
import Box from "@mui/material/Box";
import Stack from "@mui/material/Stack";
import Avatar from "@mui/material/Avatar";
import Typography from "@mui/material/Typography";
import InfoRounded from "@mui/icons-material/InfoRounded";
import InsightsRounded from "@mui/icons-material/InsightsRounded";
import PeopleAltRounded from "@mui/icons-material/PeopleAltRounded";
import PhotoCameraRounded from "@mui/icons-material/PhotoCameraRounded";
import CalendarMonthRounded from "@mui/icons-material/CalendarMonthRounded";
import PersonRounded from "@mui/icons-material/PersonRounded";
import FactCheckRounded from "@mui/icons-material/FactCheckRounded";
import { alpha } from "@mui/material/styles";
import type { Group } from "../types/group.types";
import SectionCard from "./ui/SectionCard";
import { brand } from "../theme/tokens";

interface GroupInfoProps {
    group: Group;
}

const formatDate = (date: string) => {
    const parsed = new Date(date);

    if (Number.isNaN(parsed.getTime())) {
        return "תאריך לא זמין";
    }

    return parsed.toLocaleDateString("he-IL", { day: "numeric", month: "long", year: "numeric" });
};

const StatTile = ({ icon, value, label, color, background }: { icon: ReactNode; value: ReactNode; label: string; color: string; background: string }) => (
    <Box
        component="article"
        sx={{
            flex: 1,
            minWidth: 0,
            p: 2,
            borderRadius: 5,
            textAlign: "center",
            backgroundColor: background,
            border: `1px solid ${alpha(color, 0.18)}`
        }}
    >
        <Box aria-hidden="true" sx={{ color, display: "inline-flex", mb: 0.5 }}>{icon}</Box>
        <Typography component="strong" sx={{ display: "block", fontFamily: "'Rubik', sans-serif", fontWeight: 700, fontSize: "1.15rem", color: brand.ink, lineHeight: 1.3 }}>
            {value}
        </Typography>
        <Typography component="span" variant="body2" color="text.secondary">{label}</Typography>
    </Box>
);

const InfoItem = ({ term, value }: { term: string; value: string }) => (
    <Box sx={{ p: 1.75, borderRadius: 4, backgroundColor: alpha(brand.white, 0.75), border: `1px solid ${alpha(brand.teal, 0.12)}` }}>
        <Typography component="dt" variant="body2" color="text.secondary">{term}</Typography>
        <Typography component="dd" sx={{ fontWeight: 600, m: 0, color: brand.tealInk }}>{value}</Typography>
    </Box>
);

const GroupInfo = ({ group }: GroupInfoProps) => {
    return (
        <Grid container spacing={3}>
            <Grid size={{ xs: 12, md: 7 }}>
                <SectionCard title="על הקבוצה" icon={<InfoRounded />} tone="pink">
                    <Typography sx={{ whiteSpace: "pre-line" }} color={group.description?.trim() ? "text.primary" : "text.secondary"}>
                        {group.description?.trim() ? group.description : "עדיין לא נוסף תיאור לקבוצה."}
                    </Typography>
                </SectionCard>
            </Grid>

            <Grid size={{ xs: 12, md: 5 }}>
                <SectionCard title="הקבוצה במספרים" icon={<InsightsRounded />}>
                    <Stack direction={{ xs: "column", sm: "row" }} sx={{ gap: 1.5 }}>
                        <StatTile
                            icon={<PeopleAltRounded />}
                            value={group.membersCount}
                            label="משתתפים"
                            color={brand.teal}
                            background={brand.mintWhisper}
                        />
                        <StatTile
                            icon={<PhotoCameraRounded />}
                            value={group.memoriesCount}
                            label="זיכרונות"
                            color={brand.pink}
                            background={brand.pinkWhisper}
                        />
                        <StatTile
                            icon={<CalendarMonthRounded />}
                            value={formatDate(group.eventDate)}
                            label="תאריך האירוע"
                            color={brand.tealDeep}
                            background={brand.aquaMist}
                        />
                    </Stack>
                </SectionCard>
            </Grid>

            <Grid size={{ xs: 12, md: 5 }}>
                <SectionCard title="מי יצר את הקבוצה?" icon={<PersonRounded />}>
                    <Stack direction="row" sx={{ alignItems: "center", gap: 2 }}>
                        {group.creator.avatarUrl ? (
                            <Avatar
                                src={group.creator.avatarUrl}
                                alt=""
                                sx={{ width: 64, height: 64, border: `3px solid ${brand.pinkMist}` }} />)
                            : (
                                <Avatar sx={{ width: 64, height: 64, border: `3px solid ${brand.mintMist}` }}>
                                    <PersonRounded />
                                </Avatar>
                            )}

                        <Box>
                            <Typography component="strong" variant="h3" sx={{ display: "block" }}>{group.creator.fullName}</Typography>
                            {group.isCreator && (<Typography variant="body2" sx={{ color: brand.pinkDeep, fontWeight: 600 }}>את יצרת את הקבוצה הזאת</Typography>)}
                        </Box>
                    </Stack>
                </SectionCard>
            </Grid>

            <Grid size={{ xs: 12, md: 7 }}>
                <SectionCard title="מידע נוסף" icon={<FactCheckRounded />} tone="mint">
                    <Box
                        component="dl"
                        sx={{ m: 0, display: "grid", gap: 1.5, gridTemplateColumns: { xs: "1fr", sm: "1fr 1fr" } }}
                    >
                        <InfoItem term="סוג האירוע" value={group.eventTypeLabel} />
                        <InfoItem term="הקבוצה נוצרה בתאריך" value={formatDate(group.createdAt)} />
                        <InfoItem term="פעילות אחרונה" value={formatDate(group.lastActivityAt)} />
                        <InfoItem term="עדכון אחרון" value={formatDate(group.updatedAt)} />
                    </Box>
                </SectionCard>
            </Grid>
        </Grid>
    );
};

export default GroupInfo;
