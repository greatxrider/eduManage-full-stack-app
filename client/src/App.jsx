import { Route, Routes, Navigate } from 'react-router-dom';

//App Components
import Header from './components/Header';
import UserSignIn from './components/UserSignIn';
import UserSignOut from './components/UserSignOut';
import UserSignUp from './components/UserSignUp';
import Courses from './components/Courses';
import CourseDetail from './components/CourseDetail';
import CreateCourse from './components/CreateCourse';
import UpdateCourse from './components/UpdateCourse';
import PrivateRoute from './components/PrivateRoute';
import NotFound from './components/NotFound';
import Error from './components/Error';
import Forbidden from './components/Forbidden';
import Footer from './components/Footer';
import Settings from './components/Settings';

const App = () => {
  return (
    <div>
      <Header />
      <Routes>
        <Route path="/" element={<Navigate to="/courses" />} />
        <Route path="/signin" element={<UserSignIn />} />
        <Route path="/signout" element={<UserSignOut />} />
        <Route path="/signup" element={<UserSignUp />} />
        <Route path="/courses" element={<Courses />} />
        <Route path="/courses/:id" element={<CourseDetail />} />
        <Route element={<PrivateRoute />}>
          <Route path="/courses/create" element={<CreateCourse />} />
          <Route path="/courses/:id/update" element={<UpdateCourse />} />
          <Route path="settings" element={<Settings />} />
        </Route>
        <Route path="/forbidden" element={<Forbidden />} />
        <Route path="/error" element={<Error />} />
        <Route path="*" element={<NotFound />} />
      </Routes>
      <Footer />
    </div>
  );
}

export default App;
