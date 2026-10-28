import Box from "@mui/material/Box";
import { brand, fonts } from "../../theme/tokens";

type LogoSize = "sm" | "md" | "lg" | "xl";

interface BrandLogoProps {
    light?: boolean;
    size?: LogoSize;
}

const sizes: Record<LogoSize, { m: string; rest: string }> = {
    sm: { m: "1.9rem", rest: "1.45rem" },
    md: { m: "2.35rem", rest: "1.75rem" },
    lg: { m: "3.2rem", rest: "2.35rem" },
    xl: { m: "4.4rem", rest: "3.2rem" }
};

// הלוגו של Momentous: כתב יד מחובר וזורם, עם M גדולה ובולטת בוורוד.
// הכיוון מוגדר במאפיין dir ולא ב-sx, כי תוסף ה-RTL הופך direction שנכתב ב-sx
const BrandLogo = ({ light = false, size = "md" }: BrandLogoProps) => (
    <Box
        component="span"
        dir="ltr"
        aria-label="Momentous"
        role="img"
        sx={{
            display: "inline-flex",
            alignItems: "baseline",
            unicodeBidi: "isolate",
            fontFamily: fonts.script,
            fontWeight: 700,
            lineHeight: 1,
            whiteSpace: "nowrap",
            userSelect: "none"
        }}
    >
        <Box
            component="span"
            aria-hidden="true"
            sx={{
                fontSize: sizes[size].m,
                ...(light
                    ? { color: brand.white, textShadow: "0 4px 18px rgba(200, 31, 114, 0.35)" }
                    : {
                        background: `linear-gradient(160deg, ${brand.pink} 10%, ${brand.pinkDeep} 90%)`,
                        WebkitBackgroundClip: "text",
                        backgroundClip: "text",
                        color: "transparent",
                        filter: "drop-shadow(0 3px 6px rgba(255, 62, 155, 0.25))"
                    })
            }}
        >
            M
        </Box>
        <Box
            component="span"
            aria-hidden="true"
            sx={{ fontSize: sizes[size].rest, color: light ? brand.white : brand.tealDeep }}
        >
            omentous
        </Box>
    </Box>
);

export default BrandLogo;