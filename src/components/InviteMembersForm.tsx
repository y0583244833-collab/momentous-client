import { useState } from "react";
import { useMutation } from "@tanstack/react-query";
import { useForm, useFieldArray } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import Box from "@mui/material/Box";
import Stack from "@mui/material/Stack";
import Typography from "@mui/material/Typography";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import IconButton from "@mui/material/IconButton";
import Tooltip from "@mui/material/Tooltip";
import Alert from "@mui/material/Alert";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemText from "@mui/material/ListItemText";
import AddRounded from "@mui/icons-material/AddRounded";
import SendRounded from "@mui/icons-material/SendRounded";
import DeleteOutlineRounded from "@mui/icons-material/DeleteOutlineRounded";
import CheckCircleRounded from "@mui/icons-material/CheckCircleRounded";
import InfoRounded from "@mui/icons-material/InfoRounded";
import GroupAddRounded from "@mui/icons-material/GroupAddRounded";
import { inviteMembers } from "../api/invitationsApi";
import type { InviteMembersResponse } from "../types/invitation.types";
import { emailsSchema } from "../validation/schemas"
import { muiRegister } from "../utils/muiRegister";
import { brand, gradients } from "../theme/tokens";
interface Props {
    groupId: string;
}

interface FormValues {
    participants: { email: string }[];
}

const InviteMembersForm = ({ groupId }: Props) => {
    const [result, setResult] = useState<InviteMembersResponse | null>(null);
    const [duplicateError, setDuplicateError] = useState("");
    const {
        register,
        control,
        handleSubmit,
        reset,
        formState: { errors }
    } = useForm<FormValues>({
        resolver: yupResolver(emailsSchema),
        defaultValues: {
            participants: [{ email: "" }]
        }
    });

    const { fields, append, remove } = useFieldArray({
        control,
        name: "participants"
    });

    const mutation = useMutation({
        mutationFn: (emails: string[]) =>
            inviteMembers(groupId, { emails }),

        onSuccess: (data) => {
            setResult(data);
            reset();
        }
    });

    const onSubmit = (data: FormValues) => {
        setResult(null);
        setDuplicateError("");

        const emails = data.participants.map(
            participant => participant.email.trim().toLowerCase()
        );

        if (new Set(emails).size !== emails.length) {
            setDuplicateError("אותה כתובת אימייל מופיעה יותר מפעם אחת.");
            return;
        }

        mutation.mutate(emails);
    };

    return (
        <Box dir="rtl">
            <Stack direction="row" sx={{ alignItems: "center", gap: 1.5, mb: 3 }}>
                <Box
                    aria-hidden="true"
                    sx={{
                        width: 44,
                        height: 44,
                        borderRadius: 3.5,
                        display: "grid",
                        placeItems: "center",
                        background: gradients.tealButton,
                        color: brand.white
                    }}
                >
                    <GroupAddRounded />
                </Box>
                <Typography variant="h2">הזמנת משתתפים</Typography>
            </Stack>

            <Box component="form" onSubmit={handleSubmit(onSubmit)}>
                <Stack sx={{ gap: 2 }}>
                    {fields.map((field, index) => (
                        <Stack direction="row" key={field.id} sx={{ alignItems: "flex-start", gap: 1 }}>
                            <TextField
                                id={`email-${index}`}
                                type="email"
                                label={`אימייל משתתף ${index + 1}`}
                                {...muiRegister(register(`participants.${index}.email`))}
                                error={Boolean(errors.participants?.[index]?.email)}
                                helperText={errors.participants?.[index]?.email?.message}
                                slotProps={{ htmlInput: { dir: "ltr" }, inputLabel: { shrink: true } }}
                            />

                            {fields.length > 1 && (
                                <Tooltip title="הסרה">
                                    <IconButton
                                        type="button"
                                        aria-label="הסרה"
                                        onClick={() => remove(index)}
                                        sx={{ mt: 1, color: "error.main", backgroundColor: brand.pinkWhisper, "&:hover": { backgroundColor: brand.pinkMist } }}
                                    >
                                        <DeleteOutlineRounded />
                                    </IconButton>
                                </Tooltip>
                            )}
                        </Stack>
                    ))}

                    <Button
                        type="button"
                        variant="outlined"
                        color="secondary"
                        startIcon={<AddRounded />}
                        onClick={() => append({ email: "" })}
                        disabled={fields.length >= 20}
                        sx={{ alignSelf: "flex-start" }}
                    >הוספת משתתף
                    </Button>

                    {fields.length >= 20 && (<Alert severity="info">אפשר להזמין עד 20 משתתפים בכל שליחה.</Alert>)}

                    {duplicateError && (<Alert severity="error" role="alert">{duplicateError}</Alert>)}

                    <Button
                        type="submit"
                        variant="contained"
                        color="primary"
                        size="large"
                        endIcon={<SendRounded sx={{ transform: "scaleX(-1)" }} />}
                        disabled={mutation.isPending}
                    >
                        {mutation.isPending ? "שולח הזמנות..." : "שליחת הזמנות"}
                    </Button>
                </Stack>
            </Box>

            {mutation.isError && (<Alert severity="error" role="alert" sx={{ mt: 2 }}>שליחת ההזמנות נכשלה.</Alert>)}

            {result && (
                <Box sx={{ mt: 2.5, p: 2, borderRadius: 4, background: gradients.mintPanel }}>
                    <Typography sx={{ fontWeight: 700, color: brand.tealInk }}>נשלחו {result.invitedCount} הזמנות.</Typography>

                    <List dense disablePadding sx={{ mt: 1 }}>
                        {result.results.map(item => (
                            <ListItem key={item.email} disableGutters>
                                <ListItemIcon sx={{ minWidth: 34 }}>
                                    {item.result === "INVITED"
                                        ? <CheckCircleRounded sx={{ color: "success.main" }} />
                                        : <InfoRounded sx={{ color: brand.teal }} />}
                                </ListItemIcon>
                                <ListItemText
                                    primary={<>{item.email}:{" "}
                                        {item.result === "INVITED"
                                            ? "הוזמן בהצלחה"
                                            : item.result === "ALREADY_MEMBER"
                                                ? "כבר חבר בקבוצה"
                                                : `סטטוס: ${item.result}`}
                                    </>}
                                />
                            </ListItem>
                        ))}
                    </List>
                </Box>
            )}
        </Box>
    );

};

export default InviteMembersForm;
