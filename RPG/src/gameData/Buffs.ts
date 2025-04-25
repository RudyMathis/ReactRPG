export type Buff = {
    name: string;
    type: string;
    damage?: number;
    attack: number;
    icon?: string
};

const Buffs = {
    Taunt: { name: "Taunt", type: "Physical", attack: 0},
    Protected: { name: "Protected", type: "Physical", attack: 0 },
    Berserk: { name: "Berserk", type: "Physical", attack: 25},
};

export default Buffs;