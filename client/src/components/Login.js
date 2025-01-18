import React from 'react';
import { useState } from 'react';
import LoginForm from './LoginForm';

function Login({onLogin}) {

    const [showLogin, setShowLogin] = useState(true)
    
    return (
        <div>
            <h1 className='headercss'>
                Events Center
            </h1>
            {showLogin ? (
                <>
                    <LoginForm onLogin={onLogin} />
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
                    <p>TEST</p>
                    {/* <SignUpForm onLogin={onLogin} />
                    <Divider />
                    <p>
                        Already have an account? &nbsp;
                        <Button onClick={() => setShowLogin(true)}>
                            Log In
                        </Button>
                    </p> */}
                </>
            )}
        </div>
    )

}

export default Login;