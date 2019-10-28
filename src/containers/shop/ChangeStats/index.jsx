import React from 'react'
import TrendingUpIcon from '@material-ui/icons/TrendingUp';
import TrendingDownIcon from "@material-ui/icons/TrendingDown";
import * as PropTypes from "prop-types";

class ChangeStats extends React.Component {

    constructor(props) {
        super(props)

    }

    render() {
        const {props} = this
        const {value, description, positive, prevValue, valueSymbol, fixed, percent} = props
        return (
            <div style={{display: 'flex', flexDirection: 'row', margin: '10px 0', padding: '8px'}}>
                <div style={{display: 'block', borderRight: '1px dotted lightgray', padding: '8px', minWidth: '120px'}}>
                    <div>
                        <h2 style={{margin: 0, textAlign: 'right'}}>
                            {valueSymbol}
                            {value.toFixed(fixed).toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",")}
                        </h2>
                        <div style={{textAlign: 'right'}}>{description}</div>
                    </div>
                </div>
                <div style={{display: 'block', padding: '8px'}}>
                    {!isNaN(percent) &&
                    <div>
                        {positive ?
                            <TrendingUpIcon style={{color: 'darkseagreen'}}/>
                            :
                            <TrendingDownIcon style={{color: 'tomato'}}/>
                        }
                        <h3 style={{display: 'inline-block', margin: 0}}>{positive ? percent : percent}%</h3>

                        <div style={{color: 'gray'}}>
                            vs {valueSymbol}{prevValue.toFixed(fixed).toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",")} prev
                        </div>
                    </div>}
                </div>
            </div>
        )
    }
}

ChangeStats.defaultProps = {
    value: 0,
    description: 'description',
    positive: true,
    percent: 12.3,
    prevValue: 0,
    valueSymbol: '',
    fixed: 2
};

ChangeStats.propTypes = {
    value: PropTypes.number,
    description: PropTypes.string,
    positive: PropTypes.bool,
    percent: PropTypes.oneOfType([PropTypes.number, PropTypes.string]),
    prevValue: PropTypes.number,
    valueSymbol: PropTypes.string,
    fixed: PropTypes.number
}

export default ChangeStats