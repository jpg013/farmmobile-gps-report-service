const { OK } = require('http-status-codes')
const models = require('../../models')
const { no_results_error } = require('../../errors')

const connect = (container, controller)  => {
  const { cache_repository } = container.resolve('repositories')
  const { gps_report } = container.resolve('services')
  
  const get_gps_report = async (req, res, next) => {
    try {
      const report_data = await cache_repository.lookup_gps_report()  
      
      if (!report_data) {
        gps_report.build_gps_report()
        return next(new no_results_error('The report data in not available.'))
      }
      
      req.results = await models.validate(report_data, 'gps_report') 
      next()
    } catch(e) {
      next(e)
    }
  }

  // ======================================================
  // Controller Routes
  // ======================================================
  controller.get('/', get_gps_report)

  return controller
}

module.exports = Object.assign({ connect })
