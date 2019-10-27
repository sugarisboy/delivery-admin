import React from 'react'
import Link from '@material-ui/core/Link'
import Typography from '@material-ui/core/Typography'
import Title from '../../components/Title'
import { post } from '../../service/api'

class Deposits extends React.Component {

    constructor(props) {
        super(props)
    }

    async componentDidMount() {
        const resp = await post('/admin/stats')
        console.log(resp.data)
    }


    render() {
        return (
            <React.Fragment>
                <Title>Recent Deposits</Title>
                <Typography component="p" variant="h4">
                    $3,024.00
                </Typography>
                <Typography color="textSecondary">
                    on 15 March, 2019
                </Typography>
                <div>
                    <Link color="primary" href="#">
                        View balance
                    </Link>
                </div>
            </React.Fragment>
        );
    }
}

export default Deposits