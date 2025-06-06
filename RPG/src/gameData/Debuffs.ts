export type Debuff = {
    name: string;
    type: string;
    damage: number;
    speed?: number;
    attack?: number;
    defense?: number;
    icon: string
};

const Debuffs = {
    Bleed: { name: "Bleed", type: "Physical", damage: .1, icon: '/assets/vfx/bleed.png'},
    Burn: { name: "Burn", type: "Fire", damage: 10, icon: '/assets/vfx/fire.png' },
    Frozen: { name: "Frozen", type: "Ice", speed: 0, icon: '/assets/vfx/ice.png' },
    Sundered: { name: "Sundered", type: "Physical", defense: 0, icon: '/assets/vfx/sundered.png'},
    Weaken: { name: "Weaken", type: "Holy", attack: 2, icon: '/assets/vfx/sundered.png'},
};

export default Debuffs;