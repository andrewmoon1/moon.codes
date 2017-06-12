// require('babel-polyfill');
import requireContext from 'webpack-require_context';

// this regex matches any js files in __tests__ directories
var context = requireContext('.', true, /__tests__\/.+\.js$/);
context.keys().forEach(context);
