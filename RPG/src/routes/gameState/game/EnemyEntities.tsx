import React from 'react';
import { CharacterType } from '../../../atom/CharacterAtom';
import { EnemyType } from '../../../atom/BaseEnemyAtom';
import EntityContainer from '../../../components/entity/sprite/EntityContainer';
import EntityDisplayWrapper from '../../../components/entity/sprite/EntityDisplayWrapper';
import ActionMenu from '../../../components/entity/ActionMenu';

type Entity = CharacterType | EnemyType | null;
type EntityType = 'character' | 'enemy' | null;

type Props = {
    enemies: EnemyType[];
    activeMenu: { id: number | null; type: EntityType };
    waitingForInput: boolean;
    playerTarget: Entity;
    onTarget: (entity: Entity) => void;
    onSpell: () => void;
    showDetail: (entity: EnemyType) => void;
    toggleMenu: (id: number | null, type: EntityType) => void;
}

const Enemy: React.FC<Props> = ({
    enemies,
    activeMenu,
    waitingForInput,
    playerTarget,
    onTarget,
    onSpell,
    showDetail,
    toggleMenu,
}) => {
    return (
        <>
            {enemies.map((enemy, index) => (
                <EntityContainer
                    key={enemy.id}
                    entity={enemy}
                    type="enemy"
                    index={index}
                    onClick={() => toggleMenu(enemy.id, 'enemy')}
                >
                <EntityDisplayWrapper entity={enemy} type="enemy" onTarget={onTarget} />
                    {waitingForInput && playerTarget && playerTarget.health > 0 && (
                        <ActionMenu
                            isVisible={activeMenu.id === enemy.id && activeMenu.type === 'enemy'}
                            type="enemy"
                            onSpell={onSpell}
                            detailScreen={() => showDetail(enemy)}
                            isCurrentTurn={enemy}
                        />
                    )}
                </EntityContainer>
            ))}
        </>
    );
};

export default Enemy;