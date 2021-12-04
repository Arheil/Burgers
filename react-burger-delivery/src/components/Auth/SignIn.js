import React, { Component } from "react";
import firebase from "firebase/compat";
import {firebaseApp} from "../../base";
import Login from "./Login";

class SignIn extends Component {
    state = {
        user: ''
    }

    componentDidMount() {
        firebase.auth().onAuthStateChanged(user => {
            if (user) {
                this.authHandler({ user })
            }
        })
    }

    authHandler = async (authData) => {
        console.log(authData)
        const { email } = authData.user;
        this.setState({ user: email });
    }

    authenticate = () => {
        const authProvider = new firebase.auth['GithubAuthProvider']();
        firebaseApp
            .auth()
            .signInWithPopup(authProvider)
            .then(this.authHandler);
    }

    render() {
        if (!this.state.user) {
            return <Login authenticate={this.authenticate}/>
        }
        return this.props.children;
    }
}

export default SignIn;