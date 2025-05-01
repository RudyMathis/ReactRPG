export type Buff = {
    buffName: string;
    type: string;
    damage?: number;
    attack?: number;
    speed?: number;
    defense?: number;
    health?: number;
    icon?: string
};

const Buffs = {
    Taunter: { buffName: "Taunter", type: "Physical", defense: 2, health: 2},
    Protected: { buffName: "Protected", type: "Physical", defense: 25},
    DamageTotem: { buffName: "Damage Totem", type: "Physical", attack: 25},
    Berserk: { buffName: "Berserk", type: "Physical", attack: 25, speed: 25},
};

export default Buffs;