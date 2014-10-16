/**
 * Yaks Controller
 */
module.exports = {
	
	index: function(req, res) {
		Yak.find({})
		.limit(10)
		.sort('-timestamp')
		.exec(function(err, yaks) {
			res.render('yaks/index', { yaks: yaks });
		});
	}
	
};