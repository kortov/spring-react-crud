import React from 'react';
import {Link} from 'react-router-dom';
import {connect} from 'react-redux';
import {DispatchThunk, RootState} from '@store';
import {getLoggingIn, Thunks as authenticationThunks} from '@store/authentication';

interface Props {
    logout: any;
    login: any;
    loggingIn: any;
}

interface State {
    username: string;
    password: string;
    submitted: boolean;
}

class LoginPageComponent extends React.Component<Props, State> {
    state = {
        username: '',
        password: '',
        submitted: false,
    };

    constructor(props: Props) {
        super(props);
        this.props.logout();
    }

    handleChange(e: any) {
        const {name, value} = e.target;
        // @ts-ignore
        this.setState({[name]: value});
    }

    handleSubmit(e: any) {
        e.preventDefault();

        this.setState({submitted: true});
        const {username, password} = this.state;
        if (username && password) {
            this.props.login(username, password);
        }
    }

    render() {
        const {loggingIn} = this.props;
        const {username, password, submitted} = this.state;
        return (
            <div className="col-md-6 col-md-offset-3">
                <h2>Login</h2>
                <form
                    name="form"
                    onSubmit={this.handleSubmit}
                >
                    <div className={'form-group' + (submitted && !username ? ' has-error' : '')}>
                        <label htmlFor="username">
                            Username
                        </label>
                        <input
                            type="text"
                            className="form-control"
                            name="username"
                            value={username}
                            onChange={(e) => this.handleChange(e)}
                        />
                        {submitted && !username &&
                        <div className="help-block">
                            Username is required
                        </div>
                        }
                    </div>
                    <div className={'form-group' + (submitted && !password ? ' has-error' : '')}>
                        <label htmlFor="password">
                            Password
                        </label>
                        <input
                            type="password"
                            className="form-control"
                            name="password"
                            value={password}
                            onChange={(e) => this.handleChange(e)}
                        />
                        {submitted && !password &&
                        <div className="help-block">
                            Password is required
                        </div>
                        }
                    </div>
                    <div className="form-group">
                        <button className="btn btn-primary">
                            Login
                        </button>
                        {loggingIn &&
                        <img
                            alt=""
                            src="data:image/gif;base64,R0lGODlhEAAQAPIAAP///wAAAMLCwkJCQgAAAGJiYoKCgpKSkiH/C05FVFNDQVBFMi4wAwEAAAAh/hpDcmVhdGVkIHdpdGggYWpheGxvYWQuaW5mbwAh+QQJCgAAACwAAAAAEAAQAAADMwi63P4wyklrE2MIOggZnAdOmGYJRbExwroUmcG2LmDEwnHQLVsYOd2mBzkYDAdKa+dIAAAh+QQJCgAAACwAAAAAEAAQAAADNAi63P5OjCEgG4QMu7DmikRxQlFUYDEZIGBMRVsaqHwctXXf7WEYB4Ag1xjihkMZsiUkKhIAIfkECQoAAAAsAAAAABAAEAAAAzYIujIjK8pByJDMlFYvBoVjHA70GU7xSUJhmKtwHPAKzLO9HMaoKwJZ7Rf8AYPDDzKpZBqfvwQAIfkECQoAAAAsAAAAABAAEAAAAzMIumIlK8oyhpHsnFZfhYumCYUhDAQxRIdhHBGqRoKw0R8DYlJd8z0fMDgsGo/IpHI5TAAAIfkECQoAAAAsAAAAABAAEAAAAzIIunInK0rnZBTwGPNMgQwmdsNgXGJUlIWEuR5oWUIpz8pAEAMe6TwfwyYsGo/IpFKSAAAh+QQJCgAAACwAAAAAEAAQAAADMwi6IMKQORfjdOe82p4wGccc4CEuQradylesojEMBgsUc2G7sDX3lQGBMLAJibufbSlKAAAh+QQJCgAAACwAAAAAEAAQAAADMgi63P7wCRHZnFVdmgHu2nFwlWCI3WGc3TSWhUFGxTAUkGCbtgENBMJAEJsxgMLWzpEAACH5BAkKAAAALAAAAAAQABAAAAMyCLrc/jDKSatlQtScKdceCAjDII7HcQ4EMTCpyrCuUBjCYRgHVtqlAiB1YhiCnlsRkAAAOwAAAAAAAAAAAA=="
                        />
                        }
                        <Link
                            to="/register"
                            className="btn btn-link"
                        >
                            Register
                        </Link>
                    </div>
                </form>
            </div>
        );
    }
}

const mapStateToProps = (state: RootState) => {
    return {
        loggingIn: getLoggingIn(state),
    };
};
const mapDispatchToProps = (dispatch: DispatchThunk) => ({
    login: (username: string, password: string) => {
        dispatch(authenticationThunks.loginRequest(username, password));
    },
    logout: () => {
        dispatch(authenticationThunks.logout());
    },
});

export const LoginPage = connect(mapStateToProps, mapDispatchToProps)(LoginPageComponent);
