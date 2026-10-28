import { yupResolver } from "@hookform/resolvers/yup";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router";
import type { SignUpRequest } from "../types/auth.types";
import axios from "axios";
import { useContext, useEffect, useState } from "react";
import { AuthContext } from "../context/AuthContext";
import { signupSchema } from "../validation/schemas";
import { registerUser, uploadProfileImage, updateProfileImage } from "../api/authApi";
import Box from "@mui/material/Box";
import Stack from "@mui/material/Stack";
import Typography from "@mui/material/Typography";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import Alert from "@mui/material/Alert";
import Avatar from "@mui/material/Avatar";
import DeleteOutlineRounded from "@mui/icons-material/DeleteOutlineRounded";
import AuthLayout from "../components/ui/AuthLayout";
import FileUploadButton from "../components/ui/FileUploadButton";
import { muiRegister } from "../utils/muiRegister";
import { brand } from "../theme/tokens";
const SignUpPage = () => {
        const navigate = useNavigate();
        const [signupError, setSignUpError] = useState<string>("");
        const [imageError, setImageError] = useState<string>("");
        const [registrationCompleted, setRegistrationCompleted] = useState(false);
        const [selectedFile, setSelectedFile] = useState<File | null>(null);
        const [imagePreview, setImagePreview] = useState<string | null>(null);
        const auth = useContext(AuthContext);
        useEffect(() => {
                if (!selectedFile) {
                        setImagePreview(null);
                        return;
                }

                const url = URL.createObjectURL(selectedFile);
                setImagePreview(url);

                return () => URL.revokeObjectURL(url);
        }, [selectedFile]);
        const onSubmit = async (data: SignUpRequest) => {
                if (registrationCompleted) return;
                setImageError("");
                setSignUpError("");
                try {
                        const result = await registerUser(data);
                        auth?.login(result);
                        setRegistrationCompleted(true);
                        if (selectedFile) {
                                try {
                                        const image = await uploadProfileImage(selectedFile, result.token);
                                        const user = await updateProfileImage(image.id, result.token);
                                        auth?.updateUser(user);
                                } catch {
                                        setImageError("ההרשמה הצליחה, אבל העלאת התמונה נכשלה");
                                        return;
                                }
                        }
                        navigate("/groups", { replace: true });
                } catch (error) {
                        if (axios.isAxiosError(error)) {
                                setSignUpError(error.response?.data?.message ?? "לא ניתן להתחבר לשרת");
                        } else {
                                setSignUpError("אירעה שגיאה לא צפויה. נסי שוב.");
                        }
                }
        };
        const {
                register,
                handleSubmit,
                formState: { errors, isSubmitting }
        } = useForm<SignUpRequest>({
                resolver: yupResolver(signupSchema),
                mode: "onBlur",
                reValidateMode: "onChange"
        });
        return (
                <AuthLayout
                        title="כאן מתחילים הזיכרונות"
                        switchText="כבר יש לך חשבון?"
                        switchLinkText="להתחברות"
                        switchTo="/login"
                >
                <Box component="form" onSubmit={handleSubmit(onSubmit)}>

                        <Stack sx={{ gap: 2.5 }}>
                                <Stack
                                        direction="row"
                                        sx={{ alignItems: "center", gap: 2, p: 2, borderRadius: 5, backgroundColor: brand.white, border: "1px solid rgba(255, 62, 155, 0.14)" }}
                                >
                                        <Avatar
                                                src={imagePreview || "/default-avatar.svg"}
                                                alt="תמונת פרופיל"
                                                sx={{
                                                        width: 84,
                                                        height: 84,
                                                        border: `3px solid ${brand.white}`,
                                                        boxShadow: "0 8px 20px -10px rgba(200, 31, 114, 0.5)"
                                                }}
                                        />
                                        <Stack sx={{ alignItems: "flex-start", gap: 1, minWidth: 0 }}>
                                                <Typography component="label" htmlFor="avatar" variant="body2" sx={{ fontWeight: 600, color: brand.tealInk }}>
                                                        תמונת פרופיל (לא חובה)
                                                </Typography>
                                                <FileUploadButton
                                                        id="avatar"
                                                        label="בחירת תמונה"
                                                        accept="image/jpeg,image/png,image/webp"
                                                        onChange={(e) => {
                                                                const file = e.target.files?.[0];
                                                                if (!file) return;
                                                                if (file.size > 2 * 1024 * 1024) {
                                                                        setImageError("התמונה גדולה מדי. ניתן להעלות עד 2MB");
                                                                        e.target.value = "";
                                                                        return
                                                                }
                                                                if (!["image/jpeg", "image/png", "image/webp"].includes(file.type)) {
                                                                        setImageError("ניתן להעלות רק תמונות JPG, PNG או WebP");
                                                                        e.target.value = "";
                                                                        return;
                                                                }

                                                                setImageError("");
                                                                setSelectedFile(file);

                                                        }}
                                                />
                                                {selectedFile && (
                                                        <Button type="button"
                                                                size="small"
                                                                color="error"
                                                                startIcon={<DeleteOutlineRounded />}
                                                                onClick={() => {
                                                                        setSelectedFile(null);
                                                                        setImageError("");
                                                                }}
                                                        >
                                                                הסרת תמונה
                                                        </Button>
                                                )}
                                        </Stack>
                                </Stack>
                                {imageError && !registrationCompleted && (
                                        <Alert severity="error" role="alert">{imageError} </Alert>)}

                                <TextField
                                        type="text"
                                        id="fullName"
                                        label="שם מלא"
                                        autoComplete="name"
                                        {...muiRegister(register("fullName"))}
                                        error={Boolean(errors.fullName)}
                                        helperText={errors.fullName?.message}
                                />
                                <TextField
                                        type="email"
                                        id="email"
                                        label="מייל"
                                        autoComplete="email"
                                        {...muiRegister(register("email"))}
                                        error={Boolean(errors.email)}
                                        helperText={errors.email?.message}
                                        slotProps={{ htmlInput: { dir: "ltr" }, inputLabel: { shrink: true } }}
                                />
                                <TextField
                                        type="password"
                                        id="password"
                                        label="סיסמא"
                                        autoComplete="new-password"
                                        {...muiRegister(register("password"))}
                                        error={Boolean(errors.password)}
                                        helperText={errors.password?.message}
                                />

                                {!registrationCompleted && (
                                        <Button type="submit" variant="contained" color="primary" size="large" fullWidth disabled={isSubmitting} sx={{ mt: 1 }}>
                                                {isSubmitting ? "נרשם..." : "הרשמה"}
                                        </Button>
                                )}
                                {signupError && (<Alert severity="error" role="alert">{signupError}</Alert>)}
                                {registrationCompleted && imageError && (
                                        <Stack sx={{ gap: 1.5 }}>
                                                <Alert severity="warning" role="alert">{imageError}</Alert>
                                                <Button type="button" variant="contained" color="secondary" size="large" fullWidth onClick={() => navigate("/groups", { replace: true })}  > המשך ללא תמונה</Button>
                                        </Stack>
                                )}
                        </Stack>
                </Box>
                </AuthLayout>
        );
};
export default SignUpPage;
