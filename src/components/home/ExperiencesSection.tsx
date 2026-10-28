import Box from "@mui/material/Box";
import Container from "@mui/material/Container";
import Grid from "@mui/material/Grid";
import Typography from "@mui/material/Typography";
import Chip from "@mui/material/Chip";
import Stack from "@mui/material/Stack";
import AvatarGroup from "@mui/material/AvatarGroup";
import Avatar from "@mui/material/Avatar";
import PhotoLibraryRounded from "@mui/icons-material/PhotoLibraryRounded";
import { alpha } from "@mui/material/styles";
import Scene, { type SceneName } from "../illustrations/Scene";
import { HandHeart } from "../illustrations/Doodles";
import SectionTitle from "./SectionTitle";
import { brand, liftShadow, softShadow } from "../../theme/tokens";

// דוגמאות להמחשה בלבד - לא נתונים של המשתמש
const examples: { scene: SceneName; title: string; text: string; memories: number; tilt: number; avatars: string[] }[] = [
    { scene: "trip", title: "הטיול שלנו", text: "המסלול, הנופים והעצירה ההיא שאף אחד לא תכנן.", memories: 48, tilt: -2, avatars: ["א", "ד", "י"] },
    { scene: "party", title: "החברים מהכיתה", text: "מסיבת הסיום, הפתקים מהשיעורים והבדיחות הפנימיות.", memories: 73, tilt: 1.5, avatars: ["ש", "מ", "ר"] },
    { scene: "family", title: "רגעים של משפחה", text: "ערבי חג, ימי הולדת והסיפורים שסבא מספר שוב ושוב.", memories: 35, tilt: -1, avatars: ["ס", "ב", "נ"] }
];

const avatarColors = [brand.pinkSoft, brand.mint, brand.teal];

const ExperiencesSection = () => (
    <Box component="section" sx={{ py: { xs: 8, md: 12 } }}>
        <Container maxWidth="lg" sx={{ px: { xs: 2, sm: 3 } }}>
            <SectionTitle
                eyebrow="לכל חוויה"
                title="לכל חוויה יש מקום"
                subtitle="קבוצה לכל אירוע, ולוח זיכרונות משותף לכל מי שהיה שם."
            />

            <Grid container spacing={{ xs: 3, md: 4 }}>
                {examples.map((example) => (
                    <Grid key={example.title} size={{ xs: 12, sm: 6, md: 4 }}>
                        <Box
                            component="article"
                            sx={{
                                height: "100%",
                                p: 1.5,
                                pb: 2.5,
                                borderRadius: 7,
                                backgroundColor: brand.white,
                                boxShadow: softShadow,
                                transform: { md: `rotate(${example.tilt}deg)` },
                                transition: "transform .3s ease, box-shadow .3s ease",
                                "&:hover": { transform: "rotate(0deg) translateY(-6px)", boxShadow: liftShadow }
                            }}
                        >
                            <Box sx={{ position: "relative", borderRadius: 5, overflow: "hidden", aspectRatio: "4 / 3" }}>
                                <Scene name={example.scene} />
                                <Chip
                                    label="לדוגמה"
                                    size="small"
                                    sx={{
                                        position: "absolute",
                                        top: 12,
                                        left: 12,
                                        backgroundColor: alpha(brand.white, 0.9),
                                        color: brand.tealInk,
                                        backdropFilter: "blur(6px)"
                                    }}
                                />
                                <Box sx={{ position: "absolute", bottom: 10, right: 12, width: 30 }}>
                                    <HandHeart filled color={brand.white} />
                                </Box>
                            </Box>
                            <Box sx={{ px: 1.5, pt: 2.5 }}>
                                <Typography variant="h3" sx={{ fontSize: "1.35rem", color: brand.tealInk }}>
                                    {example.title}
                                </Typography>
                                <Typography sx={{ mt: 1, color: brand.inkSoft, minHeight: { md: 54 } }}>
                                    {example.text}
                                </Typography>
                                <Stack direction="row" sx={{ mt: 2, alignItems: "center", justifyContent: "space-between" }}>
                                    <AvatarGroup
                                        aria-hidden="true"
                                        sx={{ "& .MuiAvatar-root": { width: 30, height: 30, fontSize: "0.85rem", border: `2px solid ${brand.white}` } }}
                                    >
                                        {example.avatars.map((letter, i) => (
                                            <Avatar key={letter} sx={{ bgcolor: avatarColors[i], color: brand.white }}>{letter}</Avatar>
                                        ))}
                                    </AvatarGroup>
                                    <Chip
                                        icon={<PhotoLibraryRounded />}
                                        label={`${example.memories} זיכרונות`}
                                        size="small"
                                        color="primary"
                                    />
                                </Stack>
                            </Box>
                        </Box>
                    </Grid>
                ))}
            </Grid>
        </Container>
    </Box>
);

export default ExperiencesSection;
