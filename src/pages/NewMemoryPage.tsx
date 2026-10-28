import { useState } from "react";
import { useParams } from "react-router";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import Box from "@mui/material/Box";
import Stack from "@mui/material/Stack";
import Typography from "@mui/material/Typography";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import Alert from "@mui/material/Alert";
import FormHelperText from "@mui/material/FormHelperText";
import AutoAwesomeRounded from "@mui/icons-material/AutoAwesomeRounded";
import InsertPhotoRounded from "@mui/icons-material/InsertPhotoRounded";
import { memorySchema, memoryTypes, type MemoryFormData } from "../validation/memorySchemas";
import { createMemory, updateMemory } from "../api/memoriesApi";
import { uploadImage } from "../api/imageApi";
import type { CreateMemoryRequest, MemoryType } from "../types/memory.types";
import { type Memory } from "../types/memory.types";
import { muiRegister } from "../utils/muiRegister";
import FileUploadButton from "../components/ui/FileUploadButton";
import { brand, gradients } from "../theme/tokens";

interface NewMemoryPageProps {
    onClose: () => void;
    memory?: Memory;
}

const NewMemoryPage = ({ onClose, memory }: NewMemoryPageProps) => {
    const { groupId } = useParams();
    const queryClient = useQueryClient();
    const [image, setImage] = useState<File | null>(null);
    const isEditMode = Boolean(memory);
    const [imageError, setImageError] = useState("");
    const {
        register,
        handleSubmit,
        watch,
        setValue,
        formState: { errors }
    } = useForm<MemoryFormData>({
        resolver: yupResolver(memorySchema),
        defaultValues: {
            type: memory?.type ?? "PHOTO",
            title: memory?.title ?? "תמונה",
            content: memory?.content ?? "",
            placeUrl: memory?.placeUrl ?? "",
            happenedAt: memory?.happenedAt?.slice(0, 10) ?? ""
        }
    });
    const type = watch("type");
    const mutation = useMutation({
        mutationFn: async (data: MemoryFormData) => {
            if (!groupId) throw new Error("לא נמצאה קבוצה");
            let imageId: string | undefined;
            if (data.type === "PHOTO" && image) {
                const result = await uploadImage(image);
                imageId = result.id;
            }
            const request: CreateMemoryRequest = {
                type: data.type,
                title: data.title.trim(),
                content: data.content.trim(),
                ...(imageId && { imageId }),
                ...(data.type === "PLACE" && data.placeUrl && {
                    placeUrl: data.placeUrl.trim()
                }),
                ...(data.happenedAt && { happenedAt: data.happenedAt })
            };
            if (memory) {
                return updateMemory(memory.id, {
                    ...request,
                    imageId: data.type === "PHOTO" ? imageId ?? memory.imageId : null,
                    placeUrl: data.type === "PLACE" ? data.placeUrl?.trim() || null : null,
                    happenedAt:
                        data.type === "PHOTO" ||
                            data.type === "PLACE" ||
                            data.type === "SUMMARY"
                            ? data.happenedAt || null
                            : null
                });
            }

            return createMemory(groupId, request);
        },

        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ["memories", groupId] });
            queryClient.invalidateQueries({ queryKey: ["group", groupId] });
            queryClient.invalidateQueries({ queryKey: ["groups"] });
            onClose();
        }
    });

    const onSubmit = (data: MemoryFormData) => {
        setImageError("");

        if (data.type === "PHOTO" && !image && !memory?.imageId) {
            setImageError("חובה לבחור תמונה");
            return;
        }
        mutation.mutate(data);
    };

    return (
        <Box>
            <Box
                sx={{
                    px: { xs: 2.5, sm: 4 },
                    pt: { xs: 3, sm: 3.5 },
                    pb: 2.5,
                    background: gradients.pinkPanel,
                    borderBottom: `1px solid rgba(255, 62, 155, 0.12)`
                }}
            >
                <Stack direction="row" sx={{ alignItems: "center", gap: 1.5 }}>
                    <Box
                        aria-hidden="true"
                        sx={{
                            width: 44,
                            height: 44,
                            borderRadius: 3.5,
                            display: "grid",
                            placeItems: "center",
                            background: gradients.brandStrong,
                            color: brand.white
                        }}
                    >
                        <AutoAwesomeRounded />
                    </Box>
                    <Typography variant="h2" component="h1">{isEditMode ? "עריכת זיכרון" : "הוספת זיכרון"}</Typography>
                </Stack>
            </Box>

            <Box component="form" onSubmit={handleSubmit(onSubmit)} sx={{ px: { xs: 2.5, sm: 4 }, py: 3 }}>
                <Stack sx={{ gap: 2.5 }}>
                    <TextField
                        select
                        id="memory-type"
                        label="מה תרצו להוסיף?"
                        slotProps={{ select: { native: true }, inputLabel: { shrink: true } }}
                        {...muiRegister(register("type", {
                            onChange: event => {
                                const selected = event.target.value as MemoryType;
                                const label = memoryTypes.find(item => item.value === selected)?.label ?? "זיכרון";
                                setValue("title", selected === "PHOTO" || selected === "QUOTE" ? label : "");
                                setValue("content", "");
                                setValue("placeUrl", "");
                                setValue("happenedAt", "");
                                setImage(null);
                                setImageError("");
                            }
                        }))}>
                        {memoryTypes.map(item => (<option key={item.value} value={item.value}> {item.label}</option>))}
                    </TextField>

                    {type !== "PHOTO" && type !== "QUOTE" && (
                        <TextField
                            id="memory-title"
                            label={type === "PLACE" ? "שם המקום" : "כותרת"}
                            {...muiRegister(register("title"))}
                            error={Boolean(errors.title)}
                            helperText={errors.title?.message}
                        />
                    )}

                    <TextField
                        id="memory-content"
                        label={type === "PHOTO" ? "תיאור התמונה" : type === "QUOTE" ? "הציטוט" :
                            type === "PLACE" ? "תיאור המקום" : type === "JOKE" ? "מה היה מצחיק?" : "סיכום החוויה"}
                        multiline
                        minRows={4}
                        {...muiRegister(register("content"))}
                        error={Boolean(errors.content)}
                        helperText={errors.content?.message}
                    />

                    {type === "PHOTO" && (
                        <Box
                            sx={{
                                p: 2.5,
                                borderRadius: 4,
                                border: `2px dashed ${imageError ? "#D93A5B" : "rgba(58, 139, 149, 0.35)"}`,
                                background: gradients.mintPanel
                            }}
                        >
                            <Typography component="label" htmlFor="memory-image" sx={{ fontWeight: 600, display: "block", mb: 1.5, color: brand.tealInk }}>
                                העלאת תמונה
                            </Typography>
                            <Stack direction={{ xs: "column", sm: "row" }} sx={{ alignItems: { xs: "flex-start", sm: "center" }, gap: 1.5 }}>
                                <FileUploadButton
                                    id="memory-image"
                                    label="בחירת תמונה"
                                    accept="image/*"
                                    onChange={event => {
                                        const file = event.target.files?.[0] ?? null;
                                        setImage(null);
                                        setImageError("");
                                        if (!file) return;
                                        if (file.size > 2 * 1024 * 1024) {
                                            setImageError("התמונה חייבת להיות עד 2MB");
                                            event.target.value = "";
                                            return;
                                        }
                                        if (!["image/jpeg", "image/png", "image/webp"].includes(file.type)) {
                                            setImageError("יש לבחור תמונה מסוג JPG, PNG או WEBP");
                                            event.target.value = "";
                                            return;
                                        }
                                        setImage(file);
                                    }}
                                />
                                {image && (
                                    <Stack direction="row" sx={{ alignItems: "center", gap: 0.75, color: brand.tealDeep, minWidth: 0 }}>
                                        <InsertPhotoRounded fontSize="small" aria-hidden="true" />
                                        <Typography variant="body2" noWrap sx={{ fontWeight: 500 }}>{image.name}</Typography>
                                    </Stack>
                                )}
                            </Stack>
                            {imageError && <FormHelperText error sx={{ mt: 1 }}>{imageError}</FormHelperText>}
                        </Box>
                    )}

                    {type === "PLACE" && (
                        <TextField
                            id="memory-place-url"
                            type="url"
                            label="קישור למיקום (לא חובה)"
                            {...muiRegister(register("placeUrl"))}
                            placeholder="https://..."
                            error={Boolean(errors.placeUrl)}
                            helperText={errors.placeUrl?.message}
                            slotProps={{ htmlInput: { dir: "ltr" }, inputLabel: { shrink: true } }}
                        />
                    )}
                    {(type === "PHOTO" || type === "PLACE" || type === "SUMMARY") && (
                        <TextField
                            id="memory-date"
                            type="date"
                            label="תאריך הזיכרון (לא חובה)"
                            {...muiRegister(register("happenedAt"))}
                        />
                    )}
                    {mutation.isError && (<Alert severity="error" role="alert">אירעה שגיאה בשמירת הזיכרון </Alert>)}

                    <Stack direction={{ xs: "column-reverse", sm: "row" }} sx={{ gap: 1.5, pt: 1 }}>
                        <Button type="submit" variant="contained" color="primary" size="large" disabled={mutation.isPending} sx={{ flex: { sm: 1 } }}>
                            {mutation.isPending ? "שומר..." : isEditMode ? "שמירת שינויים" : "שמירת זיכרון"}
                        </Button>
                        <Button type="button" variant="outlined" color="secondary" size="large" onClick={onClose} > ביטול </Button>
                    </Stack>
                </Stack>
            </Box>
        </Box>
    );
};

export default NewMemoryPage;
