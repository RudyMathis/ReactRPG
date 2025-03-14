import { atom } from 'jotai';
import { EnemyType } from './BaseEnemyAtom';
import { CharacterType } from './CharacterAtom';

export const playerTargetAtom = atom<EnemyType | CharacterType | null>(null);
