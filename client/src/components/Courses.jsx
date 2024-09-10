import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { api } from '../utils/apiHelper';

import Loading from './Loading';

/**
 * Courses component fetches and displays a list of courses.
 * 
 * @component
 */
const Courses = () => {
    const navigate = useNavigate();

    // State
    const [courses, setCourses] = useState([]);
    const [errors, setErrors] = useState([]);
    const [loading, setLoading] = useState(true);

    /**
     * Handles the API response and processes different status codes.
     * 
     * @param {Response} response - The response object from the fetch API.
     * @returns {Object|null} - The parsed JSON data or null.
     * @throws {Error} - Throws an error for unexpected status codes.
     */
    const handleApiResponse = async (response) => {
        let data;

        if (response.status !== 204) {
            data = await response.json();
        }

        if (response.status === 200) {
            return data;
        } else if (response.status === 204) {
            return null;
        } else if (response.status === 304) {
            console.log('Resource not modified, using cached version.');
            return null;
        } else if (response.status === 400) {
            setErrors(data.errors);
            console.log(errors);
        } else if (response.status === 401) {
            navigate("/signin");
            throw new Error('Unauthorized');
        } else if (response.status === 403) {
            setErrors(data.errors);
            console.log(errors);
            navigate('/forbidden');
        } else {
            throw new Error('Unexpected error');
        }
    };

    /**
     * Fetches the list of courses from the API.
     * 
     * @async
     * @function
     */
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
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchCourses();
    }, []);

    if (loading) {
        return <Loading />; // Render the Loading component while loading
    }

    return (
        <div className="wrap main--grid">
            {courses.map((course) => (
                <a key={course.id} className="course--module course--link" href={`/courses/${course.id}`}>
                    <h2 className="course--label">Course</h2>
                    <h3 className="course--title">{course.title}</h3>
                </a>
            ))}
            <a className="course--module course--add--module" href="/courses/create">
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
