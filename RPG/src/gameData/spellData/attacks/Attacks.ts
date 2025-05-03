import { AttackMeta } from "./AttackMeta";
import { ElementTypes } from "../ElementTypes";

import DevastateTar60 from "./physical/DevastateTar60";
import FireBallTar20 from "./fire/FireBallTar20";
import FrostbiteTar20 from "./ice/FrostbiteTar20";
import GarroteTar40 from "./physical/GarroteTar40";
import HeroicStrikeTar20 from "./physical/HeroicStrikeTar20";
import IceBoltTar30 from "./ice/IceBoltTar30";
import LightningBoltTar40 from "./lightning/LightningBoltTar40";
import MultiShotTar$40 from "./physical/MultiShotTar40";
import ShadowStrikeTar0 from "./dark/ShadowStrikeTar0";
import QuickAttackTar0 from "./physical/QuickAttackTar0";
import ShootTar0 from "./physical/ShootTar0";
import AimShotTar50 from "./physical/AimShotTar50";
import VolleyTar20 from "./physical/VolleyTar20";
import ThunderclapTar40 from "./lightning/ThunderclapTar40";
import LeechTar10 from "./dark/LeechTar10";
import BackstabTar60 from "./physical/BackstabTar60";
import ShadowDaggerTar30 from "./dark/ShadowDaggerTar30";
import CleaveTar30 from "./physical/CleaveTar30";
import HolyExplosionTar50 from "./holy/HolyExplosionTar50";
import HolyStrikeTar40 from "./holy/HolyStrikeTar40";
import BurningSpiritsTar60 from "./fire/BurningSpiritsTar60";


const attacks: Record<string, AttackMeta> = {
    Fire_Ball_Tar$20: {
        name: 'Fire Ball',
        element: ElementTypes.Fire,
        cost: 20,
        aoe: false,
        func: FireBallTar20,
        animation: {
            name: 'fire',
            duration: 900,
            width: 21,
            height: 7.07,
            steps: 3,
            image: '/assets/vfx/spell_fire.png',
        },
    },
    Burning_Spirits_Tar$60: {
        name: 'Burning Spirits',
        element: ElementTypes.Fire,
        cost: 60,
        aoe: true,
        func: BurningSpiritsTar60,
        animation: {
            name: 'burning',
            duration: 900,
            width: 12,
            height: 8.35,
            steps: 2,
            image: '/assets/vfx/spell_burning.png',
        },
    },
    Ice_Bolt_Tar$30: {
        name: 'Ice Bolt',
        element: ElementTypes.Ice,
        cost: 30,
        aoe: false,
        func: IceBoltTar30,
        animation: {
            name: 'ice',
            duration: 900,
            width: 24,
            height: 9.42,
            steps: 2,
            image: '/assets/vfx/spell_ice.png',
        },
    },
    Lightning_Bolt_Tar$40: {
        name: 'Lightning Bolt',
        element: ElementTypes.Lightning,
        cost: 40,
        aoe: false,
        func: LightningBoltTar40,
        animation: {
            name: 'lightning',
            duration: 900,
            width: 36,
            height: 10.5,
            steps: 3,
            image: '/assets/vfx/spell_lightning.png',
        },
    },
    Shadow_Strike_Tar$0: {
        name: 'Shadow Strike',
        element: ElementTypes.Dark,
        cost: 0,
        aoe: false,
        func: ShadowStrikeTar0,
    },
    Shadow_Dagger_Tar$30: {
        name: 'Shadow Dagger',
        element: ElementTypes.Dark,
        cost: 30,
        aoe: false,
        func: ShadowDaggerTar30,
        animation: {
            name: 'shadowDagger',
            duration: 900,
            width: 12,
            height: 8.35,
            steps: 2,
            image: '/assets/vfx/spell_burning.png',
            rotation: 270,
        },
    },
    'Heroic_Strike_Tar$-20': {
        name: 'Heroic Strike',
        element: ElementTypes.Physical,
        cost: -20,
        aoe: false,
        func: HeroicStrikeTar20,
        animation: {
            name: 'sword',
            duration: 600,
            width: 18,
            height: 7.9,
            steps: 2,
            image: '/assets/vfx/spell_sword.png',
        },
    },
    'Leech__Tar$-10': {
        name: 'Leech',
        element: ElementTypes.Dark,
        cost: -10,
        aoe: false,
        func: LeechTar10,
        animation: {
            name: 'leech',
            duration: 900,
            width: 12,
            height: 1.7,
            steps: 8,
            image: '/assets/vfx/spell_leech.png',
        },
    },
    Quick_Attack_Tar$0: {
        name: 'Quick Attack',
        element: ElementTypes.Physical,
        cost: 0,
        aoe: false,
        func: QuickAttackTar0,
        animation: {
            name: 'quickAttack',
            duration: 300,
            width: 36,
            height: .64,
            steps: 3,
            image: '/assets/vfx/spell_quickAttack.png',
        },
    },
    Garrote__Tar$40: {
        name: 'Garrote',
        element: ElementTypes.Physical,
        cost: 40,
        aoe: false,
        func: GarroteTar40,
    },
    Frostbite__Tar$20: {
        name: 'Frostbite',
        element: ElementTypes.Ice,
        cost: 20,
        aoe: false,
        func: FrostbiteTar20,
        animation: {
            name: 'ice',
            duration: 900,
            width: 24,
            height: 9.42,
            steps: 2,
            image: '/assets/vfx/spell_ice.png',
        },
    },
    Devastate__Tar$60: {
        name: 'Devastate',
        element: ElementTypes.Physical,
        cost: 60,
        aoe: false,
        func: DevastateTar60,
        animation: {
            name: 'devastate',
            duration: 900,
            width: 30,
            height: 13.28,
            steps: 5,
            image: '/assets/vfx/spell_devastate.png',
        },
    },
    Multi_Shot_Tar$40: {
        name: 'Multi Shot',
        element: ElementTypes.Physical,
        cost: 40,
        aoe: true,
        func: MultiShotTar$40,
    },
    Cleave__Tar$30: {
        name: 'Cleave',
        element: ElementTypes.Physical,
        cost: 30,
        aoe: true,
        func: CleaveTar30,
        animation: {
            name: 'cleave',
            duration: 900,
            width: 30,
            height: 13.28,
            steps: 5,
            image: '/assets/vfx/spell_devastate.png',
            rotation: 180,
            brightness: 1.2,
        },
    },
    Shoot__Tar$0: {
        name: 'Shoot',
        element: ElementTypes.Physical,
        cost: 0,
        aoe: false,
        func: ShootTar0,
    },
    Aim_Shot_Tar$50: {
        name: 'Aim Shot',
        element: ElementTypes.Physical,
        cost: 50,
        aoe: false,
        func: AimShotTar50,
    },
    Volley__Tar$20: {
        name: 'Volley',
        element: ElementTypes.Physical,
        cost: 20,
        aoe: true,
        func: VolleyTar20,
    },
    Thunderclap__Tar$40: {
        name: 'Thunderclap',
        element: ElementTypes.Lightning,
        cost: 40,
        aoe: true,
        func: ThunderclapTar40,
        animation: {
            name: 'lightning',
            duration: 900,
            width: 36,
            height: 10.5,
            steps: 3,
            image: '/assets/vfx/spell_lightning.png',
        },
    },
    Backstab__Tar$60: {
        name: 'Backstab',
        element: ElementTypes.Physical,
        cost: 60,
        aoe: false,
        func: BackstabTar60,
    },
    Holy_Explosion_Tar$50: {
        name: 'Holy Explosion',
        element: ElementTypes.Holy,
        cost: 50,
        aoe: true,
        func: HolyExplosionTar50,
        animation: {
            name: 'holyExplosion',
            duration: 900,
            width: 21,
            height: 7.07,
            steps: 3,
            image: '/assets/vfx/spell_fire.png',
            rotation: 45,
            brightness: 2,
        },
    },
    Holy_Strike_Tar$40: {
        name: 'Holy Strike',
        element: ElementTypes.Holy,
        cost: 40,
        aoe: false,
        func: HolyStrikeTar40,
        animation: {
            name: 'holyStrike',
            duration: 900,
            width: 15,
            height: 10.28,
            steps: 2,
            image: '/assets/vfx/spell_fire2.png',
            rotation: 45,
            brightness: 2,
        },
    },
};

export default attacks;