import React, {useState, useRef, useEffect} from 'react'
import {useHistory} from 'react-router-dom'

import AuthServices from '../services/AuthServices'
import Message from '../components/Message'

const RegisterForm = (props) => {
    const [user, setUser] = useState({username : "", password : "", role : ""})
    const [message, setMessage] = useState(null);

    const history = useHistory();

    let TimerID = useRef(null);

    useEffect(() => {
        return () => {
            clearTimeout(TimerID);
        }
    }, [])

    const resetForm = () => {
        setUser({username : "", password : "", role : ""});
    }

    const onSubmitHandler = (e) => {
        e.preventDefault();
        AuthServices.register(user).then((data) => {
            const { message } = data;
            setMessage(message);
            resetForm();
            if(!message.msgError){
                TimerID = setTimeout(()=>{
                    history.push('/login');
                },2000)
            }
        })
    }

    const onChangeHandler = (e) => {
        setUser({...user, [e.target.name] : e.target.value});
    }

    return (
        <div>
            <div className="register_page">
                <div className="container">
                    <div className="page_title">
                        <h1>Register</h1>
                    </div>
                    <form className="register_form" onSubmit={onSubmitHandler}> 
                        <label>Username:</label>
                        <br />
                        <input 
                            type="text" 
                            placeholder="enter username..." 
                            className="input_field" 
                            name="username"
                            value={user.username}
                            onChange={onChangeHandler}
                        />
                        <br />
                        <label>Password:</label>
                        <br />
                        <input 
                            type="text" 
                            placeholder="enter password..." 
                            className="input_field" 
                            name="password"
                            value={user.password}
                            onChange={onChangeHandler}
                        />
                        <br />
                        <label>Role:</label>
                        <br />
                        <input 
                            type="text" 
                            placeholder="enter role..." 
                            className="input_field" 
                            name="role"
                            value={user.role}
                            onChange={onChangeHandler}
                        />
                        <br />
                        <button className="register_btn" type="submit">Register</button>
                    </form>
                    {message ? <Message message={message} /> : null}
                </div>
            </div>
        </div>
    )
}

export default RegisterForm
