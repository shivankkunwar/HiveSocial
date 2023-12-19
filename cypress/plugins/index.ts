import "node"
const { CodeCoverage } = require('@cypress/code-coverage')

module.exports = (on, config) => {
  require('@cypress/code-coverage/task')(on, config)
  return config
}

