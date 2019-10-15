import React from "react";

class OrderStatusInfo extends React.Component {

    getTitle() {
        switch (this.props.status) {
            case 0:
                return<div style={{ color: 'steelBlue', fontWeight: 'bold' }}>Ожидание оплаты</div>
            case 1:
                return<div style={{ color: 'orange', fontWeight: 'bold' }}>Оплачено</div>
            case 2:
                return<div style={{ color: 'darkOrange', fontWeight: 'bold' }}>Заказ собирается</div>
            case 3:
                return<div style={{ color: 'orangeRed', fontWeight: 'bold' }}>Доставка</div>
            case 10:
                return<div style={{ color: 'green', fontWeight: 'bold' }}>Выполнено</div>
            case 11:
            case 12:
            case 13:
            case 14:
            case 15:
                return<div style={{ color: 'gray', fontWeight: 'bold' }}>Canceled</div>
            default:
                return <div>{this.props.status}</div>
        }
    }

    render() {
        return this.getTitle()
    }
}

export default OrderStatusInfo