import Paper from "@mui/material/Paper";
import Stack from "@mui/material/Stack";
import Avatar from "@mui/material/Avatar";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";
import CheckRounded from "@mui/icons-material/CheckRounded";
import { alpha } from "@mui/material/styles";
import type { Invitation } from "../types/invitation.types";
import { brand } from "../theme/tokens";
interface Props {
    invitation: Invitation;
    onAccept: (id: string) => void;
    onDecline: (id: string) => void;
    disabled: boolean;
}

const InvitationCard = ({ invitation, onAccept, onDecline, disabled }: Props) => (
    <Paper
        component="article"
        sx={{
            p: 2,
            borderRadius: 4,
            border: `1px solid ${alpha(brand.pink, 0.14)}`,
            background: `linear-gradient(160deg, ${brand.white} 0%, ${brand.pinkWhisper} 100%)`
        }}
    >
        <Stack direction="row" sx={{ alignItems: "flex-start", gap: 1.5 }}>
            <Avatar
                src={invitation.inviter.avatarUrl ?? undefined}
                alt=""
                sx={{ width: 40, height: 40 }}
            >
                {invitation.inviter.fullName.charAt(0)}
            </Avatar>
            <Box sx={{ minWidth: 0, flex: 1 }}>
                <Typography component="strong" sx={{ fontWeight: 700, display: "block", fontFamily: "'Rubik', sans-serif" }}>
                    {invitation.board.name}
                </Typography>
                <Typography variant="body2" color="text.secondary">
                    {invitation.inviter.fullName} הזמין אותך להצטרף
                </Typography>
            </Box>
        </Stack>

        <Stack direction="row" sx={{ gap: 1, mt: 1.5 }}>
            <Button
                type="button"
                variant="contained"
                color="primary"
                size="small"
                disabled={disabled}
                onClick={() => onAccept(invitation.id)}
                startIcon={<CheckRounded />}
                sx={{ flex: 1 }}
            >אישור</Button>
            <Button
                type="button"
                variant="outlined"
                color="secondary"
                size="small"
                disabled={disabled}
                onClick={() => onDecline(invitation.id)}
                sx={{ flex: 1 }}
            >דחייה</Button>
        </Stack>
    </Paper>
);

export default InvitationCard;
