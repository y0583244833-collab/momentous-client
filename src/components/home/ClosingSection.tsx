import { Link } from "react-router";
import Box from "@mui/material/Box";
import Container from "@mui/material/Container";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";
import ArrowBackRounded from "@mui/icons-material/ArrowBackRounded";
import { alpha } from "@mui/material/styles";
import { HandHeart, Sparkle } from "../illustrations/Doodles";
import { brand, fonts } from "../../theme/tokens";
import { useStartPath } from "./useStartPath";

const ClosingSection = () => {
    const start = useStartPath();

    return (
        <Box component="section" sx={{ py: { xs: 8, md: 12 } }}>
            <Container maxWidth="md" sx={{ px: { xs: 2, sm: 3 } }}>
                <Box
                    sx={{
                        position: "relative",
                        overflow: "hidden",
                        textAlign: "center",
                        px: { xs: 3, md: 8 },
                        py: { xs: 6, md: 8 },
                        borderRadius: { xs: 7, md: 10 },
                        background: `linear-gradient(150deg, ${brand.pinkMist} 0%, #FFD6E8 55%, ${brand.pinkWhisper} 100%)`,
                        border: `1px solid ${alpha(brand.pink, 0.18)}`,
                        boxShadow: "0 40px 70px -40px rgba(200, 31, 114, 0.45)"
                    }}
                >
                    <Box
                        aria-hidden="true"
                        sx={{
                            position: "absolute",
                            inset: 0,
                            display: "grid",
                            placeItems: "center",
                            fontFamily: fonts.script,
                            fontWeight: 700,
                            fontSize: { xs: "6rem", md: "10rem" },
                            color: alpha(brand.white, 0.5),
                            direction: "ltr",
                            whiteSpace: "nowrap",
                            transform: "rotate(-6deg)",
                            pointerEvents: "none"
                        }}
                    >
                        Momentous
                    </Box>
                    <Box sx={{ position: "absolute", top: 28, left: 34, width: 40 }}>
                        <HandHeart filled />
                    </Box>
                    <Box sx={{ position: "absolute", bottom: 30, right: 40, width: 34 }}>
                        <HandHeart color={brand.teal} />
                    </Box>
                    <Box sx={{ position: "absolute", top: 40, right: 60, width: 18 }}>
                        <Sparkle color={brand.pink} />
                    </Box>

                    <Typography
                        variant="h2"
                        sx={{
                            position: "relative",
                            fontSize: { xs: "1.8rem", md: "2.5rem" },
                            fontWeight: 700,
                            lineHeight: 1.3,
                            color: brand.tealInk
                        }}
                    >
                        יש לכם כבר סיפור משותף.
                        <br />
                        <Box component="span" sx={{ color: brand.pinkDeep }}>עכשיו יש לו מקום.</Box>
                    </Typography>
                    <Button
                        component={Link}
                        to={start.path}
                        variant="contained"
                        color="primary"
                        size="large"
                        endIcon={<ArrowBackRounded />}
                        sx={{ position: "relative", mt: 4, px: 5, py: 1.6, fontSize: "1.1rem" }}
                    >
                        {start.isAuthenticated ? "לאזור האישי" : "להרשמה"}
                    </Button>
                </Box>
            </Container>
        </Box>
    );
};

export default ClosingSection;
