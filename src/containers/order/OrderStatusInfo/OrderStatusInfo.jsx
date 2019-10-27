import React from "react";

export default function OrderStatusInfo(props) {
    switch (props.status) {
        case 0:
            return<div style={{ color: 'steelBlue', fontWeight: 'bold' }}>Waiting for payment</div>
        case 1:
            return<div style={{ color: 'orange', fontWeight: 'bold' }}>Paid</div>
        case 2:
            return<div style={{ color: 'darkOrange', fontWeight: 'bold' }}>In work</div>
        case 3:
            return<div style={{ color: 'orangeRed', fontWeight: 'bold' }}>Delivery</div>
        case 10:
            return<div style={{ color: 'green', fontWeight: 'bold' }}>Done</div>
        case 11:
            return<div style={{ color: 'gray', fontWeight: 'bold' }}>Canceled by user</div>
        case 12:
            return<div style={{ color: 'gray', fontWeight: 'bold' }}>Canceled by shop</div>
        case 13:
        case 14:
        case 15:
            return<div style={{ color: 'gray', fontWeight: 'bold' }}>Canceled</div>
        default:
            return <div>Processing</div>
    }
}