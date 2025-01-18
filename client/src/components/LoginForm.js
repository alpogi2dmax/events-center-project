import React, { useState } from 'react'

function LoginForm({onLogin}) {

    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [errors, setErrors] = useState([]);

    function handleSubmit(e) {
        e.preventDefault();
        fetch('/login', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ username, password }),
        }).then((r) => {
            if (r.ok) {
                r.json().then((user) => onLogin(user));
            } else {
                r.json().then((err) => setErrors(err.errors));
            }
        })
    }

    return (
        <form onSubmit={handleSubmit}>
            <label for="username">Username: </label>
            <input type="text" id="username" name="username" value={username} onChange={(e) => setUsername(e.target.value)}/>
            <br></br>
            <br></br>
            <label for="password">Password: </label>
            <input type="text" id="password" name="password" value={password} onChange={(e) => setPassword(e.target.value)}/>
            <br></br>
            <input type="submit" value="Login"/>
            {/* {errors.map((err) => (
                <p>{err}</p>
            ))} */}
        </form>
    )
}

export default LoginForm;