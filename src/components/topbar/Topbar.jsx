
import { ExitToAppOutlined, SupervisorAccountOutlined } from '@material-ui/icons'
import React, { useState } from 'react'
import { Link } from "react-router-dom"
import './topbar.scss'

function Topbar() {
    const [showText, setShowText] = useState(false)
    const [showLogout, setShowLogout] = useState(false)
    const display = (action) => {
        if (action === "admin") {
            setShowText(!showText)
            setShowLogout(false)
        } else {
            setShowLogout(!showLogout)
            setShowText(false)
        }

    }

    const isAdmin = JSON.parse(localStorage.getItem("herobankuser")).isAdmin

    console.log(isAdmin)

    const logout = () => {
        localStorage.removeItem("herobankuser")
        localStorage.removeItem("herobank")
        window.location.reload()
    }
    return (
        <div className="topbar" >
            <div className="wrapper">
                <div className="left">
                    <Link to="/" className="logo">
                        <h1>HeroBank</h1>
                    </Link>
                </div>
                <div className="right">
                    {
                        isAdmin && <Link to="/admin">
                            <div onMouseOver={() => display("admin")} style={{ display: "flex", flexDirection: "column", position: "relative" }}>
                                <SupervisorAccountOutlined className="nav-icon" />
                                {
                                    showText && <span style={{ position: "absolute", color: 'white', bottom: "-50%", minHheight: "20px", right: 0, width: "50px", backgroundColor: "gray" }}>Admin</span>
                                }

                            </div>
                        </Link>

                    }
                    <div className="logout">
                        <div onMouseOver={() => display("logout")} style={{ display: "flex", flexDirection: "column", position: "relative" }} onClick={logout}>
                            <ExitToAppOutlined className="nav-icon" />
                            {
                                showLogout && <span style={{ position: "absolute", color: "white", bottom: "-50%", right: "-5px", minHeight: "20px", width: "80px", backgroundColor: "gray" }}>Log Out</span>
                            }
                        </div>
                    </div>
                </div>
            </div>

        </div>
    )
}

export default Topbar
