import { BrowserRouter as Router, Route, Routes } from 'react-router';
import MainMenu from './routes/mainMenu/MainMenu';
import CharacterSelect from './routes/selectCharacter/CharacterSelect';
import Options from './routes/options/Options';
import LevelLayout from './routes/gameState/LevelLayout';
const App = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<MainMenu />} />
        <Route path="/select-character" element={<CharacterSelect />} />
        <Route path="/options" element={<Options />} />
        <Route path="/game" element={<LevelLayout />} />
      </Routes>
    </Router>
  );
};

export default App;
