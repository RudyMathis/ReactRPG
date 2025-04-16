import EnemyAtom, { EnemyType } from "../../../atom/BaseEnemyAtom";
import CharacterAtom, { CharacterType } from "../../../atom/CharacterAtom";
import { storeAtom } from "../../../atom/storeAtom";
import { HandleDamageEffect } from "../../../gameMechanics/HandleDamageEffect";
import Debuffs from "../../Debuffs";
import Resistances from "../../Resistances";
import Vulnerabilites from "../../Vulnerabilities";

export const Burn = (entity: CharacterType | EnemyType, burnStatus: { type: string; duration: number }) => {
    if (burnStatus.duration <= 0 || entity.health <= 0) {
        if (entity.type === "player") {
            storeAtom.set(CharacterAtom, (prev) => ({
                ...prev,
                [entity.id]: {
                    ...prev[entity.id],
                    debuffs: prev[entity.id].debuffs.filter(d => d.type !== Debuffs.Burn.type),
                },
            }));
        } else {
            storeAtom.set(EnemyAtom, (prev) => ({
                ...prev,
                [entity.id]: {
                    ...prev[entity.id],
                    debuffs: prev[entity.id].debuffs.filter(d => d.type !== Debuffs.Burn.type),
                },
            }));
        }
        return false;
    } else {
        const baseDamage = Debuffs.Burn.damage ?? 10;
        const fireResistance = entity.resistances.find(res => res.type === Resistances.Fire.type)?.value ?? 0;
        const fireVulnerability = entity.vulnerabilities.find(vul => vul.type === Vulnerabilites.Fire.type)?.value ?? 0;
        const multipleBurns = entity.debuffs.filter(d => d.type === Debuffs.Burn.type).length;
        const damage = Math.max(1, (baseDamage * multipleBurns) + fireVulnerability - fireResistance);
        
        if (entity.type === "player") {
            storeAtom.set(CharacterAtom, (prev) => ({
                ...prev,
                [entity.id]: {
                    ...prev[entity.id],
                    health: Math.max(prev[entity.id].health - damage, 0),
                    debuffs: prev[entity.id].debuffs
                        .map(d => d.type === Debuffs.Burn.type ? { ...d, duration: d.duration - 1 } : d)
                        .filter(d => d.duration > 0),
                },
            }));

            HandleDamageEffect(damage, "Fire", "player", entity.id);
            return true;
        } else {
            storeAtom.set(EnemyAtom, (prev) => ({
                ...prev,
                [entity.id]: {
                    ...prev[entity.id],
                    health: Math.max(prev[entity.id].health - damage, 0),
                    debuffs: prev[entity.id].debuffs
                        .map(d => d.type === Debuffs.Burn.type ? { ...d, duration: d.duration - 1 } : d)
                        .filter(d => d.duration > 0),
                },
            }));

            HandleDamageEffect(damage, "Fire", "npc", entity.id);
            return true;
        }
    }
};