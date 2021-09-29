import React, { useRef, useState } from 'react'
import { Link, useHistory } from "react-router-dom"
import { AccountCircleOutlined, EmailOutlined, LockOutlined, PhoneOutlined } from '@material-ui/icons'
import { CircularProgress } from '@material-ui/core'
import './register.scss'
import axios from 'axios'

function Register() {
    const [isLoading, setIsLoading] = useState(false)
    const history = useHistory()

    const firstName = useRef()
    const lastName = useRef()
    const email = useRef()
    const phone = useRef()
    const password = useRef()
    const confirmPassword = useRef()

    const register = async (e) => {
        e.preventDefault()
        if (confirmPassword.current.value !== password.current.value) {
            password.current.setCustomValidity("Passwords do not match")
        } else {
            const user = {
                firstName: firstName.current.value,
                lastName: lastName.current.value,
                email: email.current.value,
                phone: phone.current.value,
                password: password.current.value
            }
            try {
                setIsLoading(true)
                await axios.post("https://hero-bank-api.herokuapp.com/api/auth/register", user)
                history.push('/login')
            }
            catch (e) {
                console.log(e)
            }
        }
    }
    return (

        <div className="login">
            <div className="wrapper">
                <div className="loginCard">
                    <div className="header">
                        <div className="logo">
                            <h1>HeroBank</h1>

                        </div>
                        <span>Register an account with us</span>
                    </div>
                    <div className="form">

                        <form onSubmit={register}>
                            <div className="inputContainer">
                                <div className="input">
                                    <input type="text" placeholder="Your First name" required ref={firstName} />
                                    <div className="iconContainer">
                                        <AccountCircleOutlined className="icon" />
                                    </div>
                                </div>
                                <div className="input">
                                    <input type="text" placeholder="Your Last name" required ref={lastName} />
                                    <div className="iconContainer">
                                        <AccountCircleOutlined className="icon" />
                                    </div>
                                </div>

                            </div>

                            <div className="inputContainer">
                                <div className="input">
                                    <input type="email" placeholder="Your Email" required ref={email} />
                                    <div className="iconContainer">
                                        <EmailOutlined className="icon" />
                                    </div>
                                </div>
                                <div className="input">
                                    <input type="number" placeholder="Your Phone Number" required className="phone" ref={phone} />
                                    <div className="iconContainer">
                                        <PhoneOutlined className="icon" />
                                    </div>
                                </div>

                            </div>

                            <div className="inputContainer">
                                <div className="input">
                                    <input type="password" placeholder="password" required ref={password} />
                                    <div className="iconContainer">
                                        <LockOutlined className="icon" />
                                    </div>
                                </div>
                                <div className="input">
                                    <input type="password" placeholder="confirm password" required ref={confirmPassword} />
                                    <div className="iconContainer">
                                        <LockOutlined className="icon" />
                                    </div>
                                </div>
                            </div>

                            <hr />
                            <div className="authButton">
                                <div>
                                    <span className="authText">You have an account?</span>
                                    {
                                        !isLoading && <Link to="/login" className="register">LOGIN</Link>
                                    }
                                </div>

                                <button type="submit" disabled={isLoading}>{isLoading ? <CircularProgress color="inherit" size="20px" /> : "REGISTER"}</button>


                            </div>

                        </form>
                    </div>
                </div>
            </div>

        </div>

    )
}

export default Register
