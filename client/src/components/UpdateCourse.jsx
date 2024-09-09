import { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { api } from '../utils/apiHelper';

import Loading from './Loading';

const UpdateCourse = () => {
    const navigate = useNavigate();
    const { id } = useParams();

    // State
    const [course, setCourse] = useState({});
    const [loading, setLoading] = useState(true);

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
        } else if (response.status === 401) {
            navigate("/forbidden");
        }
    };

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

    const handleCancel = (event) => {
        event.preventDefault();
        navigate("/");
    }

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
                <form>
                    <div className="main--flex">
                        <div>
                            <label htmlFor="courseTitle">Course Title</label>
                            <input id="courseTitle" name="courseTitle"
                                type="text" value={course.title} />
                            <p>By {course.user?.firstName} {course.user?.lastName}</p>
                            <label htmlFor="courseDescription">Course Description</label>
                            <textarea id="courseDescription" name="courseDescription">{course.description?.trim()}</textarea>
                        </div>
                        <div>
                            <label htmlFor="estimatedTime">Estimated
                                Time</label>
                            <input id="estimatedTime" name="estimatedTime"
                                type="text" value="14 hours" />

                            <label htmlFor="materialsNeeded">Materials
                                Needed</label>
                            <textarea id="materialsNeeded"
                                name="materialsNeeded">{course.materialsNeeded?.trim()}</textarea>
                        </div>
                    </div>
                    <button className="button" type="submit">Update
                        Course</button><button
                            className="button button-secondary"
                            onClick={handleCancel}>Cancel</button>
                </form>
            </div>
        </main>
    );
}

export default UpdateCourse;
