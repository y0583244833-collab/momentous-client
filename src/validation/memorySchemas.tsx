import * as yup from "yup";
import type { MemoryType } from "../types/memory.types";

export const memoryTypes: { value: MemoryType; label: string }[] = [
    { value: "PHOTO", label: "תמונה" },
    { value: "PLACE", label: "מקום" },
    { value: "SUMMARY", label: "סיכום" },
    { value: "JOKE", label: "רגע מצחיק" },
    { value: "QUOTE", label: "ציטוט" }
];

export const memorySchema = yup.object({
    type: yup.mixed<MemoryType>()
        .oneOf(memoryTypes.map(item => item.value))
        .required(),

    title: yup.string().trim()
        .required("חובה להזין כותרת")
        .min(2, "לפחות 2 תווים")
        .max(120, "עד 120 תווים"),

    content: yup.string().trim()
        .required("חובה למלא את השדה")
        .max(5000, "עד 5000 תווים"),

    placeUrl: yup.string().trim()
        .test("url", "קישור לא תקין", value => {
            if (!value) return true;
            try {
                return ["http:", "https:"]
                    .includes(new URL(value).protocol);
            } catch {
                return false;
            }
        }),

    happenedAt: yup.string()
});

export type MemoryFormData = yup.InferType<typeof memorySchema>;
