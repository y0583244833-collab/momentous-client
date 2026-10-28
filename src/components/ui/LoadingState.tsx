import Stack from "@mui/material/Stack";
import CircularProgress from "@mui/material/CircularProgress";
import Typography from "@mui/material/Typography";

interface LoadingStateProps {
    message: string;
    compact?: boolean;
}

const LoadingState = ({ message, compact = false }: LoadingStateProps) => (
    <Stack
        role="status"
        sx={{ alignItems: "center", justifyContent: "center", gap: 2, py: compact ? 3 : { xs: 8, md: 12 }, textAlign: "center" }}
    >
        <CircularProgress size={compact ? 28 : 44} thickness={4} />
        <Typography color="text.secondary" sx={{ fontWeight: 500 }}>
            {message}
        </Typography>
    </Stack>
);

export default LoadingState;
