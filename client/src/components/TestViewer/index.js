import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';

import TestViewer from './TestViewer';

import { fields } from '../../redux/product/selectors';

const selector = createStructuredSelector({
  fields,
});

export { TestViewer };

export default connect(selector, {})(TestViewer);
