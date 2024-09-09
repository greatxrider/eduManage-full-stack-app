import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { api } from '../utils/apiHelper';

const Courses = () => {
    const navigate = useNavigate();

    // State
    const [courses, setCourses] = useState([]);

    const handleApiResponse = async (response) => {
        if (response.status === 200) {
            const data = await response.json();
            return data;
        } else if (response.status === 304) {
            console.log('Resource not modified, using cached version.');
            return null;
        } else if (response.status === 400) {
            const data = await response.json();
            throw new Error(data.error);
        }
    };

    const fetchCourses = async () => {
        try {
            const response = await api("/courses");
            const data = await handleApiResponse(response);
            if (data) {
                setCourses(data);
                console.log('Courses are successfully fetched!');
            }
        } catch (error) {
            console.log(error);
            navigate("/error");
        }
    };

    useEffect(() => {
        fetchCourses();
    }, []);

    return (
        <div className="wrap main--grid">
            {courses.map((course) => (
                <a key={course.id} className="course--module course--link" href={`/courses/${course.id}`}>
                    <h2 className="course--label">Course</h2>
                    <h3 className="course--title">{course.title}</h3>
                </a>
            ))}
            <a className="course--module course--add--module" href="/create-course">
                <span className="course--add--title">
                    <svg version="1.1" xmlns="http://www.w3.org/2000/svg" x="0px" y="0px" viewBox="0 0 13 13" className="add">
                        <polygon points="7,6 7,0 6,0 6,6 0,6 0,7 6,7 6,13 7,13 7,7 13,7 13,6 "></polygon>
                    </svg>
                    New Course
                </span>
            </a>
        </div>
    );
}

export default Courses;
