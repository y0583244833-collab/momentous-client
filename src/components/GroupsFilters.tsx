import Paper from "@mui/material/Paper";
import Grid from "@mui/material/Grid";
import TextField from "@mui/material/TextField";
import MenuItem from "@mui/material/MenuItem";
import InputAdornment from "@mui/material/InputAdornment";
import SearchRounded from "@mui/icons-material/SearchRounded";
import { alpha } from "@mui/material/styles";
import type { GroupFilters, EventType } from "../types/group.types";
import { brand, gradients } from "../theme/tokens";

interface GroupsFiltersProps {
    filters: GroupFilters;
    onFiltersChange: (filters: GroupFilters) => void;
}

const GroupsFilters = ({filters,onFiltersChange}: GroupsFiltersProps) => {
    return (
        <Paper
            sx={{
                p: { xs: 2, md: 2.5 },
                mb: 4,
                borderRadius: 6,
                background: gradients.mintPanel,
                border: `1px solid ${alpha(brand.teal, 0.16)}`
            }}
        >
            <Grid container spacing={2}>
                <Grid size={{ xs: 12, md: 6 }}>
                    <TextField
                        type="search" placeholder="חיפוש קבוצה..." value={filters.q ?? ""}
                        onChange={(e) =>
                            onFiltersChange({...filters, q: e.target.value, page: 1})
                        }
                        slotProps={{
                            htmlInput: { "aria-label": "חיפוש קבוצה" },
                            input: {
                                startAdornment: (
                                    <InputAdornment position="start">
                                        <SearchRounded sx={{ color: brand.teal }} />
                                    </InputAdornment>
                                )
                            }
                        }}
                    />
                </Grid>
                <Grid size={{ xs: 12, sm: 4, md: 2 }}>
                    <TextField
                        select
                        label="קבוצות"
                        value={filters.role ?? "all"}
                        onChange={(e) =>
                            onFiltersChange({...filters,
                                role: e.target.value === "all"? undefined: e.target.value as GroupFilters["role"],
                                page: 1
                            })
                        }
                    >
                        <MenuItem value="all">כל הקבוצות</MenuItem>
                        <MenuItem value="created">קבוצות שיצרתי</MenuItem>
                        <MenuItem value="joined">קבוצות שהצטרפתי</MenuItem>
                    </TextField>
                </Grid>

                <Grid size={{ xs: 12, sm: 4, md: 2 }}>
                    <TextField
                        select
                        label="סוג אירוע"
                        value={filters.eventType ?? "all"}
                        onChange={(e) =>
                            onFiltersChange({...filters,eventType: e.target.value === "all"
                                    ? undefined: e.target.value as EventType, page: 1
                            })
                        }
                    >
                        <MenuItem value="all">כל סוגי האירועים</MenuItem>
                        <MenuItem value="TRIP">טיול</MenuItem>
                        <MenuItem value="GRADUATION">סיום לימודים</MenuItem>
                        <MenuItem value="CAMP">מחנה</MenuItem>
                        <MenuItem value="FAMILY">משפחה</MenuItem>
                        <MenuItem value="OTHER">אחר</MenuItem>
                    </TextField>
                </Grid>

                <Grid size={{ xs: 12, sm: 4, md: 2 }}>
                    <TextField
                        select
                        label="מיון לפי"
                        value={filters.sort ?? "lastActivity"}
                        onChange={(e) => {
                            const sort = e.target.value as GroupFilters["sort"];

                            onFiltersChange({...filters,sort, order: sort === "name" ? "asc" : "desc",page: 1
                            });
                        }}
                    >
                        <MenuItem value="lastActivity">פעילות אחרונה</MenuItem>
                        <MenuItem value="eventDate">תאריך האירוע</MenuItem>
                        <MenuItem value="name">שם הקבוצה</MenuItem>
                    </TextField>
                </Grid>
            </Grid>
        </Paper>
    );
};
export default GroupsFilters;
