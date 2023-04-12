import './App.css';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Home from './home/Home';
import CreateCourse from './courses/CreateCourse';
import MyClasses from './classes/MyClasses';
import CourseClasses from './classes/CourseClasses';
import ClassDetails from './classes/ClassDetails';
import CourseDetails from './courses/CourseDetails';
import SignIn from './authentication/SignIn';
import SignUp from './authentication/SignUp';
import Navbar from './components/Navbar';

function App() {
  return (
    <Router>
      <Navbar />
      <Routes>
        <Route exact path="/" element={<Home />} />
        <Route path="/signin" element={<SignIn />} />
        <Route path="/create-course" element={<CreateCourse />} />
        <Route path="/signup" element={<SignUp />} />
        <Route path="/myclasses" element={<MyClasses />} />
        <Route path="/classes/:courseId" element={<CourseClasses />} />
        <Route path="/class/details/:classId" element={<ClassDetails />} />
        <Route path="/course/details/:courseId" element={<CourseDetails />} />
      </Routes>
    </Router>
  );
}

export default App;
