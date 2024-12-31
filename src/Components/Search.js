import React from 'react'
import { useNavigate } from 'react-router-dom'

export default function Search(props) {
    const navigate = useNavigate();

    let handleKeyDown = (e) => {
        if (e.key === "Enter") {
            let query = document.getElementById("q").value
            props.SetQuery(query)
            navigate('/search');
        }
    }

    return (
        <div className="wrap">
            <div className="barra">
                <div className="barraContainer">
                    <input id='q' onKeyDown={handleKeyDown} type="text" className={`buscar-${props.mode}`} placeholder="Search latest news here ..." on />
                    <i className="fa fa-search search_icon" />
                </div>
            </div>
        </div>
    )
}