import React, { useState } from 'react';

function SignUpForm({ onLogin, onSetPurchases }) {

    const [username, setUsername] = useState('')
    const [password, setPassword] = useState('')
    const [full_name, setFull_name] = useState('')
    const [profile_pic, setProfile_pic] = useState('')
    const [address, setAddress] = useState('')
    const [city, setCity] = useState('')
    const [state, setState] = useState('')
    const [errors, setErrors] = useState([])

    function handleSubmit(e) {
        e.preventDefault()
        setErrors([])
        fetch('/signup', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                username,
                password,
                full_name,
                profile_pic,
                address,
                city,
                state,
            }),
        }).then((r) => {
            if (r.ok) {
                r.json().then((user) => {
                    onLogin(user)
                    onSetPurchases(user.purchases)
                });
            } else {
                r.json().then((err) => {
                    console.log(err);
                    setErrors([err.error]);
                }
            )}
        })
    }


    return (
        <form onSubmit={handleSubmit}>
            <label>Username: </label>
            <input type='text' name='username' id='username' value={username} onChange={(e) => setUsername(e.target.value)} />
            <br></br>
            <br></br>
            <label>Password: </label>
            <input type='text' name='password' id='password' value={password} onChange={(e) => setPassword(e.target.value)} />
            <br></br>
            <br></br>
            <label>Full Name: </label>
            <input type='text' name='full_name' id='full_name' value={full_name} onChange={(e) => setFull_name(e.target.value)} />
            <br></br>
            <br></br>
            <label>Profile Picture: </label>
            <input type='text' name='profile_pic' id='profile_pic' value={profile_pic} onChange={(e) => setProfile_pic(e.target.value)} />
            <br></br>
            <br></br>
            <label>Address: </label>
            <input type='text' name='address' id='address' value={address} onChange={(e) => setAddress(e.target.value)} />
            <br></br>
            <br></br>
            <label>City: </label>
            <input type='text' name='city' id='city' value={city} onChange={(e) => setCity(e.target.value)} />
            <br></br>
            <br></br>
            <label>State: </label>
            <input type='text' name='state' id='state' value={state} onChange={(e) => setState(e.target.value)} />
            <br></br>
            <br></br>
            <input type='submit' value='Sign Up' />
            {errors.map((err) => (
                <p key={err}>{err}</p>
            ))}
        </form>
    )
}

export default SignUpForm;