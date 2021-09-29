import { AccountCircleOutlined, AccountTreeOutlined, EmailOutlined } from '@material-ui/icons'
import React from 'react'

import './sidebarCard.scss'
function SidebarCard({ user }) {


    return (
        <div className="sidebarCard">
            <div className="wrapper">
                <div className="accountNumber">
                    <h1>{user?.acctNum}</h1>
                </div>

                <div className="card">
                    <div className="left"><AccountCircleOutlined className="icon" /></div>
                    <div className="right"><h4>{user?.acctNum}</h4>

                    </div>
                </div>

                <div className="card">
                    <div className="left"><AccountTreeOutlined className="icon" /></div>
                    <div className="right"><h4>{user?.acctType === 1 ? "Savings" : "Current"}</h4>
                        {/* <span><Edit /></span> */}
                    </div>
                </div>

                <div className="card">
                    <div className="left"><EmailOutlined className="icon" /></div>
                    <div className="right"><h4>{user?.email}</h4>
                        {/* <span><Edit /></span> */}
                    </div>
                </div>

            </div>
        </div >
    )
}

export default SidebarCard
