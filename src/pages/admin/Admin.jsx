import React, { useState, useEffect } from 'react'
import axios from "axios"
import { Link } from "react-router-dom"
import { Delete, LibraryAddCheckOutlined, PeopleAltOutlined, SearchOutlined } from "@material-ui/icons"
import Topbar from "../../components/topbar/Topbar";
import './admin.scss'
import { CircularProgress, LinearProgress } from '@material-ui/core';
import { format } from 'timeago.js';


function Admin() {
    const [users, setUsers] = useState([])
    const [error, setError] = useState("")
    const [isError, setIsError] = useState(false)
    const [isDeleting, setIsDeleting] = useState(false)
    const [flagForDel, setFlagForDel] = useState(false)
    const [isLoading, setIsLoading] = useState(false)
    const [isLoadingTrans, setIsLoadingTrans] = useState(false)
    const [transactions, setTransactions] = useState([])
    const [userId, setUserId] = useState('')





    const token = (JSON.parse(localStorage.getItem("herobanktoken")))

    const deleteU = (userId) => {
        setUserId(userId)
        setFlagForDel(true)
    }
    const deleteUser = async () => {
        setFlagForDel(false)
        setIsDeleting(true)
        try {
            const res = await axios.request({
                method: "DELETE",
                url: `https://hero-bank-api.herokuapp.com/api/users/del-user/${userId}`,
                headers: {

                    Authorization: `Bearer ${token}`
                },

            })

            setIsDeleting(false)
            window.location.reload()

        } catch (e) {
            console.log(e)
        }
    }
    useEffect(() => {

        const fetchUser = async () => {
            setIsLoading(true)
            try {
                const res = await axios.request({
                    method: "GET",
                    url: `https://hero-bank-api.herokuapp.com/api/users/allusers`,
                    headers: {

                        Authorization: `Bearer ${token}`
                    },

                })


                const data = res.data
                if (data.error) {
                    setError(data.error)
                    setIsError(true)
                }
                console.log(res.data)
                setUsers(data)

                setIsLoading(false)
            } catch (e) {
                console.log(e)
            }
        }

        const fetchTransactions = async () => {
            setIsLoadingTrans(true)

            try {
                const res = await axios.request({
                    method: "GET",
                    url: `https://hero-bank-api.herokuapp.com/api/transactions/alltransactions`,
                    headers: {

                        Authorization: `Bearer ${token}`
                    },

                })


                const data = res.data

                setTransactions(data)

                setIsLoadingTrans(false)
            } catch (e) {
                console.log(e)
            }
        }

        fetchUser()
        fetchTransactions()
    }, [token])
    return (
        <>
            <Topbar />

            {
                isError ?
                    <div style={{ height: "100vh", color: "orange", backgroundColor: "#850909", display: "flex", justifyContent: "center", alignItems: "center" }}>
                        <div style={{ display: "flex", flexDirection: "column", alignItems: "center" }}>
                            <h1>{error}</h1>

                            <h4 style={{ marginTop: "50px" }}>Go to <Link style={{ color: "orange" }} to="/">
                                home</Link></h4>

                        </div>


                    </div>
                    :
                    <>
                        {isLoading ? <div className="progress" style={{ height: "100vh", display: "flex", justifyContent: "center", alignItems: "center", backgroundColor: "rgba(209, 206, 206, 0.733)" }}>
                            <CircularProgress color="primary" />
                        </div> :
                            <div className="admin">
                                <div className="wrapper">
                                    <div className="left">
                                        <div className="cards">
                                            <div className="card">
                                                <div className="leftPart">
                                                    <PeopleAltOutlined className="icon" />
                                                </div>
                                                <div className="rightPart">
                                                    <h3>{users.length} Users</h3>
                                                </div>
                                            </div>

                                            <div className="card">
                                                <div className="leftPart">
                                                    <LibraryAddCheckOutlined className="icon" />
                                                </div>
                                                <div className="rightPart">
                                                    <h3>{isLoadingTrans ? <LinearProgress /> : transactions.length} Transactions</h3>
                                                </div>
                                            </div>


                                        </div>
                                    </div>
                                    <div className="right">

                                        <div className="search">
                                            <input type="text" placeholder="search for user..." /> <SearchOutlined className="searchIcon" />
                                        </div>


                                        <div className="table">
                                            <table>

                                                <thead>
                                                    <tr className="theadtr">
                                                        <th style={{ width: "50px" }}>S/N</th>
                                                        <th>Account Number</th>
                                                        <th>Account Name</th>
                                                        <th>Account Type</th>
                                                        <th>Date Of Opening</th>
                                                        <th>Admin</th>
                                                        <th>Delete</th>

                                                    </tr>
                                                </thead>


                                                <tbody>

                                                    {
                                                        users.map((u, i) => (
                                                            <tr className="tbodytr" key={i}>
                                                                <td>{i}</td>
                                                                <td>{u.acctNum}</td>
                                                                <td>{u.firstName} { } {u.lastName} </td>
                                                                <td>{u.acctType === 1 ? "Savings" : "Current"}</td>
                                                                <td>{format(u.createdAt)}</td>
                                                                <td>{u.isAdmin ? "Yes" : "No"}</td>
                                                                {isDeleting ? <CircularProgress size="10px" /> : <td onClick={() => deleteU(u._id)}><Delete className="deleteIcon" /></td>}


                                                            </tr>

                                                        ))
                                                    }

                                                </tbody>
                                            </table>
                                            {flagForDel
                                                &&
                                                <div style={{ borderRadius: "10px", padding: "10px", position: "absolute", top: "40%", left: "60%", width: "200px", backgroundColor: "black", color: "white", display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center" }}>
                                                    <div>Are You Sure?</div>
                                                    <div style={{ marginTop: "25px" }}>
                                                        <span style={{ cursor: "pointer", height: "30px", width: "30px", backgroundColor: "red", marginRight: "20px", borderRadius: "5px" }} onClick={deleteUser}>Yes</span>
                                                        <span style={{ cursor: "pointer", height: "25px", width: "25px" }} onClick={() => setFlagForDel(false)}>No</span></div>
                                                </div>
                                            }

                                        </div>
                                    </div>
                                </div>
                            </div>
                        }
                    </>
            }
        </>

    )
}

export default Admin
