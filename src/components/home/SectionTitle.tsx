import type { ReactNode } from "react";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import { brand, fonts } from "../../theme/tokens";
import { HandHeart } from "../illustrations/Doodles";

interface SectionTitleProps {
    eyebrow?: string;
    title: ReactNode;
    subtitle?: ReactNode;
}

const SectionTitle = ({ eyebrow, title, subtitle }: SectionTitleProps) => (
    <Box sx={{ textAlign: "center", maxWidth: 640, mx: "auto", mb: { xs: 4, md: 6 } }}>
        {eyebrow && (
            <Box
                sx={{
                    display: "inline-flex",
                    alignItems: "center",
                    gap: 1,
                    mb: 1,
                    fontFamily: fonts.hand,
                    fontWeight: 700,
                    fontSize: "1.6rem",
                    color: brand.pinkDeep
                }}
            >
                <HandHeart filled style={{ width: 18 }} />
                {eyebrow}
            </Box>
        )}
        <Typography variant="h2" sx={{ fontSize: { xs: "1.8rem", md: "2.4rem" }, fontWeight: 700, color: brand.tealInk }}>
            {title}
        </Typography>
        {subtitle && (
            <Typography sx={{ mt: 1.5, color: brand.inkSoft, fontSize: { md: "1.1rem" } }}>
                {subtitle}
            </Typography>
        )}
    </Box>
);

export default SectionTitle;
