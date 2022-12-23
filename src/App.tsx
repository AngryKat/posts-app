import { Suspense } from 'react';
import { Spin } from 'antd';
import { HomePage } from './components/home-page';
import { ModalsContextProvider } from './utils/providers/modal-context-provider';
import { AuthContextProvider } from './utils/providers/auth-context-provider';

import './App.css';


function App() {
  return (
    <div className="App">
      <Suspense fallback={<div style={{ textAlign: 'center' }}><Spin /></div>}>
        <AuthContextProvider>
          <ModalsContextProvider>
            <HomePage />
          </ModalsContextProvider>
        </AuthContextProvider>
      </Suspense>
    </div>
  );
}

export default App;
