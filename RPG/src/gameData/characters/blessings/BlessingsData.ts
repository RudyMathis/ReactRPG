export type blessing = {
    name: string;
    type?: string;
    element?: string;
    icon?: string;
};

export const BlessingsData = {
    BlessingOfLight: {
        name: "Blessing of Light", 
        type: "Buff",
    },
    BlessingOfDamage: {
        name: "Blessing of Damage", 
        type: "Buff", 
    },
    BlessingOfHolyDamage: {
        name: "Blessing of Holy Damage", 
        type: "Damage", 
        element: "Holy", 
    },
    BlessingOfBurn: {
        name: "Blessing of Burn", 
        type: "Debuff", 
        element: "Fire",
    },
    BlessingOfManaRegen: {
        name: "Blessing of Mana Regen", 
        type: "Buff",  
    },
};