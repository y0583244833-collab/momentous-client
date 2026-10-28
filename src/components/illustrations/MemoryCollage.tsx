import Polaroid from "./Polaroid";
import { StickyNote, QuoteCard } from "./Notes";
import { HandHeart, HandArrow, LoopArrow, Sparkle } from "./Doodles";
import { brand, fonts } from "../../theme/tokens";

export type CollageVariant = "hero" | "auth" | "compact";

interface MemoryCollageProps {
    variant: CollageVariant;
}

const aspect: Record<CollageVariant, string> = {
    hero: "1 / 0.92",
    auth: "1 / 1.05",
    compact: "16 / 7"
};

// לוח זיכרונות מאויר: פולארואידים, פתקים, ציטוט, לבבות וחיצים.
// כל המידות באחוזים וביחידות cqw כדי שהלוח יגדל ויקטן כמקשה אחת.
const MemoryCollage = ({ variant }: MemoryCollageProps) => (
    <div
        aria-hidden="true"
        style={{
            position: "relative",
            width: "100%",
            aspectRatio: aspect[variant],
            containerType: "inline-size",
            direction: "ltr",
            userSelect: "none",
            pointerEvents: "none"
        }}
    >
        {variant === "hero" && (
            <>
                <Polaroid scene="trip" caption="הטיול שלנו" rotate={-6} style={{ left: "3%", top: "5%", width: "35%", fontSize: "3cqw" }} />
                <Polaroid scene="party" caption="סוף שנה!" rotate={5} tapeColor="rgba(102, 208, 188, 0.6)" style={{ left: "59%", top: "3%", width: "35%", fontSize: "3cqw" }} />
                <Polaroid scene="family" caption="ערב משפחה" rotate={-3} style={{ left: "31%", top: "45%", width: "34%", fontSize: "3cqw" }} />
                <StickyNote rotate={4} style={{ left: "3%", top: "53%", width: "27%", fontSize: "4.2cqw" }}>
                    את זה אסור
                    <br />
                    לשכוח!
                </StickyNote>
                <QuoteCard rotate={-4} style={{ left: "68%", top: "44%", width: "29%", fontSize: "2.9cqw" }}>
                    הכי צחקנו בדרך חזרה
                </QuoteCard>
                <StickyNote color={brand.mintMist} rotate={-6} style={{ left: "75%", top: "79%", width: "19%", fontSize: "4cqw" }}>
                    עוד!!
                </StickyNote>
                <HandHeart filled style={{ position: "absolute", left: "45%", top: "13%", width: "8%" }} />
                <HandHeart color={brand.tealDeep} style={{ position: "absolute", left: "52%", top: "29%", width: "5%" }} />
                <HandHeart color={brand.pinkSoft} filled style={{ position: "absolute", left: "89%", top: "39%", width: "5%" }} />
                <HandArrow style={{ position: "absolute", left: "17%", top: "44%", width: "12%", transform: "rotate(30deg)" }} />
                <LoopArrow style={{ position: "absolute", left: "63%", top: "88%", width: "11%", transform: "scaleX(-1)" }} />
                <Sparkle style={{ position: "absolute", left: "1%", top: "44%", width: "3.5%" }} />
                <Sparkle color={brand.mint} style={{ position: "absolute", left: "93%", top: "1%", width: "4.5%" }} />
                <Sparkle color={brand.pink} style={{ position: "absolute", left: "28%", top: "88%", width: "3%" }} />
                <div
                    style={{
                        position: "absolute",
                        left: "5%",
                        top: "84%",
                        display: "flex",
                        alignItems: "center",
                        gap: "1.2cqw",
                        padding: "1.2cqw 2.6cqw",
                        borderRadius: 999,
                        background: "#FFFFFF",
                        boxShadow: "0 10px 20px -12px rgba(28, 74, 80, 0.5)",
                        fontFamily: fonts.heading,
                        fontWeight: 600,
                        fontSize: "2.6cqw",
                        color: brand.pinkDeep,
                        direction: "rtl"
                    }}
                >
                    <HandHeart filled style={{ width: "3.4cqw" }} />
                    12 אהבו
                </div>
            </>
        )}

        {variant === "auth" && (
            <>
                <Polaroid scene="sea" caption="קיץ בים" rotate={-7} style={{ left: "4%", top: "3%", width: "45%", fontSize: "3.6cqw" }} />
                <Polaroid scene="camp" caption="לילה בשטח" rotate={6} tapeColor="rgba(102, 208, 188, 0.6)" style={{ left: "51%", top: "11%", width: "43%", fontSize: "3.6cqw" }} />
                <Polaroid scene="place" caption="המקום שלנו" rotate={-3} style={{ left: "9%", top: "55%", width: "42%", fontSize: "3.4cqw" }} />
                <StickyNote rotate={5} style={{ left: "56%", top: "63%", width: "37%", fontSize: "5cqw" }}>
                    שומרים לנו
                    <br />
                    מקום ♡
                </StickyNote>
                <HandHeart filled style={{ position: "absolute", left: "3%", top: "46%", width: "7%" }} />
                <HandHeart color="#FFFFFF" style={{ position: "absolute", left: "86%", top: "1%", width: "7%" }} />
                <HandArrow color="#FFFFFF" style={{ position: "absolute", left: "52%", top: "51%", width: "13%", transform: "rotate(160deg)" }} />
                <LoopArrow color={brand.pink} style={{ position: "absolute", left: "62%", top: "88%", width: "20%" }} />
                <Sparkle color="#FFFFFF" style={{ position: "absolute", left: "47%", top: "2%", width: "4%" }} />
                <Sparkle color={brand.pink} style={{ position: "absolute", left: "92%", top: "56%", width: "4%" }} />
            </>
        )}

        {variant === "compact" && (
            <>
                <Polaroid scene="trip" caption="הטיול שלנו" rotate={-6} style={{ left: "5%", top: "12%", width: "24%", fontSize: "2.4cqw" }} />
                <Polaroid scene="party" caption="סוף שנה!" rotate={4} tapeColor="rgba(102, 208, 188, 0.6)" style={{ left: "34%", top: "6%", width: "23%", fontSize: "2.4cqw" }} />
                <StickyNote rotate={-4} style={{ left: "64%", top: "22%", width: "30%", fontSize: "3.8cqw" }}>
                    לא לשכוח!
                </StickyNote>
                <HandHeart filled style={{ position: "absolute", left: "59%", top: "60%", width: "5%" }} />
                <Sparkle color={brand.pink} style={{ position: "absolute", left: "93%", top: "8%", width: "3%" }} />
                <Sparkle color={brand.mint} style={{ position: "absolute", left: "1%", top: "10%", width: "3%" }} />
            </>
        )}
    </div>
);

export default MemoryCollage;
