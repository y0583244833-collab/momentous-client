import type { UseFormRegisterReturn } from "react-hook-form";

// מעביר את ה-ref של react-hook-form לשדה הקלט עצמו (inputRef) ולא לעטיפה של MUI,
// כך שאיפוס, פוקוס על שגיאה וקריאת ערכים ממשיכים לעבוד בדיוק כמו קודם
export const muiRegister = <T extends string>(registration: UseFormRegisterReturn<T>) => {
    const { ref, ...rest } = registration;
    return { ...rest, inputRef: ref };
};
