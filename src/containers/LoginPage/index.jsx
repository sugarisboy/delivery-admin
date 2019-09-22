import React from 'react'
import Button from '@material-ui/core/Button'
import CssBaseline from '@material-ui/core/CssBaseline'
import TextField from '@material-ui/core/TextField'
import FormControlLabel from '@material-ui/core/FormControlLabel'
import Checkbox from '@material-ui/core/Checkbox'
import Typography from '@material-ui/core/Typography'
import { makeStyles } from '@material-ui/core/styles'
import Container from '@material-ui/core/Container'
import { login } from '../../actions/login-actions'
import { connect } from 'react-redux'

class LoginPage extends React.Component {

    constructor(props) {
        super(props)
        this.classes = makeStyles(theme => ({
            '@global': {
                body: {
                    backgroundColor: theme.palette.common.white,
                },
            },
            paper: {
                marginTop: theme.spacing(8),
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
            },
            avatar: {
                margin: theme.spacing(1),
                backgroundColor: theme.palette.secondary.main,
            },
            form: {
                width: '100%', // Fix IE 11 issue.
                marginTop: theme.spacing(1),
            },
            submit: {
                margin: theme.spacing(3, 0, 2),
            },
        }))

        this.state = {
            username: '',
            password: ''
        }
    }

    componentDidMount() {
    }

    authorize(e) {
        e.preventDefault()
        const {username, password} = this.state
        this.props.login(username, password)
    }

    onUsernameChange(e) {
        this.setState({
            username: e.target.value
        })
    }

    onPasswordChange(e) {
        this.setState({
            password: e.target.value
        })
    }

    render() {
        return (
            <Container component="main" maxWidth="xs">
                <CssBaseline/>
                <div className={this.classes.paper}>
                    <Typography component="h1" variant="h5">
                        Admin login
                    </Typography>
                    <form className={this.classes.form}
                          onSubmit={this.authorize.bind(this)}
                          noValidate>
                        <TextField
                            variant="outlined"
                            margin="normal"
                            required
                            fullWidth
                            id="email"
                            label="Email Address"
                            name="email"
                            autoComplete="email"
                            autoFocus
                            onChange={this.onUsernameChange.bind(this)}
                        />
                        <TextField
                            variant="outlined"
                            margin="normal"
                            required
                            fullWidth
                            name="password"
                            label="Password"
                            type="password"
                            id="password"
                            autoComplete="current-password"
                            onChange={this.onPasswordChange.bind(this)}
                        />
                        <FormControlLabel
                            control={<Checkbox value="remember" color="primary"/>}
                            label="Remember me"
                        />
                        <Button
                            type="submit"
                            fullWidth
                            variant="contained"
                            color="primary"
                            className={this.classes.submit}
                        >
                            Sign In
                        </Button>
                    </form>
                </div>
            </Container>
        );
    }
}

function mapDispatchToProps(dispatch) {
    return {
        login: (username, password) => dispatch(login(username, password))
    }
}

export default connect(null, mapDispatchToProps)(LoginPage)