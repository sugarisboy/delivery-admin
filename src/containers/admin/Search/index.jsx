import React from 'react'
import AsyncSelect from 'react-select/async'
import './style.scss'
import { get } from '../../../service/api'
import { connect } from 'react-redux'
import { setShopAddress, setShopCityId } from '../../../actions/shops-action'
import { isEmpty } from '../../../utils/string-utils'

class Search extends React.Component {

    constructor(props) {
        super(props)

        this.state = {
            currentValue: '',
            label: '',
            address: {}
        }
    }

    onChange = ({value}) => {
        const {address, label} = value

        if (label && value) {
            this.setState({
                label,
                address
            })
        }
    }

    onSearchClick = () => {
        const {label, address} = this.state
        if (!address || Object.keys(address).length === 0) {
            alert('Please enter your address')
            return
        }

        const {city, district, street, houseNumber} = address

        if (!city || !district || !street || !houseNumber) {
            alert('Please select valid address')
            return
        }

        this.props.setShopAddress(label)
    }

    loadOptions = async (val) => {
        const res = await get(`/map/ac/${val}`)
        const {suggestions} = res.data
        // const filtered = suggestions.filter(s => (s.address.street && s.address.houseNumber))
        return suggestions.map(s => ({
            label: s.label,
            value: s
        }))
    }

    render() {
        const {address, label} = this.state
        const currentValue = (label.length > 0 && Object.keys(address).length > 0)
            ? this.state
            : {
                ...this.state,
                currentValue: this.props.shopAddress,
                label: this.props.shopAddress
            }

        return (
            <div className="search">
                <AsyncSelect type="text"
                             cacheOptions
                             className="search__input"
                             placeholder="Add your address"
                             value={currentValue}
                             loadOptions={this.loadOptions}
                             onChange={this.onChange}
                             styles={{
                                 control: styles => ({
                                     ...styles,
                                     padding: 12
                                 }),
                                 dropdownIndicator: () => ({
                                     display: 'none'
                                 }),
                                 input: styles => ({
                                     ...styles
                                 }),
                                 indicatorsContainer: () => ({
                                     display: 'none'
                                 })
                             }}
                />

                <button className={isEmpty(this.props.shopAddress) ? 'search__button-error' : 'search__button'}
                        onClick={this.onSearchClick}
                >
                    Search
                </button>
            </div>
        )
    }

}

const mapStateToProps = state => ({
    shopAddress: state.shops.shopAddress,
    shopCityId: state.shops.shopCityId
})

const mapDispatchToProps = {
    setShopAddress,
    setShopCityId
}

export default connect(mapStateToProps, mapDispatchToProps)(Search)