import { Suspense } from 'react';
import { Spin } from 'antd';
import { HomePage } from './components/home-page';
import { PostsContextProvider } from './utils/posts-context-provider';
import { ModalsContextProvider } from './utils/modal-context-provider';

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
