import { Link } from "react-router";
import Box from "@mui/material/Box";
import Container from "@mui/material/Container";
import Grid from "@mui/material/Grid";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";
import ArrowBackRounded from "@mui/icons-material/ArrowBackRounded";
import { alpha } from "@mui/material/styles";
import MemoryCollage from "../illustrations/MemoryCollage";
import { LoopArrow } from "../illustrations/Doodles";
import { brand, gradients } from "../../theme/tokens";
import { useStartPath } from "./useStartPath";

const HeroSection = () => {
    const start = useStartPath();

    return (
        <Box
            component="section"
            sx={{
                position: "relative",
                overflow: "hidden",
                background: gradients.heroArt,
                // ממלא את כל גובה המסך מתחת לסרגל העליון
                minHeight: { xs: "calc(100vh - 64px)", md: "calc(100vh - 88px)" },
                display: "flex",
                alignItems: "center",
                pt: { xs: 4, md: 5 },
                pb: { xs: 6, md: 5 },
                "&::before": {
                    content: '""',
                    position: "absolute",
                    width: 520,
                    height: 520,
                    borderRadius: "50%",
                    top: -200,
                    left: -160,
                    background: alpha(brand.pinkSoft, 0.18),
                    filter: "blur(10px)"
                }
            }}
        >
            <Container maxWidth="xl" sx={{ position: "relative", px: { xs: 2, sm: 4, lg: 6 } }}>    <Grid container spacing={{ xs: 5, md: 6 }} sx={{ alignItems: "center" }}>
                <Grid size={{ xs: 12, md: 5 }}>
                    <Typography
                        variant="h1"
                        sx={{
                            fontSize: { xs: "2.4rem", sm: "3rem", md: "3.6rem" },
                            lineHeight: 1.12,
                            fontWeight: 700,
                            color: brand.tealInk,
                            letterSpacing: "-0.02em"
                        }}
                    >
                        הרגעים הכי יפים{" "}
                        <Box
                            component="span"
                            sx={{
                                position: "relative",
                                isolation: "isolate",
                                color: brand.pinkDeep,
                                whiteSpace: "nowrap",
                                "&::after": {
                                    content: '""',
                                    position: "absolute",
                                    insetInline: 0,
                                    bottom: "0.04em",
                                    height: "0.28em",
                                    borderRadius: 999,
                                    background: alpha(brand.pinkSoft, 0.35),
                                    zIndex: -1
                                }
                            }}
                        >
                            נשארים ביחד.
                        </Box>
                    </Typography>
                    <Typography sx={{ mt: 3, fontSize: { xs: "1.1rem", md: "1.25rem" }, lineHeight: 1.7, color: brand.inkSoft, maxWidth: 480 }}>
                        התמונות, הצחוקים והסיפורים שלכם — במקום אחד, עם האנשים שהיו שם.
                    </Typography>
                    <Box sx={{ mt: 4, display: "flex", alignItems: "center", gap: 2 }}>
                        <Button
                            component={Link}
                            to={start.path}
                            variant="contained"
                            color="primary"
                            size="large"
                            endIcon={<ArrowBackRounded />}
                            sx={{ px: 4.5, py: 1.6, fontSize: "1.1rem" }}
                        >
                            בואו נתחיל
                        </Button>
                        <Box sx={{ display: { xs: "none", sm: "block" }, width: 90, mt: -3 }}>
                            <LoopArrow color={brand.pink} style={{ width: "100%", transform: "scaleX(-1) rotate(10deg)" }} />
                        </Box>
                    </Box>
                </Grid>

                <Grid size={{ xs: 12, md: 7 }}>
                    <Box
                        sx={{
                            position: "relative",
                            p: { xs: 2, sm: 3.5 },
                            borderRadius: { xs: 6, md: 9 },
                            backgroundColor: alpha(brand.white, 0.55),
                            backgroundImage: `radial-gradient(${alpha(brand.teal, 0.16)} 1.4px, transparent 1.4px)`,
                            backgroundSize: "22px 22px",
                            border: `1px solid ${alpha(brand.white, 0.9)}`,
                            boxShadow: "0 40px 80px -40px rgba(28, 74, 80, 0.45), inset 0 0 0 8px rgba(255,255,255,0.35)"
                        }}
                    >
                        <MemoryCollage variant="hero" />
                    </Box>
                </Grid>
            </Grid>
            </Container>
        </Box>
    );
};

export default HeroSection;
