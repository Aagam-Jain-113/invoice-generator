import React, { useCallback } from "react";
import { withRouter } from "react-router";
import firebaseApp from "./firebase";
import { Link } from 'react-router-dom';

const SignUp = ({ history }) => {
    const handleSignUp = useCallback(async event => {
        event.preventDefault();
        const { email, password } = event.target.elements;
        try {
            await firebaseApp
                .auth()
                .createUserWithEmailAndPassword(email.value, password.value);
            history.push("/invoice-generator");
        } catch (error) {
            alert(error);
        }
    }, [history]);
    
    return (
        <div className="login__page">
            <div className="signup__image" />
            <div className="login__form">
                <div className="formBox">
                    <h1 className="center">Sign up</h1>
                    <form onSubmit={handleSignUp}>
                        <label>
                            <input name="email" type="email" placeholder="Email" />
                        </label>
                        <label>
                            <input name="password" type="password" placeholder="Password" />
                        </label>
                        <button type="submit" className="login_btn">Sign Up</button>
                    </form>
                    <div className="signup">
                        <span className="mt-10">Already have an account? </span>
                        <Link to="/login" style={{textDecoration:'none',color: '#000'}} >Login</Link>
                    </div>
                </div>
            </div>
        </div>

    );
};

export default withRouter(SignUp);