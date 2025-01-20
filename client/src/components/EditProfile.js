import React, { useState } from 'react'

function EditProfile({user}) {

    const [username, setUsername] = useState(user.username)
        const [password, setPassword] = useState(user.password)
        const [full_name, setFull_name] = useState(user.full_name)
        const [profile_pic, setProfile_pic] = useState(user.profile_pic)
        const [address, setAddress] = useState(user.address)
        const [city, setCity] = useState(user.city)
        const [state, setState] = useState(user.state)
        const [errors, setErrors] = useState([])

    return (
        <div className='logincss'>
            <h1 >Edit Profile</h1>
            <div className='card'>
                <div className='box'>
                    <img className='profile' src={user.profile_pic} alt={user.name} />
                </div>
                <div className='box'>
                    <form>
                        <label>Username: </label>
                        <input type='text' name='username' id='username' value={username} onChange={(e) => setUsername(e.target.value)} />
                        <br></br>
                        <label>Password: </label>
                        <input type='text' name='password' id='password' value={password} onChange={(e) => setPassword(e.target.value)} />
                        <br></br>
                        <label>Full Name: </label>
                        <input type='text' name='full_name' id='full_name' value={full_name} onChange={(e) => setFull_name(e.target.value)} />
                        <br></br>
                        <label>Profile Picture: </label>
                        <input type='text' name='profile_pic' id='profile_pic' value={profile_pic} onChange={(e) => setProfile_pic(e.target.value)} />
                        <br></br>
                        <label>Address: </label>
                        <input type='text' name='address' id='address' value={address} onChange={(e) => setAddress(e.target.value)} />
                        <br></br>
                        <label>City: </label>
                        <input type='text' name='city' id='city' value={city} onChange={(e) => setCity(e.target.value)} />
                        <br></br>
                        <label>State: </label>
                        <input type='text' name='state' id='state' value={state} onChange={(e) => setState(e.target.value)} />
                        <br></br>
                        <input type='submit' value='Submit' />
                        <button>Cancel</button>
                        {errors.map((err) => (
                            <p key={err}>{err}</p>
                        ))}
                    </form>
                </div>
            </div>
        </div>

    )
}

export default EditProfile