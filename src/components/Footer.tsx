import { Link } from "react-router";
import Box from "@mui/material/Box";
import Container from "@mui/material/Container";
import Stack from "@mui/material/Stack";
import Typography from "@mui/material/Typography";
import MuiLink from "@mui/material/Link";
import FavoriteRounded from "@mui/icons-material/FavoriteRounded";
import { brand, gradients } from "../theme/tokens";

const Footer = () => {
    return (
        <Box
            component="footer"
            sx={{
                mt: { xs: 6, md: 10 },
                position: "relative",
                color: brand.white,
                background: gradients.footer,
                "&::before": {
                    content: '""',
                    position: "absolute",
                    insetInline: 0,
                    top: 0,
                    height: 4,
                    background: gradients.brand
                }
            }}
        >
            <Container maxWidth="lg" sx={{ py: { xs: 4, md: 5 } }}>
                <Stack
                    direction={{ xs: "column", md: "row" }}
                    sx={{ alignItems: "center", justifyContent: "space-between", gap: { xs: 1.5, md: 3 }, textAlign: { xs: "center", md: "start" } }}
                >
                    <Stack direction="row" sx={{ alignItems: "center", gap: 1 }}>
                        <FavoriteRounded aria-hidden="true" sx={{ color: brand.pinkSoft, fontSize: 20 }} />
                        <Typography component="p" sx={{ fontWeight: 600, fontFamily: "'Rubik', sans-serif" }}>
                            Momentous – הרגעים שלכם, הזיכרונות של כולם
                        </Typography>
                    </Stack>

                    <Stack
                        direction={{ xs: "column", sm: "row" }}
                        sx={{ alignItems: "center", gap: { xs: 1, sm: 3 }, color: "rgba(255,255,255,0.82)", fontSize: "0.9rem" }}
                    >
                        <Box component="span">פותח ע״י ריקי ילין</Box>
                        <Box component="span" sx={{ direction: "ltr" }}>© 2026 Momentous</Box>
                        <MuiLink
                            component={Link}
                            to="/"
                            sx={{ color: brand.mint, "&:hover": { color: brand.white } }}
                        >
                            דף הבית
                        </MuiLink>
                    </Stack>
                </Stack>
            </Container>
        </Box>
    );
};

export default Footer;
