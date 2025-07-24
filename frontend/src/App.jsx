import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import Login from './routes/Login';
import Home from './routes/Home';
import { LoginProvider, useLogin } from './contexts/LoginContext';

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
  return (
    <LoginProvider>
      <BrowserRouter>
        <AppRoutes />
      </BrowserRouter>
    </LoginProvider>
  );
}
