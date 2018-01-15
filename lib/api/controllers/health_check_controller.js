const { OK } = require('http-status-codes')

const connect = (container, controller)  => {
  const get_health_check = (req, res) => {
    res.status(OK).send({'status': 'success'})
  }

  // ======================================================
  // Controller Routes
  // ======================================================
  controller.get('/', get_health_check)

  return controller
}

module.exports = Object.assign({ connect })
