import type { ReactNode } from "react";
import Box from "@mui/material/Box";
import Stack from "@mui/material/Stack";
import Typography from "@mui/material/Typography";
import { brand, gradients } from "../../theme/tokens";

interface PageHeaderProps {
    title: ReactNode;
    subtitle?: ReactNode;
    eyebrow?: ReactNode;
    actions?: ReactNode;
}

const PageHeader = ({ title, subtitle, eyebrow, actions }: PageHeaderProps) => (
    <Stack
        direction={{ xs: "column", sm: "row" }}
        sx={{ alignItems: { xs: "stretch", sm: "flex-end" }, justifyContent: "space-between", gap: 2, mb: { xs: 3, md: 4 } }}
    >
        <Box>
            {eyebrow && (
                <Typography variant="overline" sx={{ color: brand.teal, display: "block", mb: 0.5 }}>
                    {eyebrow}
                </Typography>
            )}
            <Typography variant="h1" sx={{ color: brand.ink }}>
                {title}
            </Typography>
            <Box
                aria-hidden="true"
                sx={{ mt: 1.5, width: 72, height: 5, borderRadius: 999, background: gradients.brandStrong }}
            />
            {subtitle && (
                <Typography variant="subtitle1" color="text.secondary" sx={{ mt: 1.5 }}>
                    {subtitle}
                </Typography>
            )}
        </Box>
        {actions && (
            <Stack direction="row" sx={{ gap: 1.5, flexWrap: "wrap", flexShrink: 0 }}>
                {actions}
            </Stack>
        )}
    </Stack>
);

export default PageHeader;
