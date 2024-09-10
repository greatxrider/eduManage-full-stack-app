import { useState, useEffect, useContext } from 'react';
import { useNavigate, useParams, Link } from 'react-router-dom';
import ReactMarkdown from 'react-markdown';
import { api } from '../utils/apiHelper';

import UserContext from '../context/UserContext';
import Loading from './Loading';

const CourseDetail = () => {
    const navigate = useNavigate();
    const { id } = useParams();
    const { authUser, password, actions } = useContext(UserContext);

    // State
    const [course, setCourse] = useState({});
    const [errors, setErrors] = useState([]);
    const [loading, setLoading] = useState(true);
    const [userId, setUserId] = useState(null);

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
                setUserId(data.userId);
                console.log('Course is successfully fetched!');
            }
        } catch (error) {
            console.log(error);
            navigate("/error");
        } finally {
            setLoading(false);
        }
    };

    const deleteCourse = async () => {
        const user = {
            username: authUser.emailAddress,
            password: password
        };

        try {
            const response = await api(`/courses/${id}`, "DELETE", null, user);
            if (response.status === 204) {
                console.log(`Course id:${id} is successfully deleted!`);
                navigate('/');
            } else {
                const data = await response.json();
                if (response.status === 400) {
                    setErrors(data.errors);
                    console.log(data.errors);
                } else if (response.status === 403) {
                    setErrors(data.errors);
                    console.log(data.errors);
                    navigate('/forbidden');
                } else if (response.status === 401) {
                    setErrors(data.errors);
                    console.log(data.errors);
                    actions.signOut();
                    navigate('/signin');
                } else {
                    throw new Error('Unexpected error');
                }
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
    }, [id, userId]);

    if (loading) {
        return (<Loading />);
    }

    return (
        <main>
            <div className="actions--bar">
                <div className="wrap">
                    {authUser && authUser.id === userId ? (
                        <>
                            <Link className="button" to={`/courses/${id}/update`}>Update Course</Link>
                            <button className="button" onClick={deleteCourse} aria-label="Delete Course">Delete Course</button>
                        </>
                    ) : null}
                    <Link className="button button-secondary" to="/">Return to List</Link>
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
