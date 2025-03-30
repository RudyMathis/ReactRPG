import { BrowserRouter as Router, Route, Routes } from 'react-router';
import MainMenu from './routes/mainMenu/MainMenu';
import CharacterSelect from './routes/selectCharacter/CharacterSelect';
import Options from './routes/options/Options';
import LevelLayout from './routes/gameState/LevelLayout';
import { useAtom } from 'jotai';
import { GameLevelAtom } from './atom/GameLevelAtom';
import { useMemo } from 'react';

const App = () => {
  const [currentGameLevel] = useAtom(GameLevelAtom);

  const gameRoute = useMemo(
    () => `/game/${currentGameLevel.level}-${currentGameLevel.round}`,
    [currentGameLevel.level, currentGameLevel.round]
  );

  return (
    <Router>
      <Routes>
        <Route path="/" element={<MainMenu />} />
        <Route path="/select-character" element={<CharacterSelect />} />
        <Route path="/options" element={<Options />} />
        
        {/* Dynamically render the LevelLayout based on the current game level */}
        <Route path={gameRoute} element={<LevelLayout />} />
      </Routes>
    </Router>
  );
};

export default App;
