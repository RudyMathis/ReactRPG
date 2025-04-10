import { EnemyType } from "../../../atom/BaseEnemyAtom";
import { CharacterType } from "../../../atom/CharacterAtom";
import DevastateTar60 from "./DevastateTar60";
import FireBallTar20 from "./FireBallTar20";
import FrostbiteTar20 from "./FrostbiteTar20";
import GarroteTar40 from "./Garrote40";
import HeroicStrikeTar20 from "./HeroicStrikeTat20";
import IceBoltTar30 from "./IceBoltTar30";
import LightningBoltTar40 from "./LightningBoltTar40";
import MultiShotTar0 from "./MultiShotTar0";
import ShadowStrikeTar0 from "./ShadowStrikeTar0";


const attacks: Record<string, (enemy: EnemyType, character: CharacterType, target: CharacterType | EnemyType, spellCost: number) => number> = {
    Fire_Ball_Tar$20: FireBallTar20,
    Garrote__Tar$40: GarroteTar40,
    Ice_Bolt_Tar$30: IceBoltTar30,
    Lightning_Bolt_Tar$40: LightningBoltTar40,
    Shadow_Strike_Tar$0: ShadowStrikeTar0,
    Multi_Shot_Tar$0: MultiShotTar0,
    "Heroic_Strike_Tar$-20": HeroicStrikeTar20,
    Devastate__Tar$60: DevastateTar60,
    Frostbite__Tar$20: FrostbiteTar20,
};

export default attacks;
