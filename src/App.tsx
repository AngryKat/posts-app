import { Suspense, lazy } from 'react';
import { BrowserRouter, Link, Navigate, Route, Routes } from 'react-router-dom';

import { Button, Spin } from 'antd';
import { HomePage } from './components/home-page';
import { ModalsContextProvider } from './utils/providers/modal-context-provider';
import { AuthContextProvider, useAuthContext } from './utils/providers/auth-context-provider';

import './App.css';

const LoginPage = lazy(() => import('pages/LoginPage'))
const SignUpPage = lazy(() => import('pages/SignUpPage'))


const AppRoutes = () => {
  const { userId } = useAuthContext();
  return (
    <Routes>
      <Route path="*" element={<Navigate to='/' replace />} />
      <Route path="/" element={<Navigate to={userId ? `/users/${userId}` : '/login'} replace />} />
      <Route path="/login" element={<LoginPage />} />
      <Route path="/signup" element={<SignUpPage />} />
      <Route path="/users/:userId" element={<HomePage />} />
    </Routes>
  )
}


function App() {
  return (
    <div className="App">
      <Suspense fallback={<div style={{ textAlign: 'center' }}><Spin /></div>}>
        <AuthContextProvider>
          <ModalsContextProvider>
            <BrowserRouter>
              <AppRoutes />
            </BrowserRouter>
          </ModalsContextProvider>
        </AuthContextProvider>
      </Suspense>

    </div>
  );
}

export default App;
