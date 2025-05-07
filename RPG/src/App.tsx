import { useState } from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router';
import MainMenu from './routes/mainMenu/MainMenu';
import CharacterSelect from './routes/selectCharacter/CharacterSelect';
import LevelLayout from './routes/gameState/LevelLayout';
import OrientationOverlay from './components/OrientationOverlay';
import LoadingScreen from './components/LoadingScreen';

const App = () => {
  const [loadingComplete, setLoadingComplete] = useState(false);

  if (!loadingComplete) {
    return <LoadingScreen onFinish={() => setLoadingComplete(true)} />;
  }

  return (
    <Router>
      <OrientationOverlay />
      <Routes>
        <Route path="/" element={<MainMenu />} />
        <Route path="/select-character" element={<CharacterSelect />} />
        <Route path="/game" element={<LevelLayout />} />
      </Routes>
    </Router>
  );
};

export default App;