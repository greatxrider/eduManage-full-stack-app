import { Route, Routes } from 'react-router-dom';

//App Components
import Header from './components/Header';
import Courses from './components/Courses';


const App = () => {
  return (
    <div>
      <Header />
      <Routes>
        <Route path="/" element={<Courses />} />
      </Routes>
    </div>
  );
}

export default App;
