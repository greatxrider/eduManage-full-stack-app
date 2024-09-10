import { useContext, useRef, useState } from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import UserContext from '../context/UserContext';
import ErrorsDisplay from './ErrorsDisplay';

/**
 * UserSignIn component allows users to sign in to their account.
 * 
 * @component
 */
const UserSignIn = () => {
    const { actions } = useContext(UserContext);
    const navigate = useNavigate();
    const location = useLocation();

    // State
    const email = useRef(null);
    const password = useRef(null);
    const [errors, setErrors] = useState([]);

    /**
     * Handles the form submission to sign in the user.
     * 
     * @param {Event} event - The form submission event.
     * @async
     * @function
     */
    const handleSubmit = async (event) => {
        event.preventDefault();
        let from = "/";
        if (location.state) {
            from = location.state.from;
        }

        const credentials = {
            username: email.current.value,
            password: password.current.value
        };

        try {
            const user = await actions.signIn(credentials);
            if (user) {
                navigate(from);
            } else {
                setErrors(["Sign-in was unsuccessful"]);
            }
        } catch (error) {
            console.log(error);
            setErrors(["Sign-in was unsuccessful"]);
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
            <div className="form--centered">
                <h2>Sign In</h2>
                <ErrorsDisplay errors={errors} />
                <form onSubmit={handleSubmit}>
                    <label htmlFor="emailAddress">Email Address</label>
                    <input
                        id="emailAddress"
                        name="emailAddress"
                        type="email"
                        ref={email}
                        placeholder="Email"
                    />
                    <label htmlFor="password">Password</label>
                    <input
                        id="password"
                        name="password"
                        type="password"
                        ref={password}
                        placeholder="Password"
                    />
                    <button className="button" type="submit">Sign In</button>
                    <button
                        className="button button-secondary"
                        onClick={handleCancel}
                    >
                        Cancel
                    </button>
                </form>
                <p>
                    Don't have a user account? Click here to <Link to="/signup">sign up</Link>!
                </p>
            </div>
        </main>
    );
}

export default UserSignIn;
