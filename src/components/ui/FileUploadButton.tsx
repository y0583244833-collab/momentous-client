import type { ChangeEvent, ReactNode } from "react";
import Button from "@mui/material/Button";
import CloudUploadRounded from "@mui/icons-material/CloudUploadRounded";

interface FileUploadButtonProps {
    id?: string;
    label: ReactNode;
    accept: string;
    onChange: (event: ChangeEvent<HTMLInputElement>) => void;
    color?: "primary" | "secondary";
}

// כפתור מעוצב שעוטף את שדה הקובץ המקורי - האירוע onChange עובר ללא שינוי
const FileUploadButton = ({ id, label, accept, onChange, color = "secondary" }: FileUploadButtonProps) => (
    <Button
        component="label"
        variant="outlined"
        color={color}
        startIcon={<CloudUploadRounded />}
        sx={{ alignSelf: "flex-start" }}
    >
        {label}
        <input
            id={id}
            type="file"
            accept={accept}
            onChange={onChange}
            style={{
                clip: "rect(0 0 0 0)",
                clipPath: "inset(50%)",
                height: 1,
                overflow: "hidden",
                position: "absolute",
                bottom: 0,
                left: 0,
                whiteSpace: "nowrap",
                width: 1
            }}
        />
    </Button>
);

export default FileUploadButton;
