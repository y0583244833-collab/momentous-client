import { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import Box from "@mui/material/Box";
import Dialog from "@mui/material/Dialog";
import DialogContent from "@mui/material/DialogContent";
import useMediaQuery from "@mui/material/useMediaQuery";
import { useTheme } from "@mui/material/styles";
import AutoStoriesRounded from "@mui/icons-material/AutoStoriesRounded";
import { getMemories } from "../api/memoriesApi";
import type { Memory } from "../types/memory.types";
import MemoryCard from "./MemoryCard";
import NewMemoryPage from "../pages/NewMemoryPage";
import LoadingState from "./ui/LoadingState";
import ErrorState from "./ui/ErrorState";
import EmptyState from "./ui/EmptyState";
import PaginationBar from "./ui/PaginationBar";

interface MemoriesSectionProps {
    groupId: string;
}
const MemoriesSection = ({ groupId }: MemoriesSectionProps) => {
    const [page, setPage] = useState(1);
    const [editingMemory, setEditingMemory] = useState<Memory | null>(null);
    const theme = useTheme();
    const fullScreenDialog = useMediaQuery(theme.breakpoints.down("sm"));

    const { data, isPending, isError } = useQuery({
        queryKey: ["memories", groupId, page],
        queryFn: () => getMemories(groupId, page)
    });

    if (isPending) {
        return <LoadingState compact message="טוענים זיכרונות..." />;
    }

    if (isError) {
        return <ErrorState message="לא הצלחנו לטעון את הזיכרונות." />;
    }

    return (
        <Box component="section" aria-label="הזיכרונות שלנו">
            {data.items.length === 0 ? (
                <EmptyState icon={<AutoStoriesRounded />} message="עדיין לא נוספו זיכרונות לקבוצה." />
            ) : (
                // לוח זיכרונות בסגנון "מזונרי" - עמודות שמתמלאות לפי גובה הכרטיסים
                <Box
                    sx={{
                        columnCount: { xs: 1, sm: 2, lg: 3 },
                        columnGap: { xs: 2, md: 3 },
                        "& > *": { breakInside: "avoid", mb: { xs: 2, md: 3 } }
                    }}
                >
                    {data.items.map(memory => (
                        <Box key={memory.id}>
                            <MemoryCard
                                memory={memory}
                                onEdit={setEditingMemory}
                            />
                        </Box>
                    ))}
                </Box>
            )}
            {data.totalPages > 1 && (
                <PaginationBar
                    label={<>עמוד {page} מתוך {data.totalPages}</>}
                    prevDisabled={page === 1}
                    nextDisabled={page >= data.totalPages}
                    onPrev={() => setPage(page - 1)}
                    onNext={() => setPage(page + 1)}
                />
            )}
            {editingMemory && (
                <Dialog
                    open
                    fullWidth
                    maxWidth="sm"
                    fullScreen={fullScreenDialog}
                    scroll="paper"
                    slotProps={{ paper: { "aria-label": "עריכת זיכרון" } }}
                >
                    <DialogContent sx={{ p: 0 }}>
                        <NewMemoryPage
                            key={editingMemory.id}
                            memory={editingMemory}
                            onClose={() => setEditingMemory(null)}
                        />
                    </DialogContent>
                </Dialog>
            )}
        </Box>
    );
};

export default MemoriesSection;
