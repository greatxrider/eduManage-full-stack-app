import { useContext, useRef, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { api } from '../utils/apiHelper';

import UserContext from '../context/UserContext';
import ErrorsDisplay from './ErrorsDisplay';

/**
 * CreateCourse component handles the creation of a new course.
 * 
 * @component
 */
const CreateCourse = () => {
    const { authUser, password } = useContext(UserContext);
    const navigate = useNavigate();

    // State
    const title = useRef(null);
    const description = useRef(null);
    const estimatedTime = useRef(null);
    const materialsNeeded = useRef(null);

    const [errors, setErrors] = useState([]);

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
     * Handles the form submission to create a new course.
     * 
     * @param {Event} event - The form submission event.
     * @async
     * @function
     */
    const handleSubmit = async (event) => {
        event.preventDefault();

        const user = {
            username: authUser.emailAddress,
            password: password
        }

        const course = {
            title: title.current.value,
            description: description.current.value,
            estimatedTime: estimatedTime.current.value,
            materialsNeeded: materialsNeeded.current.value,
            userId: authUser.id
        }

        try {
            const response = await api("/courses", "POST", course, user);
            if (response.status === 201) {
                console.log(`${course.title} is successfully created!`);
                navigate("/");
            } else {
                await handleApiResponse(response);
            }
        } catch (error) {
            console.log(error);
            navigate("/error");
        }
    }

    /**
     * Handles the cancel action and navigates back to the home page.
     * 
     * @param {Event} event - The cancel button click event.
     */
    const handleCancel = (event) => {
        event.preventDefault();
        navigate("/");
    }

    return (
        <main>
            <div className="wrap">
                <h2>Create Course</h2>
                <ErrorsDisplay errors={errors} />
                <form onSubmit={handleSubmit}>
                    <div className="main--flex">
                        <div>
                            <label htmlFor="courseTitle">Course Title</label>
                            <input id="courseTitle" name="courseTitle"
                                type="text" ref={title} />
                            <p>By {authUser.firstName} {authUser.lastName}</p>

                            <label htmlFor="courseDescription">Course
                                Description</label>
                            <textarea id="courseDescription"
                                name="courseDescription" ref={description}></textarea>
                        </div>
                        <div>
                            <label htmlFor="estimatedTime">Estimated
                                Time</label>
                            <input id="estimatedTime" name="estimatedTime"
                                type="text" ref={estimatedTime} />

                            <label htmlFor="materialsNeeded">Materials
                                Needed</label>
                            <textarea id="materialsNeeded"
                                name="materialsNeeded" ref={materialsNeeded}></textarea>
                        </div>
                    </div>
                    <button className="button" type="submit">Create Course</button>
                    <button className="button button-secondary" onClick={handleCancel}>Cancel</button>
                </form>
            </div>
        </main>
    );
}

export default CreateCourse;
