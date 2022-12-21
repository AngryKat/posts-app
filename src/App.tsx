import { Suspense } from 'react';
import { Spin } from 'antd';
import { HomePage } from './components/HomePage';
import { PostsContextProvider } from './utils/PostsContextProvider copy';
import { ModalsContextProvider } from './utils/ModalContextProvider';

import './App.css';


function App() {
  return (
    <div className="App">
      <Suspense fallback={<div style={{ textAlign: 'center' }}><Spin /></div>}>
        <ModalsContextProvider>
          <PostsContextProvider>
            <HomePage />
          </PostsContextProvider>
        </ModalsContextProvider>
      </Suspense>
    </div>
  );
}

export default App;
