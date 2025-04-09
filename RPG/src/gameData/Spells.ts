import EnemyAtom, { EnemyType } from "../atom/BaseEnemyAtom";
import { CharacterType } from "../atom/CharacterAtom";
import { BaseDamageFlashAtom } from "../atom/effects/BaseDamageFlashAtom";
import { ShakeAtom } from "../atom/effects/ShakeAtom";
import { storeAtom } from "../atom/storeAtom";
import { HandleDamageEffect } from "../gameMechanics/HandleDamageEffect";
import Resistances from "../gameData/Resistances";
import Debuffs from "./Debuffs";
import Vulnerabilites from "./Vulnerabilities";

const spellEffects: Record<string, (enemy: EnemyType, character: CharacterType, target: CharacterType | EnemyType, spellCost: number) => number> = {
    Fire_Ball_Tar$20: (enemy, character, target, spellCost) =>{ 
        if(target === character) {
            character.debuffs.push({ type: Debuffs.Burn.type, duration: 3 });
            spellCost = 20;
            enemy.mana -= spellCost;
    
            const fireResistance = character.resistances.find(res => res.type ===  Resistances.Fire.type);
            const fireVulnerability = character.vulnerabilities.find(vul => vul.type === Vulnerabilites.Fire.type);
            const damageResistance = Math.max(1, Math.round(enemy.attack - Resistances.Fire.value))
            const damageVulnerability = Math.round(enemy.attack + Vulnerabilites.Fire.value)
            
            if (fireResistance) {
                HandleDamageEffect(damageResistance, "Fire", "player", character.id);
                return character.health - damageResistance;
            } else if (fireVulnerability) {
                HandleDamageEffect(damageVulnerability, "Fire", "player", character.id);
                return character.health - damageVulnerability;
            } else {
                HandleDamageEffect(enemy.attack, "Fire", "player", character.id);
                return character.health - enemy.attack;
            }
        } else {
            enemy.debuffs.push({ type: Debuffs.Burn.type, duration: 3 });
            const spellCost = 20;
            character.mana -= spellCost;
    
            const fireResistance = enemy.resistances.find(res => res.type ===  Resistances.Fire.type);
            const fireVulnerability = enemy.vulnerabilities.find(vul => vul.type === Vulnerabilites.Fire.type);
            const damageResistance = Math.max(1, Math.round(character.attack - Resistances.Fire.value))
            const damageVulnerability = Math.round(character.attack + Vulnerabilites.Fire.value)

            if (fireResistance) {
                HandleDamageEffect(damageResistance, "Fire", "npc", enemy.id);
                return enemy.health - (damageResistance + AdditionalBlessingDamage(character));
            } else if (fireVulnerability) {
                HandleDamageEffect(damageVulnerability, "Fire", "npc", enemy.id);
                return enemy.health - (damageVulnerability + AdditionalBlessingDamage(character));
            } else {
                HandleDamageEffect(character.attack, "Fire", "npc", enemy.id);
                return enemy.health - (character.attack + AdditionalBlessingDamage(character));
            }
        }
    },
    Ice_Bolt_Tar$30: (enemy, character, target, spellCost) => {
        if(target === character) {
            character.debuffs.push({ type: Debuffs.Frozen.type, duration: 3 });
            character.speed = 0;
            spellCost = 30;
            enemy.mana -= spellCost;
    
            const iceResistance = character.resistances.find(resistance => resistance.type === Resistances.Ice.type);
            const iceVulnerability = character.vulnerabilities.find(vulnerability => vulnerability.type === Vulnerabilites.Ice.type);
            const damageResistance = Math.max(1, Math.round(enemy.attack - Resistances.Ice.value))
            const damageVulnerability = Math.round(enemy.attack + Vulnerabilites.Ice.value)
            
            if(iceResistance) {
                HandleDamageEffect(damageResistance, "Ice", "player", character.id);
                return character.health - damageResistance;
            } else if (iceVulnerability) {
                HandleDamageEffect(damageVulnerability, "Ice", "player", character.id);
                return character.health - damageVulnerability;
            } else {
                HandleDamageEffect(enemy.attack, "Ice", "player", character.id);
                return character.health - enemy.attack;
            }
        } else {
            enemy.debuffs.push({ type: Debuffs.Frozen.type, duration: 3 });
            enemy.speed = 0;
            spellCost = 30;
            character.mana -= spellCost;
    
            const iceResistance = enemy.resistances.find(resistance => resistance.type === Resistances.Ice.type);
            const iceVulnerability = enemy.vulnerabilities.find(vulnerability => vulnerability.type === Vulnerabilites.Ice.type);
            const damageResistance = Math.max(1, Math.round(character.attack - Resistances.Ice.value))
            const damageVulnerability = Math.round(character.attack + Vulnerabilites.Ice.value)
            
            if(iceResistance) {
                HandleDamageEffect(damageResistance, "Ice", "npc", enemy.id);
                return enemy.health - (damageResistance + AdditionalBlessingDamage(character));
            } else if (iceVulnerability) {
                HandleDamageEffect(damageVulnerability, "Ice", "npc", enemy.id);
                return enemy.health - (damageVulnerability + AdditionalBlessingDamage(character));
            } else {
                HandleDamageEffect(character.attack, "Ice", "npc", enemy.id);
                return enemy.health - (character.attack + AdditionalBlessingDamage(character));
            }
        }
    },
    Lightning_Bolt_Tar$40: (enemy, character, target, spellCost) =>{
        if(target === character) {
            spellCost = 40;
            enemy.mana -= spellCost;
    
            const lightningResistance = character.resistances.find(res => res.type ===  Resistances.Lightning.type);
            const lightningVulnerability = character.vulnerabilities.find(vul => vul.type === Vulnerabilites.Lightning.type);
            const damageResistance = Math.max(1, Math.round(enemy.attack - Resistances.Lightning.value))
            const damageVulnerability = Math.round(enemy.attack + Vulnerabilites.Lightning.value)
            const damage = Math.round(enemy.attack * 1.25)
            
            if (lightningResistance) {
                HandleDamageEffect(damageResistance, "Lightning", "player", character.id);
                return character.health - damageResistance;
            } else if (lightningVulnerability) {
                HandleDamageEffect(damageVulnerability, "Lightning", "player", character.id);
                return character.health - damageVulnerability;
            } else {
                HandleDamageEffect(damage, "Lightning", "player", character.id);
                return character.health - damage;
            }
        } else {
            const spellCost = 40;
            character.mana -= spellCost;
    
            const lightningResistance = enemy.resistances.find(res => res.type ===  Resistances.Lightning.type);
            const lightningVulnerability = enemy.vulnerabilities.find(vul => vul.type === Vulnerabilites.Lightning.type);
            const damageResistance = Math.max(1, Math.round(character.attack - Resistances.Lightning.value))
            const damageVulnerability = Math.round(character.attack + Vulnerabilites.Lightning.value)
            const damage = Math.round(character.attack * 1.25)
            console.log("TEST", AdditionalBlessingDamage(character))
            if (lightningResistance) {
                HandleDamageEffect(damageResistance, "Lightning", "npc", enemy.id);
                return enemy.health - (damageResistance + AdditionalBlessingDamage(character));
            } else if (lightningVulnerability) {
                HandleDamageEffect(damageVulnerability, "Lightning", "npc", enemy.id);
                return enemy.health - (damageVulnerability + AdditionalBlessingDamage(character));
            } else {
                HandleDamageEffect(damage, "Lightning", "npc", enemy.id);
                return enemy.health - (damage + AdditionalBlessingDamage(character));
            }
        }
    },
    Shadow_Strike_Tar$0: (enemy, character, target, spellCost) =>{
        if(target === character) {
            spellCost = 0;
            enemy.mana -= spellCost;

            return character.health - Math.max(5, character.attack - character.defense);
        } else {
            spellCost = 0;
            character.mana -= spellCost;

            return enemy.health - Math.max(5, (character.attack + AdditionalBlessingDamage(character)) - enemy.defense);
        }
    },
    Garrote_Tar$40: (enemy, character, target, spellCost) => {
        if(target === character) {
            spellCost = 40;
            enemy.mana -= spellCost;
            const bleedDamage = Math.max(5, Math.round(enemy.attack - character.defense));

            if (character.debuffs.find(d => d.type === Debuffs.Bleed.type)) {
                HandleDamageEffect(bleedDamage, "Physical", "player", character.id);
                return character.health - bleedDamage;
            } else {
                character.debuffs.push({ type: Debuffs.Bleed.type, duration: 3 });
                HandleDamageEffect(bleedDamage, "Physical", "player", character.id);
                return character.health - bleedDamage;
            }
        } else {
            spellCost = 40;
            character.mana -= spellCost;
            const bleedDamage = Math.max(5, Math.round(character.attack - enemy.defense));

            if(enemy.debuffs.find(d => d.type === Debuffs.Bleed.type)) {
                HandleDamageEffect(bleedDamage, "Physical", "npc", enemy.id);
                return enemy.health - (bleedDamage + AdditionalBlessingDamage(character));
            } else {
                enemy.debuffs.push({ type: Debuffs.Bleed.type, duration: 3});
                HandleDamageEffect(bleedDamage, "Physical", "npc", enemy.id);
                return enemy.health - (bleedDamage + AdditionalBlessingDamage(character));
            }
        }
    },
    Multi_Shot_Tar$0: (enemy: EnemyType, character: CharacterType) => {
        const enemies = Object.values(storeAtom.get(EnemyAtom)); // Get all enemies as an array
        const sortedEnemies = [...enemies].sort((a, b) => a.order - b.order); // Ensure correct order

        const enemyIndex = sortedEnemies.findIndex(e => e.id === enemy.id);
        
        if (enemyIndex === -1) {
            console.warn(`Enemy ${enemy.id} not found in sorted list.`);
            return enemy.health - ((character.attack + AdditionalBlessingDamage(character)) -  Math.max(5, enemy.defense));
        }

        // Get previous and next enemies if they exist
        const prevEnemy = enemyIndex > 0 ? sortedEnemies[enemyIndex - 1] : null;
        const nextEnemy = enemyIndex < sortedEnemies.length - 1 ? sortedEnemies[enemyIndex + 1] : null;

        enemy.health -= ((character.attack + AdditionalBlessingDamage(character)) - Math.max(5, enemy.defense));

        if (prevEnemy) {
            prevEnemy.health -= ((character.attack + AdditionalBlessingDamage(character)) - Math.max(5, enemy.defense));
        }

        if (nextEnemy) {
            nextEnemy.health -= ((character.attack + AdditionalBlessingDamage(character)) - Math.max(5, enemy.defense));
        }

        return enemy.health; // Return updated health of main target
    },
    "Heroic_Strike_Tar$-20": (enemy, character, target, spellCost) => {
        if(target === character) {
            spellCost = 20;
            enemy.mana += spellCost;

            return character.health - Math.max(5, character.attack - character.defense);
        } else {
            spellCost = 20;
            character.mana += spellCost;

            return enemy.health - Math.max(5, (character.attack + AdditionalBlessingDamage(character)) - enemy.defense);
        }
    },
    Devastate__Tar$60: (enemy, character, target, spellCost) => {
        if(target === character) {

            spellCost = 60;
            enemy.mana -= spellCost;
            character.defense = 0;

            if (character.debuffs.find(d => d.type === Debuffs.Sundered.type)) {
                return character.health - Math.max(5, enemy.attack - character.defense);
            } else {
                character.debuffs.push({ type: Debuffs.Sundered.type, duration: 3 });
                return character.health - Math.max(5, character.attack - character.defense);
            }
        } else {

            spellCost = 60;
            character.mana -= spellCost;
            enemy.defense = 0;

            if(enemy.debuffs.find(d => d.type === Debuffs.Sundered.type)) {
                return enemy.health - Math.max(5, (character.attack + AdditionalBlessingDamage(character)) - enemy.defense);
            } else {
                enemy.debuffs.push({ type: Debuffs.Sundered.type, duration: 3});
                return enemy.health - Math.max(5, (character.attack + AdditionalBlessingDamage(character)) - enemy.defense);
            }
            
        }
    },
    Frostbite__Tar$20: (enemy, character, target, spellCost) => {
        if(target === character) {
            character.speed -= 10;
            spellCost = 20;
            enemy.mana -= spellCost;
    
            const iceResistance = character.resistances.find(resistance => resistance.type === Resistances.Ice.type);
            const iceVulnerability = character.vulnerabilities.find(vulnerability => vulnerability.type === Vulnerabilites.Ice.type);
            
            if(iceResistance) {
                return character.health - Math.max(1, enemy.attack - Resistances.Ice.value);
            } else if (iceVulnerability) {
                return character.health - enemy.attack + Vulnerabilites.Ice.value;
            } else {
                return character.health - enemy.attack;
            }
        } else {
            enemy.speed -= 10;
            spellCost = 20;
            character.mana -= spellCost;
    
            const iceResistance = enemy.resistances.find(resistance => resistance.type === Resistances.Ice.type);
            const iceVulnerability = enemy.vulnerabilities.find(vulnerability => vulnerability.type === Vulnerabilites.Ice.type);
            
            if(iceResistance) {
                return enemy.health - Math.max(1, (character.attack + AdditionalBlessingDamage(character)) - Resistances.Ice.value);
            } else if (iceVulnerability) {
                return enemy.health - (character.attack + AdditionalBlessingDamage(character)) + Vulnerabilites.Ice.value;
            } else {
                return enemy.health - (character.attack + AdditionalBlessingDamage(character));
            }
        }
    },
};

const spellEffectsBuff: Record<string, (character: CharacterType, target: CharacterType, spellCost: number) => number> = {
    Heal__Char$20: (character, target, spellCost) => {
        const heal = 20;
        spellCost = 20;
        character.mana -= spellCost;

        
        if( character.id === target.id) {
            if(heal + character.health >= character.maxHealth) {
                return character.health = character.maxHealth
            } else {
                return  character.health += heal;
            }    
        } else {
            if(heal + target.health >= target.maxHealth) {
                return target.health = target.maxHealth
            } else {
                return target.health += heal;
            }
        }
    },
    Cure__Char$10: (character, target, spellCost) => {
        if(target.debuffs.length > 0 && target.health > 0) {
            target.debuffs.length = 0
        } 

        spellCost = 10;
        character.mana -= spellCost;

        return target.health
    },
};


const basicCharacterAttack = (enemy: EnemyType, character: CharacterType, spell: string, spellCost: number) => {

    setTimeout(() => {
        storeAtom.set(ShakeAtom, (prev) => ({ ...prev, [character.id]: false }));
        storeAtom.set(BaseDamageFlashAtom, (prev) => ({ ...prev, [enemy.id]: false }));
    }, 300);

    storeAtom.set(ShakeAtom, (prev) => ({ ...prev, [character.id]: true }));
    storeAtom.set(BaseDamageFlashAtom, (prev) => ({ ...prev, [enemy.id]: true }));

    setTimeout(() => {
    }, 1000);

    if (spellEffects[spell]) {
        return spellEffects[spell](enemy, character, enemy, spellCost);
    } else {
        console.warn(`Unknown spell: ${spell}`);
        return enemy.health - Math.max(5, (character.attack + AdditionalBlessingDamage(character)) - enemy.defense);
    }

};

const basicCharacterBuff = (character: CharacterType, target: CharacterType, spell: string, spellCost: number) => {
    setTimeout(() => {
    }, 1000);

    if (!spellEffectsBuff[spell]) {
        console.warn(`Unknown or missing spell in spellEffectsBuff: "${spell}"`);
        return target.health; // Return unchanged health if spell is not found
    }
    return spellEffectsBuff[spell](character, target, spellCost);
};

const basicEnemyAttack = (character: CharacterType, enemy: EnemyType, target: CharacterType) => {
    setTimeout(() => {
        storeAtom.set(ShakeAtom, (prev) => ({ ...prev, [enemy.id]: false }));
        storeAtom.set(BaseDamageFlashAtom, (prev) => ({ ...prev, [character.id]: false }));
    }, 300);

    storeAtom.set(ShakeAtom, (prev) => ({ ...prev, [enemy.id]: true }));
    storeAtom.set(BaseDamageFlashAtom, (prev) => ({ ...prev, [character.id]: true }));

    setTimeout(() => {
    }, 1000);

    if (enemy.spells && enemy.spells.length > 0) {
        // Filter spells the enemy can afford
        const usableSpells = enemy.spells.filter(spell => {
            const match = spell.match(/\$(-?\d+)$/); // Extract cost from spell string
            const cost = match ? parseInt(match[1], 10) : 0;
            return enemy.mana >= cost;
        });

        if (usableSpells.length > 0) {
            const chosenSpell = usableSpells[Math.floor(Math.random() * usableSpells.length)];

            const match = chosenSpell.match(/\$(-?\d+)$/);
            const spellCost = match ? parseInt(match[1], 10) : 0;

            console.log(`Enemy ${enemy.name} is using spell: ${chosenSpell} with cost ${spellCost}`);

            if (typeof spellEffects[chosenSpell] === 'function') {
                return spellEffects[chosenSpell](enemy, character, target, spellCost);
            } else {
                console.warn(`Spell effect for '${chosenSpell}' not found in spellEffects.`);
            }
            
        } else {
            console.warn(`Enemy ${enemy.name} has no usable spells with ${enemy.mana} mana.`);
        }
    } else {
        console.warn(`Enemy ${enemy.name} has no spells defined.`);
    }

    // Fallback: basic attack
    return character.health - Math.max(1, enemy.attack - character.defense);
};

const AdditionalBlessingDamage = (character: CharacterType) => {
    let bonusDamage = 0;

    character.blessings.forEach((blessing) => {
        switch (blessing) {
            case "Blessing of Holy Damage":
                bonusDamage += Math.round(Math.max(10, character.attack * 1.25));
            break;
            case "Blessing of Fire Damage":
                bonusDamage += Math.round(Math.max(10, character.attack * 1.25));
            break;
            // Add more blessing types here
        }
    });

    return bonusDamage;
};

export { basicCharacterAttack, basicCharacterBuff, basicEnemyAttack };