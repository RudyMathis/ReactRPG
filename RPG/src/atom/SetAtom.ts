import { CharacterAttack } from "../gameData/spellData/CharacterAttack";
import EnemyAtom, { EnemyType } from "./BaseEnemyAtom";
import CharacterAtom, { CharacterType }  from "./CharacterAtom";
import { storeAtom } from "./storeAtom";

export const HandleEnemyHealthUpdate = (playerTarget: EnemyType, character: CharacterType, spell: string, spellCost: number) => {
    const updatedEnemyHealth = CharacterAttack(playerTarget, character, playerTarget, spell, spellCost);

    storeAtom.set(EnemyAtom, (prev) => ({
        ...prev,
        [playerTarget.id]: {
            ...prev[playerTarget.id],
            health: updatedEnemyHealth,
        },
    }));
}

export const HandleCharacterHealthUpdate = (playerTarget: CharacterType, updatedHealth: number) => { 
    if(updatedHealth <= 0) {
        storeAtom.set(CharacterAtom, (prev) => ({
            ...prev,
            [playerTarget.id]: {
                ...prev[playerTarget.id],
                health: updatedHealth,
                buffs: [],
                debuffs: [],
                blessings: [],
            },
        }));
    } else {
        storeAtom.set(CharacterAtom, (prev) => ({
            ...prev,
            [playerTarget.id]: {
                ...prev[playerTarget.id],
                health: updatedHealth
            },
        }));
    }
}

export const HandleSetCurrentTurn = (character: CharacterType, isTurn: boolean) => { 
    if(character.health <= 0) {
        storeAtom.set(CharacterAtom, (prev) => ({
            ...prev,
            [character.id]: {
                ...prev[character.id],
                buffs: [],
                debuffs: [],
                blessings: [],
            },
        }));
    } else {
        storeAtom.set(CharacterAtom, prev => ({
            ...prev,
            [character.id]: { ...character, currentTurn: isTurn }
        }));
    }
}

export const HandleCharacterManaUpdate = (playerTarget: CharacterType, updatedMana: number) => { 
    storeAtom.set(CharacterAtom, (prev) => ({
        ...prev,
        [playerTarget.id]: {
            ...prev[playerTarget.id],
            mana: updatedMana,
        },
    }));
};