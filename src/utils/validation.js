// eslint-disable-next-line import/prefer-default-export
export const evaluateValidation = (validator, value, callback) => {
  if (callback) {
    if (validator === 'email') {
      callback(value.match(/^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/))
    } else if (validator === 'password') {
      callback(true)
    } else if (typeof validator === 'function') {
      validator(value, callback)
    } else if (typeof validator === 'number') {
      callback(value.length >= validator)
    } else {
      const regex = new RegExp(validator)

      callback(`${value}`.match(regex))
    }
  }
}
