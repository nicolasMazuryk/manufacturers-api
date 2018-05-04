import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';

import { isLoggedIn } from '../../redux/profile/selectors';
import HomePage from './HomePage';

const selector = createStructuredSelector({
  isLoggedIn,
});

const actions = {};

export { HomePage };

export default connect(selector, actions)(HomePage);
