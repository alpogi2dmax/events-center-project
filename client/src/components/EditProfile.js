import React, { useState } from 'react'
import { useFormik } from 'formik';
import * as yup from "yup";

function EditProfile({user, onLogin, onLogOut}) {

    const formSchema = yup.object().shape({
            username: yup.string().required("Must enter username").min(2).max(15),
            full_name: yup.string().required("Must enter full name"),
            profile_pic: yup.string().required("Must enter profile picture"),
            address: yup.string().required("Must enter address"),
            city: yup.string().required("Must enter city"),
            state: yup.string().required("Must enter state")
        })
    
        const formik = useFormik({
            initialValues: {
                username: user.username,
                full_name: user.full_name,
                profile_pic: user.profile_pic,
                address: user.address,
                city: user.city,
                state: user.state
            },
            validationSchema: formSchema,
            onSubmit: (values) => {
                fetch(`/users/${user.id}`, {
                    method: "PATCH",
                    headers: {
                        "Content-Type": "application/json"
                    },
                    body: JSON.stringify(values, null, 2),
                })
                .then((r) => r.json())
                .then((updatedUser) => {
                    onLogin(updatedUser)
                    alert('Your Profile has been updated!')
                })
            },
        })

    function handleDelete() {
        fetch(`/users/${user.id}`, {
            method: "DELETE",
        })
        .then(() => onLogOut())
    }

    return (
        <div className='logincss'>
            <h1 >Edit Profile</h1>
            <div className='card'>
                <div className='box'>
                    <img className='profile' src={user.profile_pic} alt={user.name} />
                </div>
                <div className='box'>
                    <form onSubmit={formik.handleSubmit}>
                        <label>Username: </label>
                        <input type='text' name='username' id='username' value={formik.values.username} onChange={formik.handleChange} />
                        <p style={{color: "red" }}> {formik.errors.username}</p>
                        <br></br>
                        <br></br>
                        <label>Full Name: </label>
                        <input type='text' name='full_name' id='full_name' value={formik.values.full_name} onChange={formik.handleChange} />
                        <p style={{color: "red" }}> {formik.errors.full_name}</p>
                        <br></br>
                        <br></br>
                        <label>Profile Picture: </label>
                        <input type='text' name='profile_pic' id='profile_pic' value={formik.values.profile_pic} onChange={formik.handleChange} />
                        <p style={{color: "red" }}> {formik.errors.profile_pic}</p>
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
                        <button type='submit'>Submit</button>
                        <br></br>
                        <br></br>
                    </form>
                    <div>
                        <button onClick={handleDelete}>Delete Profile</button>
                    </div>
                </div>
            </div>
        </div>

    )
}

export default EditProfile