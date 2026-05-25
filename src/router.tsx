import { Routes, Route } from 'react-router-dom';
import HomePage from './pages/HomePage.tsx';
import AboutPage from './pages/AboutPage.tsx';
import NotFoundPage from './pages/NotFoundPage.tsx';
import PokemonDetails from './components/PokemonDetails.tsx';

export default function AppRouter() {
  return (
    <Routes>
      <Route path="/" element={<HomePage />}>
        <Route path="details/:detailsId" element={<PokemonDetails />} />
      </Route>
      <Route path="/about" element={<AboutPage />} />
      <Route path="*" element={<NotFoundPage />} />
    </Routes>
  );
}
