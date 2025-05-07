import { useAtom } from 'jotai';
import CharacterAtom from '../../atom/CharacterAtom';
import EnemyAtom from '../../atom/BaseEnemyAtom';

export const useTurnOrder = () => {
  const [characters] = useAtom(CharacterAtom);
  const [enemies] = useAtom(EnemyAtom);

  const selectedCharacters = Object.values(characters).filter(char => char.isSelected);
  const allEntities = [...selectedCharacters, ...Object.values(enemies)];

  const turnOrder = allEntities.sort((a, b) => b.speed - a.speed);

  return turnOrder;
};