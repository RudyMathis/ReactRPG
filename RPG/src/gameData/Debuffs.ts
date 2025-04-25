export type Debuff = {
    name: string;
    type: string;
    damage: number;
    icon?: string
};

const Debuffs = {
    Bleed: { name: "Bleed", type: "Physical", damage: 10 },
    Burn: { name: "Burn", type: "Fire", damage: 5, icon: '/assets/vfx/fire.png' },
    Frozen: { name: "Frozen", type: "Ice", damage: 0, icon: '/assets/vfx/ice.png' },
    Sundered: { name: "Sundered", type: "Physical", damage: 0},
};

export default Debuffs;