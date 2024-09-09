import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { api } from '../utils/apiHelper';

const Courses = () => {
    const navigate = useNavigate();

    // State
    const [errors, setErrors] = useState([]);

    const courses = async () => {
        try {
            const response = await api("/courses");
            if (response.status === 201) {
                console.log(`Courses are successfully fetched!`);
                return response;
            } else if (response.status === 400) {
                const data = await response.json();
                setErrors(data.errors);
            } else {
                throw new Error('Unexpected response from server');
            }
        } catch (error) {
            console.log(error);
            navigate("/error");
        }
    }

    return (
        <div className="wrap main--grid">
            <a className="course--module course--link"
                href="course-detail.html">
                <h2 className="course--label">Course</h2>
                <h3 className="course--title">Build a Basic Bookcase</h3>
            </a>
            <a className="course--module course--link"
                href="course-detail.html">
                <h2 className="course--label">Course</h2>
                <h3 className="course--title">Learn How to Program</h3>
            </a>
            <a className="course--module course--link"
                href="course-detail.html">
                <h2 className="course--label">Course</h2>
                <h3 className="course--title">Learn How to Test
                    Programs</h3>
            </a>
            <a className="course--module course--add--module"
                href="create-course.html">
                <span className="course--add--title">
                    <svg version="1.1"
                        xmlns="http://www.w3.org/2000/svg" x="0px"
                        y="0px"
                        viewBox="0 0 13 13" className="add"><polygon
                            points="7,6 7,0 6,0 6,6 0,6 0,7 6,7 6,13 7,13 7,7 13,7 13,6 "></polygon></svg>
                    New Course
                </span>
            </a>
        </div>
    );
}

export default Courses;
