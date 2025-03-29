export type Debuff = {
    type: string;
    value: number;
};

// Base resistance values
const Debuffs = {
    Frozen: { type: "Frozen", value: 10 },
    Burn: { type: "Burn", value: 10 },
    Bleed: { type: "Bleed", value: 10 },
};

export default Debuffs;