export type Debuff = {
    name: string;
    type: string;
    damage?: number;
};

// Base resistance values
const Debuffs = {
    Bleed: { name: "Bleed", type: "Physical", damage: 10},
    Burn: { name: "Burn", type: "Fire", damage: 5},
    Frozen: { name: "Frozen", type: "Ice"},
    Sundered: { name: "Sundered", type: "Physical"},
};

export default Debuffs;