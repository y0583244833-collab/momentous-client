import type { ReactNode } from "react";
import Paper from "@mui/material/Paper";
import Stack from "@mui/material/Stack";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import ErrorOutlineRounded from "@mui/icons-material/ErrorOutlineRounded";
import { alpha } from "@mui/material/styles";
import { brand } from "../../theme/tokens";

interface ErrorStateProps {
    title?: ReactNode;
    message?: ReactNode;
    action?: ReactNode;
    titleComponent?: "h1" | "h2" | "p";
}

const ErrorState = ({ title, message, action, titleComponent = "p" }: ErrorStateProps) => (
    <Paper
        role="alert"
        sx={{
            maxWidth: 560,
            mx: "auto",
            my: { xs: 4, md: 8 },
            p: { xs: 3, md: 5 },
            textAlign: "center",
            borderRadius: 7,
            border: `1px solid ${alpha("#D93A5B", 0.2)}`,
            background: `linear-gradient(160deg, ${brand.white} 0%, ${brand.pinkWhisper} 100%)`
        }}
    >
        <Stack sx={{ alignItems: "center", gap: 1.5 }}>
            <Box
                aria-hidden="true"
                sx={{
                    width: 64,
                    height: 64,
                    borderRadius: "50%",
                    display: "grid",
                    placeItems: "center",
                    backgroundColor: brand.pinkMist,
                    color: "error.main"
                }}
            >
                <ErrorOutlineRounded fontSize="large" />
            </Box>
            {title && (
                <Typography variant="h2" component={titleComponent}>
                    {title}
                </Typography>
            )}
            {message && <Typography color="text.secondary">{message}</Typography>}
            {action && <Box sx={{ mt: 1 }}>{action}</Box>}
        </Stack>
    </Paper>
);

export default ErrorState;
