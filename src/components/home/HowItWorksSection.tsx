import type { ReactNode } from "react";
import { Fragment } from "react";
import Box from "@mui/material/Box";
import Container from "@mui/material/Container";
import Stack from "@mui/material/Stack";
import Typography from "@mui/material/Typography";
import CreateNewFolderRounded from "@mui/icons-material/CreateNewFolderRounded";
import GroupAddRounded from "@mui/icons-material/GroupAddRounded";
import AddPhotoAlternateRounded from "@mui/icons-material/AddPhotoAlternateRounded";
import { alpha } from "@mui/material/styles";
import { HandArrow } from "../illustrations/Doodles";
import SectionTitle from "./SectionTitle";
import { brand, gradients, fonts } from "../../theme/tokens";

const steps: { icon: ReactNode; title: string; text: string; background: string }[] = [
    { icon: <CreateNewFolderRounded />, title: "פותחים קבוצה", text: "נותנים שם לאירוע, תאריך ותמונת כיסוי.", background: gradients.pinkButton },
    { icon: <GroupAddRounded />, title: "מזמינים חברים", text: "שולחים הזמנה במייל לכל מי שהיה שם.", background: gradients.tealButton },
    { icon: <AddPhotoAlternateRounded />, title: "מוסיפים זיכרונות", text: "תמונות, ציטוטים ורגעים מצחיקים – כולם על אותו לוח.", background: `linear-gradient(135deg, ${brand.mint} 0%, ${brand.teal} 100%)` }
];

const HowItWorksSection = () => (
    <Box
        component="section"
        id="how-it-works"
        sx={{ scrollMarginTop: 80, py: { xs: 8, md: 12 }, background: gradients.mintPanel }}
    >
        <Container maxWidth="lg" sx={{ px: { xs: 2, sm: 3 } }}>
            <SectionTitle eyebrow="שלושה צעדים" title="איך זה עובד?" />

            <Stack
                direction={{ xs: "column", md: "row" }}
                sx={{ alignItems: { xs: "center", md: "flex-start" }, justifyContent: "center", gap: { xs: 2, md: 1 } }}
            >
                {steps.map((step, index) => (
                    <Fragment key={step.title}>
                        <Box sx={{ flex: { md: 1 }, maxWidth: 300, textAlign: "center" }}>
                            <Box sx={{ position: "relative", width: 96, height: 96, mx: "auto", mb: 2.5 }}>
                                <Box
                                    aria-hidden="true"
                                    sx={{
                                        width: "100%",
                                        height: "100%",
                                        borderRadius: "32%",
                                        display: "grid",
                                        placeItems: "center",
                                        background: step.background,
                                        color: brand.white,
                                        transform: `rotate(${index % 2 ? 6 : -6}deg)`,
                                        boxShadow: "0 20px 34px -18px rgba(28, 74, 80, 0.6)",
                                        "& svg": { fontSize: 40, transform: `rotate(${index % 2 ? -6 : 6}deg)` }
                                    }}
                                >
                                    {step.icon}
                                </Box>
                                <Box
                                    sx={{
                                        position: "absolute",
                                        top: -10,
                                        right: -10,
                                        width: 36,
                                        height: 36,
                                        borderRadius: "50%",
                                        display: "grid",
                                        placeItems: "center",
                                        backgroundColor: brand.white,
                                        color: brand.pinkDeep,
                                        fontFamily: fonts.heading,
                                        fontWeight: 700,
                                        boxShadow: `0 6px 14px -6px ${alpha(brand.tealInk, 0.5)}`
                                    }}
                                >
                                    {index + 1}
                                </Box>
                            </Box>
                            <Typography variant="h3" sx={{ fontSize: "1.3rem", color: brand.tealInk }}>{step.title}</Typography>
                            <Typography sx={{ mt: 1, color: brand.inkSoft }}>{step.text}</Typography>
                        </Box>

                        {index < steps.length - 1 && (
                            <Box
                                aria-hidden="true"
                                sx={{
                                    width: { xs: 54, md: 110 },
                                    mt: { md: 3.5 },
                                    flexShrink: 0,
                                    // במובייל החץ מצביע למטה, במחשב - שמאלה (הכיוון הבא בקריאה מימין לשמאל)
                                    transform: { xs: "rotate(100deg)", md: `scaleX(-1) rotate(${index % 2 ? 10 : -10}deg)` }
                                }}
                            >
                                <HandArrow color={index % 2 ? brand.teal : brand.pink} style={{ width: "100%" }} />
                            </Box>
                        )}
                    </Fragment>
                ))}
            </Stack>
        </Container>
    </Box>
);

export default HowItWorksSection;
