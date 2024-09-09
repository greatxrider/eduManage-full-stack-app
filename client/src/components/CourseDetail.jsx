import { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import ReactMarkdown from 'react-markdown';
import { api } from '../utils/apiHelper';

import Loading from './Loading';

const CourseDetail = () => {
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

    useEffect(() => {
        fetchCourse();
    }, [id]);

    if (loading) {
        return (<Loading />);
    }

    return (
        <main>
            <div className="actions--bar">
                <div className="wrap">
                    <a className="button" href={`/courses/${id}/update`}>Update Course</a>
                    <a className="button" href="#">Delete Course</a>
                    <a className="button button-secondary" href="/">Return to List</a>
                </div>
            </div>
            <div className="wrap">
                <h2>Course Detail</h2>
                <form>
                    <div className="main--flex" key={course.id}>
                        <div>
                            <h3 className="course--detail--title">Course</h3>
                            <h4 className="course--name">{course.title}</h4>
                            <p>By {course.user?.firstName} {course.user?.lastName}</p>
                            <ReactMarkdown>{course.description && course.description.trim() ? course.description : 'Not available'}</ReactMarkdown>
                        </div>
                        <div>
                            <h3 className="course--detail--title">Estimated Time</h3>
                            <p>{course.estimatedTime ? course.estimatedTime : 'Not available'}</p>

                            <h3 className="course--detail--title">Materials Needed</h3>
                            {course.materialsNeeded && course.materialsNeeded.trim() ? (
                                <ReactMarkdown className="course--detail--list">{course.materialsNeeded}</ReactMarkdown>
                            ) : (
                                <p>Not available</p>
                            )}
                        </div>
                    </div>
                </form>
            </div>
        </main>
    );
}

export default CourseDetail;
