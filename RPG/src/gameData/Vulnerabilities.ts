export type Vulnerability = {
    type: string;
    value: number;
};

// Base resistance values
const Vulnerabilites = {
    Ice: { type: "Fire", value: 10 },
    Fire: { type: "Ice", value: 10 },
    Dark: { type: "Light", value: 10 },
    Light: { type: "Dark", value: 10 },
};

export default Vulnerabilites;