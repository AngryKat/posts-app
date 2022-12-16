import React from 'react';
import { HomePage } from './components/HomePage';
import './App.css';
import { PostsContextProvider } from './utils/PostsContextProvider';

function App() {
  return (
    <div className="App">
      <PostsContextProvider>
        <HomePage />
      </PostsContextProvider>
    </div>
  );
}

export default App;
