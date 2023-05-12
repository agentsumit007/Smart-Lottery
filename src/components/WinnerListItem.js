import React from 'react'

export default function WinnerListItem(props) {
    return (
        <li className="list-group-item d-flex justify-content-between align-items-start">
            <div className="ms-2 me-auto">
                <div className="fw-bold">{props.name}</div>
                {props.address.substring(0, 5) + '......' + props.address.substring(38)}
            </div>
            <span className="lead">Won {props.amount} ethers</span>
        </li>
    )
}
