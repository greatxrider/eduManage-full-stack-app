import { useContext, useRef, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { api } from '../utils/apiHelper';

import UserContext from '../context/UserContext';
import ErrorsDisplay from './ErrorsDisplay';

/**
 * UserSignUp component allows users to sign up for a new account.
 * 
 * @component
 */
const UserSignUp = () => {
    const { actions } = useContext(UserContext);
    const navigate = useNavigate();

    // State
    const firstName = useRef(null);
    const lastName = useRef(null);
    const emailAddress = useRef(null);
    const password = useRef(null);

    const [errors, setErrors] = useState([]);

    /**
     * Handles the form submission to sign up the user.
     * 
     * @param {Event} event - The form submission event.
     * @async
     * @function
     */
    const handleSubmit = async (event) => {
        event.preventDefault();

        const user = {
            firstName: firstName.current.value,
            lastName: lastName.current.value,
            emailAddress: emailAddress.current.value,
            password: password.current.value
        }

        try {
            const response = await api("/users", "POST", user);
            if (response.status === 201) {
                console.log(`${user.firstName} is successfully signed up!`);
                await actions.signIn({
                    username: user.emailAddress,
                    password: user.password
                });
                navigate("/");
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
                <h2>Sign Up</h2>
                <ErrorsDisplay errors={errors} />
                <form onSubmit={handleSubmit}>
                    <label htmlFor="firstName">First Name</label>
                    <input
                        id="firstName"
                        name="firstName"
                        type="text"
                        ref={firstName}
                        placeholder="First Name"
                    />
                    <label htmlFor="lastName">Last Name</label>
                    <input
                        id="lastName"
                        name="lastName"
                        type="text"
                        ref={lastName}
                        placeholder="Last Name"
                    />
                    <label htmlFor="emailAddress">Email Address</label>
                    <input
                        id="emailAddress"
                        name="emailAddress"
                        type="email"
                        ref={emailAddress}
                        placeholder="Email Address"
                    />
                    <label htmlFor="password">Password</label>
                    <input
                        id="password"
                        name="password"
                        type="password"
                        ref={password}
                        placeholder="Password"
                    />
                    <button className="button" type="submit">Sign Up</button>
                    <button
                        className="button button-secondary"
                        type="button"
                        onClick={handleCancel}
                    >
                        Cancel
                    </button>
                </form>
                <p>Already have a user account? Click here to <Link to="/signin">sign in</Link>!</p>
            </div>
        </main>
    );
}

export default UserSignUp;
