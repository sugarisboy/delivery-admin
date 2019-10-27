import React from 'react'
import {Area, AreaChart, CartesianGrid, Tooltip, XAxis, YAxis} from "recharts";
import Button from "@material-ui/core/Button";
import ButtonGroup from "@material-ui/core/ButtonGroup";
import {post} from "../../../service/api";

class ShopStats extends React.Component {

    constructor(props) {
        super(props)
        this.state = {
            shopId: this.props.shopId,
            selected: 'weekly',
            weekStats: [],
            dailyStats: {},
            monthStats: {}
        }
    }

    componentDidMount() {
        this.loadStats('monthly')
    }

    async loadStats(selected) {
        const {shopId} = this.state

        console.log(`/partner/stats/${shopId}?type=${selected}`)
        await post(`/partner/stats/${shopId}?type=${selected}`
        ).then(response => {
            const {data} = response
            const {shopStats} = data
            this.setState({
                weekStats: shopStats
            })
        }).catch(error => {
            console.log(error.response)
        })
    }

    render() {

        const data = this.state.weekStats

        return (
            <>
                <div>
                    <div style={{display: 'flex', flexDirection: 'row', textAlight: 'center'}}>
                        <ButtonGroup variant="contained">
                            <Button>
                                Daily
                            </Button>
                            <Button>
                                Weekly
                            </Button>
                            <Button>
                                Monthly
                            </Button>
                        </ButtonGroup>
                    </div>
                    <AreaChart width={730} height={250} data={data}
                               margin={{top: 10, right: 30, left: 0, bottom: 0}}>
                        <defs>
                            <linearGradient id="colorUv" x1="0" y1="0" x2="0" y2="1">
                                <stop offset="5%" stopColor="#8884d8" stopOpacity={0.8}/>
                                <stop offset="95%" stopColor="#8884d8" stopOpacity={0}/>
                            </linearGradient>
                            <linearGradient id="colorPv" x1="0" y1="0" x2="0" y2="1">
                                <stop offset="5%" stopColor="#82ca9d" stopOpacity={0.8}/>
                                <stop offset="95%" stopColor="#82ca9d" stopOpacity={0}/>
                            </linearGradient>
                        </defs>
                        <XAxis dataKey="name"/>
                        <YAxis/>
                        <CartesianGrid strokeDasharray="3 3"/>
                        <Tooltip/>
                        <Area type="monotone" dataKey="now" stroke="#8884d8" fillOpacity={1} fill="url(#colorUv)"/>
                        <Area type="monotone" dataKey="previous" stroke="#82ca9d" fillOpacity={1} fill="url(#colorPv)"/>
                    </AreaChart>
                </div>
            </>
        )
    }
}

export default ShopStats