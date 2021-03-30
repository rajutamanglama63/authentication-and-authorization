import React, { createContext, useEffect, useState } from 'react'

import AuthServices from '../services/AuthServices'

export const AuthContext = createContext();

export default (props) => {
    const [user, setUser] = useState(null);
    const [isAuthenticated, setIsAuthenticated] = useState(false);
    const [isLoaded, setIsLoaded] = useState(false);

    useEffect(() => {
        AuthServices.isAuthenticated().then((data) => {
            setUser(data.user);
            setIsAuthenticated(data.isAuthenticated);
            setIsLoaded(true);
        }, []);
    })
    return(
        <div>
            {
                !isLoaded ? <h1>Loading...</h1> :
                <AuthContext.Provider value={{user, setUser, isAuthenticated, setIsAuthenticated}}>
                    { props.children }
                </AuthContext.Provider>
            }
        </div>
    )
}