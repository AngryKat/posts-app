import { HomePage } from './components/HomePage';
import { PostsContextProvider } from './utils/PostsContextProvider copy';

import './App.css';
import { ModalsContextProvider } from './utils/ModalContextProvider';

function App() {
  return (
    <div className="App">
      <ModalsContextProvider>
        <PostsContextProvider>
          <HomePage />
        </PostsContextProvider>
      </ModalsContextProvider>
    </div>
  );
}

export default App;
