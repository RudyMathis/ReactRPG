import { AttackMeta } from "./AttackMeta";
import { ElementTypes } from "../ElementTypes";

import DevastateTar60 from "./DevastateTar60";
import FireBallTar20 from "./FireBallTar20";
import FrostbiteTar20 from "./FrostbiteTar20";
import GarroteTar40 from "./Garrote40";
import HeroicStrikeTar20 from "./HeroicStrikeTat20";
import IceBoltTar30 from "./IceBoltTar30";
import LightningBoltTar40 from "./LightningBoltTar40";
import MultiShotTar0 from "./MultiShotTar0";
import ShadowStrikeTar0 from "./ShadowStrikeTar0";

const attacks: Record<string, AttackMeta> = {
    Fire_Ball_Tar$20: {
        element: ElementTypes.Fire,
        cost: 20,
        func: FireBallTar20,
    },
    Ice_Bolt_Tar$30: {
        element: ElementTypes.Ice,
        cost: 30,
        func: IceBoltTar30,
    },
    Lightning_Bolt_Tar$40: {
        element: ElementTypes.Lightning,
        cost: 40,
        func: LightningBoltTar40,
    },
    Shadow_Strike_Tar$0: {
        element: ElementTypes.Dark,
        cost: 0,
        func: ShadowStrikeTar0,
    },
    'Heroic_Strike_Tar$-20': {
        element: ElementTypes.Physical,
        cost: -20,
        func: HeroicStrikeTar20,
    },
    Garrote__Tar$40: {
        element: ElementTypes.Physical,
        cost: 40,
        func: GarroteTar40,
    },
    Frostbite__Tar$20: {
        element: ElementTypes.Ice,
        cost: 20,
        func: FrostbiteTar20,
    },
    Devastate__Tar$60: {
        element: ElementTypes.Physical,
        cost: 60,
        func: DevastateTar60,
    },
    Multi_Shot_Tar$0: {
        element: ElementTypes.Physical,
        cost: 0,
        func: MultiShotTar0,
    },
};

export default attacks;