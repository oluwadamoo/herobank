
import React, { useState, useEffect } from 'react'
import axios from "axios"

import { AccountBalanceOutlined, AccountBalanceWalletOutlined, TransferWithinAStationOutlined, AccountCircleOutlined, SaveAltOutlined } from '@material-ui/icons'
import Topbar from "../../components/topbar/Topbar";

import './home.scss'
import { Link } from 'react-router-dom';
import { CircularProgress } from '@material-ui/core';

function Home() {
    const [user, setUser] = useState({})
    const [isLoading, setIsLoading] = useState(false)


    const myUser = (JSON.parse(localStorage.getItem("herobankuser")))
    const token = (JSON.parse(localStorage.getItem('herobanktoken')))

    useEffect(() => {
        const fetchUser = async () => {
            setIsLoading(true)
            const res = await axios.request({
                method: "GET",
                url: `https://hero-bank-api.herokuapp.com/api/users/user/${myUser?._id}`,
                headers: {

                    Authorization: `Bearer ${token}`
                },

            })


            const user = res.data
            setUser(user.user)
            setIsLoading(false)
        }

        fetchUser()
    }, [myUser?._id, token])


    return (
        <>
            <Topbar />
            {
                isLoading ?
                    <div className="progress" style={{ height: "100vh", display: "flex", justifyContent: "center", alignItems: "center", backgroundColor: "rgba(209, 206, 206, 0.733)" }}>
                        <CircularProgress color="primary" />
                    </div>
                    :
                    <div className="home">
                        <div className="wrapper">
                            <div className="left">
                                <div className="account">
                                    <div className="account-details">
                                        <div className="account-name">
                                            <AccountCircleOutlined className="icon" />
                                            <div className="name">
                                                <span>{user?.firstName}{ } {user?.lastName} </span>
                                            </div>
                                        </div>
                                        <hr />
                                        <div className="acctBal">
                                            <AccountBalanceOutlined className="balIcon" />
                                Account Balance: <span className="acctBalance">{user?.acctBalance}</span></div>

                                    </div>
                                </div>
                            </div>
                            <div className="right">

                                <div className="card">
                                    <Link to={`/balance/${user?._id}`}>
                                        <div className="card-wrapper">
                                            <div className="card-left">
                                                <span>Account Balance</span>
                                            </div>
                                            <div className="card-right">
                                                <AccountBalanceWalletOutlined className="icon" />
                                            </div>

                                        </div>
                                    </Link>
                                </div>



                                <div className="card">
                                    <Link to={`/deposit/${myUser?._id}`}>
                                        <div className="card-wrapper">
                                            <div className="card-left">
                                                <span>Deposit Money</span>
                                            </div>
                                            <div className="card-right">
                                                <SaveAltOutlined className="icon" />
                                            </div>

                                        </div>
                                    </Link>
                                </div>



                                <div className="card">
                                    <Link to={`/withdraw/${myUser?._id}`}>
                                        <div className="card-wrapper">
                                            <div className="card-left">
                                                <span>Withdraw</span>
                                            </div>
                                            <div className="card-right">
                                                <TransferWithinAStationOutlined className="icon" />
                                            </div>

                                        </div>
                                    </Link>
                                </div>



                                <div className="card">
                                    <Link to={`/history/${myUser?._id}`}>
                                        <div className="card-wrapper">
                                            <div className="card-left">
                                                <span>Transaction History</span>
                                            </div>
                                            <div className="card-right">
                                                <AccountBalanceOutlined className="icon" />
                                            </div>

                                        </div>
                                    </Link>
                                </div>


                            </div >
                        </div >

                    </div >

            }
        </>
    )
}

export default Home
