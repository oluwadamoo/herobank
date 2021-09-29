import React from 'react'
import { Link } from 'react-router-dom'

import './transactionCard.scss'
function TransactionCard({ user, card }) {
    return (
        <div className="transactioncard">
            <div className="wrapper">
                <div className="heading">
                    <h1>Your Account Balance is:</h1>
                </div>
                <div className="content">
                    <span>&#8358;</span><h3>{user?.acctBalance}</h3>
                </div>

                {
                    card &&
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

                }
            </div>
        </div>
    )
}

export default TransactionCard
