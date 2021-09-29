import { Done } from '@material-ui/icons'
import React, { useState, useEffect, useRef } from 'react'
import { useParams } from "react-router"
import axios from "axios"
import SidebarCard from '../../components/sidebarCard/SidebarCard'
import TransactionCard from '../../components/transactionCard/TransactionCard'
import Topbar from "../../components/topbar/Topbar";
import { CircularProgress, Snackbar } from '@material-ui/core';

import "./transfer.scss"

function Deposit() {
    const [isVerified, setIsVerified] = useState(false)
    const userId = useParams().userId

    const [isLoading, setIsLoading] = useState(false)
    const [inProgress, setInProgress] = useState(false)
    const [isAuthenticating, setIsAuthenticating] = useState(false)


    const [isSuccess, setIsSuccess] = useState(false)
    const [message, setMessage] = useState("")
    const [account, setAccount] = useState('')
    const [destination, setDestination] = useState({})

    const [user, setUser] = useState({})

    const amount = useRef()
    const token = (JSON.parse(localStorage.getItem('herobanktoken')))



    useEffect(() => {
        if (account.length === 11) {
            const fetchUser = async () => {
                try {
                    setIsAuthenticating(true)
                    const res = await axios.request({
                        method: "GET",
                        url: `https://hero-bank-api.herokuapp.com/api/users/receiver/${account}`,
                        headers: {

                            Authorization: `Bearer ${token}`
                        },

                    })
                    console.log(res.data)
                    setIsAuthenticating(false)
                    setDestination(res.data.user)
                    setIsVerified(true)
                } catch (e) {
                    console.log(e)
                }


            }
            fetchUser()
        }
    }, [account.length, token, account])


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

    const inputMaxLength = (e) => {
        if (account.length > 11) {
            e.target.value = e.target.value.slice(0, 11)
        }


    }

    const makeTransfer = async (e) => {
        e.preventDefault()
        setInProgress(true)
        try {


            const res = await axios.request({
                method: "PUT",
                url: `http://localhost:3001/api/transactions/transfer/${userId}`,
                headers: {

                    Authorization: `Bearer ${token}`
                },
                data: {
                    amount: parseInt(amount.current.value),
                    acctNum: account
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
            { isLoading ?
                <div className="progress" style={{ height: "100vh", display: "flex", justifyContent: "center", alignItems: "center", backgroundColor: "rgba(209, 206, 206, 0.733)" }}>
                    <CircularProgress color="primary" />
                </div>
                :
                <div className="transfer">
                    <div className="wrapper">
                        <div className="left">
                            <SidebarCard user={user} />
                        </div>

                        <div className="right">
                            <TransactionCard user={user} />
                            <div className="form">
                                <form onSubmit={makeTransfer}>
                                    <input type="number" onInput={(e) => inputMaxLength(e)} placeholder="Enter account number" maxLength="11" value={account} onChange={(e) => setAccount(e.target.value)} />
                                    {
                                        isAuthenticating && <CircularProgress />
                                    }

                                    {
                                        isVerified &&
                                        <>
                                            <span className="acctname"><p>{destination.firstName} { } {destination.lastName}</p><Done className="icon" /> </span>
                                            <input type="number" placeholder="Enter amount to transfer" ref={amount} />
                                            <button type="submit">{inProgress ? <CircularProgress /> : "Transfer"}</button>
                                        </>
                                    }

                                </form>
                            </div>
                        </div>

                    </div>

                </div>

            } </>
    )
}

export default Deposit
