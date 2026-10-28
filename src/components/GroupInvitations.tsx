import Box from "@mui/material/Box";
import Stack from "@mui/material/Stack";
import Typography from "@mui/material/Typography";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import Chip from "@mui/material/Chip";
import Alert from "@mui/material/Alert";
import LinearProgress from "@mui/material/LinearProgress";
import PersonAddAlt1Rounded from "@mui/icons-material/PersonAddAlt1Rounded";
import MailOutlineRounded from "@mui/icons-material/MailOutlineRounded";
import GroupAddRounded from "@mui/icons-material/GroupAddRounded";
import SectionCard from "./ui/SectionCard";
import { brand } from "../theme/tokens";

interface Props {
    emails: string[];
    emailInput: string;
    emailError: string;
    emailsError?: string;
    onEmailChange: (value: string) => void;
    onAddEmail: () => void;
    onRemoveEmail: (email: string) => void;
}

const GroupInvitations = ({ emails, emailInput, emailError, emailsError, onEmailChange, onAddEmail, onRemoveEmail }: Props) => {
    return (
        <SectionCard
            tone="mint"
            icon={<GroupAddRounded />}
            title="הזמנת משתתפים"
            subtitle="אפשר להזמין משתמשים באמצעות כתובת אימייל."
        >
            <Stack direction={{ xs: "column", sm: "row" }} sx={{ alignItems: { xs: "stretch", sm: "flex-start" }, gap: 1.5 }}>
                <TextField
                    id="inviteEmail"
                    type="email"
                    label="כתובת אימייל"
                    value={emailInput}
                    placeholder="example@gmail.com"
                    onChange={(e) => onEmailChange(e.target.value)}
                    onKeyDown={(e) => {
                        if (e.key === "Enter") {
                            e.preventDefault();
                            onAddEmail();
                        }
                    }}
                    error={Boolean(emailError)}
                    slotProps={{ htmlInput: { dir: "ltr" }, inputLabel: { shrink: true } }}
                />
                <Button
                    type="button"
                    variant="contained"
                    color="secondary"
                    onClick={onAddEmail}
                    startIcon={<PersonAddAlt1Rounded />}
                    sx={{ flexShrink: 0, minHeight: 56, whiteSpace: "nowrap" }}
                >
                    הוספת משתתף
                </Button>
            </Stack>

            {emailError && <Alert severity="error" role="alert" sx={{ mt: 1.5 }}>{emailError}</Alert>}
            {emailsError && <Alert severity="error" role="alert" sx={{ mt: 1.5 }}>{emailsError}</Alert>}

            <Box sx={{ mt: 2.5 }}>
                <Stack direction="row" sx={{ alignItems: "center", justifyContent: "space-between", mb: 0.75 }}>
                    <Typography variant="body2" sx={{ fontWeight: 600, color: brand.tealInk }}>
                        משתתפים להזמנה: {emails.length}/20
                    </Typography>
                </Stack>
                <LinearProgress
                    variant="determinate"
                    value={Math.min(emails.length / 20, 1) * 100}
                    color="secondary"
                    sx={{ height: 6, borderRadius: 999, backgroundColor: "rgba(255,255,255,0.8)" }}
                />
            </Box>

            <Stack component="ul" direction="row" sx={{ gap: 1, flexWrap: "wrap", listStyle: "none", p: 0, m: 0, mt: emails.length ? 2 : 0 }}>
                {emails.map((email) => (
                    <Box component="li" key={email}>
                        <Chip
                            icon={<MailOutlineRounded />}
                            label={<span dir="ltr">{email}</span>}
                            onDelete={() => onRemoveEmail(email)}
                            color="primary"
                            sx={{ backgroundColor: brand.white, border: "1px solid rgba(255, 62, 155, 0.25)" }}
                        />
                    </Box>
                ))}
            </Stack>
        </SectionCard>
    );
};

export default GroupInvitations;
