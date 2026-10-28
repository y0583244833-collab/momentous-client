import type { CSSProperties, ReactNode } from "react";
import { brand, fonts } from "../../theme/tokens";

interface NoteProps {
    children: ReactNode;
    color?: string;
    rotate?: number;
    style?: CSSProperties;
}

// פתק דביק בכתב יד
export const StickyNote = ({ children, color = "#FFE4F0", rotate = 0, style }: NoteProps) => (
    <div
        style={{
            position: "absolute",
            padding: "7% 6%",
            boxSizing: "border-box",
            background: color,
            borderRadius: "2px 2px 18px 2px",
            boxShadow: "0 14px 22px -14px rgba(28, 74, 80, 0.45)",
            transform: `rotate(${rotate}deg)`,
            fontFamily: fonts.hand,
            fontWeight: 700,
            color: brand.tealInk,
            lineHeight: 1.05,
            textAlign: "center",
            direction: "rtl",
            ...style
        }}
    >
        <span
            aria-hidden="true"
            style={{
                position: "absolute",
                top: -7,
                left: "50%",
                width: 14,
                height: 14,
                marginLeft: -7,
                borderRadius: "50%",
                background: brand.pink,
                boxShadow: "0 3px 5px rgba(0,0,0,0.2), inset -2px -2px 0 rgba(0,0,0,0.12)"
            }}
        />
        {children}
    </div>
);

// כרטיס ציטוט
export const QuoteCard = ({ children, rotate = 0, style }: Omit<NoteProps, "color">) => (
    <div
        style={{
            position: "absolute",
            padding: "6% 7% 6%",
            boxSizing: "border-box",
            background: "#FFFFFF",
            borderRadius: 14,
            borderInlineStart: `4px solid ${brand.mint}`,
            boxShadow: "0 16px 28px -16px rgba(28, 74, 80, 0.45)",
            transform: `rotate(${rotate}deg)`,
            color: brand.tealInk,
            direction: "rtl",
            ...style
        }}
    >
        <span
            aria-hidden="true"
            style={{ fontFamily: "Georgia, serif", fontSize: "2.4em", lineHeight: 0.6, color: brand.pink, display: "block", height: "0.45em" }}
        >
            ”
        </span>
        <span style={{ fontFamily: fonts.heading, fontWeight: 600, fontSize: "1em", lineHeight: 1.35, display: "block" }}>
            {children}
        </span>
    </div>
);
