import { CharacterType } from '../../../atom/CharacterAtom';
import { EnemyType } from '../../../atom/BaseEnemyAtom';
import styles from '../GameState.module.css';
import DetailScreen from '../../../components/entity/DetailScreen';

type Props = {
    entity: CharacterType | EnemyType;
    close: (e: React.MouseEvent<HTMLDivElement>) => void;
    tutorialLayer?: string;
}

const DetailScreenOverlay: React.FC<Props> = ({ entity, close, tutorialLayer }) => (
    <div
        className={styles.detailScreenOverlay}
        onClick={close}
        {...(tutorialLayer && { 'data-tutorial-layer': 'top' })}
    >
        <div className={styles.detailScreenContent} onClick={e => e.stopPropagation()}>
            <DetailScreen entity={entity} />
        </div>
    </div>
);

export default DetailScreenOverlay;