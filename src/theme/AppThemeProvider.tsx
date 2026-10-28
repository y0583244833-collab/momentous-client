import type { ReactNode } from "react";
import { CacheProvider } from "@emotion/react";
import createCache from "@emotion/cache";
import { prefixer } from "stylis";
import rtlPlugin from "stylis-plugin-rtl";
import CssBaseline from "@mui/material/CssBaseline";
import { ThemeProvider } from "@mui/material/styles";
import theme from "./theme";

import "@fontsource/heebo/400.css";
import "@fontsource/heebo/500.css";
import "@fontsource/heebo/600.css";
import "@fontsource/heebo/700.css";
import "@fontsource/rubik/500.css";
import "@fontsource/rubik/600.css";
import "@fontsource/rubik/700.css";
import "@fontsource/dancing-script/700.css";
import "@fontsource/amatic-sc/700.css";

// מטמון Emotion שהופך את כל הסגנונות לימין-לשמאל,
// כולל חלונות קופצים ותפריטים שנפתחים מחוץ לעץ (Portal)
const rtlCache = createCache({
    key: "muirtl",
    stylisPlugins: [prefixer, rtlPlugin]
});

const AppThemeProvider = ({ children }: { children: ReactNode }) => (
    <CacheProvider value={rtlCache}>
        <ThemeProvider theme={theme}>
            <CssBaseline />
            {children}
        </ThemeProvider>
    </CacheProvider>
);

export default AppThemeProvider;
