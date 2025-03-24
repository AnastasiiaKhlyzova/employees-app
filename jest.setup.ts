import '@testing-library/jest-dom';

if (typeof global.TextEncoder === 'undefined') {
  const { TextEncoder, TextDecoder } = require('util');

  Object.assign(global, {
    TextEncoder: TextEncoder,
    TextDecoder: TextDecoder,
  });
}
