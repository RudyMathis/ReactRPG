export type Resistance = {
    type: string;
    value: number;
};

// Base resistance values
const Resistances = {
    Ice: { type: "Ice", value: 10 },
    Fire: { type: "Fire", value: 10 },
    Water: { type: "Water", value: 10 },
    Lightning: { type: "Lightning", value: 10 },
    Earth: { type: "Earth", value: 10 },
    Dark: { type: "Dark", value: 10 },
    Holy: { type: "Holy", value: 10 },
};

export default Resistances;