import { brand } from "../../theme/tokens";

export type SceneName = "trip" | "sea" | "party" | "family" | "camp" | "place";

interface SceneProps {
    name: SceneName;
}

// איורים וקטוריים פשוטים בפלטת המותג - משמשים כ"תמונות" בפולארואידים ובכרטיסי ההמחשה
const Scene = ({ name }: SceneProps) => {
    const common = {
        viewBox: "0 0 200 150",
        preserveAspectRatio: "xMidYMid slice",
        width: "100%",
        height: "100%",
        style: { display: "block" },
        "aria-hidden": true
    } as const;

    switch (name) {
        case "trip":
            return (
                <svg {...common}>
                    <defs>
                        <linearGradient id="sky-trip" x1="0" y1="0" x2="0" y2="1">
                            <stop offset="0" stopColor="#FFE4F0" />
                            <stop offset="1" stopColor={brand.mintMist} />
                        </linearGradient>
                    </defs>
                    <rect width="200" height="150" fill="url(#sky-trip)" />
                    <circle cx="150" cy="42" r="18" fill={brand.pinkSoft} />
                    <path d="M0 115 L45 60 L80 100 L115 50 L160 105 L200 75 L200 150 L0 150 Z" fill={brand.teal} />
                    <path d="M45 60 L57 75 L48 72 L40 78 Z M115 50 L128 66 L117 62 L106 68 Z" fill="#FFFFFF" opacity="0.85" />
                    <path d="M0 130 Q60 110 110 128 T200 120 L200 150 L0 150 Z" fill={brand.mint} />
                    <path d="M95 150 Q100 135 92 128 Q86 122 96 116" stroke="#FFFFFF" strokeWidth="3" fill="none" strokeDasharray="5 5" strokeLinecap="round" />
                </svg>
            );
        case "sea":
            return (
                <svg {...common}>
                    <rect width="200" height="150" fill="#FFF3F8" />
                    <circle cx="60" cy="70" r="26" fill={brand.pinkSoft} />
                    <rect y="78" width="200" height="72" fill={brand.teal} />
                    <path d="M0 88 Q25 80 50 88 T100 88 T150 88 T200 88 L200 150 L0 150 Z" fill={brand.mint} opacity="0.9" />
                    <path d="M0 108 Q25 100 50 108 T100 108 T150 108 T200 108" stroke="#FFFFFF" strokeWidth="2.5" fill="none" opacity="0.7" />
                    <path d="M0 126 Q25 118 50 126 T100 126 T150 126 T200 126" stroke="#FFFFFF" strokeWidth="2.5" fill="none" opacity="0.5" />
                    <path d="M140 84 L140 50 L162 80 Z" fill={brand.pink} />
                    <path d="M126 84 L170 84 L162 93 L132 93 Z" fill={brand.tealInk} />
                </svg>
            );
        case "party":
            return (
                <svg {...common}>
                    <rect width="200" height="150" fill={brand.mintWhisper} />
                    <path d="M0 18 Q100 48 200 18" stroke={brand.tealDeep} strokeWidth="1.5" fill="none" />
                    {[18, 46, 74, 102, 130, 158, 186].map((x, i) => (
                        <path
                            key={x}
                            d={`M${x - 9} ${22 + Math.sin((x / 200) * Math.PI) * 26} l9 16 l9 -16 Z`}
                            fill={[brand.pink, brand.mint, brand.pinkSoft, brand.teal][i % 4]}
                        />
                    ))}
                    <g>
                        <path d="M60 140 Q66 110 62 92" stroke={brand.tealDeep} strokeWidth="1.2" fill="none" />
                        <ellipse cx="62" cy="76" rx="17" ry="21" fill={brand.pink} />
                        <path d="M108 140 Q100 112 104 86" stroke={brand.tealDeep} strokeWidth="1.2" fill="none" />
                        <ellipse cx="104" cy="70" rx="17" ry="21" fill={brand.mint} />
                        <path d="M146 140 Q150 116 146 96" stroke={brand.tealDeep} strokeWidth="1.2" fill="none" />
                        <ellipse cx="146" cy="80" rx="15" ry="19" fill={brand.pinkSoft} />
                        <ellipse cx="56" cy="69" rx="4" ry="7" fill="#FFFFFF" opacity="0.5" />
                        <ellipse cx="98" cy="63" rx="4" ry="7" fill="#FFFFFF" opacity="0.5" />
                    </g>
                    {[[24, 70], [178, 60], [30, 120], [176, 118], [128, 40]].map(([x, y], i) => (
                        <rect key={i} x={x} y={y} width="6" height="3" rx="1" fill={i % 2 ? brand.pink : brand.teal} transform={`rotate(${i * 35} ${x} ${y})`} />
                    ))}
                </svg>
            );
        case "family":
            return (
                <svg {...common}>
                    <rect width="200" height="150" fill="#FFF3F8" />
                    <circle cx="160" cy="36" r="14" fill={brand.pinkSoft} />
                    <rect y="118" width="200" height="32" fill={brand.mint} />
                    <path d="M58 118 L58 74 L95 46 L132 74 L132 118 Z" fill="#FFFFFF" stroke={brand.tealDeep} strokeWidth="2" />
                    <path d="M50 78 L95 42 L140 78" stroke={brand.pink} strokeWidth="7" strokeLinecap="round" strokeLinejoin="round" fill="none" />
                    <rect x="84" y="94" width="22" height="24" rx="3" fill={brand.teal} />
                    <path d="M95 70 c-3 -5 -11 -3 -9 3 c1 4 9 9 9 9 c0 0 8 -5 9 -9 c2 -6 -6 -8 -9 -3 Z" fill={brand.pink} />
                    <circle cx="165" cy="96" r="18" fill={brand.teal} />
                    <circle cx="178" cy="104" r="13" fill={brand.mint} />
                    <rect x="164" y="104" width="5" height="16" fill={brand.tealInk} />
                    <circle cx="28" cy="108" r="6" fill={brand.pink} />
                    <circle cx="40" cy="112" r="4" fill={brand.pinkSoft} />
                </svg>
            );
        case "camp":
            return (
                <svg {...common}>
                    <rect width="200" height="150" fill={brand.tealInk} />
                    {[[20, 20], [60, 35], [110, 15], [150, 30], [185, 12], [85, 45], [170, 55]].map(([x, y], i) => (
                        <circle key={i} cx={x} cy={y} r={i % 3 ? 1.5 : 2.2} fill="#FFFFFF" opacity="0.85" />
                    ))}
                    <circle cx="40" cy="42" r="11" fill="#FFF3F8" />
                    <circle cx="45" cy="38" r="10" fill={brand.tealInk} />
                    <rect y="118" width="200" height="32" fill={brand.tealDeep} />
                    <path d="M40 122 L80 62 L120 122 Z" fill={brand.mint} />
                    <path d="M80 62 L80 122 L94 122 Z" fill={brand.teal} />
                    <path d="M150 122 q-10 -14 0 -30 q4 12 10 6 q6 14 -10 24 Z" fill={brand.pink} />
                    <path d="M152 122 q-4 -8 0 -14 q3 6 6 4 q2 6 -6 10 Z" fill="#FFE4F0" />
                    <path d="M136 124 L170 116 M136 116 L170 124" stroke="#8A5A44" strokeWidth="4" strokeLinecap="round" />
                </svg>
            );
        case "place":
        default:
            return (
                <svg {...common}>
                    <rect width="200" height="150" fill={brand.mintMist} />
                    <path d="M0 40 L70 20 L130 45 L200 25 L200 150 L0 150 Z" fill={brand.aquaMist} />
                    <path d="M0 95 Q60 70 100 100 T200 90" stroke="#FFFFFF" strokeWidth="10" fill="none" />
                    <path d="M30 150 Q60 110 120 120 T190 60" stroke={brand.teal} strokeWidth="2.5" fill="none" strokeDasharray="6 6" strokeLinecap="round" />
                    <circle cx="40" cy="60" r="14" fill={brand.mint} />
                    <circle cx="160" cy="125" r="18" fill={brand.mint} />
                    <path d="M150 74 c0 -18 -26 -18 -26 0 c0 12 13 26 13 26 c0 0 13 -14 13 -26 Z" fill={brand.pink} />
                    <circle cx="137" cy="73" r="5" fill="#FFFFFF" />
                </svg>
            );
    }
};

export default Scene;
