import { useMutation, useQueryClient } from "@tanstack/react-query";
import Card from "@mui/material/Card";
import CardMedia from "@mui/material/CardMedia";
import CardContent from "@mui/material/CardContent";
import Box from "@mui/material/Box";
import Stack from "@mui/material/Stack";
import Chip from "@mui/material/Chip";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";
import Divider from "@mui/material/Divider";
import Alert from "@mui/material/Alert";
import FavoriteRounded from "@mui/icons-material/FavoriteRounded";
import FavoriteBorderRounded from "@mui/icons-material/FavoriteBorderRounded";
import PlaceRounded from "@mui/icons-material/PlaceRounded";
import EventRounded from "@mui/icons-material/EventRounded";
import EditRounded from "@mui/icons-material/EditRounded";
import DeleteOutlineRounded from "@mui/icons-material/DeleteOutlineRounded";
import FormatQuoteRounded from "@mui/icons-material/FormatQuoteRounded";
import { alpha } from "@mui/material/styles";
import type { Memory, MemoryType } from "../types/memory.types";
import { likeMemory, unlikeMemory, deleteMemory } from "../api/memoriesApi";
import { brand, liftShadow } from "../theme/tokens";

interface MemoryCardProps {
    memory: Memory;
    onEdit: (memory: Memory) => void;
}

// צבע מבטא לכל סוג זיכרון - עיצוב בלבד
const typeAccent: Record<MemoryType, { color: string; soft: string; ink: string }> = {
    PHOTO: { color: brand.pink, soft: brand.pinkMist, ink: brand.pinkInk },
    PLACE: { color: brand.teal, soft: brand.aquaMist, ink: brand.tealInk },
    SUMMARY: { color: brand.mint, soft: brand.mintMist, ink: brand.tealInk },
    JOKE: { color: brand.pinkSoft, soft: brand.pinkWhisper, ink: brand.pinkInk },
    QUOTE: { color: brand.tealDeep, soft: brand.mintWhisper, ink: brand.tealInk }
};

const MemoryCard = ({ memory, onEdit }: MemoryCardProps) => {
    const queryClient = useQueryClient();
    const likeMutation = useMutation({
        mutationFn: () => {
            return memory.likedByMe ? unlikeMemory(memory.id) : likeMemory(memory.id);
        },
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ["memories", memory.boardId] });
        }
    });
    const deleteMutation = useMutation({
        mutationFn: () => deleteMemory(memory.id),
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ["memories", memory.boardId] });
            queryClient.invalidateQueries({ queryKey: ["group", memory.boardId] });
            queryClient.invalidateQueries({ queryKey: ["groups"] });
        }
    });
    const accent = typeAccent[memory.type] ?? typeAccent.SUMMARY;

    return (
        <Card
            component="article"
            dir="rtl"
            sx={{
                position: "relative",
                transition: "transform .25s ease, box-shadow .25s ease",
                borderTop: `5px solid ${accent.color}`,
                "&:hover": { transform: "translateY(-3px)", boxShadow: liftShadow }
            }}
        >
            {memory.imageUrl && (
                <CardMedia
                    component="img"
                    image={memory.imageUrl}
                    alt={memory.title}
                    sx={{ maxHeight: 340, objectFit: "cover" }}
                />
            )}

            <CardContent sx={{ p: 2.5, "&:last-child": { pb: 2.5 } }}>
                <Chip
                    label={memory.typeLabel}
                    size="small"
                    sx={{ mb: 1.25, backgroundColor: accent.soft, color: accent.ink }}
                />
                <Typography variant="h3" component="h3" sx={{ mb: 1 }}>{memory.title}</Typography>

                {memory.type === "QUOTE" ? (
                    <Box
                        sx={{
                            position: "relative",
                            p: 2,
                            pl: 5,
                            borderRadius: 4,
                            backgroundColor: accent.soft
                        }}
                    >
                        <FormatQuoteRounded
                            aria-hidden="true"
                            sx={{ position: "absolute", top: 10, left: 10, color: alpha(accent.color, 0.5) }}
                        />
                        <Typography sx={{ fontSize: "1.05rem", fontWeight: 500, whiteSpace: "pre-line", color: accent.ink }}>
                            {memory.content}
                        </Typography>
                    </Box>
                ) : (
                    <Typography color="text.primary" sx={{ whiteSpace: "pre-line" }}>{memory.content}</Typography>
                )}

                {(memory.placeUrl || memory.happenedAt) && (
                    <Stack direction="row" sx={{ alignItems: "center", gap: 1.5, flexWrap: "wrap", mt: 1.5 }}>
                        {memory.placeUrl && (
                            <Button
                                component="a"
                                href={memory.placeUrl}
                                target="_blank"
                                size="small"
                                variant="outlined"
                                color="secondary"
                                startIcon={<PlaceRounded />}
                            >צפייה במיקום</Button>
                        )}
                        {memory.happenedAt && (
                            <Stack direction="row" sx={{ alignItems: "center", gap: 0.75, color: "text.secondary" }}>
                                <EventRounded aria-hidden="true" sx={{ fontSize: 18, color: brand.teal }} />
                                <Typography variant="body2"><strong>תאריך הזיכרון: </strong>{new Date(memory.happenedAt).toLocaleDateString("he-IL")}</Typography>
                            </Stack>
                        )}
                    </Stack>
                )}

                <Divider sx={{ my: 2, borderStyle: "dashed" }} />

                <Stack direction="row" sx={{ alignItems: "center", justifyContent: "space-between", gap: 1.5, flexWrap: "wrap" }}>
                    <Box>
                        <Typography variant="body2"><strong>נוצר על ידי: </strong>{memory.author.fullName}</Typography>
                        <Typography variant="body2" color="text.secondary"><strong>תאריך יצירה: </strong>{new Date(memory.createdAt).toLocaleDateString("he-IL")}</Typography>
                    </Box>

                    <Stack direction="row" sx={{ alignItems: "center", gap: 1 }}>
                        <Button
                            type="button"
                            size="small"
                            onClick={() => likeMutation.mutate()}
                            disabled={likeMutation.isPending}
                            aria-pressed={memory.likedByMe}
                            variant={memory.likedByMe ? "contained" : "outlined"}
                            color="primary"
                            startIcon={memory.likedByMe ? <FavoriteRounded /> : <FavoriteBorderRounded />}
                        >
                            {memory.likedByMe ? "אהבתי" : "לייק"}
                        </Button>
                        <Typography component="span" variant="body2" sx={{ fontWeight: 600, color: brand.pinkDeep, whiteSpace: "nowrap" }}>
                            {memory.likesCount} לייקים
                        </Typography>
                    </Stack>
                </Stack>

                {likeMutation.isError && (<Alert severity="error" role="alert" sx={{ mt: 1.5 }}>לא הצלחנו לעדכן את הלייק. נסי שוב.</Alert>)}

                {memory.isMine && (
                    <Stack
                        direction="row"
                        sx={{ gap: 1, mt: 2, pt: 1.5, borderTop: `1px solid ${alpha(brand.teal, 0.1)}` }}
                    >
                        <Button type="button" size="small" color="secondary" startIcon={<EditRounded />} onClick={() => onEdit(memory)}>עריכת זיכרון</Button>
                        <Button
                            type="button"
                            size="small"
                            color="error"
                            startIcon={<DeleteOutlineRounded />}
                            onClick={() => deleteMutation.mutate()}
                            disabled={deleteMutation.isPending}
                        > {deleteMutation.isPending ? "מוחק..." : "מחיקת זיכרון"} </Button>
                    </Stack>
                )}
                {deleteMutation.isError && (<Alert severity="error" role="alert" sx={{ mt: 1.5 }}>לא הצלחנו למחוק את הזיכרון. נסי שוב.</Alert>)}
            </CardContent>
        </Card>
    );
};
export default MemoryCard;
