import React, { useRef, useContext } from 'react'

import { AccountCircleOutlined, LockOutlined } from '@material-ui/icons'
import { Link } from 'react-router-dom'
import './login.scss'
import { loginCall } from '../../apiCalls'
import { AuthContext } from '../../context/AuthContext'
import { CircularProgress } from '@material-ui/core'


function Login() {

    const acctNum = useRef()
    const password = useRef()
    const { isFetching, dispatch } = useContext(AuthContext)

    const login = (e) => {
        e.preventDefault()
        loginCall({ acctNum: acctNum.current.value, password: password.current.value }, dispatch)
    }



    return (
        <div className="login">
            <div className="wrapper">
                <div className="loginCard">
                    <div className="header">
                        <div className="logo">
                            <h1>HeroBank</h1>

                        </div>
                        <span>Login to your account</span>
                    </div>
                    <div className="form">

                        <form onSubmit={login}>
                            <div className="input">

                                <input type="number" placeholder="Account Number" ref={acctNum} />
                                <div className="iconContainer">
                                    <AccountCircleOutlined className="icon" />
                                </div>
                            </div>
                            <div className="input">
                                <input type="password" placeholder="password" ref={password} />
                                <div className="iconContainer">
                                    <LockOutlined className="icon" />
                                </div>


                            </div>

                            <hr />
                            <div className="authButton">
                                <div>
                                    <span className="authText">Don't have an account?</span>
                                    {
                                        !isFetching && <Link to="/signup" className="register">REGISTER</Link>
                                    }

                                </div>
                                <button type="submit" disabled={isFetching}>{isFetching ? <CircularProgress color="inherit" size="20px" /> : "LOGIN"}</button>
                            </div>

                        </form>
                    </div>
                </div>
            </div>

        </div>
    )
}

export default Login
