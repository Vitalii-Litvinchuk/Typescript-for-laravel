import * as LoginActionCreators from '../../components/auth/Login/actions';
import * as RegisterActionCreators from '../../components/auth/Register/actions';
import * as AuthActionCreators from './auth';

export default {
    ...LoginActionCreators,
    ...RegisterActionCreators,
    ...AuthActionCreators,
}