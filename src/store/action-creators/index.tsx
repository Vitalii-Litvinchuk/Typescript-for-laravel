import * as LoginActionCreators from '../../components/auth/Login/actions';
import * as RegisterActionCreators from '../../components/auth/Register/actions';
import * as ProfileActionCreators from '../../components/userView/Profile/actions';
import * as ProductActionCreators from '../../components/userView/Product/actions';
import * as AuthActionCreators from './auth';

export default {
    ...LoginActionCreators,
    ...RegisterActionCreators,
    ...AuthActionCreators,
    ...ProfileActionCreators,
    ...ProductActionCreators,
}