/** Dependencies */
var util    = require('./util');
var express = require('express');
var ejs     = require('ejs');
var layouts = require('express-ejs-layouts');


/** Init */
var app = express();


/** Configure */
app.set('view engine', 'ejs');
app.set('views', process.cwd() + '/app/views/');
app.set('layout', 'layouts/application');
app.use(layouts);
app.use(require("connect-assets")({
	paths: ['app/assets/css', 'app/assets/js', 'vendor/assets/css', 'vendor/assets/js']
}));


/** Controllers */
var YaksController = require('../app/controllers/yaks_controller');


/** Routes */
app.get('/', YaksController.index);


/** Boot */
app.listen(3000);