import React, {Component} from 'react';
import {Redirect, Route, Router, Switch} from 'react-router-dom';
import {connect} from 'react-redux';
import {getAlert, Thunks as appThunks} from '@store/alerts';

import {DispatchThunk, history, RootState} from '@store';
import {AlertItem} from '@models';
import {PrivateRoute} from '../shared';
import {HomePage} from '../home/Home';
import {LoginPage} from '../user/LoginPage';
import {RegisterPage} from '../user/RegisterPage';
import {DoctorsList} from '../doctors/DoctorList';
import {DoctorEdit} from '../doctors/DoctorEdit';

interface Props {
    alert?: AlertItem
    clearAlerts: any;
}

interface State {

}

class AppComponent extends Component<Props, State> {
    constructor(props) {
        super(props);

        history.listen(() => {
            this.props.clearAlerts();
        });
    }

    render() {
        const {alert} = this.props;
        return (
            <div className="jumbotron">
                <div className="container">
                    <div className="col-sm-8 col-sm-offset-2">
                        {
                            alert && alert.message &&
                            <div className={`alert ${alert.type}`}>
                                {alert.message}
                            </div>
                        }
                        <Router history={history}>
                            <Switch>
                                <PrivateRoute exact path="/" component={HomePage}/>
                                <PrivateRoute exact path="/doctors" component={DoctorsList}/>
                                <PrivateRoute path='/doctors/:id' component={DoctorEdit}/>
                                <Route path="/login" component={LoginPage}/>
                                <Route path="/register" component={RegisterPage}/>
                                <Redirect from="*" to="/"/>
                            </Switch>
                        </Router>
                    </div>
                </div>
            </div>
        );
    }
}

const mapStateToProps = (state: RootState) => ({
    alert: getAlert(state)
});

const mapDispatchToProps = (dispatch: DispatchThunk) => ({
    clearAlerts: () => {
        dispatch(appThunks.clearAlerts());
    }
});

export const App = connect(mapStateToProps, mapDispatchToProps)(AppComponent);
