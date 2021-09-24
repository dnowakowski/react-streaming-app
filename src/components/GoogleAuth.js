import React, {useEffect, useRef} from 'react';
import {connect } from 'react-redux';
import {signIn, signOut} from '../actions'

const GoogleAuth = ( {isSignedIn, signIn, signOut}) => {
    let googleAuth = useRef()

    const onSignInClicked = () => {
        googleAuth.current.signIn();
    }

    const onSignOutClicked = () => {
        googleAuth.current.signOut();
    }

    const onAuthChange = (isSignedIn) => {
        if(isSignedIn){
            signIn(googleAuth.current.currentUser.get().getId());
        }
        else{
            signOut();
        }
    };

    useEffect(() => {
        window.gapi.load('client:auth2', () => {
            window.gapi.client.init({
                clientId: `133749676646-f40sn5e75rdke6t5195hbv223he8erud.apps.googleusercontent.com`,
                scope: 'email'
            }).then(() => {
                googleAuth.current = window.gapi.auth2.getAuthInstance();
                //setIsSignedIn(googleAuth.current.isSignedIn.get());
                onAuthChange(googleAuth.current.isSignedIn.get())
                googleAuth.current.isSignedIn.listen(onAuthChange);
            });
        });
    }, []);

        const renderAuthButton = () => {
            if(isSignedIn === null) {
                return null;
            }
            else if(isSignedIn){
                return (
                    <button onClick = {onSignOutClicked} className = "ui red google button">
                    <i className = "google icon"/>
                        Sign Out
                    </button>
                )
            }
            else{
                return (
                    <button onClick = {onSignInClicked} className = "ui red google button">
                    <i className = "google icon"/>
                    Sign In with Google
                    </button>
                    )
            }
        }

        return(
            <div>
                
                {renderAuthButton()}
                </div>
        )

}

const mapStateToProps = (state) => {
    return {isSignedIn: state.auth.isSignedIn};
} 

export default connect(mapStateToProps, {signIn, signOut})(GoogleAuth);