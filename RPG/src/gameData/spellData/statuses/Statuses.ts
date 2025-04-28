import EnemyAtom, { EnemyType } from "../../../atom/BaseEnemyAtom";
import CharacterAtom, { CharacterType } from "../../../atom/CharacterAtom";
import { storeAtom } from "../../../atom/storeAtom";
import { StatusEffects } from "./StatusEffects";
import { StatusName } from "./StatusNames";

const getFreshEntity = (entity: CharacterType | EnemyType) =>
    entity.type === "player"
        ? storeAtom.get(CharacterAtom)[entity.id]
        : storeAtom.get(EnemyAtom)[entity.id];

        export const Statuses = (entity: CharacterType | EnemyType) => {
            const entityData = getFreshEntity(entity);
            if (!entityData) return false;
        
            for (const debuff of entityData.debuffs) {
                const effect = StatusEffects[debuff.name as StatusName];
                if (effect) {
                    effect.perTurn?.(entityData, debuff);
                    debuff.duration -= 1;
                    if (debuff.duration <= 0) {
                        effect.onExpire?.(entityData);
                        entityData.debuffs = entityData.debuffs.filter(d => d.name !== debuff.name);
                    }
                }
            }
        
            for (const buff of entityData.buffs) {
                const effect = StatusEffects[buff.name as StatusName];
                if (effect) {
                    effect.perTurn?.(entityData, buff);
                    buff.duration -= 1;
                    if (buff.duration <= 0) {
                        effect.onExpire?.(entityData);
                        entityData.buffs = entityData.buffs.filter(b => b.name !== buff.name);
                    }
                }
            }
        };