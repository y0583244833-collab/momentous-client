import { yupResolver } from "@hookform/resolvers/yup";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router";
import type { LoginRequest } from "../types/auth.types";
import { useState } from "react";
import axios from "axios";
import { useContext } from "react";
import Box from "@mui/material/Box";
import Stack from "@mui/material/Stack";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import Alert from "@mui/material/Alert";
import { AuthContext } from "../context/AuthContext";
import { loginUser } from "../api/authApi";
import { loginSchema } from "../validation/schemas";
import AuthLayout from "../components/ui/AuthLayout";
import { muiRegister } from "../utils/muiRegister";

const LoginPage = () => {
    const navigate = useNavigate();
    const [loginError, setLoginError] = useState<string>("");
    const auth = useContext(AuthContext);
    const {
        register,
        handleSubmit,
        formState: { errors, isSubmitting }
    } = useForm<LoginRequest>({
        resolver: yupResolver(loginSchema), mode: "onBlur",
        reValidateMode: "onChange"
    })
    const onSubmit = async (data: LoginRequest) => {
        setLoginError("");
        try {
            const result = await loginUser(data);
            auth?.login(result);
            if (result.user.role === "ADMIN") {
                navigate("/admin", { replace: true });
            } else {
                navigate("/groups", { replace: true });
            }
        }
        catch (error) {
            if (axios.isAxiosError(error)) {
                setLoginError(error.response?.data?.message ?? "לא ניתן להתחבר לשרת")
            }
            else {
                setLoginError("אירעה שגיאה לא צפויה");
            }
        }
    }
    return (
        <AuthLayout
            title="איזה כיף שחזרת"
            switchText="עדיין אין לך חשבון?"
            switchLinkText="להרשמה"
            switchTo="/signup"
        >
            <Box component="form" onSubmit={handleSubmit(onSubmit)}>

                <Stack sx={{ gap: 2.5 }}>
                    <TextField
                        type="email"
                        id="email"
                        label="מייל"
                        autoComplete="email"
                        {...muiRegister(register("email"
                        ))}
                        error={Boolean(errors.email)}
                        helperText={errors.email?.message}
                        slotProps={{ htmlInput: { dir: "ltr" }, inputLabel: { shrink: true } }}
                    />

                    <TextField
                        type="password"
                        id="password"
                        label="סיסמא"
                        autoComplete="current-password"
                        {...muiRegister(register("password"))}
                        error={Boolean(errors.password)}
                        helperText={errors.password?.message}
                    />

                    <Button type="submit" variant="contained" color="primary" size="large" fullWidth disabled={isSubmitting} sx={{ mt: 1 }}>
                        {isSubmitting ? "מתחבר..." : "התחברות"}
                    </Button>
                    {loginError && <Alert severity="error" role="alert">{loginError}</Alert>}
                </Stack>
            </Box>
        </AuthLayout>
    )
};
export default LoginPage;
