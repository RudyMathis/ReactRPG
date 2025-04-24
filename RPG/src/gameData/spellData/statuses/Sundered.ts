import EnemyAtom, { EnemyType } from "../../../atom/BaseEnemyAtom";
import CharacterAtom, { CharacterType } from "../../../atom/CharacterAtom";
import { storeAtom } from "../../../atom/storeAtom";
import Debuffs from "../../Debuffs";

export const Sundered = (entity: CharacterType | EnemyType, sunderedStatus: { type: string; duration: number }) => {
    // If duration is up, remove the effect and reset speed
    if (sunderedStatus.duration <= 0 || entity.health <= 0) {
        if (entity.type === "player") {
            storeAtom.set(CharacterAtom, (prev) => ({
                ...prev,
                [entity.id]: {
                    ...prev[entity.id],
                    defense: entity.defenseDefault,
                    debuffs: prev[entity.id].debuffs.filter(s => s.type !== Debuffs.Sundered.type),
                },
            }));
        } else {
            storeAtom.set(EnemyAtom, (prev) => ({
                ...prev,
                [entity.id]: {
                    ...prev[entity.id],
                    defense: entity.defenseDefault,
                    debuffs: prev[entity.id].debuffs.filter(s => s.type !== Debuffs.Sundered.type),
                },
            }));
        }
        return false;
    } else {
        if (entity.type === "player") {
            storeAtom.set(CharacterAtom, (prev) => ({
                ...prev,
                [entity.id]: {
                    ...prev[entity.id],
                    debuffs: prev[entity.id].debuffs.map(d =>
                        d.type === Debuffs.Sundered.type ? { ...d, duration: d.duration - 1 } : d
                    ),
                },
            }));
        } else {
            storeAtom.set(EnemyAtom, (prev) => ({
                ...prev,
                [entity.id]: {
                    ...prev[entity.id],
                    debuffs: prev[entity.id].debuffs.map(d =>
                        d.type === Debuffs.Sundered.type ? { ...d, duration: d.duration - 1 } : d
                    ),
                },
            }));
        }
        return true;
    }
};