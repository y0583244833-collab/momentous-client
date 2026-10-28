import type { ReactNode } from "react";
import Stack from "@mui/material/Stack";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import { alpha } from "@mui/material/styles";
import { brand, gradients } from "../../theme/tokens";

interface EmptyStateProps {
    icon: ReactNode;
    message: ReactNode;
    action?: ReactNode;
}

const EmptyState = ({ icon, message, action }: EmptyStateProps) => (
    <Stack
        sx={{ alignItems: "center", gap: 2, py: { xs: 5, md: 7 },
            px: 3,
            textAlign: "center",
            borderRadius: 6,
            border: `2px dashed ${alpha(brand.teal, 0.25)}`,
            background: alpha(brand.white, 0.55) }}
    >
        <Box
            aria-hidden="true"
            sx={{
                width: 72,
                height: 72,
                borderRadius: "50%",
                display: "grid",
                placeItems: "center",
                background: gradients.brand,
                color: brand.white,
                "& svg": { fontSize: 34 }
            }}
        >
            {icon}
        </Box>
        <Typography color="text.secondary" sx={{ fontWeight: 500, maxWidth: 360 }}>
            {message}
        </Typography>
        {action}
    </Stack>
);

export default EmptyState;
