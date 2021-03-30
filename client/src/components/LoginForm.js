import React, {useState, useContext} from 'react'
import {useHistory} from 'react-router-dom'

import {AuthContext} from '../context/AuthContext'
import AuthService from '../services/AuthServices'
import Message from '../components/Message'

const LoginForm = (props) => {
    const [user, setUser] = useState({username : "", password : ""});
    const [message, setMessage] = useState(null);

    const history = useHistory();

    const authContext = useContext(AuthContext);

    const onChangeHandler = (e) => {
        setUser({...user, [e.target.name] : e.target.value});
    }

    const onSubmitHandler = (e) => {
        e.preventDefault();
        AuthService.login(user).then((data) => {
            console.log(data);
            const {isAuthenticated, user, message} = data;
            if(isAuthenticated) {
                authContext.setUser(user);
                authContext.setIsAuthenticated(isAuthenticated);
                history.push("/todo")
            }else{
                setMessage(message);
            }
        })
    }
    return (
        <div>
            <div className="login_page">
                <div className="container">
                    <div className="page_title">
                        <h1>Login</h1>
                    </div>
                    <form className="login_form" onSubmit={onSubmitHandler}> 
                        <label>Username:</label>
                        <br />
                        <input 
                            type="text" 
                            placeholder="enter username..." 
                            className="input_field" 
                            name="username"
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
                            onChange={onChangeHandler}
                        />
                        <br />
                        <button className="login_btn" type="submit">Login</button>
                    </form>
                    {message ? <Message message={message} /> : null}
                </div>
            </div>
        </div>
    )
}

export default LoginForm
