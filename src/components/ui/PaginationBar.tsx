import type { ReactNode } from "react";
import Stack from "@mui/material/Stack";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import ChevronRightRounded from "@mui/icons-material/ChevronRightRounded";
import ChevronLeftRounded from "@mui/icons-material/ChevronLeftRounded";

interface PaginationBarProps {
    label: ReactNode;
    prevDisabled: boolean;
    nextDisabled: boolean;
    onPrev: () => void;
    onNext: () => void;
    compact?: boolean;
}

// שומר בדיוק את תנאי ה-disabled וה-handlers שמגיעים מהקומפוננטה שמשתמשת בו
const PaginationBar = ({ label, prevDisabled, nextDisabled, onPrev, onNext, compact = false }: PaginationBarProps) => (
    <Stack
        direction="row"
        sx={{ alignItems: "center", justifyContent: "center", gap: compact ? 1 : 2, mt: compact ? 2 : 4 }}
    >
        <Button
            type="button"
            variant="outlined"
            color="secondary"
            size="small"
            disabled={prevDisabled}
            onClick={onPrev}
            startIcon={<ChevronRightRounded />}
        >
            הקודם
        </Button>
        <Typography variant="body2" color="text.secondary" sx={{ fontWeight: 600, whiteSpace: "nowrap" }}>
            {label}
        </Typography>
        <Button
            type="button"
            variant="outlined"
            color="secondary"
            size="small"
            disabled={nextDisabled}
            onClick={onNext}
            endIcon={<ChevronLeftRounded />}
        >
            הבא
        </Button>
    </Stack>
);

export default PaginationBar;
