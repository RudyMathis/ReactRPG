import EnemyAtom, { EnemyType } from "../../../atom/BaseEnemyAtom";
import CharacterAtom, { CharacterType } from "../../../atom/CharacterAtom";
import { storeAtom } from "../../../atom/storeAtom";
import Debuffs from "../../Debuffs";
import { Bleed } from "./Bleed";
import { Burn } from "./Burn";
import { Frozen } from "./Frozen";
import { Sundered } from "./Sundered";


export const Statuses = (entity: CharacterType | EnemyType) => {
    const entityData = entity.type === "player"
        ? storeAtom.get(CharacterAtom)[entity.id]
        : storeAtom.get(EnemyAtom)[entity.id];

    if (!entityData) return false;

    const statusHandlers = [
        { type: Debuffs.Bleed.type, handler: Bleed },
        { type: Debuffs.Burn.type, handler: Burn },
        { type: Debuffs.Frozen.type, handler: Frozen },
        { type: Debuffs.Sundered.type, handler: Sundered },
    ];

    for (const { type, handler } of statusHandlers) {
        const status = entityData.debuffs.find(d => d.type === type);
        if (status) {
            handler(entityData, status);
        }
    }

    console.log("Statuses", entity);
};
