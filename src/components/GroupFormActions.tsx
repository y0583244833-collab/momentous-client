import Stack from "@mui/material/Stack";
import Button from "@mui/material/Button";
import CheckRounded from "@mui/icons-material/CheckRounded";

interface Props {
    isSubmitting: boolean;
    isEditMode: boolean;
    onCancel: () => void;
}
const GroupFormActions = ({ isSubmitting, isEditMode, onCancel }: Props) => {
    return (
        <Stack direction={{ xs: "column-reverse", sm: "row" }} sx={{ justifyContent: "flex-end", gap: 1.5 }}>
            <Button
                type="button"
                variant="outlined"
                color="secondary"
                size="large"
                onClick={onCancel}
                disabled={isSubmitting}
            >ביטול </Button>

            <Button
                type="submit"
                variant="contained"
                color="primary"
                size="large"
                startIcon={<CheckRounded />}
                disabled={isSubmitting}
                sx={{ minWidth: { sm: 220 } }}
            >
                {isSubmitting
                    ? isEditMode ? "שומר שינויים..." : "יוצרים קבוצה..."
                    : isEditMode ? "שמירת שינויים" : "יצירת קבוצה"}
            </Button>
        </Stack>
    );
};

export default GroupFormActions;
