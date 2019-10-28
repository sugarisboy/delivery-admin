import React from 'react'
import {Area, AreaChart, CartesianGrid, Tooltip, XAxis, YAxis} from "recharts";
import Button from "@material-ui/core/Button";
import ButtonGroup from "@material-ui/core/ButtonGroup";
import {post} from "../../../service/api";
import ChangeStats from "../ChangeStats";
import * as PropTypes from "prop-types";

class ShopStats extends React.Component {

    constructor(props) {
        super(props)
        this.state = {
            shopId: this.props.shopId,
            selected: 'weekly',
            stats: []
        }
    }

    componentDidMount() {
        this.loadStats(this.state.selected)
    }

    componentDidUpdate(prevProps, prevState, snapshot) {
        const {selected} = this.state
        if (prevState.selected !== selected)
            this.loadStats()
    }

    async loadStats() {
        const {shopId, selected} = this.state

        await post(`/partner/stats/${shopId}?type=${selected}`
        ).then(response => {
            const {data} = response
            this.setState({
                stats: data,
                shopName: data.shopName
            })
        }).catch(error => {
            console.log(error.response)
        })
    }

    handleChangePeriod(e, type) {
        this.setState({
            selected: type
        })
    }

    render() {

        const periodStat = this.state.stats
        const {shopStats} = periodStat
        const {title} = this.props

        const {currentPeriodProfit, prevPeriodProfit} = periodStat
        const percentProfit = (currentPeriodProfit / prevPeriodProfit * 100 - 100).toFixed(2)

        const {currentPeriodOrders, prevPeriodOrders} = periodStat
        const percentOrders = (currentPeriodOrders / prevPeriodOrders * 100 - 100).toFixed(2)

        const {currentAveragePeriodProfit, prevAveragePeriodProfit} = periodStat
        const percentAveragePeriod = (currentAveragePeriodProfit / prevAveragePeriodProfit * 100 - 100).toFixed(2)

        return (
            <>
                <div>
                    <div style={{display: 'flex', flexDirection: 'row', padding: '24px'}}>
                        <div style={{
                            boxShadow: '0px 1px 3px 0px rgba(0,0,0,0.2), 0px 1px 1px 0px rgba(0,0,0,0.14), 0px 2px 1px -1px rgba(0,0,0,0.12)',
                            maxWidth: 'none',
                            display: 'inline-block'
                        }}>
                            <div style={{textAlign: 'center'}}>
                                <h2>Proceeds for {title}</h2>
                            </div>
                            <div style={{
                                display: 'flex',
                                flexDirection: 'row',
                                textAlight: 'center',
                                justifyContent: 'center',
                                margin: '8px'
                            }}>
                                <ButtonGroup variant="contained">
                                    <Button onClick={(e) => this.handleChangePeriod(e, 'day')}>
                                        Daily
                                    </Button>
                                    <Button onClick={(e) => this.handleChangePeriod(e, 'weekly')}>
                                        Weekly
                                    </Button>
                                    <Button onClick={(e) => this.handleChangePeriod(e, 'monthly')}>
                                        Monthly
                                    </Button>
                                </ButtonGroup>
                            </div>
                            <AreaChart
                                width={730} height={250} data={shopStats}
                                margin={{top: 0, right: 40, left: 0, bottom: 8}}>
                                <defs>
                                    <linearGradient id="colorPv" x1="0" y1="0" x2="0" y2="1">
                                        <stop offset="5%" stopColor="olivedrab" stopOpacity={0.25}/>
                                        <stop offset="95%" stopColor="olivedrab" stopOpacity={0}/>
                                    </linearGradient>
                                    <linearGradient id="colorUv" x1="0" y1="0" x2="0" y2="1">
                                        <stop offset="5%" stopColor="darkslateblue" stopOpacity={0.8}/>
                                        <stop offset="95%" stopColor="darkslateblue" stopOpacity={0}/>
                                    </linearGradient>
                                </defs>
                                <XAxis dataKey="name"/>
                                <YAxis/>
                                <CartesianGrid strokeDasharray="3 3"/>
                                <Tooltip/>
                                <Area type="monotone" dataKey="current" stroke="darkslateblue" fillOpacity={1}
                                      fill="url(#colorUv)"/>
                                <Area type="monotone" dataKey="previous" stroke="olivedrab" fillOpacity={1}
                                      fill="url(#colorPv)"/>
                            </AreaChart>
                        </div>

                        <div style={{
                            boxShadow: '0px 1px 3px 0px rgba(0,0,0,0.2), 0px 1px 1px 0px rgba(0,0,0,0.14), 0px 2px 1px -1px rgba(0,0,0,0.12)',
                            maxWidth: 'none',
                            display: 'inline-block',
                            marginLeft: '24px',
                            width: '280px'
                        }}>
                            <h2 style={{textAlign: 'center'}}>Period stats</h2>

                            <ChangeStats
                                description="proceeds"
                                value={currentPeriodProfit}
                                prevValue={prevPeriodProfit}
                                percent={percentProfit}
                                positive={percentProfit >= 0}
                                valueSymbol="$"
                            />

                            <ChangeStats
                                description="orders"
                                value={currentPeriodOrders}
                                prevValue={prevPeriodOrders}
                                percent={percentOrders}
                                positive={percentOrders >= 0}
                                fixed={0}
                            />

                            <ChangeStats
                                description="average check"
                                value={currentAveragePeriodProfit}
                                prevValue={prevAveragePeriodProfit}
                                percent={percentAveragePeriod}
                                positive={percentAveragePeriod >= 0}
                                valueSymbol="$"
                            />
                        </div>
                    </div>
                </div>
            </>
        )
    }
}

ShopStats.propTypes = {
    title: PropTypes.string
}

export default ShopStats