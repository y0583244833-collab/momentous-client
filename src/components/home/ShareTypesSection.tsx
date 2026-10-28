import type { ReactNode } from "react";
import Box from "@mui/material/Box";
import Container from "@mui/material/Container";
import Grid from "@mui/material/Grid";
import Typography from "@mui/material/Typography";
import PhotoCameraRounded from "@mui/icons-material/PhotoCameraRounded";
import FormatQuoteRounded from "@mui/icons-material/FormatQuoteRounded";
import SentimentVerySatisfiedRounded from "@mui/icons-material/SentimentVerySatisfiedRounded";
import PlaceRounded from "@mui/icons-material/PlaceRounded";
import AutoStoriesRounded from "@mui/icons-material/AutoStoriesRounded";
import { alpha } from "@mui/material/styles";
import { Sparkle } from "../illustrations/Doodles";
import SectionTitle from "./SectionTitle";
import { brand, softShadow } from "../../theme/tokens";

const types: { icon: ReactNode; title: string; text: string; color: string; soft: string; shape: string }[] = [
    { icon: <PhotoCameraRounded />, title: "תמונות", text: "הרגעים שתפסתם במצלמה, עם כמה מילים עליהם.", color: brand.pink, soft: brand.pinkMist, shape: "58% 42% 55% 45% / 48% 55% 45% 52%" },
    { icon: <FormatQuoteRounded />, title: "ציטוטים", text: "המשפט שכולם עוד חוזרים עליו.", color: brand.teal, soft: brand.aquaMist, shape: "45% 55% 42% 58% / 55% 45% 55% 45%" },
    { icon: <SentimentVerySatisfiedRounded />, title: "בדיחות", text: "מה שהצחיק אתכם עד דמעות.", color: brand.pinkSoft, soft: brand.pinkWhisper, shape: "52% 48% 60% 40% / 42% 58% 42% 58%" },
    { icon: <PlaceRounded />, title: "מקומות", text: "איפה זה קרה – עם קישור למפה.", color: brand.tealDeep, soft: brand.mintMist, shape: "40% 60% 48% 52% / 58% 42% 58% 42%" },
    { icon: <AutoStoriesRounded />, title: "סיכומי חוויות", text: "הסיפור המלא, כמו שאתם זוכרים אותו.", color: brand.mint, soft: brand.mintWhisper, shape: "55% 45% 40% 60% / 50% 50% 50% 50%" }
];

const ShareTypesSection = () => (
    <Box
        component="section"
        id="what-to-share"
        sx={{
            scrollMarginTop: 80,
            py: { xs: 8, md: 12 },
            backgroundColor: alpha(brand.white, 0.6),
            borderBlock: `1px solid ${alpha(brand.teal, 0.08)}`
        }}
    >
        <Container maxWidth="lg" sx={{ px: { xs: 2, sm: 3 } }}>
            <SectionTitle
                eyebrow="מה אפשר לשתף"
                title="יותר מתמונות"
                subtitle="כל סוג של זיכרון מקבל את המקום שלו על הלוח."
            />

            <Grid container spacing={{ xs: 2.5, md: 3 }} sx={{ justifyContent: "center" }}>
                {types.map((type) => (
                    <Grid key={type.title} size={{ xs: 6, sm: 4, md: 2.4 }}>
                        <Box
                            sx={{
                                height: "100%",
                                textAlign: "center",
                                px: 2,
                                py: { xs: 3, md: 3.5 },
                                borderRadius: 6,
                                backgroundColor: brand.white,
                                boxShadow: softShadow,
                                transition: "transform .25s ease",
                                "&:hover": { transform: "translateY(-5px)" }
                            }}
                        >
                            <Box sx={{ position: "relative", width: 84, height: 84, mx: "auto", mb: 2 }}>
                                <Box
                                    aria-hidden="true"
                                    sx={{
                                        position: "absolute",
                                        inset: 0,
                                        borderRadius: type.shape,
                                        backgroundColor: type.soft
                                    }}
                                />
                                <Box
                                    aria-hidden="true"
                                    sx={{
                                        position: "absolute",
                                        inset: 14,
                                        borderRadius: "50%",
                                        display: "grid",
                                        placeItems: "center",
                                        backgroundColor: type.color,
                                        color: brand.white,
                                        boxShadow: `0 10px 18px -8px ${alpha(type.color, 0.8)}`,
                                        "& svg": { fontSize: 28 }
                                    }}
                                >
                                    {type.icon}
                                </Box>
                                <Box sx={{ position: "absolute", top: -2, left: 2, width: 16 }}>
                                    <Sparkle color={type.color} />
                                </Box>
                            </Box>
                            <Typography variant="h3" sx={{ fontSize: "1.15rem", color: brand.tealInk }}>{type.title}</Typography>
                            <Typography variant="body2" sx={{ mt: 0.75, color: brand.inkSoft }}>{type.text}</Typography>
                        </Box>
                    </Grid>
                ))}
            </Grid>
        </Container>
    </Box>
);

export default ShareTypesSection;
