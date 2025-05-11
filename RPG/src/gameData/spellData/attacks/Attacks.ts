import { ElementTypes } from "../ElementTypes";

import DevastateTar60 from "./physical/DevastateTar60";
import { spellCost as DevastateCost, damageMulitplier as DevastateDamageMulitplier } from "./physical/DevastateTar60";

import FireBallTar20 from "./fire/FireBallTar20";
import { spellCost as FireBallCost, damageMulitplier as FireBallDamageMulitplier } from "./fire/FireBallTar20";

import FrostbiteTar20 from "./ice/FrostbiteTar20";
import { spellCost as FrostbiteCost, damageMulitplier as FrostbiteDamageMulitplier } from "./ice/FrostbiteTar20";

import GarroteTar40 from "./physical/GarroteTar40";
import { spellCost as GarroteCost, damageMulitplier as GarroteDamageMulitplier } from "./physical/GarroteTar40";

import HeroicStrikeTar20 from "./physical/HeroicStrikeTar20";
import { spellCost as HeroicStrikeCost, damageMulitplier as HeroicStrikeDamageMulitplier } from "./physical/HeroicStrikeTar20";

import IceBoltTar30 from "./ice/IceBoltTar30";
import { spellCost as IceBoltCost, damageMulitplier as IceBoltDamageMulitplier } from "./ice/IceBoltTar30";

import LightningBoltTar40 from "./lightning/LightningBoltTar40";
import { spellCost as  LightningBoltCost, damageMulitplier as  LightningBoltDamageMulitplier } from "./lightning/LightningBoltTar40";

import MultiShotTar$40 from "./physical/MultiShotTar40";
import { spellCost as MultiShotCost, damageMulitplier as MultiShotDamageMulitplier } from "./physical/MultiShotTar40";

import ShadowStrikeTar0 from "./dark/ShadowStrikeTar0";
import { spellCost as ShadowStrikeCost, damageMulitplier as ShadowStrikeDamageMulitplier } from "./dark/ShadowStrikeTar0";

import QuickAttackTar0 from "./physical/QuickAttackTar0";
import { spellCost as  QuickAttackCost, damageMulitplier as  QuickAttackDamageMulitplier } from "./physical/QuickAttackTar0";

import ShootTar0 from "./physical/ShootTar0";
import { spellCost as ShootCost, damageMulitplier as ShootDamageMulitplier } from "./physical/ShootTar0";

import AimShotTar50 from "./physical/AimShotTar50";
import { spellCost as AimShotCost, damageMulitplier as AimShotDamageMulitplier } from "./physical/AimShotTar50";

import VolleyTar20 from "./physical/VolleyTar20";
import { spellCost as VolleyCost, damageMulitplier as VolleyDamageMulitplier } from "./physical/VolleyTar20";

import ThunderclapTar40 from "./lightning/ThunderclapTar40";
import { spellCost as ThunderclapCost, damageMulitplier as ThunderclapDamageMulitplier } from "./lightning/ThunderclapTar40";

import LeechTar10 from "./dark/LeechTar10";
import { spellCost as LeechCost, damageMulitplier as LeechDamageMulitplier } from "./dark/LeechTar10";

import BackstabTar60 from "./physical/BackstabTar60";
import { spellCost as BackstabCost, damageMulitplier as BackstabDamageMulitplier } from "./physical/BackstabTar60";

import ShadowDaggerTar30 from "./dark/ShadowDaggerTar30";
import { spellCost as ShadowDaggerCost, damageMulitplier as ShadowDaggerDamageMulitplier }  from "./dark/ShadowDaggerTar30";

import CleaveTar30 from "./physical/CleaveTar30";
import { spellCost as CleaveCost, damageMulitplier as CleaveDamageMulitplier } from "./physical/CleaveTar30";

import HolyExplosionTar50 from "./holy/HolyExplosionTar50";
import { spellCost as HolyExplosionCost, damageMulitplier as HolyExplosionDamageMulitplier } from "./holy/HolyExplosionTar50";

import HolyStrikeTar40 from "./holy/HolyStrikeTar40";
import { spellCost as HolyStrikeCost, damageMulitplier as HolyStrikeDamageMulitplier } from "./holy/HolyStrikeTar40";

import BurningSpiritsTar60 from "./fire/BurningSpiritsTar60";
import { spellCost as BurningSpiritsCost, damageMulitplier as BurningSpiritsDamageMulitplier } from "./fire/BurningSpiritsTar60";


import { ElementType } from "../ElementTypes";
import { EnemyType } from "../../../atom/BaseEnemyAtom";
import { CharacterType } from "../../../atom/CharacterAtom";

export type AttackMeta = {
    name: string;
    element: ElementType;
    cost: number;
    damageMulitplier?: number;
    func: (
        enemy: EnemyType,
        character: CharacterType,
        target: CharacterType | EnemyType,
        spellCost: number,
    ) => number;
    aoe: boolean;
    animation: {
        name: string;
        duration: number;
        width: number;
        height: number;
        steps: number;
        image: string;
        rotation?: number;
        brightness?: number;
        top?: number;
        left?: number;
    }
    sound?: () => void;
    description?: string;
};

const attacks: Record<string, AttackMeta> = {
    Fire_Ball_Tar$20: {
        name: 'Fire Ball',
        element: ElementTypes.Fire,
        cost: FireBallCost,
        damageMulitplier: FireBallDamageMulitplier,
        func: FireBallTar20,
        aoe: false,
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
        cost: BurningSpiritsCost,
        damageMulitplier: BurningSpiritsDamageMulitplier,
        func: BurningSpiritsTar60,
        aoe: true,
        animation: {
            name: 'burning',
            duration: 900,
            width: 12,
            height: 8.35,
            steps: 2,
            image: '/assets/vfx/spell_burning.png',
            left: 25,
        },
    },
    Ice_Bolt_Tar$30: {
        name: 'Ice Bolt',
        element: ElementTypes.Ice,
        cost: IceBoltCost,
        damageMulitplier: IceBoltDamageMulitplier,
        func: IceBoltTar30,
        aoe: false,
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
        cost: LightningBoltCost,
        damageMulitplier: LightningBoltDamageMulitplier,
        func: LightningBoltTar40,
        aoe: false,
        animation: {
            name: 'lightning',
            duration: 900,
            width: 36,
            height: 10.5,
            steps: 3,
            image: '/assets/vfx/spell_lightning.png',
            top: -10,
        },
    },
    Shadow_Strike_Tar$0: {
        name: 'Shadow Strike',
        element: ElementTypes.Dark,
        cost: ShadowStrikeCost,
        damageMulitplier: ShadowStrikeDamageMulitplier,
        func: ShadowStrikeTar0,
        aoe: false,
        animation: {
            name: 'shadowStrike',
            duration: 600,
            width: 18,
            height: 7.9,
            steps: 2,
            image: '/assets/vfx/spell_sword.png',
            rotation: 270,
            brightness: .75,
        },
    },
    Shadow_Dagger_Tar$30: {
        name: 'Shadow Dagger',
        element: ElementTypes.Dark,
        cost: ShadowDaggerCost,
        damageMulitplier: ShadowDaggerDamageMulitplier,
        func: ShadowDaggerTar30,
        aoe: false,
        animation: {
            name: 'shadowDagger',
            duration: 900,
            width: 12,
            height: 8.35,
            steps: 2,
            image: '/assets/vfx/spell_burning.png',
            rotation: 270,
            brightness: 1,
            left: 25,
        },
    },
    'Heroic_Strike_Tar$-20': {
        name: 'Heroic Strike',
        element: ElementTypes.Physical,
        cost: HeroicStrikeCost,
        damageMulitplier: HeroicStrikeDamageMulitplier,
        func: HeroicStrikeTar20,
        aoe: false,
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
        cost: LeechCost,
        damageMulitplier: LeechDamageMulitplier,
        func: LeechTar10,
        aoe: false,
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
        cost: QuickAttackCost,
        damageMulitplier: QuickAttackDamageMulitplier,
        func: QuickAttackTar0,
        aoe: false,
        animation: {
            name: 'quickAttack',
            duration: 300,
            width: 36,
            height: .64,
            steps: 3,
            image: '/assets/vfx/spell_quickAttack.png',
            top: 25,
        },
    },
    Garrote__Tar$40: {
        name: 'Garrote',
        element: ElementTypes.Physical,
        cost: GarroteCost,
        damageMulitplier: GarroteDamageMulitplier,
        func: GarroteTar40,
        aoe: false,
        animation: {
            name: 'garrote',
            duration: 900,
            width: 27,
            height: 8.14,
            steps: 4,
            image: '/assets/vfx/spell_garrote.png',
        },
    },
    Frostbite__Tar$20: {
        name: 'Frostbite',
        element: ElementTypes.Ice,
        cost: FrostbiteCost,
        damageMulitplier: FrostbiteDamageMulitplier,
        func: FrostbiteTar20,
        aoe: false,
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
        cost: DevastateCost,
        damageMulitplier: DevastateDamageMulitplier,
        func: DevastateTar60,
        aoe: false,
        animation: {
            name: 'devastate',
            duration: 900,
            width: 30,
            height: 13.28,
            steps: 5,
            image: '/assets/vfx/spell_devastate.png',
            top: -25,
            left: 40,
        },
    },
    Multi_Shot_Tar$40: {
        name: 'Multi Shot',
        element: ElementTypes.Physical,
        cost: MultiShotCost,
        damageMulitplier: MultiShotDamageMulitplier,
        func: MultiShotTar$40,
        aoe: true,
        animation: {
            name: 'multiShot',
            duration: 900,
            width: 30,
            height: 14.36,
            steps: 5,
            image: '/assets/vfx/spell_aimShot.png',
            rotation: 180,
            brightness: 1.2,
            top: -25,
            left: 25,
        },
    },
    Cleave__Tar$30: {
        name: 'Cleave',
        element: ElementTypes.Physical,
        cost: CleaveCost,
        damageMulitplier: CleaveDamageMulitplier,
        func: CleaveTar30,
        aoe: true,
        animation: {
            name: 'cleave',
            duration: 900,
            width: 30,
            height: 13.28,
            steps: 5,
            image: '/assets/vfx/spell_devastate.png',
            rotation: 180,
            brightness: 1.2,
            top: -25,
            left: 40,
        },
    },
    Shoot__Tar$0: {
        name: 'Shoot',
        element: ElementTypes.Physical,
        cost: ShootCost,
        damageMulitplier: ShootDamageMulitplier,
        func: ShootTar0,
        aoe: false,
        animation: {
            name: 'shoot',
            duration: 900,
            width: 9,
            height: 14.36,
            steps: 3,
            image: '/assets/vfx/spell_shoot.png',
            top: -50,
            left: 25,
        },
    },
    Aim_Shot_Tar$50: {
        name: 'Aim Shot',
        element: ElementTypes.Physical,
        cost: AimShotCost,
        damageMulitplier: AimShotDamageMulitplier,
        func: AimShotTar50,
        aoe: false,
        animation: {
            name: 'aimShot',
            duration: 900,
            width: 30,
            height: 14.36,
            steps: 5,
            image: '/assets/vfx/spell_aimShot.png',
            top: -25,
            left: 25,
        },
    },
    Volley__Tar$20: {
        name: 'Volley',
        element: ElementTypes.Physical,
        cost: VolleyCost,
        damageMulitplier: VolleyDamageMulitplier,
        func: VolleyTar20,
        aoe: true,
        animation: {
            name: 'shoot',
            duration: 900,
            width: 9,
            height: 14.36,
            steps: 3,
            image: '/assets/vfx/spell_shoot.png',
            top: -50,
            left: 25,
        },
    },
    Thunderclap__Tar$40: {
        name: 'Thunderclap',
        element: ElementTypes.Lightning,
        cost: ThunderclapCost,
        damageMulitplier: ThunderclapDamageMulitplier,
        func: ThunderclapTar40,
        aoe: true,
        animation: {
            name: 'lightning',
            duration: 900,
            width: 36,
            height: 10.5,
            steps: 3,
            image: '/assets/vfx/spell_lightning.png',
            top: -10,
        },
    },
    Backstab__Tar$60: {
        name: 'Backstab',
        element: ElementTypes.Physical,
        cost: BackstabCost,
        damageMulitplier: BackstabDamageMulitplier,
        func: BackstabTar60,
        aoe: false,
        animation: {
            name: 'backstab',
            duration: 900,
            width: 30,
            height: 1,
            steps: 3,
            image: '/assets/vfx/spell_backstab.png',
        },
    },
    Holy_Explosion_Tar$50: {
        name: 'Holy Explosion',
        element: ElementTypes.Holy,
        cost: HolyExplosionCost,
        damageMulitplier: HolyExplosionDamageMulitplier,
        func: HolyExplosionTar50,
        aoe: true,
        animation: {
            name: 'holyExplosion',
            duration: 900,
            width: 21,
            height: 7.07,
            steps: 3,
            image: '/assets/vfx/spell_fire.png',
            rotation: 45,
            brightness: 2,
            top: -10,
        },
    },
    Holy_Strike_Tar$40: {
        name: 'Holy Strike',
        element: ElementTypes.Holy,
        cost: HolyStrikeCost,
        damageMulitplier: HolyStrikeDamageMulitplier,
        func: HolyStrikeTar40,
        aoe: false,
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