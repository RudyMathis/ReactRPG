export type Vulnerability = {
    name: string;
    type: string;
    value: number;
};

const Vulnerabilities: Record<string, Vulnerability>  = {
    Fire: { name: "Fire", type: "Ice", value: 10 },
    Ice: { name: "Ice", type: "Fire", value: 10 },
    Water: { name: "Water", type: "Water", value: 10 },
    Lightning: { name: "Lightning", type: "Earth", value: 10 },
    Earth: { name: "Earth", type: "Lightning", value: 10 },
    Dark: { name: "Dark", type: "Holy", value: 10 },
    Holy: { name: "Holy", type: "Dark", value: 10 },
};

export default Vulnerabilities;