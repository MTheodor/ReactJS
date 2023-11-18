import { BrowserRouter, Route, Routes } from 'react-router-dom';
import {
  Auth,
  AuthContextProvider,
  Profile,
  EditProfile,
  Nav,
  NotFound,
  GamesList,
  GameDetails,
  Favorites,
  FavoriteDetails,
  AddOwnGame,
  EditOwnGame,
} from './features';

function App() {
  return (
    <AuthContextProvider>
      <BrowserRouter>
        <Nav />
        <Routes>
          <Route path="/" element={<GamesList />} />
          <Route path="/login" element={<Auth />} />
          <Route path="/register" element={<Auth />} />
          <Route path="/profile/:userId" element={<Profile />} />
          <Route path="/profile/edit/:userId" element={<EditProfile />} />
          <Route path="/:currentPage" element={<GamesList />} />
          <Route path="/:currentPage/:gameId" element={<GameDetails />} />
          <Route path="/favorites" element={<Favorites />} />
          <Route path="/favorites/:currentPage" element={<Favorites />} />
          <Route
            path="/favorites/:currentPage/:gameId"
            element={<FavoriteDetails />}
          />
          <Route path="/favorites/add" element={<AddOwnGame />} />
          <Route path="/favorites/edit/:gameId" element={<EditOwnGame />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </BrowserRouter>
    </AuthContextProvider>
  );
}

export { App };
