import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import Login from './routes/Login';
import Home from './routes/Home';
import { LoginProvider, useLogin } from '@shared/contexts/LoginContext';
import { setApiUrl } from '@shared/config/apiConfig';
import { setTokenGetter } from '@shared/api/api';

function AppRoutes() {
  const { isAuthenticated } = useLogin();

  return (
    <Routes>
      <Route
        path="/login"
        element={isAuthenticated ? <Navigate to="/" /> : <Login />}
      />
      <Route
        path="/"
        element={isAuthenticated ? <Home /> : <Navigate to="/login" />}
      />
    </Routes>
  );
}

export default function App() {
    setApiUrl(import.meta.env.VITE_BACKEND_URL);
    setTokenGetter(() => localStorage.getItem('token'));

    return (
    <LoginProvider>
      <BrowserRouter>
        <AppRoutes />
      </BrowserRouter>
    </LoginProvider>
  );
}
