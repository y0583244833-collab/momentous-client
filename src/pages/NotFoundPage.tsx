import { NavLink } from "react-router"
import Box from "@mui/material/Box";
import Stack from "@mui/material/Stack";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";
import HomeRounded from "@mui/icons-material/HomeRounded";
import BrandLogo from "../components/ui/BrandLogo";
import { brand, gradients } from "../theme/tokens";

const NotFoundPage = () => {
    return (
        <Stack
            component="main"
            sx={{ alignItems: "center", justifyContent: "center", gap: 2, minHeight: "100vh", px: 2, textAlign: "center", background: gradients.page }}
        >
            <Box sx={{ mb: 2 }}>
                <BrandLogo size="lg" />
            </Box>
            <Typography
                variant="h1"
                sx={{
                    fontSize: { xs: "6rem", md: "9rem" },
                    lineHeight: 1,
                    background: gradients.brandStrong,
                    WebkitBackgroundClip: "text",
                    backgroundClip: "text",
                    color: "transparent"
                }}
            >
                404
            </Typography>
            <Typography variant="h2" component="p" sx={{ color: brand.ink }}>שגיאה 404 עמוד לא נמצא</Typography>
            <Button
                component={NavLink}
                to="/"
                variant="contained"
                color="primary"
                size="large"
                startIcon={<HomeRounded />}
                sx={{ mt: 2 }}
            >
                חזרה לדף הבית
            </Button>
        </Stack>
    )
}
export default NotFoundPage;
