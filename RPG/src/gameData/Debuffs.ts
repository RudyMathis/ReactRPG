export type Debuff = {
    type: string;
};

// Base resistance values
const Debuffs = {
    Frozen: { type: "Frozen"},
    Burn: { type: "Burn"},
    Bleed: { type: "Bleed"},
    Sundered: { type: "Sundered"},
};

export default Debuffs;