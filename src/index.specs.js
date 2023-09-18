import './setupTests';

// Load all tests
const ctx = require.context('.', true, /\.spec$/);
ctx.keys().forEach(ctx);
