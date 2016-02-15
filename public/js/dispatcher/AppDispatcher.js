/*
 * AppDispatcher
 *
 * A singleton that operates as the central hub for application updates.
 */

var Dispatcher = require('flux').Dispatcher;
var AppDispatcher = new Dispatcher();


module.exports = AppDispatcher;