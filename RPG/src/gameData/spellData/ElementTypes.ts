export const ElementTypes = {
    Fire: "Fire",
    Ice: "Ice",
    Lightning: "Lightning",
    Dark: "Dark",
    Physical: "Physical",
    Poison: "Poison",
    Arcane: "Arcane",
    Holy: "Holy",
    None: "None",
  } as const;
  
export type ElementType = typeof ElementTypes[keyof typeof ElementTypes];