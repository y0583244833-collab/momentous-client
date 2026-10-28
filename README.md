# Momentous – לקוח React

## הפעלה

```bash
npm install      # חובה בפעם הראשונה – מתקין את MUI ואת הפונטים
npm run dev      # שרת פיתוח
npm run build    # בנייה לפרודקשן
```

> יש להריץ `npm install` ולא `npm ci`, כי קובץ ה-lock עוד לא כולל את החבילות החדשות. ההרצה תעדכן אותו.
> כתובת השרת נקבעת ב-`.env` (`VITE_API_URL`).

## שכבת העיצוב (MUI)

| קובץ | תפקיד |
|---|---|
| `src/theme/tokens.ts` | צבעי המותג, גרדיאנטים וצללים – מקור אמת אחד |
| `src/theme/theme.ts` | `createTheme`: פלטה, טיפוגרפיה (Rubik לכותרות, Heebo לטקסט), פינות, ועיצוב ברירת מחדל לכל רכיבי MUI |
| `src/theme/AppThemeProvider.tsx` | `ThemeProvider` + `CssBaseline` + מטמון Emotion עם RTL (חל גם על חלונות קופצים ותפריטים) |
| `src/components/ui/*` | רכיבים משותפים: `PageContainer`, `PageHeader`, `SectionCard`, `LoadingState`, `ErrorState`, `EmptyState`, `PaginationBar`, `FileUploadButton`, `AuthLayout`, `BrandLogo` |
| `src/components/illustrations/*` | איורים משותפים: סצנות SVG, פולארואיד, פתקים, לבבות וחיצים מצוירים, ולוח הזיכרונות `MemoryCollage` |
| `src/components/home/*` | חלקי דף הבית (סרגל, פתיחה, דוגמאות, סוגי זיכרונות, איך זה עובד, סיום) |
| `src/utils/muiRegister.ts` | מחבר את `register` של react-hook-form לשדות MUI דרך `inputRef` |

פונטים: Rubik לכותרות, Heebo לטקסט, Dancing Script ללוגו, Amatic SC לכתב יד בפתקים.

כלל עבודה: לא כותבים קודי צבע בתוך קומפוננטות – משתמשים ב-`brand` / `gradients` מ-`tokens.ts` או בשמות מה-theme (`primary.main`, `secondary.light`).

---

# React + Vite

This template provides a minimal setup to get React working in Vite with HMR and some Oxlint rules.

Currently, two official plugins are available:

- [@vitejs/plugin-react](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react) uses [Oxc](https://oxc.rs)
- [@vitejs/plugin-react-swc](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react-swc) uses [SWC](https://swc.rs/)

## React Compiler

The React Compiler is not enabled on this template because of its impact on dev & build performances. To add it, see [this documentation](https://react.dev/learn/react-compiler/installation).

## Expanding the Oxlint configuration

If you are developing a production application, we recommend using TypeScript with type-aware lint rules enabled. Check out the [TS template](https://github.com/vitejs/vite/tree/main/packages/create-vite/template-react-ts) for information on how to integrate TypeScript and Oxlint's TypeScript related rules in your project.
