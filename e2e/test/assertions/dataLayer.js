const AJV = require('ajv')
const schemas = require('../analytics/schemas/index')

const ajv = new AJV({
  allErrors: true,
  schemas
})


module.exports.assertion = function () { // eslint-disable-line func-names
  this.message = 'DataLayer Validation'
  this.expected = 'DataLayer requirements met'

  this.command = (done) => {
    this.api.execute('return window.dataLayer', [], function (response) { // eslint-disable-line func-names
      const dataLayer = response.value

      const validate = ajv.getSchema('analytics')
      const valid = validate(dataLayer)

      if (!valid) {
        for (const error of validate.errors) { // eslint-disable-line no-restricted-syntax
          this.assert.fail(`DataLayer Validation: window.dataLayer${error.dataPath} ${error.message}`)
        }
      }

      done(valid)
    })

    return this
  }

  this.value = value => value
  this.pass = pass => pass
}
