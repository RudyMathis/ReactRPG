export const StatusNames = {
    Bleed: "Bleed",
    Burn: "Burn",
    Frozen: "Frozen",
    Sundered: "Sundered",
    Weaken: "Weaken",
    Berserk: "Berserk",
    DamageTotem: "DamageTotem",
    Protected: "Protected",
    Taunter: "Taunter",
} as const;

export type StatusName = typeof StatusNames[keyof typeof StatusNames];