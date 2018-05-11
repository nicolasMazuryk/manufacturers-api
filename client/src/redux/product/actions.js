export const prefix = 'product';

export const TEST_QUERY_REQUEST = `${prefix}/TEST_QUERY_REQUEST`;
export const TEST_QUERY_SUCCESS = `${prefix}/TEST_QUERY_SUCCESS`;
export const TEST_QUERY_FAILURE = `${prefix}/TEST_QUERY_FAILURE`;

export const testQuery = params => ({
  types: [TEST_QUERY_REQUEST, TEST_QUERY_SUCCESS, TEST_QUERY_FAILURE],
  promise: api => api.product.test(params),
});

export const CREATE_PRODUCT_REQUEST = `${prefix}/CREATE_PRODUCT_REQUEST`;
export const CREATE_PRODUCT_SUCCESS = `${prefix}/CREATE_PRODUCT_SUCCESS`;
export const CREATE_PRODUCT_FAILURE = `${prefix}/CREATE_PRODUCT_FAILURE`;

export const createProduct = params => ({
  types: [
    CREATE_PRODUCT_REQUEST,
    CREATE_PRODUCT_SUCCESS,
    CREATE_PRODUCT_FAILURE,
  ],
  promise: api => api.product.bulkCreate(params),
});
