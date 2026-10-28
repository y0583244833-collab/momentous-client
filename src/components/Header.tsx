import { useContext, useState } from "react"
import type { MouseEvent } from "react";
import { AuthContext } from "../context/AuthContext";
import { Link, NavLink } from "react-router";
import AppBar from "@mui/material/AppBar";
import Toolbar from "@mui/material/Toolbar";
import Container from "@mui/material/Container";
import Box from "@mui/material/Box";
import Stack from "@mui/material/Stack";
import Button from "@mui/material/Button";
import IconButton from "@mui/material/IconButton";
import Menu from "@mui/material/Menu";
import Divider from "@mui/material/Divider";
import Avatar from "@mui/material/Avatar";
import Typography from "@mui/material/Typography";
import MenuRounded from "@mui/icons-material/MenuRounded";
import DashboardRounded from "@mui/icons-material/DashboardRounded";
import AdminPanelSettingsRounded from "@mui/icons-material/AdminPanelSettingsRounded";
import { alpha } from "@mui/material/styles";
import { LogOutButton } from "./logoutButton";
import InvitationsBell from "./InvitationsBell";
import BrandLogo from "./ui/BrandLogo";
import { brand, gradients } from "../theme/tokens";

const navButtonSx = {
  color: brand.tealInk,
  px: 2,
  "&:hover": { backgroundColor: brand.mintWhisper },
  "&.active": { backgroundColor: brand.pinkMist, color: brand.pinkInk }
};

const Header = () => {
  const auth = useContext(AuthContext);
  const [menuAnchor, setMenuAnchor] = useState<HTMLElement | null>(null);
  const openMenu = (event: MouseEvent<HTMLElement>) => setMenuAnchor(event.currentTarget);
  const closeMenu = () => setMenuAnchor(null);

  return (
    <AppBar
      position="sticky"
      elevation={0}
      sx={{
        backgroundColor: alpha(brand.white, 0.82),
        backdropFilter: "blur(14px)",
        color: brand.ink,
        borderBottom: `1px solid ${alpha(brand.pink, 0.12)}`,
        "&::after": {
          content: '""',
          position: "absolute",
          insetInline: 0,
          bottom: -1,
          height: 3,
          background: gradients.brand,
          opacity: 0.85
        }
      }}
    >
      <Container maxWidth="lg" sx={{ px: { xs: 2, sm: 3 } }}>
        <Toolbar component="nav" disableGutters sx={{ minHeight: { xs: 64, md: 72 }, gap: 2 }}>
          <Box
            component={Link}
            to="/"
            aria-label="Momentous"
            sx={{ textDecoration: "none", display: "inline-flex", alignItems: "center" }}
          >
            <BrandLogo size="md" />
          </Box>

          <Box sx={{ flex: 1 }} />

          {auth?.isAuthenticated ? (
            <>
              {/* מחשב */}
              <Stack direction="row" sx={{ alignItems: "center", gap: 1.5, display: { xs: "none", md: "flex" } }}>
                <Stack direction="row" sx={{ alignItems: "center", gap: 1 }}>
                  <Avatar
                    src={auth.user?.avatarUrl ?? undefined}
                    alt=""
                    sx={{ width: 34, height: 34, border: `2px solid ${brand.pinkMist}` }}
                  >
                    {auth.user?.fullName?.charAt(0)}
                  </Avatar>
                  <Typography component="span" sx={{ fontWeight: 500, color: brand.inkSoft }}>
                    שלום,{auth.user?.fullName}
                  </Typography>
                </Stack>
                {auth?.user?.role === "USER" && (
                  <Button component={Link} to="/groups" startIcon={<DashboardRounded />} sx={navButtonSx}>
                    הלוחות שלי
                  </Button>
                )}
                {auth.user?.role === "ADMIN" &&
                  <Button component={NavLink} to="/admin" startIcon={<AdminPanelSettingsRounded />} sx={navButtonSx}>
                    ניהול מערכת
                  </Button>}
                <LogOutButton
                />
              </Stack>

              {auth.user?.role !== "ADMIN" && <InvitationsBell />}

              {/* מובייל */}
              <IconButton
                aria-label="תפריט ניווט"
                aria-haspopup="true"
                aria-expanded={Boolean(menuAnchor)}
                onClick={openMenu}
                sx={{
                  display: { xs: "inline-flex", md: "none" },
                  color: brand.tealDeep,
                  backgroundColor: brand.mintWhisper,
                  "&:hover": { backgroundColor: brand.mintMist }
                }}
              >
                <MenuRounded />
              </IconButton>
              <Menu
                anchorEl={menuAnchor}
                open={Boolean(menuAnchor)}
                onClose={closeMenu}
                anchorOrigin={{ vertical: "bottom", horizontal: "left" }}
                transformOrigin={{ vertical: "top", horizontal: "left" }}
                sx={{ display: { md: "none" } }}
                slotProps={{ paper: { sx: { minWidth: 240, p: 1 } } }}
              >
                <Stack direction="row" sx={{ alignItems: "center", gap: 1.25, px: 1.5, py: 1 }}>
                  <Avatar src={auth.user?.avatarUrl ?? undefined} alt="" sx={{ width: 36, height: 36 }}>
                    {auth.user?.fullName?.charAt(0)}
                  </Avatar>
                  <Typography sx={{ fontWeight: 600 }}>שלום,{auth.user?.fullName}</Typography>
                </Stack>
                <Divider sx={{ my: 1 }} />
                <Stack sx={{ gap: 1, px: 1 }}>
                  {auth?.user?.role === "USER" && (
                    <Button
                      component={Link}
                      to="/groups"
                      onClick={closeMenu}
                      startIcon={<DashboardRounded />}
                      sx={{ ...navButtonSx, justifyContent: "flex-start" }}
                    >
                      הלוחות שלי
                    </Button>
                  )}
                  {auth.user?.role === "ADMIN" &&
                    <Button
                      component={NavLink}
                      to="/admin"
                      onClick={closeMenu}
                      startIcon={<AdminPanelSettingsRounded />}
                      sx={{ ...navButtonSx, justifyContent: "flex-start" }}
                    >
                      ניהול מערכת
                    </Button>}
                  <LogOutButton fullWidth />
                </Stack>
              </Menu>
            </>
          ) :
            (
              <Stack direction="row" sx={{ gap: 1 }}>
                <Button component={NavLink} to="/login" sx={navButtonSx}>להתחברות</Button>
                <Button component={NavLink} to="/signup" variant="contained" color="primary">להרשמה</Button>
              </Stack>
            )}
        </Toolbar>
      </Container>
    </AppBar>
  )
}
export default Header;
