// StatusEffects.ts
import { StatusName } from "./StatusNames";
import { CharacterType } from "../../../atom/CharacterAtom";
import { EnemyType } from "../../../atom/BaseEnemyAtom";
import { HandleDamageEffect } from "../../../gameMechanics/HandleDamageEffect";
import Debuffs from "../../Debuffs";
import Resistances from "../../Resistances";
import Vulnerabilities from "../../Vulnerabilities";
import Buffs from "../../Buffs";

type Entity = CharacterType | EnemyType;
type StatusEffect = {
    name: StatusName;
    perTurn?: (entity: Entity, status?: { duration: number }) => void;
    onExpire?: (entity: Entity) => void;
}

export const StatusEffects: Record<StatusName, StatusEffect> = {
    Bleed: {
        name: "Bleed",
        perTurn: (entity) => {
            if(entity.type === "player") {
                const bleedDamage = Math.round(Math.max(5, Debuffs.Bleed.damage * entity.maxHealth));
                HandleDamageEffect(bleedDamage, "Physical", "player", entity.id);
            } else {
                const bleedDamage = Math.round(Math.max(5, Debuffs.Bleed.damage * entity.maxHealth));
                HandleDamageEffect(bleedDamage, "Physical", "npc", entity.id); 
            }
        },
        // onExpire: (entity) => {
        //     console.log("Bleed expired for", entity.id);
        // },
    },

    Burn: {
        name: "Burn",
        perTurn: (entity) => {
            if(entity.type === "player") {
                const baseDamage = Debuffs.Burn.damage;
                const fireResistance = entity.resistances.find(res => res.type === Resistances.Fire.type)?.value ?? 0;
                const fireVulnerability = entity.vulnerabilities.find(vul => vul.type === Vulnerabilities.Fire.type)?.value ?? 0;
                const multipleBurns = entity.debuffs.filter(d => d.type === Debuffs.Burn.type).length;
                const burnDamage = Math.max(5, (baseDamage * multipleBurns) + fireVulnerability - fireResistance);
    
                entity.health -= burnDamage;
                HandleDamageEffect(burnDamage, "Fire", "player", entity.id);
            } else {
                const baseDamage = Debuffs.Burn.damage;
                const fireResistance = entity.resistances.find(res => res.type === Resistances.Fire.type)?.value ?? 0;
                const fireVulnerability = entity.vulnerabilities.find(vul => vul.type === Vulnerabilities.Fire.type)?.value ?? 0;
                const multipleBurns = entity.debuffs.filter(d => d.type === Debuffs.Burn.type).length;
                const burnDamage = Math.max(5, (baseDamage * multipleBurns) + fireVulnerability - fireResistance);
    
                entity.health -= burnDamage;
                HandleDamageEffect(burnDamage, "Fire", "npc", entity.id); 
            }
        },
        // onExpire: (entity) => {
        //     console.log("Burn expired", entity.name);
        // }
    },

    Frozen: {
        name: "Frozen",
        perTurn: (entity, status) => {
            if (status?.duration === 3) {
                entity.speed = Debuffs.Frozen.speed;
            }
        },
        onExpire: (entity) => {
            entity.speed = entity.speedDefault;
        }
    },

    Sundered: {
        name: "Sundered",
        perTurn: (entity, status) => {
            if (status?.duration === 3) {
                entity.defense = Debuffs.Sundered.defense;
            }
        },
        onExpire: (entity) => {
            entity.defense = entity.defenseDefault;
        }
    },

    Berserk: {
        name: "Berserk",
        perTurn: (entity, status) => {
            if (status?.duration === 3) {
                entity.attack = entity.attackDefault + Buffs.Berserk.attack;
                entity.speed = entity.speedDefault + Buffs.Berserk.speed;
            }
        },
        onExpire: (entity) => {
            entity.attack = entity.attackDefault;
            entity.speed = entity.speedDefault;
        }
    },

    DamageTotem: {
        name: "DamageTotem",
        perTurn: (entity, status) => {
            if (status?.duration === 3) {
                entity.attack = entity.attackDefault + Buffs.DamageTotem.attack;
            }
        },
        onExpire: (entity) => {
            entity.attack = entity.attackDefault;
        }
    },

    Protected: {
        name: "Protected",
        perTurn: (entity, status) => {
            if (status?.duration === 3) {
                entity.defense = entity.defenseDefault + Buffs.Protected.defense;
            }
        },
        onExpire: (entity) => {
            entity.defense = entity.defenseDefault;
        }
    },

    Taunter: {
        name: "Taunter",
        perTurn: (entity, status) => {
            if (status?.duration === 3) {
                entity.defense = entity.defenseDefault * Buffs.Taunter.defense;
            }
        },
        onExpire: (entity) => {
            entity.defense = entity.defenseDefault;
            if(entity.health < entity.maxHealth){
                return entity.health 
            } else {
                entity.health = entity.maxHealth
            }
        }
    }
};