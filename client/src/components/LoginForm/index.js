import { connect } from 'react-redux';
import { reduxForm } from 'redux-form';

import { compose } from '../../utils';
import LoginForm from './LoginForm';
import { login } from '../../redux/profile/actions';

const reduxConnect = connect(null, { onSubmit: login });

const formConnect = reduxForm({
  form: 'login',
});

export { LoginForm };

export default compose(reduxConnect, formConnect)(LoginForm);
