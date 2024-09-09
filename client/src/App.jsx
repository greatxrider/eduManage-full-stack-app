import { Route, Routes, Navigate } from 'react-router-dom';

//App Components
import Header from './components/Header';
import Courses from './components/Courses';
import CourseDetail from './components/CourseDetail';
import NotFound from './components/NotFound';
import Error from './components/Error';
import Forbidden from './components/Forbidden';

const App = () => {
  return (
    <div>
      <Header />
      <Routes>
        <Route path="/" element={<Navigate to="/courses" />} />
        <Route path="/courses" element={<Courses />} />
        <Route path="/courses/:id" element={<CourseDetail />} />
        <Route path="/forbidden" element={<Forbidden />} />
        <Route path="/error" element={<Error />} />
        <Route path="*" element={<NotFound />} />
      </Routes>
    </div>
  );
}

export default App;
