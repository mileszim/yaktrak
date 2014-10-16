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
	school:       String,
	
	comments: [{
		_id:       String,
		content:   String,
		timestamp: Date,
		likes:     Number,
		poster_id: String
	}]
}, {
	versionKey: false
});


/** Export Model */
module.exports = Mongoose.model('Yak', YakSchema);