import type { CSSProperties } from "react";
import Scene, { type SceneName } from "./Scene";
import { Tape } from "./Doodles";
import { brand, fonts } from "../../theme/tokens";

interface PolaroidProps {
    scene: SceneName;
    caption?: string;
    rotate?: number;
    tapeColor?: string;
    style?: CSSProperties;
}

// תמונה בסגנון פולארויד - מסגרת לבנה, כיתוב בכתב יד וסלוטייפ
const Polaroid = ({ scene, caption, rotate = 0, tapeColor, style }: PolaroidProps) => (
    <figure
        style={{
            position: "absolute",
            margin: 0,
            boxSizing: "border-box",
            padding: "5% 5% 0",
            background: "#FFFFFF",
            borderRadius: 4,
            boxShadow: "0 18px 30px -16px rgba(28, 74, 80, 0.45), 0 3px 8px rgba(28, 74, 80, 0.08)",
            transform: `rotate(${rotate}deg)`,
            ...style
        }}
    >
        <Tape color={tapeColor} style={{ top: "-5%", left: "31%", transform: "rotate(-4deg)" }} />
        <div style={{ aspectRatio: "4 / 3", overflow: "hidden", borderRadius: 2 }}>
            <Scene name={scene} />
        </div>
        <figcaption
            style={{
                fontFamily: fonts.hand,
                fontWeight: 700,
                fontSize: "clamp(14px, 1.6em, 30px)",
                color: brand.tealInk,
                textAlign: "center",
                padding: "6% 2% 7%",
                lineHeight: 1,
                whiteSpace: "nowrap",
                direction: "rtl"
            }}
        >
            {caption}
        </figcaption>
    </figure>
);

export default Polaroid;
