import { connect } from 'react-redux';
import { reduxForm } from 'redux-form';

import { compose } from '../../utils';
import ConnectDbForm from './ConnectDbForm';
import { connectToDb } from '../../redux/profile/actions';

const reduxConnect = connect(null, { onSubmit: connectToDb });

const formConnect = reduxForm({
  form: 'connectToDb',
});

export { ConnectDbForm };

export default compose(reduxConnect, formConnect)(ConnectDbForm);
