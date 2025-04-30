export type Vulnerability = {
    type: string;
    value: number;
};

// Base resistance values
const Vulnerabilities = {
    Fire: { type: "Ice", value: 10 },
    Ice: { type: "Fire", value: 10 },
    Water: { type: "Water", value: 10 },
    Lightning: { type: "Earth", value: 10 },
    Earth: { type: "Lightning", value: 10 },
    Dark: { type: "Holy", value: 10 },
    Holy: { type: "Dark", value: 10 },
};


export default Vulnerabilities;