import React from 'react'
// { useState, useEffect } from 'react'
// import { useParams } from "react-router"
// import axios from "axios"

import SidebarCard from '../../components/sidebarCard/SidebarCard'
import TransactionCard from '../../components/transactionCard/TransactionCard'
import Topbar from "../../components/topbar/Topbar";
import './balance.scss'


function Balance() {

    // const [user, setUser] = useState({})
    // const [isLoading, setIsLoading] = useState(false)

    // const userId = useParams().userId


    // useEffect(() => {
    //     const fetchUser = async () => {
    //         const res = await axios.get(`https://hero-bank-api.herokuapp.com/api/users/user/${userId}`)
    //         const user = res.data
    //         // setUser(user.user)
    //     }

    const user = (JSON.parse(localStorage.getItem("herobankuser")))

    //     fetchUser()
    // }, [])
    return (
        <>
            <Topbar />
            <div className="balance">
                <div className="wrapper">
                    <div className="left">
                        <div className="sidebar">
                            <SidebarCard user={user} />
                        </div>
                    </div>
                    <div className="right">
                        <TransactionCard user={user} card={1} />
                    </div>
                </div>
            </div>
        </>
    )
}

export default Balance
