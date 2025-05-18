import React from 'react';
import { CharacterType } from '../../../atom/CharacterAtom';
import { EnemyType } from '../../../atom/BaseEnemyAtom';
import EntityContainer from '../../../components/entity/sprite/EntityContainer';
import EntityDisplayWrapper from '../../../components/entity/sprite/EntityDisplayWrapper';
import ActionMenu from '../../../components/entity/actionMenu/ActionMenu';

type Entity = CharacterType | EnemyType | null;
type EntityType = 'character' | 'enemy' | null;

type Props = {
    characters: CharacterType[];
    activeMenu: { id: number | null; type: EntityType };
    waitingForInput: boolean;
    playerTarget: Entity;
    onTarget: (entity: Entity) => void;
    onSpell: () => void;
    showDetail: (entity: CharacterType) => void;
    toggleMenu: (id: number | null, type: EntityType) => void;
}

const CharacterEntities: React.FC<Props> = ({
    characters,
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
            {characters.map((char, index) => (
                <EntityContainer
                    key={char.id}
                    entity={char}
                    type="character"
                    index={index}
                    onClick={() => toggleMenu(char.id, 'character')}
                >
                    <EntityDisplayWrapper entity={char} type="character" onTarget={onTarget} />
                        {waitingForInput && playerTarget && playerTarget.health > 0 && (
                            <ActionMenu
                                isVisible={activeMenu.id === char.id && activeMenu.type === 'character'}
                                type="character"
                                onSpell={onSpell}
                                detailScreen={() => showDetail(char)}
                                isCurrentTurn={char}
                            />
                    )}
                </EntityContainer>
            ))}
        </>
    );
};

export default CharacterEntities;