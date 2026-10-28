import type { CSSProperties } from "react";
import { brand } from "../../theme/tokens";

interface DoodleProps {
    color?: string;
    style?: CSSProperties;
    filled?: boolean;
}

// לב מצויר ביד
export const HandHeart = ({ color = brand.pink, style, filled = false }: DoodleProps) => (
    <svg viewBox="0 0 48 44" aria-hidden="true" style={{ display: "block", overflow: "visible", ...style }}>
        <path
            d="M24 40 C10 30 3 22 4 13 C5 5 14 1 20 6 C22 8 23 10 24 12 C25 9 27 6 31 4 C38 1 45 6 44 14 C43 23 35 31 24 40 Z"
            fill={filled ? color : "none"}
            stroke={color}
            strokeWidth="3"
            strokeLinecap="round"
            strokeLinejoin="round"
        />
        {!filled && (
            <path d="M12 12 C11 15 12 19 14 22" stroke={color} strokeWidth="2" fill="none" strokeLinecap="round" opacity="0.6" />
        )}
    </svg>
);

// חץ מצויר מתעקל
export const HandArrow = ({ color = brand.tealDeep, style }: DoodleProps) => (
    <svg viewBox="0 0 120 70" aria-hidden="true" style={{ display: "block", overflow: "visible", ...style }}>
        <path
            d="M6 56 C26 20 62 6 104 18"
            stroke={color}
            strokeWidth="3"
            fill="none"
            strokeLinecap="round"
            strokeDasharray="1 0"
        />
        <path d="M90 8 L106 18 L92 30" stroke={color} strokeWidth="3" fill="none" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
);

// חץ לולאה
export const LoopArrow = ({ color = brand.pink, style }: DoodleProps) => (
    <svg viewBox="0 0 130 80" aria-hidden="true" style={{ display: "block", overflow: "visible", ...style }}>
        <path
            d="M4 64 C30 70 46 50 40 34 C34 18 14 26 22 42 C30 58 70 62 96 40 C104 33 110 26 114 18"
            stroke={color}
            strokeWidth="3"
            fill="none"
            strokeLinecap="round"
        />
        <path d="M100 16 L115 16 L118 31" stroke={color} strokeWidth="3" fill="none" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
);

// ניצוץ קטן
export const Sparkle = ({ color = brand.pinkSoft, style }: DoodleProps) => (
    <svg viewBox="0 0 24 24" aria-hidden="true" style={{ display: "block", ...style }}>
        <path d="M12 1 C13 8 16 11 23 12 C16 13 13 16 12 23 C11 16 8 13 1 12 C8 11 11 8 12 1 Z" fill={color} />
    </svg>
);

// סלוטייפ שמחזיק תמונה
export const Tape = ({ color = "rgba(255, 136, 186, 0.55)", style }: DoodleProps) => (
    <span
        aria-hidden="true"
        style={{
            position: "absolute",
            width: "38%",
            height: "11%",
            background: color,
            boxShadow: "0 1px 2px rgba(0,0,0,0.06)",
            ...style
        }}
    />
);
