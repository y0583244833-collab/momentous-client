import * as yup from "yup";
export const signupSchema = yup.object({
    fullName: yup
        .string()
        .trim()
        .required("חובה להזין שם מלא")
        .min(2, "השם צריך להכיל לפחות 2 תווים")
        .max(60, "השם ארוך מדי"),

    email: yup
        .string()
        .trim()
        .lowercase()
        .required("חובה להזין אימייל")
        .email("כתובת המייל לא תקינה")
        .max(254),

    password: yup
        .string()
        .required("חובה להזין סיסמה")
        .min(8, "הסיסמה צריכה להכיל לפחות 8 תווים")
        .max(72, "הסיסמה ארוכה מדי")
});

export const loginSchema = yup.object({
    email: yup
        .string()
        .trim()
        .lowercase()
        .required("חובה להזין אימייל")
        .email("כתובת המייל לא תקינה")
        .max(254),
    password: yup
        .string()
        .required("יש להזין סיסמה")
});
import type { EventType } from "../types/group.types";

const eventTypes: EventType[] = [
    "TRIP",
    "GRADUATION",
    "CAMP",
    "FAMILY",
    "OTHER"
];
export const emailSchema = yup
    .string()
    .trim()
    .lowercase()
    .required("יש להזין כתובת אימייל")
    .email("כתובת אימייל לא תקינה")
    .max(254, "כתובת האימייל ארוכה מדי");

export const groupSchema = yup.object({
    name: yup
        .string()
        .trim()
        .required("חובה להזין שם קבוצה")
        .min(2, "שם הקבוצה חייב להכיל לפחות 2 תווים")
        .max(80, "שם הקבוצה ארוך מדי"),

    description: yup
        .string()
        .trim()
        .max(1000, "התיאור ארוך מדי")
        .optional(),

    eventType: yup
        .mixed<EventType>()
        .oneOf(eventTypes, "סוג האירוע לא תקין")
        .required("חובה לבחור סוג אירוע"),

    eventDate: yup
        .string()
        .required("חובה לבחור תאריך אירוע")
        .matches(
            /^\d{4}-\d{2}-\d{2}$/,
            "תאריך האירוע לא תקין"
        ),
    coverImage: yup
        .mixed<File>()
        .nullable()
        .optional()
        .test(
            "fileType",
            "יש לבחור תמונה מסוג JPG, PNG או WEBP",
            (file) =>
                !file ||
                ["image/jpeg", "image/png", "image/webp"]
                    .includes(file.type)
        )
        .test(
            "fileSize",
            "התמונה חייבת להיות עד 2MB",
            (file) =>
                !file || file.size <= 2 * 1024 * 1024
        ),
    emails: yup
        .array()
        .of(emailSchema)
        .max(20, "אפשר להזמין עד 20 משתתפים")
        .test(
            "unique-emails",
            "אין להזין את אותה כתובת אימייל פעמיים",
            (emails) => !emails ||
                new Set(emails).size === emails.length
        )
        .default([])
        .default([])
});

export type GroupFormValues = yup.InferType<typeof groupSchema>;


export const emailsSchema = yup.object({
    participants: yup.array().of(
        yup.object({
            email: yup.string()
                .trim()
                .required("חובה להזין אימייל")
                .email("כתובת אימייל לא תקינה")
        })
    ).required().min(1, "יש להזין לפחות משתתף אחד")
        .max(20, "אפשר להזמין עד 20 משתתפים")
});