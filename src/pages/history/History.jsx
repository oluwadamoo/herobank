import React, { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'

import axios from "axios"
import SidebarCard from '../../components/sidebarCard/SidebarCard'
import Topbar from "../../components/topbar/Topbar";
import './history.scss'
import { useParams } from "react-router"
import { CircularProgress, LinearProgress } from '@material-ui/core';
import { format } from 'timeago.js'

function History() {
    const [user, setUser] = useState({})
    const [transactions, setTransactions] = useState([])
    const userId = useParams().userId

    const [isLoading, setIsLoading] = useState(false)
    const [inProgress, setInProgress] = useState(false)




    const token = (JSON.parse(localStorage.getItem('herobanktoken')))
    const myAccount = (JSON.parse(localStorage.getItem("herobankuser"))).acctNum
    useEffect(() => {
        const fetchUser = async () => {
            setIsLoading(true)
            const res = await axios.request({
                method: "GET",
                url: `https://hero-bank-api.herokuapp.com/api/users/user/${userId}`,
                headers: {

                    Authorization: `Bearer ${token}`
                },

            })


            const user = res.data
            setUser(user.user)
            setIsLoading(false)
        }

        fetchUser()
    }, [userId, token])

    console.log(myAccount)


    useEffect(() => {
        const fetchHistory = async () => {
            setInProgress(true)
            const res = await axios.request({
                method: "GET",
                url: `http://localhost:3001/api/transactions/my-transactions/${myAccount}`,
                headers: {

                    Authorization: `Bearer ${token}`
                },

            })


            setTransactions(res.data)
            setInProgress(false)
        }

        fetchHistory()
    }, [])
    return (
        <>
            <Topbar />
            {isLoading ?
                <div className="progress" style={{ height: "100vh", display: "flex", justifyContent: "center", alignItems: "center", backgroundColor: "rgba(209, 206, 206, 0.733)" }}>
                    <CircularProgress color="primary" />
                </div>
                :
                <div className="history">
                    <div className="wrapper">

                        {/* <div className="left">
                            <SidebarCard user={user} />
                        </div> */}

                        <div className="right">
                            <div className="transactioncard">
                                <div className="transactionCardWrapper">
                                    <div className="heading">
                                        <h1>Your Account Balance is:</h1>
                                    </div>
                                    <div className="content">
                                        <span>&#8358;</span><h3>{user.acctBalance}</h3>
                                    </div>


                                </div>
                            </div>
                            <table>

                                <thead>
                                    <th style={{ width: "50px" }}>S/N</th>
                                    <th>Type</th>
                                    <th>Amount</th>
                                    <th>Destination</th>
                                    <th>Date</th>
                                </thead>

                                {
                                    inProgress ?

                                        <LinearProgress color="primary" />
                                        :
                                        <tbody>
                                            {
                                                transactions.map((t, i) => (
                                                    <tr >
                                                        <td>{i}</td>
                                                        <td>{t.transactionType === 1 ? "Deposit" : t.transactionType === 2 ? "Withdrawal" : t.transactionType === 3 ? "Transfer" : "Received"}</td>
                                                        <td>{t.amount}</td>
                                                        <td>{t.to === undefined ? "Self" : t.to}</td>
                                                        <td>{format(t.createdAt)}</td>
                                                    </tr>
                                                ))
                                            }

                                        </tbody>

                                }
                            </table>




                            <div className="cards">
                                <div className="cardText">
                                    <h4>What would you like to do next?</h4>
                                </div>
                                <div className="cardItems">

                                    <Link to={`/deposit/${user?._id}`}>
                                        <div className="card">
                                            <div className="text">
                                                <span>Deposit</span>
                                            </div>
                                            <div className="icon">

                                            </div>
                                        </div>
                                    </Link>

                                    <Link to={`/withdraw/${user?._id}`}>
                                        <div className="card">
                                            <div className="text">
                                                <span>Withdraw</span>
                                            </div>
                                            <div className="icon">

                                            </div>
                                        </div>
                                    </Link>

                                    <Link to={`/transfer/${user?._id}`}>
                                        <div className="card">
                                            <div className="text">
                                                <span>Transfer</span>
                                            </div>
                                            <div className="icon">

                                            </div>
                                        </div>
                                    </Link>

                                </div>

                            </div>

                        </div>

                    </div>
                </div>
            }
        </>
    )
}

export default History
