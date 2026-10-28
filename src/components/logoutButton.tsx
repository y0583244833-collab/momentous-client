import { useContext } from "react"
import Button from "@mui/material/Button";
import LogoutRounded from "@mui/icons-material/LogoutRounded";
import { AuthContext } from "../context/AuthContext"

interface LogOutButtonProps {
    fullWidth?: boolean;
}

export const LogOutButton = ({ fullWidth = false }: LogOutButtonProps) => {

    const auth = useContext(AuthContext);

    return (
        <Button
            onClick={auth?.logout}
            variant="outlined"
            color="secondary"
            size="small"
            fullWidth={fullWidth}
            startIcon={<LogoutRounded />}
        >
            התנתקות
        </Button>
    )
}
