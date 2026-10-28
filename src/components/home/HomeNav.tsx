import { Link } from "react-router";
import AppBar from "@mui/material/AppBar";
import Toolbar from "@mui/material/Toolbar";
import Container from "@mui/material/Container";
import Box from "@mui/material/Box";
import Stack from "@mui/material/Stack";
import Button from "@mui/material/Button";
import { alpha } from "@mui/material/styles";
import BrandLogo from "../ui/BrandLogo";
import { brand } from "../../theme/tokens";
import { useStartPath } from "./useStartPath";

const anchorSx = {
    color: brand.tealInk,
    fontWeight: 600,
    px: 1.75,
    "&:hover": { backgroundColor: alpha(brand.white, 0.7), color: brand.pinkDeep }
};

const HomeNav = () => {
    const start = useStartPath();

    return (
        <AppBar
            position="sticky"
            elevation={0}
            sx={{
                backgroundColor: alpha(brand.mintWhisper, 0.82),
                backdropFilter: "blur(14px)",
                color: brand.tealInk,
                borderBottom: `1px solid ${alpha(brand.teal, 0.12)}`
            }}
        >
            <Container maxWidth="lg" sx={{ px: { xs: 2, sm: 3 } }}>
                <Toolbar component="nav" disableGutters sx={{ minHeight: { xs: 64, md: 76 }, gap: 2 }}>
                    <Box component={Link} to="/" aria-label="Momentous – דף הבית" sx={{ textDecoration: "none", display: "inline-flex" }}>
                        <BrandLogo size="md" />
                    </Box>

                    <Stack direction="row" sx={{ display: { xs: "none", md: "flex" }, gap: 0.5, ml: 3 }}>
                        <Button href="#how-it-works" sx={anchorSx}>איך זה עובד</Button>
                        <Button href="#what-to-share" sx={anchorSx}>מה אפשר לשתף</Button>
                    </Stack>

                    <Box sx={{ flex: 1 }} />

                    {start.isAuthenticated ? (
                        <Button component={Link} to={start.path} variant="contained" color="primary">
                            לאזור האישי
                        </Button>
                    ) : (
                        <Stack direction="row" sx={{ gap: 1 }}>
                            <Button component={Link} to="/login" variant="outlined" color="secondary" size="small" sx={{ px: { xs: 1.5, sm: 2.5 } }}>
                                התחברות
                            </Button>
                            <Button component={Link} to="/signup" variant="contained" color="primary" size="small" sx={{ px: { xs: 1.5, sm: 2.5 } }}>
                                הרשמה
                            </Button>
                        </Stack>
                    )}
                </Toolbar>
            </Container>
        </AppBar>
    );
};

export default HomeNav;
