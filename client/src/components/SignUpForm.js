import React from 'react';
import { useFormik } from 'formik';
import * as yup from "yup";

function SignUpForm({ onLogin }) {

    const formSchema = yup.object().shape({
        username: yup.string().required("Must enter username").min(2).max(15),
        password: yup.string().required("Must enter password").min(2).max(15),
        full_name: yup.string().required("Must enter full name"),
        profile_pic: yup.string().required("Must enter profile picture"),
        address: yup.string().required("Must enter address"),
        city: yup.string().required("Must enter city"),
        state: yup.string().required("Must enter state")
    })

    const formik = useFormik({
        initialValues: {
            username: "",
            password: "",
            full_name: "",
            profile_pic: "",
            address: "",
            city: "",
            state: "",
        },
        validationSchema: formSchema,
        onSubmit: (values) => {
            fetch("/signup", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify(values, null, 2),
            })
            .then((r) => r.json())
            .then((user) => {
                onLogin(user)
            })
        },
    })



    return (
        <form onSubmit={formik.handleSubmit}>
            <label>Username: </label>
            <input type='text' name='username' id='username' value={formik.values.username} onChange={formik.handleChange} />
            <p style={{color: "red" }}> {formik.errors.username}</p>
            <br></br>
            <br></br>
            <label>Password: </label>
            <input type='text' name='password' id='password' value={formik.values.password} onChange={formik.handleChange} />
            <p style={{color: "red" }}> {formik.errors.password}</p>
            <br></br>
            <br></br>
            <label>Full Name: </label>
            <input type='text' name='full_name' id='full_name' value={formik.values.full_name} onChange={formik.handleChange} />
            <p style={{color: "red" }}> {formik.errors.full_name}</p>
            <br></br>
            <br></br>
            <label>Profile Picture: </label>
            <input type='text' name='profile_pic' id='profile_pic' value={formik.values.profile_pic} onChange={formik.handleChange} />
            <p style={{color: "red" }}> {formik.errors.full_name}</p>
            <br></br>
            <br></br>
            <label>Address: </label>
            <input type='text' name='address' id='address' value={formik.values.address} onChange={formik.handleChange} />
            <p style={{color: "red" }}> {formik.errors.address}</p>
            <br></br>
            <br></br>
            <label>City: </label>
            <input type='text' name='city' id='city' value={formik.values.city} onChange={formik.handleChange} />
            <p style={{color: "red" }}> {formik.errors.city}</p>
            <br></br>
            <br></br>
            <label>State: </label>
            <input type='text' name='state' id='state' value={formik.values.state} onChange={formik.handleChange} />
            <p style={{color: "red" }}> {formik.errors.state}</p>
            <br></br>
            <br></br>
            <button type='submit'>Sign Up</button>
            {/* {errors.map((err) => (
                <p key={err}>{err}</p>
            ))} */}
        </form>
    )
}

export default SignUpForm;









// import React, { useState } from 'react';

// function SignUpForm({ onLogin}) {

//     const [username, setUsername] = useState('')
//     const [password, setPassword] = useState('')
//     const [full_name, setFull_name] = useState('')
//     const [profile_pic, setProfile_pic] = useState('')
//     const [address, setAddress] = useState('')
//     const [city, setCity] = useState('')
//     const [state, setState] = useState('')
//     const [errors, setErrors] = useState([])

//     function handleSubmit(e) {
//         e.preventDefault()
//         setErrors([])
//         fetch('/signup', {
//             method: 'POST',
//             headers: {
//                 'Content-Type': 'application/json',
//             },
//             body: JSON.stringify({
//                 username,
//                 password,
//                 full_name,
//                 profile_pic,
//                 address,
//                 city,
//                 state,
//             }),
//         }).then((r) => {
//             if (r.ok) {
//                 r.json().then((user) => {
//                     onLogin(user)
//                 });
//             } else {
//                 r.json().then((err) => {
//                     console.log(err);
//                     setErrors([err.error]);
//                 }
//             )}
//         })
//     }


//     return (
//         <form onSubmit={handleSubmit}>
//             <label>Username: </label>
//             <input type='text' name='username' id='username' value={username} onChange={(e) => setUsername(e.target.value)} />
//             {username.length < 2 || username.length > 15 ? <p style={{ color: 'red' }}>Username must be between 2 and 15 characters</p> : <br></br>}
//             <br></br>
//             <label>Password: </label>
//             <input type='text' name='password' id='password' value={password} onChange={(e) => setPassword(e.target.value)} />
//             {password.length < 2 || password.length > 15 ? <p style={{ color: 'red' }}>Username must be between 2 and 15 characters</p> : <br></br>}
//             <br></br>
//             <label>Full Name: </label>
//             <input type='text' name='full_name' id='full_name' value={full_name} onChange={(e) => setFull_name(e.target.value)} />
//             <br></br>
//             <br></br>
//             <label>Profile Picture: </label>
//             <input type='text' name='profile_pic' id='profile_pic' value={profile_pic} onChange={(e) => setProfile_pic(e.target.value)} />
//             <br></br>
//             <br></br>
//             <label>Address: </label>
//             <input type='text' name='address' id='address' value={address} onChange={(e) => setAddress(e.target.value)} />
//             <br></br>
//             <br></br>
//             <label>City: </label>
//             <input type='text' name='city' id='city' value={city} onChange={(e) => setCity(e.target.value)} />
//             <br></br>
//             <br></br>
//             <label>State: </label>
//             <input type='text' name='state' id='state' value={state} onChange={(e) => setState(e.target.value)} />
//             <br></br>
//             <br></br>
//             <input type='submit' value='Sign Up' />
//             {errors.map((err) => (
//                 <p key={err}>{err}</p>
//             ))}
//         </form>
//     )
// }

// export default SignUpForm;