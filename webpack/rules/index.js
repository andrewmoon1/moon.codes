const image = require('./image');
const javascript = require('./javascript');
const css = require('./css');

module.exports = ({ production = false, browser = false, test = false } = {}) => (
  [
    javascript({ production, browser, test }),
    css({ production, browser }),
    image()
  ]
);
