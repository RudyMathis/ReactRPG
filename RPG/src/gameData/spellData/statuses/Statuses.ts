import EnemyAtom, { EnemyType } from "../../../atom/BaseEnemyAtom";
import CharacterAtom, { CharacterType } from "../../../atom/CharacterAtom";
import { storeAtom } from "../../../atom/storeAtom";
import Buffs from "../../Buffs";
import Debuffs from "../../Debuffs";
import { Berserk } from "./Berserk";
import { Bleed } from "./Bleed";
import { Burn } from "./Burn";
import { Frozen } from "./Frozen";
import { Sundered } from "./Sundered";

const getFreshEntity = (entity: CharacterType | EnemyType) =>
    entity.type === "player"
        ? storeAtom.get(CharacterAtom)[entity.id]
        : storeAtom.get(EnemyAtom)[entity.id];

export const Statuses = (entity: CharacterType | EnemyType) => {
    const entityData = getFreshEntity(entity);

    if (!entityData) return false;

    const statusHandlers = [
        { name: Debuffs.Bleed.name, handler: Bleed, damage: 10, },
        { name: Debuffs.Burn.name, handler: Burn, damage: 5,},
        { name: Debuffs.Frozen.name, handler: Frozen, damage: 0,},
        { name: Debuffs.Sundered.name, handler: Sundered, damage: 0,},
        { name: Buffs.Berserk.name, handler: Berserk, attack: 23,},
    ];

    for (const { name, handler } of statusHandlers) {

        const status = entityData.debuffs.find(d => d.name === name);
        if (status) {
            if (status.duration <= 1) {
                entityData.speed = entityData.speedDefault;
                entityData.defense = entityData.defenseDefault;
                entityData.debuffs = entityData.debuffs.filter(d => d.name !== name);
                console.log("DID DEBUFFS END?", entityData.debuffs, entityData.speed, entityData.defense);
            }
            if (status.name == Debuffs.Burn.name) {
                entityData.health = entityData.health - Burn(entity);
                console.log("NAME?", status.name, Debuffs.Burn.name, entityData.health, status.damage);
            }
            if (status.name == Debuffs.Bleed.name) {
                entityData.health = entityData.health - Bleed(entity);
                console.log("NAME?", status.name, Debuffs.Bleed.name, entityData.health, status.damage);
            }
            if (status.name == Debuffs.Frozen.name && status.duration === 3) {
                entityData.speed = entityData.speed - Frozen(entity);
                console.log("NAME?", status.name, Debuffs.Frozen.name, entityData.speed, status.damage, status, "DURATION", status.duration);
            }
            if (status.name == Debuffs.Sundered.name && status.duration === 3) {
                entityData.defense = entityData.defenseDefault - Sundered(entity);
                console.log("NAME?", status.name, Debuffs.Sundered.name, entityData.defense, status.damage, status, "DURATION", status.duration);
            }

            status.duration -= 1;
            handler(entityData);
            console.log("STATUS", status, "duration", status.duration, "entity", entity, "DAMAGE", status.damage);
        }

        const buffStatus = entityData.buffs.find(d => d.name === name);
        if (buffStatus) {
            if (buffStatus.duration <= 1) {
                entityData.attack = entityData.attackDefault;
                entityData.speed = entityData.speedDefault;
                entityData.buffs = entityData.buffs.filter(d => d.name !== name);
                console.log("DID BUFFS END?", entityData.buffs, entityData.attack, entityData.speed);
            }
            if (buffStatus.name === Buffs.Berserk.name && buffStatus.duration === 3) {
                entityData.attack = entityData.attackDefault + Berserk(entity); 
                console.log("Applied BERSERK buff", entityData.attack);
            }
            
            handler(entityData);
            buffStatus.duration -= 1;
            console.log("STATUS", buffStatus, "duration", buffStatus.duration, "entity", entity, "DAMAGE", buffStatus.damage);
        }
    }
};
