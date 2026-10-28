import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import DeleteOutlineRounded from "@mui/icons-material/DeleteOutlineRounded";
import { alpha } from "@mui/material/styles";
import { brand } from "../theme/tokens";

interface Props {
    imagePreview: string | null;
    onRemove: () => void;
}
const GroupImagePreview = ({ imagePreview, onRemove }: Props) => {
    if (!imagePreview) return null;
    return (
        <Box
            sx={{
                position: "relative",
                mt: 2,
                borderRadius: 5,
                overflow: "hidden",
                maxWidth: 420,
                border: `3px solid ${brand.white}`,
                boxShadow: "0 12px 30px -14px rgba(200, 31, 114, 0.4)"
            }}
        >
            <Box
                component="img"
                src={imagePreview}
                alt="תצוגה מקדימה של תמונת הכיסוי"
                sx={{ width: "100%", aspectRatio: "16 / 9", objectFit: "cover" }}
            />

            <Button
                type="button"
                size="small"
                onClick={onRemove}
                startIcon={<DeleteOutlineRounded />}
                sx={{
                    position: "absolute",
                    bottom: 12,
                    left: 12,
                    color: "error.main",
                    backgroundColor: alpha(brand.white, 0.92),
                    backdropFilter: "blur(6px)",
                    "&:hover": { backgroundColor: brand.white }
                }}
            >הסרת התמונה </Button>
        </Box>
    );
};

export default GroupImagePreview;
