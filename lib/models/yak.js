/**
 * Yak Schema
 */
var YakSchema = new Mongoose.Schema({
	_id:          String,
	content:      String,
	latitude:     Number,
	longitude:    Number,
	address:      String,
	timestamp:    Date,
	likes:        Number,
	num_comments: Number,
	poster_id:    String,
	handle:       String,
	
	comments: [{
		_id:       String,
		content:   String,
		timestamp: Date,
		likes:     Number,
		poster_id: String
	}]
});


/** Export Model */
module.exports = Mongoose.model('Yak', YakSchema);