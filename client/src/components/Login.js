import React from 'react';
import { useState } from 'react';
import LoginForm from './LoginForm';
import SignUpForm from './SignUpForm';

function Login({onLogin, onSetEvents}) {

    const [showLogin, setShowLogin] = useState(true)
    
    return (
        <div className='logincss'>
            <h1 className='headercss'>
                Events Center
            </h1>
            {showLogin ? (
                <>
                    <LoginForm onLogin={onLogin} onSetEvents={onSetEvents}/>
                    <br></br>
                    <p>
                        Don't have an account? &nbsp;
                        <button onClick={() => setShowLogin(false)}>
                            Sign Up
                        </button>
                    </p>
                </>   
            ) : (
                <>
                    <SignUpForm onLogin={onLogin} onSetEvents={onSetEvents}/>
                    <br></br>
                    <p>
                        Already have an account? &nbsp;
                        <button onClick={() => setShowLogin(true)}>
                            Log In
                        </button>
                    </p>
                </>
            )}
        </div>
    )

}

export default Login;