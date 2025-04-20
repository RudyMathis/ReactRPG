export type Vulnerability = {
    type: string;
    value: number;
};

// Base resistance values
const Vulnerabilities = {
    Fire: { type: "Fire", value: 10 },
    Ice: { type: "Ice", value: 10 },
    Water: { type: "Water", value: 10 },
    Lightning: { type: "Lightning", value: 10 },
    Earth: { type: "Earth", value: 10 },
    Dark: { type: "Dark", value: 10 },
    Light: { type: "Light", value: 10 },
};


export default Vulnerabilities;