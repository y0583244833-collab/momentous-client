import type { ReactNode } from "react";
import { Link } from "react-router";
import Box from "@mui/material/Box";
import Stack from "@mui/material/Stack";
import Typography from "@mui/material/Typography";
import MuiLink from "@mui/material/Link";
import BrandLogo from "./BrandLogo";
import MemoryCollage from "../illustrations/MemoryCollage";
import { brand, gradients, fonts } from "../../theme/tokens";

interface AuthLayoutProps {
    title: string;
    children: ReactNode;
    switchText: string;
    switchLinkText: string;
    switchTo: string;
}

const tagline = "יש רגעים ששווה לשמור ביחד.";

// סימן מים גדול ושקוף של שם האתר
const Watermark = ({ fontSize }: { fontSize: object }) => (
    <Box
        aria-hidden="true"
        sx={{
            position: "absolute",
            inset: 0,
            display: "grid",
            placeItems: "center",
            overflow: "hidden",
            pointerEvents: "none",
            fontFamily: fonts.script,
            fontWeight: 700,
            fontSize,
            lineHeight: 1,
            color: "rgba(255, 255, 255, 0.42)",
            direction: "ltr",
            whiteSpace: "nowrap",
            transform: "rotate(-8deg)"
        }}
    >
        Momentous
    </Box>
);

// מעטפת משותפת להתחברות ולהרשמה:
// במחשב - טופס מימין על ורוד בהיר, אזור גרפי משמאל במנטה־טורקיז.
// במובייל - האזור הגרפי הופך לפתיח קצר מעל הטופס.
const AuthLayout = ({ title, children, switchText, switchLinkText, switchTo }: AuthLayoutProps) => (
    <Box
        component="main"
        sx={{
            minHeight: "100vh",
            display: "grid",
            gridTemplateColumns: { xs: "1fr", md: "minmax(420px, 1fr) 1.1fr" },
            background: gradients.authForm
        }}
    >
        {/* פתיח למובייל */}
        <Box
            sx={{
                display: { xs: "block", md: "none" },
                position: "relative",
                overflow: "hidden",
                background: gradients.authArt,
                borderBottomLeftRadius: 32,
                borderBottomRightRadius: 32,
                px: 2.5,
                pt: 2.5,
                pb: 1
            }}
        >
            <Watermark fontSize={{ xs: "5.5rem", sm: "7rem" }} />
            <Stack sx={{ position: "relative", alignItems: "center", textAlign: "center", gap: 1 }}>
                <Box component={Link} to="/" sx={{ textDecoration: "none" }}>
                    <BrandLogo size="md" />
                </Box>
                <Typography sx={{ fontFamily: fonts.heading, fontWeight: 700, fontSize: "1.2rem", color: brand.tealInk }}>
                    {tagline}
                </Typography>
                <Box sx={{ width: "100%", maxWidth: 420, mt: 0.5 }}>
                    <MemoryCollage variant="compact" />
                </Box>
            </Stack>
        </Box>

        {/* טופס - בצד ימין במחשב */}
        <Stack
            sx={{
                alignItems: "center",
                justifyContent: "center",
                px: { xs: 2.5, sm: 6 },
                py: { xs: 4, md: 6 },
                position: "relative"
            }}
        >
            <Box sx={{ width: "100%", maxWidth: 420 }}>
                <Box
                    component={Link}
                    to="/"
                    sx={{ display: { xs: "none", md: "inline-flex" }, textDecoration: "none", mb: 5 }}
                >
                    <BrandLogo size="lg" />
                </Box>

                <Typography variant="h1" sx={{ fontSize: { xs: "1.9rem", sm: "2.3rem" }, color: brand.tealInk }}>
                    {title}
                </Typography>
                <Box
                    aria-hidden="true"
                    sx={{ mt: 1.5, mb: 4, width: 56, height: 5, borderRadius: 999, background: gradients.brandStrong }}
                />

                {children}

                <Typography sx={{ mt: 4, textAlign: "center", color: brand.inkSoft }}>
                    {switchText}{" "}
                    <MuiLink component={Link} to={switchTo} sx={{ color: brand.pinkDeep }}>
                        {switchLinkText}
                    </MuiLink>
                </Typography>
            </Box>
        </Stack>

        {/* אזור גרפי - בצד שמאל במחשב */}
        <Box
            sx={{
                display: { xs: "none", md: "flex" },
                position: "relative",
                overflow: "hidden",
                flexDirection: "column",
                alignItems: "center",
                justifyContent: "center",
                gap: 4,
                px: { md: 5, lg: 8 },
                py: 6,
                background: gradients.authArt,
                // כתוב בכיווניות LTR - תוסף ה-RTL הופך לצד הפונה אל הטופס
                borderTopLeftRadius: 40,
                borderBottomLeftRadius: 40
            }}
        >
            <Watermark fontSize={{ md: "9rem", lg: "11rem" }} />
            <Typography
                component="p"
                sx={{
                    position: "relative",
                    fontFamily: fonts.heading,
                    fontWeight: 700,
                    fontSize: { md: "2rem", lg: "2.4rem" },
                    lineHeight: 1.25,
                    color: brand.tealInk,
                    textAlign: "center",
                    maxWidth: 460
                }}
            >
                {tagline}
            </Typography>
            <Box sx={{ position: "relative", width: "100%", maxWidth: 480 }}>
                <MemoryCollage variant="auth" />
            </Box>
        </Box>
    </Box>
);

export default AuthLayout;
