import type { ReactNode } from "react";
import Grid from "@mui/material/Grid";
import Paper from "@mui/material/Paper";
import Stack from "@mui/material/Stack";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import PeopleAltRounded from "@mui/icons-material/PeopleAltRounded";
import Diversity3Rounded from "@mui/icons-material/Diversity3Rounded";
import PhotoLibraryRounded from "@mui/icons-material/PhotoLibraryRounded";
import type { AdminStatsResponse } from "../../types/admin.types";
import { brand, gradients } from "../../theme/tokens";

const StatCard = ({ title, value, icon, background }: { title: string; value: number; icon: ReactNode; background: string }) => (
    <Paper
        sx={{
            position: "relative",
            overflow: "hidden",
            p: 3,
            borderRadius: 6,
            color: brand.white,
            background,
            boxShadow: "0 16px 34px -18px rgba(28, 74, 80, 0.55)"
        }}
    >
        <Box
            aria-hidden="true"
            sx={{
                position: "absolute",
                width: 140,
                height: 140,
                borderRadius: "50%",
                left: -40,
                bottom: -60,
                backgroundColor: "rgba(255,255,255,0.14)"
            }}
        />
        <Stack direction="row" sx={{ alignItems: "center", justifyContent: "space-between", position: "relative" }}>
            <Box>
                <Typography variant="h3" component="h3" sx={{ color: "rgba(255,255,255,0.9)", fontWeight: 500 }}>{title}</Typography>
                <Typography component="strong" sx={{ display: "block", fontFamily: "'Rubik', sans-serif", fontSize: "2.4rem", fontWeight: 700, lineHeight: 1.2 }}>
                    {value}
                </Typography>
            </Box>
            <Box
                aria-hidden="true"
                sx={{ width: 56, height: 56, borderRadius: 4, display: "grid", placeItems: "center", backgroundColor: "rgba(255,255,255,0.2)", "& svg": { fontSize: 30 } }}
            >
                {icon}
            </Box>
        </Stack>
    </Paper>
);

const AdminStats = ({
    usersCount,
    groupsCount,
    memoriesCount
}: AdminStatsResponse) => {
    return (
        <Grid container spacing={2.5} component="section" sx={{ mb: 4 }}>
            <Grid size={{ xs: 12, sm: 4 }}>
                <StatCard title="משתמשים" value={usersCount} icon={<PeopleAltRounded />} background={gradients.pinkButton} />
            </Grid>

            <Grid size={{ xs: 12, sm: 4 }}>
                <StatCard title="קבוצות" value={groupsCount} icon={<Diversity3Rounded />} background={gradients.tealButton} />
            </Grid>

            <Grid size={{ xs: 12, sm: 4 }}>
                <StatCard
                    title="זיכרונות"
                    value={memoriesCount}
                    icon={<PhotoLibraryRounded />}
                    background={`linear-gradient(135deg, ${brand.pinkSoft} 0%, ${brand.mint} 100%)`}
                />
            </Grid>
        </Grid>
    );
};

export default AdminStats;
