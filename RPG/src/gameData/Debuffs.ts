export type Debuff = {
    name: string;
    type: string;
    damage: number;
    speed?: number;
    attack?: number;
    defense?: number;
    icon?: string
};

const Debuffs = {
    Bleed: { name: "Bleed", type: "Physical", damage: .1 },
    Burn: { name: "Burn", type: "Fire", damage: 10, icon: '/assets/vfx/fire.png' },
    Frozen: { name: "Frozen", type: "Ice", speed: 0, icon: '/assets/vfx/ice.png' },
    Sundered: { name: "Sundered", type: "Physical", defense: 0},
};

export default Debuffs;