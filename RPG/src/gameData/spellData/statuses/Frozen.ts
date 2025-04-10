import EnemyAtom, { EnemyType } from "../../../atom/BaseEnemyAtom";
import CharacterAtom, { CharacterType } from "../../../atom/CharacterAtom";
import { storeAtom } from "../../../atom/storeAtom";
import Debuffs from "../../Debuffs";

export const Frozen = (entity: CharacterType | EnemyType, frozenStatus: { type: string; duration: number }) => {
    // If duration is up, remove the effect and reset speed
    if (frozenStatus.duration <= 0 || entity.health <= 0) {
        if (entity.type === "player") {
            storeAtom.set(CharacterAtom, (prev) => ({
                ...prev,
                [entity.id]: {
                    ...prev[entity.id],
                    speed: entity.speedDefault,
                    debuffs: prev[entity.id].debuffs.filter(s => s.type !== Debuffs.Frozen.type),
                },
            }));
        } else {
            storeAtom.set(EnemyAtom, (prev) => ({
                ...prev,
                [entity.id]: {
                    ...prev[entity.id],
                    speed: entity.speedDefault,
                    debuffs: prev[entity.id].debuffs.filter(s => s.type !== Debuffs.Frozen.type),
                },
            }));
        }
        return false;
    } else {
        // Decrement duration and update the debuff array
        if (entity.type === "player") {
            storeAtom.set(CharacterAtom, (prev) => ({
                ...prev,
                [entity.id]: {
                    ...prev[entity.id],
                    debuffs: prev[entity.id].debuffs.map(d =>
                        d.type === Debuffs.Frozen.type ? { ...d, duration: d.duration - 1 } : d
                    ),
                },
            }));
        } else {
            storeAtom.set(EnemyAtom, (prev) => ({
                ...prev,
                [entity.id]: {
                    ...prev[entity.id],
                    debuffs: prev[entity.id].debuffs.map(d =>
                        d.type === Debuffs.Frozen.type ? { ...d, duration: d.duration - 1 } : d
                    ),
                },
            }));
        }
        return true;
    }
};