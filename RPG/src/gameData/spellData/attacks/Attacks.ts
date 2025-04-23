import { AttackMeta } from "./AttackMeta";
import { ElementTypes } from "../ElementTypes";

import DevastateTar60 from "./physical/DevastateTar60";
import FireBallTar20 from "./fire/FireBallTar20";
import FrostbiteTar20 from "./ice/FrostbiteTar20";
import GarroteTar40 from "./physical/Garrote40";
import HeroicStrikeTar20 from "./physical/HeroicStrikeTat20";
import IceBoltTar30 from "./ice/IceBoltTar30";
import LightningBoltTar40 from "./lightning/LightningBoltTar40";
import MultiShotTar0 from "./physical/MultiShotTar0";
import ShadowStrikeTar0 from "./dark/ShadowStrikeTar0";
import QuickAttackTar0 from "./physical/QuickAttackTar0";
import ShootTar0 from "./physical/ShootTar0";
import AimShotTar50 from "./physical/AimShotTar50";
import VolleyTar20 from "./physical/VolleyTar20";
import ThunderclapTar40 from "./lightning/Thunderclap__Tar40";
import LeechTar10 from "./dark/LeechTar10";
import BackstabTar60 from "./physical/BackstabTar60";
import ShadowDaggerTar30 from "./dark/ShadowDaggerTar30";
import CleaveTar30 from "./physical/CleaveTar30";
import HolyExplosionTar50 from "./holy/HolyExplosionTar50";


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
        animation: 'lightning',
    },
    Shadow_Strike_Tar$0: {
        element: ElementTypes.Dark,
        cost: 0,
        func: ShadowStrikeTar0,
    },
    Shadow_Dagger_Tar$30: {
        element: ElementTypes.Dark,
        cost: 30,
        func: ShadowDaggerTar30,
    },
    'Heroic_Strike_Tar$-20': {
        element: ElementTypes.Physical,
        cost: -20,
        func: HeroicStrikeTar20,
        animation: 'sword',
    },
    'Leech__Tar$-10': {
        element: ElementTypes.Dark,
        cost: -10,
        func: LeechTar10,
    },
    Quick_Attack_Tar$0: {
        element: ElementTypes.Physical,
        cost: 10,
        func: QuickAttackTar0,
        animation: 'quickAttack',
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
    Cleave__Tar$30: {
        element: ElementTypes.Physical,
        cost: 30,
        func: CleaveTar30,
    },
    Shoot__Tar$0: {
        element: ElementTypes.Physical,
        cost: 0,
        func: ShootTar0,
    },
    Aim_Shot_Tar$50: {
        element: ElementTypes.Physical,
        cost: 0,
        func: AimShotTar50,
    },
    Volley__Tar$20: {
        element: ElementTypes.Physical,
        cost: 0,
        func: VolleyTar20,
    },
    Thunderclap__Tar$40: {
        element: ElementTypes.Lightning,
        cost: 40,
        func: ThunderclapTar40,
        animation: 'lightning',
    },
    Backstab__Tar$60: {
        element: ElementTypes.Physical,
        cost: 60,
        func: BackstabTar60,
    },
    Holy_Explosion_Tar$50: {
        element: ElementTypes.Holy,
        cost: 50,
        func: HolyExplosionTar50,
    },
};

export default attacks;