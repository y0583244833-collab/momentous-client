import type { ReactNode } from "react";
import Paper from "@mui/material/Paper";
import Stack from "@mui/material/Stack";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import type { SxProps, Theme } from "@mui/material/styles";
import { alpha } from "@mui/material/styles";
import { brand, gradients, softShadow } from "../../theme/tokens";

export type SectionTone = "white" | "pink" | "mint";

interface SectionCardProps {
    title?: ReactNode;
    subtitle?: ReactNode;
    icon?: ReactNode;
    action?: ReactNode;
    tone?: SectionTone;
    children?: ReactNode;
    component?: "section" | "div" | "article";
    sx?: SxProps<Theme>;
}

const toneStyles: Record<SectionTone, { background: string; border: string; iconBg: string; iconColor: string }> = {
    white: {
        background: brand.white,
        border: alpha(brand.pink, 0.1),
        iconBg: brand.pinkMist,
        iconColor: brand.pinkDeep
    },
    pink: {
        background: gradients.pinkPanel,
        border: alpha(brand.pink, 0.18),
        iconBg: brand.white,
        iconColor: brand.pinkDeep
    },
    mint: {
        background: gradients.mintPanel,
        border: alpha(brand.teal, 0.18),
        iconBg: brand.white,
        iconColor: brand.tealDeep
    }
};

const SectionCard = ({ title, subtitle, icon, action, tone = "white", children, component = "section", sx }: SectionCardProps) => {
    const style = toneStyles[tone];

    return (
        <Paper
            component={component}
            sx={[
                {
                    p: { xs: 2.5, md: 3.5 },
                    borderRadius: 6,
                    background: style.background,
                    border: `1px solid ${style.border}`,
                    boxShadow: softShadow,
                    height: "100%"
                },
                ...(Array.isArray(sx) ? sx : [sx])
            ]}
        >
            {(title || action) && (
                <Stack
                    direction={{ xs: "column", sm: "row" }}
                    sx={{ alignItems: { xs: "flex-start", sm: "center" }, justifyContent: "space-between", gap: 2, mb: children ? 2.5 : 0 }}
                >
                    <Stack direction="row" sx={{ alignItems: "center", gap: 1.5 }}>
                        {icon && (
                            <Box
                                aria-hidden="true"
                                sx={{
                                    width: 42,
                                    height: 42,
                                    borderRadius: 3.5,
                                    display: "grid",
                                    placeItems: "center",
                                    flexShrink: 0,
                                    backgroundColor: style.iconBg,
                                    color: style.iconColor
                                }}
                            >
                                {icon}
                            </Box>
                        )}
                        <Box>
                            {title && <Typography variant="h2">{title}</Typography>}
                            {subtitle && (
                                <Typography variant="body2" color="text.secondary" sx={{ mt: 0.25 }}>
                                    {subtitle}
                                </Typography>
                            )}
                        </Box>
                    </Stack>
                    {action}
                </Stack>
            )}
            {children}
        </Paper>
    );
};

export default SectionCard;
