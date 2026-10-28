// צבעי המותג של Momenta - מקור אמת אחד לכל האתר
export const brand = {
    pink: "#FF3E9B",
    pinkSoft: "#FF88BA",
    pinkDeep: "#C81F72",
    pinkInk: "#8E1450",
    pinkMist: "#FFE4F0",
    pinkWhisper: "#FFF3F8",

    teal: "#3A8B95",
    tealDeep: "#2A6870",
    tealInk: "#1C4A50",
    mint: "#66D0BC",
    mintMist: "#DDF5EF",
    mintWhisper: "#F0FBF8",
    aquaMist: "#E3F2F4",

    ink: "#1C4A50",
    inkSoft: "#4E6E72",
    white: "#FFFFFF"
} as const;

export const gradients = {
    // רקע כללי של האתר: מנטה -> תכלת־טורקיז, עם נגיעה ורודה בסוף
    page: `linear-gradient(165deg, ${brand.mintWhisper} 0%, ${brand.aquaMist} 45%, #EAF7F3 75%, ${brand.pinkWhisper} 100%)`,
    authForm: `linear-gradient(180deg, ${brand.pinkWhisper} 0%, #FFEEF5 100%)`,
    authArt: `radial-gradient(circle at 18% 20%, rgba(255,255,255,0.55) 0%, transparent 40%), linear-gradient(150deg, ${brand.mintMist} 0%, #BFE9DF 40%, #9ED8CF 70%, #7FC3C4 100%)`,
    heroArt: `linear-gradient(150deg, ${brand.mintMist} 0%, ${brand.aquaMist} 55%, #CDEDEA 100%)`,
    brand: `linear-gradient(120deg, ${brand.pink} 0%, ${brand.pinkSoft} 45%, ${brand.mint} 100%)`,
    brandStrong: `linear-gradient(120deg, ${brand.pink} 0%, ${brand.teal} 100%)`,
    pinkButton: `linear-gradient(135deg, ${brand.pink} 0%, #F0398F 55%, ${brand.pinkDeep} 100%)`,
    tealButton: `linear-gradient(135deg, ${brand.teal} 0%, ${brand.tealDeep} 100%)`,
    pinkPanel: `linear-gradient(145deg, ${brand.pinkMist} 0%, ${brand.pinkWhisper} 100%)`,
    mintPanel: `linear-gradient(145deg, ${brand.mintMist} 0%, ${brand.aquaMist} 100%)`,
    footer: `linear-gradient(135deg, ${brand.tealInk} 0%, ${brand.tealDeep} 55%, ${brand.teal} 100%)`,
    heroOverlay: "linear-gradient(0deg, rgba(28, 74, 80, 0.85) 0%, rgba(28, 74, 80, 0.35) 55%, rgba(200, 31, 114, 0.15) 100%)",
    placeholder: `linear-gradient(135deg, ${brand.pinkSoft} 0%, ${brand.pinkMist} 40%, ${brand.mintMist} 70%, ${brand.mint} 100%)`
} as const;

export const fonts = {
    script: "'Dancing Script', cursive",
    hand: "'Amatic SC', 'Rubik', sans-serif",
    heading: "'Rubik', 'Heebo', system-ui, sans-serif"
} as const;

export const softShadow = "0 10px 30px -12px rgba(200, 31, 114, 0.18), 0 4px 12px -6px rgba(42, 104, 112, 0.12)";
export const liftShadow = "0 18px 40px -14px rgba(200, 31, 114, 0.28), 0 8px 18px -8px rgba(42, 104, 112, 0.18)";
