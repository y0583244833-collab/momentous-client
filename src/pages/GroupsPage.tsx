import { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { Link } from "react-router";
import Grid from "@mui/material/Grid";
import Button from "@mui/material/Button";
import AddRounded from "@mui/icons-material/AddRounded";
import Diversity3Rounded from "@mui/icons-material/Diversity3Rounded";
import { getGroups } from "../api/groupsApi";
import GroupCard from "../components/GroupCard";
import GroupsFilters from "../components/GroupsFilters";
import type { GroupFilters } from "../types/group.types";
import PageContainer from "../components/ui/PageContainer";
import PageHeader from "../components/ui/PageHeader";
import LoadingState from "../components/ui/LoadingState";
import ErrorState from "../components/ui/ErrorState";
import EmptyState from "../components/ui/EmptyState";
import PaginationBar from "../components/ui/PaginationBar";

const GroupsPage = () => {
    const [filters, setFilters] = useState<GroupFilters>({
        sort: "lastActivity",
        order: "desc",
        page: 1,
        limit: 12
    });

    const { data, isPending, isError, error } = useQuery({
        queryKey: ["groups", filters],
        queryFn: () => getGroups(filters),
    });
    return (
        <PageContainer>
            <PageHeader
                eyebrow="Momentous"
                title="הקבוצות שלי"
                actions={
                    <Button
                        component={Link}
                        to="/groups/new"
                        variant="contained"
                        color="primary"
                        size="large"
                        startIcon={<AddRounded />}
                    >
                        יצירת קבוצה חדשה
                    </Button>
                }
            />
            <GroupsFilters filters={filters} onFiltersChange={setFilters} />
            {isPending ? (<LoadingState message="אנחנו טוענים את הקבוצות שלך..." />
            ) : isError ? (<ErrorState message={<>שגיאה בטעינת הקבוצות: {error.message}</>} />
            ) : data.items.length === 0 ? (<EmptyState icon={<Diversity3Rounded />} message="לא נמצאו קבוצות מתאימות" />
            ) : (
                <Grid container spacing={{ xs: 2.5, md: 3 }}>
                    {data.items.map((group) => (
                        <Grid key={group.id} size={{ xs: 12, sm: 6, lg: 4 }}>
                            <GroupCard group={group} />
                        </Grid>
                    ))}
                </Grid>
            )}
            {data && data.totalPages > 1 && (
                <PaginationBar
                    label={<>עמוד {data.page} מתוך {data.totalPages} </>}
                    prevDisabled={data.page <= 1}
                    nextDisabled={data.page >= data.totalPages}
                    onPrev={() =>
                        setFilters({
                            ...filters,
                            page: data.page - 1
                        })
                    }
                    onNext={() =>
                        setFilters({ ...filters, page: data.page + 1 })
                    }
                />
            )}
        </PageContainer>
    );
};

export default GroupsPage;
