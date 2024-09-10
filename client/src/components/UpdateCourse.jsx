import { useState, useEffect, useContext, useRef } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { api } from '../utils/apiHelper';
import UserContext from '../context/UserContext';

import Loading from './Loading';
import ErrorsDisplay from './ErrorsDisplay';

/**
 * UpdateCourse component allows users to update an existing course.
 * 
 * @component
 */
const UpdateCourse = () => {
    const navigate = useNavigate();
    const { id } = useParams();
    const { authUser, password } = useContext(UserContext);

    const [course, setCourse] = useState({});
    const [loading, setLoading] = useState(true);
    const [errors, setErrors] = useState([]);

    const title = useRef(null);
    const description = useRef(null);
    const estimatedTime = useRef(null);
    const materialsNeeded = useRef(null);

    /**
     * Handles the API response and processes different status codes.
     * 
     * @param {Response} response - The response object from the fetch API.
     * @returns {Object|null} - The parsed JSON data or null.
     * @throws {Error} - Throws an error for unexpected status codes.
     */
    const handleApiResponse = async (response) => {
        let data;
        data = await response.json();

        if (response.status === 200) {
            return data;
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
        } else if (response.status === 404) {
            setErrors(data.errors);
            console.log(errors);
            navigate('/notfound');
        } else {
            throw new Error('Unexpected error');
        }
    };

    /**
     * Fetches the course details from the API.
     * 
     * @async
     * @function
     */
    const fetchCourse = async () => {
        try {
            const response = await api(`/courses/${id}`);
            const data = await handleApiResponse(response);
            if (data) {
                setCourse(data);
                console.log('Course is successfully fetched!');
            }
        } catch (error) {
            console.log(error);
            navigate("/error");
        } finally {
            setLoading(false);
        }
    };

    /**
     * Handles the form submission to update the course.
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
        };

        const updatedCourse = {
            title: title.current.value,
            description: description.current.value,
            estimatedTime: estimatedTime.current.value,
            materialsNeeded: materialsNeeded.current.value,
            userId: authUser.id
        };

        try {
            const response = await api(`/courses/${id}`, "PUT", updatedCourse, user);
            if (response.status === 204) {
                console.log('Course is successfully updated!');
                navigate('/');
            } else {
                await handleApiResponse(response);
            }
        } catch (error) {
            console.log(error);
            navigate("/error");
        } finally {
            setLoading(false);
        }
    };

    /**
     * Handles the cancel action and navigates back to the home page.
     * 
     * @param {Event} event - The cancel button click event.
     */
    const handleCancel = (event) => {
        event.preventDefault();
        navigate("/");
    };

    useEffect(() => {
        fetchCourse();
    }, [id]);

    if (loading) {
        return (<Loading />);
    }

    return (
        <main>
            <div className="wrap">
                <h2>Update Course</h2>
                <ErrorsDisplay errors={errors} />
                <form onSubmit={handleSubmit}>
                    <div className="main--flex">
                        <div>
                            <label htmlFor="courseTitle">Course Title</label>
                            <input
                                id="courseTitle"
                                name="courseTitle"
                                type="text"
                                ref={title}
                                defaultValue={course.title}
                            />
                            <p>By {course.user?.firstName} {course.user?.lastName}</p>
                            <label htmlFor="courseDescription">Course Description</label>
                            <textarea
                                id="courseDescription"
                                name="courseDescription"
                                ref={description}
                                defaultValue={course.description?.trim()}
                            ></textarea>
                        </div>
                        <div>
                            <label htmlFor="estimatedTime">Estimated Time</label>
                            <input
                                id="estimatedTime"
                                name="estimatedTime"
                                type="text"
                                ref={estimatedTime}
                                defaultValue={course.estimatedTime}
                            />
                            <label htmlFor="materialsNeeded">Materials Needed</label>
                            <textarea
                                id="materialsNeeded"
                                name="materialsNeeded"
                                ref={materialsNeeded}
                                defaultValue={course.materialsNeeded?.trim()}
                            ></textarea>
                        </div>
                    </div>
                    <button className="button" type="submit">Update Course</button>
                    <button className="button button-secondary" onClick={handleCancel}>Cancel</button>
                </form>
            </div>
        </main>
    );
};

export default UpdateCourse;
