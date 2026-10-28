import type { AdminUser } from "../../types/admin.types";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { setUserBlocked } from "../../api/adminApi";
import { useState } from "react";
import Box from "@mui/material/Box";
import Stack from "@mui/material/Stack";
import Typography from "@mui/material/Typography";
import Table from "@mui/material/Table";
import TableHead from "@mui/material/TableHead";
import TableBody from "@mui/material/TableBody";
import TableRow from "@mui/material/TableRow";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import Avatar from "@mui/material/Avatar";
import Chip from "@mui/material/Chip";
import Button from "@mui/material/Button";
import Alert from "@mui/material/Alert";
import BlockRounded from "@mui/icons-material/BlockRounded";
import LockOpenRounded from "@mui/icons-material/LockOpenRounded";
import ManageAccountsRounded from "@mui/icons-material/ManageAccountsRounded";
import SectionCard from "../ui/SectionCard";
import { brand } from "../../theme/tokens";
type Props = {
    users: AdminUser[];
};

const AdminUsersTable = ({ users }: Props) => {
    const queryClient = useQueryClient();
    const [actionError, setActionError] = useState("");

    const blockMutation = useMutation({
        mutationFn: ({ userId, isBlocked }
            : { userId: string, isBlocked: boolean }) => setUserBlocked(userId, isBlocked),
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ["admin", "users"] });
        },
        onError: () => {
            setActionError("לא ניתן לעדכן את מצב המשתמש");
        }
    });
       const regularUsers = users.filter(user => user.role === "USER");
    return (
        <SectionCard title="ניהול משתמשים" icon={<ManageAccountsRounded />} sx={{ mb: 4, p: { xs: 2, md: 3.5 } }}>
            {actionError && (<Alert severity="error" role="alert" sx={{ mb: 2 }}>{actionError}</Alert>)}
            <TableContainer sx={{ borderRadius: 4, border: "1px solid rgba(58, 139, 149, 0.14)" }}>
            <Table sx={{ minWidth: 720 }}>
                <TableHead>
                    <TableRow>
                        <TableCell>משתמש</TableCell>
                        <TableCell align="center">קבוצות שיצר</TableCell>
                        <TableCell align="center">קבוצות שהצטרף</TableCell>
                        <TableCell align="center">זיכרונות</TableCell>
                        <TableCell align="center">סטטוס</TableCell>
                        <TableCell align="center">פעולות</TableCell>
                    </TableRow>
                </TableHead>

                <TableBody>
                    {regularUsers.map((user) => (
                        <TableRow key={user.id} hover>
                            <TableCell>
                                <Stack direction="row" sx={{ alignItems: "center", gap: 1.5 }}>
                                    <Avatar src={user.avatarUrl ?? undefined} alt="" sx={{ width: 38, height: 38 }}>
                                        {user.fullName.charAt(0)}
                                    </Avatar>
                                    <Box sx={{ minWidth: 0 }}>
                                        <Typography component="strong" sx={{ fontWeight: 600, display: "block" }}>{user.fullName}</Typography>
                                        <Typography variant="body2" color="text.secondary" sx={{ direction: "ltr", textAlign: "left" }}>{user.email}</Typography>
                                    </Box>
                                </Stack>
                            </TableCell>
                            <TableCell align="center">{user.boardsCreated}</TableCell>
                            <TableCell align="center">{user.boardsJoined}</TableCell>
                            <TableCell align="center">{user.memoriesCount}</TableCell>
                            <TableCell align="center">
                                <Chip
                                    size="small"
                                    label={user.isBlocked ? "חסום" : "פעיל"}
                                    sx={user.isBlocked
                                        ? { backgroundColor: brand.pinkMist, color: "error.dark" }
                                        : { backgroundColor: brand.mintMist, color: brand.tealInk }}
                                />
                            </TableCell>
                            <TableCell align="center">
                                <Button
                                    type="button" disabled={blockMutation.isPending }
                                    size="small"
                                    variant="outlined"
                                    color={user.isBlocked ? "secondary" : "primary"}
                                    startIcon={user.isBlocked ? <LockOpenRounded /> : <BlockRounded />}
                                    sx={{ whiteSpace: "nowrap" }}
                                    onClick={() => {
                                        setActionError("");
                                        blockMutation.mutate({ userId: user.id, isBlocked: !user.isBlocked });
                                    }} >
                                    {blockMutation.isPending && blockMutation.variables?.userId === user.id
                                        ? "מעדכן..." : user.isBlocked ? "ביטול חסימה" : "חסימה"}
                                </Button>
                            </TableCell>
                        </TableRow>
                    ))}
                </TableBody>
            </Table>
            </TableContainer>
        </SectionCard>
    );
};

export default AdminUsersTable;
