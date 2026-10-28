
import { useEffect, useState } from "react";
import { useForm, useWatch } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { useNavigate, useParams } from "react-router";
import { useQuery, useQueryClient } from "@tanstack/react-query";
import axios from "axios";
import * as yup from "yup";
import { groupSchema, emailSchema, type GroupFormValues } from "../validation/schemas";
import { createGroup, getGroupById, updateGroup } from "../api/groupsApi";
import { uploadImage } from "../api/imageApi";
import GroupInvitations from "../components/GroupInvitations";
import GroupImagePreview from "../components/GroupImagePreview"
import GroupFormActions from "../components/GroupFormActions";
import Grid from "@mui/material/Grid";
import Stack from "@mui/material/Stack";
import Box from "@mui/material/Box";
import TextField from "@mui/material/TextField";
import Alert from "@mui/material/Alert";
import FormHelperText from "@mui/material/FormHelperText";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";
import EditNoteRounded from "@mui/icons-material/EditNoteRounded";
import AddPhotoAlternateRounded from "@mui/icons-material/AddPhotoAlternateRounded";
import ArrowForwardRounded from "@mui/icons-material/ArrowForwardRounded";
import { Link } from "react-router";
import PageContainer from "../components/ui/PageContainer";
import PageHeader from "../components/ui/PageHeader";
import SectionCard from "../components/ui/SectionCard";
import LoadingState from "../components/ui/LoadingState";
import ErrorState from "../components/ui/ErrorState";
import FileUploadButton from "../components/ui/FileUploadButton";
import { muiRegister } from "../utils/muiRegister";
//חייבת להבין
const NewGroupPage = () => {
        const navigate = useNavigate();
        const { groupId } = useParams();
        const isEditMode = Boolean(groupId);
        const queryClient = useQueryClient();

        const [emailInput, setEmailInput] = useState("");
        const [emailError, setEmailError] = useState("");
        const [submitError, setSubmitError] = useState("");
        const [imagePreview, setImagePreview] = useState<string | null>(null);
        const [removeCoverImage, setRemoveCoverImage] = useState(false);
        const { data: group, isPending, isError } = useQuery({
                queryKey: ["group", groupId],
                queryFn: () => getGroupById(groupId!),
                enabled: isEditMode
        });

        const {
                register, control, setValue, getValues, reset,
                handleSubmit, formState: { errors, isSubmitting }
        } = useForm<GroupFormValues>({
                resolver: yupResolver(groupSchema),
                mode: "onBlur",
                defaultValues: {
                        name: "", description: "", eventType: "TRIP",
                        eventDate: "", emails: [], coverImage: null
                }
        });

        const emails = useWatch({ control, name: "emails" }) ?? [];
        const coverImage = useWatch({ control, name: "coverImage" });

        useEffect(() => {
                if (!isEditMode || !group) return;
                reset({
                        name: group.name,
                        description: group.description ?? "",
                        eventType: group.eventType,
                        eventDate: group.eventDate.slice(0, 10),
                        emails: [],
                        coverImage: null
                });
        }, [isEditMode, group, reset]);

        useEffect(() => {
                if (!coverImage) {
                        setImagePreview(isEditMode && !removeCoverImage ? group?.coverImageUrl ?? null
                                : null
                        ); return;
                }
                const url = URL.createObjectURL(coverImage);
                setImagePreview(url);
                return () => URL.revokeObjectURL(url);
        }, [coverImage, isEditMode, group?.coverImageUrl, removeCoverImage]);

        const addEmail = async () => {
                setEmailError("");

                try {
                        const email = await emailSchema.validate(emailInput);
                        const emails = getValues("emails");

                        if (emails.includes(email)) {
                                setEmailError("האימייל כבר נמצא ברשימה");
                                return;
                        }
                        if (emails.length >= 20) {
                                setEmailError("אפשר להזמין עד 20 משתתפים");
                                return;
                        }
                        setValue("emails", [...emails, email], {
                                shouldValidate: true,
                                shouldDirty: true
                        });

                        setEmailInput("");
                } catch (error) {
                        if (error instanceof yup.ValidationError) {
                                setEmailError(error.message);
                        }
                }
        };
        const removeEmail = (email: string) => {
                setValue("emails", getValues("emails").filter(e => e !== email));
                setEmailError("");
        };

        const onSubmit = async (data: GroupFormValues) => {
                setSubmitError("");
                try {
                        let coverImageId: string | undefined;
                        if (data.coverImage) {
                                const image = await uploadImage(data.coverImage);
                                coverImageId = image.id;
                        }

                        const savedGroup = isEditMode && groupId
                                ? await updateGroup(groupId, {
                                        name: data.name,
                                        description: data.description?.trim() || null,
                                        eventType: data.eventType,
                                        eventDate: data.eventDate,
                                        ...(coverImageId
                                                ? { coverImageId }
                                                : removeCoverImage
                                                        ? { coverImageId: null }
                                                        : {})
                                })
                                : await createGroup({
                                        name: data.name,
                                        description: data.description || undefined,
                                        eventType: data.eventType,
                                        eventDate: data.eventDate,
                                        coverImageId,
                                        emails: data.emails
                                });

                        await queryClient.invalidateQueries({ queryKey: ["groups"] });
                        await queryClient.invalidateQueries({
                                queryKey: ["group", savedGroup.id]
                        });
                        navigate(`/groups/${savedGroup.id}`);
                } catch (error) {
                        if (axios.isAxiosError(error)) {
                                setSubmitError(
                                        error.response?.data?.error?.message ??
                                        error.response?.data?.message ??
                                        "שמירת הקבוצה נכשלה"
                                );
                        } else {
                                setSubmitError("אירעה שגיאה בלתי צפויה");
                        }
                }
        };

        const backButton = (
                <Button component={Link} to="/groups" variant="outlined" color="secondary" startIcon={<ArrowForwardRounded />}>
                        חזרה לקבוצות
                </Button>
        );

        if (isEditMode && isPending) return <PageContainer><LoadingState message="טוען פרטי קבוצה..." /></PageContainer>;
        if (isEditMode && isError) return <PageContainer><ErrorState message="שגיאה בטעינת הקבוצה" action={backButton} /></PageContainer>;
        if (isEditMode && group && !group.isCreator)
                return <PageContainer><ErrorState message="אין לך הרשאה לערוך קבוצה זו" action={backButton} /></PageContainer>;

        return (
                <Box dir="rtl">
                <PageContainer maxWidth="lg">
                        <Box component="header">
                                <PageHeader
                                        eyebrow={isEditMode ? group?.name : "Momentous"}
                                        title={isEditMode ? "עריכת קבוצה" : "יצירת קבוצה חדשה"}
                                />
                        </Box>

                        <Box component="form" onSubmit={handleSubmit(onSubmit)}>
                                <Grid container spacing={3}>
                                        <Grid size={{ xs: 12, md: 7 }}>
                                                <SectionCard title="פרטי הקבוצה" icon={<EditNoteRounded />}>
                                                        <Stack sx={{ gap: 2.5 }}>
                                                                <TextField
                                                                        id="name"
                                                                        label="שם הקבוצה *"
                                                                        {...muiRegister(register("name"))}
                                                                        error={Boolean(errors.name)}
                                                                        helperText={errors.name?.message}
                                                                />

                                                                <TextField
                                                                        id="description"
                                                                        label="תיאור הקבוצה"
                                                                        multiline
                                                                        rows={4}
                                                                        {...muiRegister(register("description"))}
                                                                        error={Boolean(errors.description)}
                                                                        helperText={errors.description?.message}
                                                                />

                                                                <Stack direction={{ xs: "column", sm: "row" }} sx={{ gap: 2.5 }}>
                                                                        <TextField
                                                                                id="eventType"
                                                                                select
                                                                                label="סוג האירוע *"
                                                                                slotProps={{ select: { native: true }, inputLabel: { shrink: true } }}
                                                                                {...muiRegister(register("eventType"))}
                                                                                error={Boolean(errors.eventType)}
                                                                                helperText={errors.eventType?.message}
                                                                        >
                                                                                <option value="TRIP">טיול</option>
                                                                                <option value="GRADUATION">סיום לימודים</option>
                                                                                <option value="CAMP">מחנה</option>
                                                                                <option value="FAMILY">משפחה</option>
                                                                                <option value="OTHER">אחר</option>
                                                                        </TextField>

                                                                        <TextField
                                                                                id="eventDate"
                                                                                type="date"
                                                                                label="תאריך האירוע *"
                                                                                {...muiRegister(register("eventDate"))}
                                                                                error={Boolean(errors.eventDate)}
                                                                                helperText={errors.eventDate?.message}
                                                                        />
                                                                </Stack>
                                                        </Stack>
                                                </SectionCard>
                                        </Grid>

                                        <Grid size={{ xs: 12, md: 5 }}>
                                                <SectionCard title="תמונת כיסוי" icon={<AddPhotoAlternateRounded />} tone="pink">
                                                        <Typography variant="body2" color="text.secondary" sx={{ mb: 2 }}>
                                                                JPG, PNG או WEBP · עד 2MB
                                                        </Typography>
                                                        <FileUploadButton
                                                                label="בחירת תמונה"
                                                                color="primary"
                                                                accept="image/jpeg,image/png,image/webp"
                                                                onChange={e => setValue(
                                                                        "coverImage",
                                                                        e.target.files?.[0] ?? null,
                                                                        { shouldValidate: true }
                                                                )}
                                                        />
                                                        {errors.coverImage?.message && (
                                                                <FormHelperText error sx={{ mt: 1 }}>{errors.coverImage?.message}</FormHelperText>
                                                        )}
                                                        <GroupImagePreview
                                                                imagePreview={imagePreview}
                                                                onRemove={() => {
                                                                        setValue("coverImage", null, { shouldValidate: true });
                                                                        setRemoveCoverImage(true);
                                                                }}
                                                        />
                                                </SectionCard>
                                        </Grid>

                                        {!isEditMode && (
                                                <Grid size={12}>
                                                        <GroupInvitations
                                                                emails={emails}
                                                                emailInput={emailInput}
                                                                emailError={emailError}
                                                                emailsError={errors.emails?.message}
                                                                onEmailChange={value => {
                                                                        setEmailInput(value);
                                                                        setEmailError("");
                                                                }}
                                                                onAddEmail={addEmail}
                                                                onRemoveEmail={removeEmail}
                                                        />
                                                </Grid>
                                        )}

                                        {submitError && (
                                                <Grid size={12}>
                                                        <Alert severity="error" role="alert">{submitError}</Alert>
                                                </Grid>
                                        )}

                                        <Grid size={12}>
                                                <Box sx={{ pt: 1, borderTop: `1px solid rgba(58, 139, 149, 0.14)`, mt: 1 }}>
                                                        <Box sx={{ pt: 2.5 }}>
                                                                <GroupFormActions
                                                                        isSubmitting={isSubmitting}
                                                                        isEditMode={isEditMode}
                                                                        onCancel={() => navigate("/groups")}
                                                                />
                                                        </Box>
                                                </Box>
                                        </Grid>
                                </Grid>
                        </Box>
                </PageContainer>
                </Box>
        );
};

export default NewGroupPage;
