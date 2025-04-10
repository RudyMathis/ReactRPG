import { CharacterType } from "../../../atom/CharacterAtom";
import HealChar20 from "./HealChar20";
import CureChar10 from "./CureChar10";

const buffs: Record<string, (character: CharacterType, target: CharacterType, spellCost: number) => number> = {
    Heal__Char$20: HealChar20,
    Cure__Char$10: CureChar10,
};

export default buffs;
