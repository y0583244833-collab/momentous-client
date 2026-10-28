import Grid from "@mui/material/Grid";
import Diversity3Rounded from "@mui/icons-material/Diversity3Rounded";
import type { Group } from "../../types/group.types";
import GroupCard from "../GroupCard";
import SectionCard from "../ui/SectionCard";
import EmptyState from "../ui/EmptyState";

type Props = {
    groups: Group[];
};

const AdminGroupsSection = ({ groups }: Props) => {
    return (
        <SectionCard title="ניהול קבוצות" icon={<Diversity3Rounded />} tone="mint" sx={{ p: { xs: 2, md: 3.5 } }}>

            {groups.length === 0 ? (<EmptyState icon={<Diversity3Rounded />} message="אין קבוצות להצגה" />
            ) : (
                <Grid container spacing={{ xs: 2.5, md: 3 }}>
                    {groups.map((group) => (
                       <Grid key={group.id} size={{ xs: 12, sm: 6, lg: 4 }}>
                           <GroupCard group={group} isAdmin={true} />
                       </Grid>
                    ))}
                </Grid>
            )}
        </SectionCard>
    );
};

export default AdminGroupsSection;
