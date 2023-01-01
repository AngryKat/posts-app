import { Suspense, lazy } from 'react';
import { BrowserRouter, Navigate, Route, Routes, useNavigate } from 'react-router-dom';

import { Layout, Menu, MenuProps, Spin } from 'antd';
import { LogoutOutlined, HomeOutlined, UserOutlined } from '@ant-design/icons';
import { HomePage } from './components/home-page';
import { ModalsContextProvider } from './utils/providers/modal-context-provider';
import { AuthContextProvider, useAuthContext } from './utils/providers/auth-context-provider';

import './App.css';

const AuthPage = lazy(() => import('pages/auth-page'))
const UserProfilePage = lazy(() => import('pages/user-profile-page'))


const AppRoutes = () => {
  const { userId } = useAuthContext();
  return (
    <Routes>
      <Route path="*" element={<Navigate to='/' replace />} />
      <Route path="/" element={<Navigate to={userId ? `/users/${userId}` : '/login'} replace />} />
      <Route path="/login" element={<AuthPage />} />
      <Route path="/signup" element={<AuthPage isSignUp />} />
      <Route path="/users/:userId" element={<HomePage />} />
      <Route path="/profile" element={<UserProfilePage />} />
    </Routes>
  )
}

const NavigationSider = () => {
  const nav = useNavigate();
  const { logout, isLoggedIn } = useAuthContext();
  const handleMenuClick: MenuProps['onClick'] = ({ key }) => {
    switch (key) {
      case 'home': nav('/'); break;
      case 'profile': nav('/profile'); break;
      case 'logout': logout(); nav('/'); break;
    }
  }

  if (!isLoggedIn) {
    return null;
  }

  return (
    <Layout.Sider
      theme="light"
      breakpoint="lg"
      collapsedWidth="0"
      style={{
        overflow: 'auto',
        height: '100vh',
        position: 'fixed',
        left: 0,
        top: 0,
        bottom: 0,
      }}>
      <Menu mode="inline" selectable={false} theme="light" onClick={handleMenuClick} items={[
        {
          key: 'home',
          label: 'Home',
          icon: <HomeOutlined />,
        },
        {
          key: 'profile',
          label: 'Profile',
          icon: <UserOutlined />,
        },
        {
          key: 'logout',
          label: 'Log out',
          icon: <LogoutOutlined />
        },
      ]} />

    </Layout.Sider>
  )
}

function App() {
  return (
    <Suspense fallback={<div style={{ textAlign: 'center' }}><Spin /></div>}>
      <AuthContextProvider>
        <ModalsContextProvider>
          <BrowserRouter>
            <Layout id="App" className="App">
              <NavigationSider />
              <Layout>
                <AppRoutes />
              </Layout>
            </Layout>

          </BrowserRouter>
        </ModalsContextProvider>
      </AuthContextProvider>
    </Suspense>
  );
}

export default App;
