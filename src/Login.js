import React, { useCallback, useContext } from "react";
import { withRouter, Redirect } from "react-router";
import firebaseApp from "./firebase";
import { AuthContext } from "./Auth.js";
import { Link } from 'react-router-dom';
import firebase from 'firebase';

const Login = ({ history }) => {
    const handleLogin = useCallback(
        async event => {
            event.preventDefault();
            const { email, password } = event.target.elements;
            try {
                await firebaseApp
                    .auth()
                    .signInWithEmailAndPassword(email.value, password.value);
                history.push("/invoice-generator");
            } catch (error) {
                alert(error);
            }
        },
        [history]
    );
    var provider = new firebase.auth.GoogleAuthProvider();
    const googleLogin = (provider) => {
        firebase.auth()
            .signInWithPopup(provider)
            .then((result) => {
                return result.user;
            }).catch((error) => {
                console.log(error)
            });
    }

    const { currentUser } = useContext(AuthContext);
    if (currentUser) {
        return <Redirect to="/generate" />;
    }

    return (
        <div className="login__page">
            <div className="login__image" />
            <div className="login__form">
                <div className="formBox">
                    <h1 className="center">Login</h1>
                    <form onSubmit={handleLogin}>
                        <label>
                            <input name="email" type="email" placeholder="Email" />
                        </label>
                        <label>
                            <input name="password" type="password" placeholder="Password" /><br />
                        </label>
                        <button type="submit" className="login_btn">Login</button>
                    </form>
                    <div className="signup" >
                        <span className="center"> OR </span>
                        <button className="mt-10 login_btn w-100" onClick={() => googleLogin(provider)}>Sign in with Google</button>
                    </div>
                    <div className="signup">
                        <span className="">Not having an account? </span>
                        <Link to="/signup" className="mt-10 center" style={{ textDecoration: 'none', color: '#000' }} >Sign up</Link>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default withRouter(Login);