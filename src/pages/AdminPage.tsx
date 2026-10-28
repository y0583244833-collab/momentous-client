import { getAdminGroups, getAdminUsers } from "../api/adminApi"
import AdminGroupsSection from "../components/admin/AdminGroupSection";
import { useQuery } from "@tanstack/react-query";
import AdminUsersTable from "../components/admin/AdminUsersTable";
import AdminStats from "../components/admin/AdminStats";
import { getAdminStats } from "../api/adminApi";
import PageContainer from "../components/ui/PageContainer";
import PageHeader from "../components/ui/PageHeader";
import LoadingState from "../components/ui/LoadingState";
import ErrorState from "../components/ui/ErrorState";
const AdminPage = () => {

    const usersQuery = useQuery({
        queryKey: ["admin", "users"],
        queryFn: () => getAdminUsers()
    });

    const groupsQuery = useQuery({
        queryKey: ["admin", "groups"],
        queryFn: () => getAdminGroups()
    });
    const statsQuery = useQuery({
        queryKey: ["admin", "stats"],
        queryFn: getAdminStats
    });

    if (usersQuery.isPending || groupsQuery.isPending || statsQuery.isPending
    ) {
        return <PageContainer><LoadingState message="טוען נתוני ניהול..." /></PageContainer>;
    }
    if (usersQuery.isError || groupsQuery.isError || statsQuery.isError
    ) {
        return <PageContainer><ErrorState message="אירעה שגיאה בטעינת נתוני הניהול" /></PageContainer>;
    }

    return (

        <PageContainer>
            <PageHeader eyebrow="Momentous" title="ניהול המערכת" />

            <AdminStats usersCount={statsQuery.data.usersCount} groupsCount={statsQuery.data.groupsCount} memoriesCount={statsQuery.data.memoriesCount} />

            <AdminUsersTable users={usersQuery.data.items} />

            <AdminGroupsSection groups={groupsQuery.data.items} />
        </PageContainer>
    );

};



export default AdminPage;
