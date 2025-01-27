import { BrowserRouter, Routes, Route } from 'react-router-dom';
// import Home from './pages/Home';
import MainPage from './pages/MainPage';
import Login from './pages/Login';
import EnterPassword from './components/Auth/Login/EnterPassword';
import VerifyEmail from './components/Auth/Login/VerifyEmail';
import ResetPassword from './components/Auth/Login/ResetPassword';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<MainPage />} />
        <Route path="/login" element={<Login />} />
        <Route path="/enter-password" element={<EnterPassword />} />
        <Route path="/verify-email" element={<VerifyEmail />} />
        <Route path="/reset-password" element={<ResetPassword />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;