import { BrowserRouter as Router, Route, Routes } from 'react-router';
import MainMenu from './routes/main menu/MainMenu';
import CharacterSelect from './routes/select character/CharacterSelect';
import Options from './routes/options/Options';

const App = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<MainMenu />} />
        <Route path="/select-character" element={<CharacterSelect />} />
        <Route path="/options" element={<Options />} />
      </Routes>
    </Router>
  );
};

export default App;
