import React from 'react'
import { Link } from "react-router-dom"
import './pageNotFound.scss'
import Topbar from "../../components/topbar/Topbar";
function PageNotFound() {
    return (
        <>
            <Topbar />
            <div className="notFound" >
                <div className="wrapper" >

                    <img src="/notfound.png" alt="" />
                    <h3>Click Here to go to the <Link to="/">Homepage</Link></h3>

                </div>


            </div>
        </>
    )
}

export default PageNotFound
