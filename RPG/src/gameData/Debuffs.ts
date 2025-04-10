export type Debuff = {
    type: string;
};

// Base resistance values
const Debuffs = {
    Bleed: { type: "Bleed"},
    Burn: { type: "Burn"},
    Frozen: { type: "Frozen"},
    Sundered: { type: "Sundered"},
};

export default Debuffs;