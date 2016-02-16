var viewController = require('../controllers/views');

module.exports = function(app) {

	app.get('/**', viewController.renderApp);
}