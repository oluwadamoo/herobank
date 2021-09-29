import React, { useState, useEffect, useRef } from 'react'
import axios from "axios"
import SidebarCard from '../../components/sidebarCard/SidebarCard'
import TransactionCard from '../../components/transactionCard/TransactionCard'
import Topbar from "../../components/topbar/Topbar";
import "./deposit.scss"
import { CircularProgress, Snackbar } from '@material-ui/core';

import { Link } from 'react-router-dom';
import { useParams } from "react-router"




function Deposit() {

    const userId = useParams().userId
    const [user, setUser] = useState({})
    const [isLoading, setIsLoading] = useState(false)
    const [inProgress, setInProgress] = useState(false)
    const [isSuccess, setIsSuccess] = useState(false)
    const [message, setMessage] = useState("")
    const amount = useRef()


    const token = (JSON.parse(localStorage.getItem('herobanktoken')))
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


    const makeDeposit = async (e) => {
        e.preventDefault()
        setInProgress(true)
        try {


            const res = await axios.request({
                method: "PUT",
                url: `https://hero-bank-api.herokuapp.com/api/transactions/deposit/${userId}`,
                headers: {

                    Authorization: `Bearer ${token}`
                },
                data: {
                    amount: parseInt(amount.current.value)
                }

            })

            setMessage(res.data)
            setIsSuccess(true)

            amount.current.value = ""
            setInProgress(false)
            window.location.reload()

        } catch (e) {
            console.log(e)
        }


    }

    return (
        <>
            <Topbar />
            {isSuccess &&
                <Snackbar
                    anchorOrigin={{
                        vertical: 'top',
                        horizontal: 'right',
                    }}
                    variant="success"
                    open={true}
                    autoHideDuration={2}
                    message={message}


                />}
            {

                isLoading ?
                    <div className="progress" style={{ height: "100vh", display: "flex", justifyContent: "center", alignItems: "center", backgroundColor: "rgba(209, 206, 206, 0.733)" }}>
                        <CircularProgress color="primary" />
                    </div>
                    :
                    <div className="deposit">
                        <div className="wrapper">
                            <div className="left">
                                <SidebarCard user={user} />

                            </div>

                            <div className="right">
                                <TransactionCard user={user} />
                                <div className="form">
                                    <form onSubmit={makeDeposit}>
                                        <input type="number" placeholder="Enter amount to deposit" ref={amount} />
                                        <button type="submit" disabled={inProgress}>{inProgress ? <CircularProgress /> : "Deposit"}</button>
                                    </form>
                                </div>
                                <span className="back">Go back to <Link to="/">
                                    homepage
                                </Link></span>
                            </div>

                        </div>



                    </div>

            }
        </>
    )
}

export default Deposit
