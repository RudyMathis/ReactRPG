export type Vulnerability = {
    type: string;
    value: number;
};

// Base resistance values
const Vulnerabilites = {
    Ice: { type: "Fire", value: 10 },
    Fire: { type: "Water", value: 10 },
    Water: { type: "Lightning", value: 10 },
    Lightning: { type: "Earth", value: 10 },
    Earth: { type: "Ice", value: 10 },
    Dark: { type: "Light", value: 10 },
    Light: { type: "Dark", value: 10 },
};

export default Vulnerabilites;