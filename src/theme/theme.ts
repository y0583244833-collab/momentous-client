import { createTheme, alpha } from "@mui/material/styles";
import type { Shadows } from "@mui/material/styles";
import { brand, gradients, softShadow, liftShadow } from "./tokens";

const headingFont = "'Rubik', 'Heebo', system-ui, sans-serif";
const bodyFont = "'Heebo', 'Rubik', system-ui, sans-serif";

const shadows = [
    "none",
    "0 1px 3px rgba(42, 104, 112, 0.08)",
    "0 4px 12px -4px rgba(200, 31, 114, 0.12)",
    softShadow,
    softShadow,
    ...Array(20).fill(liftShadow)
] as Shadows;

const theme = createTheme({
    direction: "rtl",
    palette: {
        mode: "light",
        primary: {
            main: brand.pink,
            light: brand.pinkSoft,
            dark: brand.pinkDeep,
            contrastText: brand.white
        },
        secondary: {
            main: brand.teal,
            light: brand.mint,
            dark: brand.tealDeep,
            contrastText: brand.white
        },
        success: {
            main: "#2E9E86",
            light: brand.mint,
            dark: "#1F7463",
            contrastText: brand.white
        },
        error: {
            main: "#D93A5B",
            light: "#F28AA0",
            dark: "#A8233F",
            contrastText: brand.white
        },
        info: {
            main: brand.teal,
            contrastText: brand.white
        },
        text: {
            primary: brand.ink,
            secondary: brand.inkSoft
        },
        background: {
            default: brand.pinkWhisper,
            paper: brand.white
        },
        divider: alpha(brand.teal, 0.14)
    },
    shape: { borderRadius: 16 },
    spacing: 8,
    shadows,
    typography: {
        fontFamily: bodyFont,
        fontSize: 15,
        h1: { fontFamily: headingFont, fontWeight: 700, fontSize: "clamp(1.85rem, 1.35rem + 2vw, 2.4rem)", lineHeight: 1.2, letterSpacing: "-0.01em" },
        h2: { fontFamily: headingFont, fontWeight: 600, fontSize: "clamp(1.25rem, 1.1rem + 0.6vw, 1.45rem)", lineHeight: 1.3 },
        h3: { fontFamily: headingFont, fontWeight: 600, fontSize: "1.2rem", lineHeight: 1.35 },
        h4: { fontFamily: headingFont, fontWeight: 600, fontSize: "1.05rem" },
        h5: { fontFamily: headingFont, fontWeight: 600 },
        h6: { fontFamily: headingFont, fontWeight: 600 },
        subtitle1: { fontWeight: 500, lineHeight: 1.6 },
        body1: { lineHeight: 1.7 },
        body2: { lineHeight: 1.65 },
        button: { fontFamily: headingFont, fontWeight: 600, textTransform: "none", letterSpacing: 0 },
        overline: { fontFamily: headingFont, fontWeight: 600, letterSpacing: "0.08em" }
    },
    components: {
        MuiCssBaseline: {
            styleOverrides: {
                html: { scrollBehavior: "smooth" },
                body: {
                    background: gradients.page,
                    backgroundAttachment: "fixed",
                    minHeight: "100vh",
                    WebkitFontSmoothing: "antialiased"
                },
                "::selection": { background: alpha(brand.pink, 0.22) },
                img: { maxWidth: "100%", display: "block" }
            }
        },
        MuiButton: {
            defaultProps: { disableElevation: true },
            styleOverrides: {
                root: ({ ownerState }) => ({
                    borderRadius: 999,
                    paddingInline: ownerState.size === "small" ? 14 : ownerState.size === "large" ? 30 : 22,
                    paddingBlock: ownerState.size === "small" ? 5 : ownerState.size === "large" ? 12 : 9,
                    ...(ownerState.size === "large" && { fontSize: "1rem" }),
                    transition: "transform .15s ease, box-shadow .2s ease, background .2s ease",
                    ...(ownerState.variant === "contained" && ownerState.color === "primary" && {
                        background: gradients.pinkButton,
                        boxShadow: `0 8px 20px -8px ${alpha(brand.pink, 0.6)}`,
                        "&:hover": {
                            background: gradients.pinkButton,
                            boxShadow: `0 12px 26px -8px ${alpha(brand.pink, 0.7)}`,
                            transform: "translateY(-1px)"
                        },
                        "&.Mui-disabled": {
                            background: alpha(brand.pinkSoft, 0.45),
                            color: brand.white
                        }
                    }),
                    ...(ownerState.variant === "contained" && ownerState.color === "secondary" && {
                        background: gradients.tealButton,
                        boxShadow: `0 8px 20px -10px ${alpha(brand.teal, 0.7)}`,
                        "&:hover": {
                            background: gradients.tealButton,
                            transform: "translateY(-1px)"
                        },
                        "&.Mui-disabled": {
                            background: alpha(brand.mint, 0.4),
                            color: brand.white
                        }
                    }),
                    ...(ownerState.variant === "outlined" && {
                        borderWidth: 1.5,
                        backgroundColor: alpha(brand.white, 0.75),
                        "&:hover": { borderWidth: 1.5 }
                    }),
                    ...(ownerState.variant === "outlined" && ownerState.color === "primary" && {
                        borderColor: alpha(brand.pink, 0.5),
                        color: brand.pinkDeep,
                        "&:hover": { borderWidth: 1.5, backgroundColor: brand.pinkWhisper, borderColor: brand.pink }
                    }),
                    ...(ownerState.variant === "outlined" && ownerState.color === "secondary" && {
                        borderColor: alpha(brand.teal, 0.45),
                        color: brand.tealDeep,
                        "&:hover": { borderWidth: 1.5, backgroundColor: brand.mintWhisper, borderColor: brand.teal }
                    }),
                    ...(ownerState.variant === "text" && ownerState.color === "primary" && { color: brand.pinkDeep }),
                    ...(ownerState.variant === "text" && ownerState.color === "secondary" && { color: brand.tealDeep })
                })
            }
        },
        MuiIconButton: {
            styleOverrides: {
                root: { transition: "background .2s ease, transform .15s ease" }
            }
        },
        MuiPaper: {
            defaultProps: { elevation: 0 },
            styleOverrides: {
                root: { backgroundImage: "none" },
                rounded: { borderRadius: 24 }
            }
        },
        MuiCard: {
            styleOverrides: {
                root: {
                    borderRadius: 24,
                    border: `1px solid ${alpha(brand.pink, 0.1)}`,
                    boxShadow: softShadow,
                    overflow: "hidden"
                }
            }
        },
        MuiTextField: {
            // תוויות קבועות מעל השדה - כך גם ערכים שנטענים ע"י reset של react-hook-form לא מתנגשים בתווית
            defaultProps: { fullWidth: true, variant: "outlined", slotProps: { inputLabel: { shrink: true } } }
        },
        MuiOutlinedInput: {
            styleOverrides: {
                root: {
                    borderRadius: 14,
                    backgroundColor: brand.white,
                    transition: "box-shadow .2s ease",
                    "& .MuiOutlinedInput-notchedOutline": {
                        borderColor: alpha(brand.teal, 0.25)
                    },
                    "&:hover .MuiOutlinedInput-notchedOutline": {
                        borderColor: alpha(brand.pink, 0.55)
                    },
                    "&.Mui-focused": {
                        boxShadow: `0 0 0 4px ${alpha(brand.pink, 0.12)}`
                    },
                    "&.Mui-error.Mui-focused": {
                        boxShadow: `0 0 0 4px ${alpha("#D93A5B", 0.12)}`
                    }
                }
            }
        },
        MuiInputLabel: {
            styleOverrides: {
                root: { fontWeight: 500 }
            }
        },
        MuiFormHelperText: {
            styleOverrides: {
                root: { marginInline: 4, fontWeight: 500 }
            }
        },
        MuiChip: {
            styleOverrides: {
                root: ({ ownerState }) => ({
                    borderRadius: 999,
                    fontWeight: 600,
                    fontFamily: headingFont,
                    ...(ownerState.variant !== "outlined" && ownerState.color === "primary" && {
                        backgroundColor: brand.pinkMist,
                        color: brand.pinkInk
                    }),
                    ...(ownerState.variant !== "outlined" && ownerState.color === "secondary" && {
                        backgroundColor: brand.mintMist,
                        color: brand.tealInk
                    })
                })
            }
        },
        MuiDialog: {
            styleOverrides: {
                paper: {
                    borderRadius: 28,
                    boxShadow: "0 30px 80px -20px rgba(28, 74, 80, 0.45)"
                }
            }
        },
        MuiBackdrop: {
            styleOverrides: {
                root: {
                    "&:not(.MuiBackdrop-invisible)": {
                        backgroundColor: alpha(brand.tealInk, 0.45),
                        backdropFilter: "blur(4px)"
                    }
                }
            }
        },
        MuiAlert: {
            styleOverrides: {
                root: { borderRadius: 16, alignItems: "center", fontWeight: 500 }
            }
        },
        MuiTableCell: {
            styleOverrides: {
                root: { borderColor: alpha(brand.teal, 0.12), paddingBlock: 14 },
                head: {
                    fontFamily: headingFont,
                    fontWeight: 600,
                    color: brand.tealInk,
                    backgroundColor: brand.mintMist
                }
            }
        },
        MuiTableRow: {
            styleOverrides: {
                root: {
                    "&.MuiTableRow-hover:hover": { backgroundColor: brand.pinkWhisper }
                }
            }
        },
        MuiLink: {
            defaultProps: { underline: "hover" },
            styleOverrides: {
                root: { color: brand.pinkDeep, fontWeight: 600 }
            }
        },
        MuiMenu: {
            styleOverrides: {
                paper: { borderRadius: 18, marginTop: 6, boxShadow: liftShadow }
            }
        },
        MuiMenuItem: {
            styleOverrides: {
                root: {
                    borderRadius: 10,
                    marginInline: 6,
                    "&.Mui-selected": { backgroundColor: brand.pinkMist },
                    "&.Mui-selected:hover": { backgroundColor: brand.pinkMist }
                }
            }
        },
        MuiAvatar: {
            styleOverrides: {
                colorDefault: { backgroundColor: brand.mintMist, color: brand.tealDeep, fontWeight: 600 }
            }
        },
        MuiBadge: {
            styleOverrides: {
                badge: { fontWeight: 700, fontFamily: headingFont }
            }
        },
        MuiCircularProgress: {
            defaultProps: { color: "primary" }
        },
        MuiTooltip: {
            styleOverrides: {
                tooltip: { backgroundColor: brand.tealInk, fontSize: "0.8rem", borderRadius: 10 }
            }
        }
    }
});

export default theme;
