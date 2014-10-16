// Events
//
// 1. Start Yakker Instance
// 2. Get list of yaks
// 3. For each Yak:
//    a) Check DB if Yak with ID exists
//    b) new yak ->
//       1) Get address from lat/long
//       2) If num_comments > 0, get comments
//       3) Create on DB
//    c) exists ->
//       1) If likes > prev_likes, get likes
//       2) If comments > 0 || comments > prev_comments, get new comments
//       3) Update on DB if 1,2 true
// 4. For each comment:
//    a) If new -> create
//    b) exists -> update likes
// 5. Goto -> 2


var util = require('./util');

/**
 * On Fetched Yak
 */
Switchboard.yaks.on('fetched_yak', function(fetched_yak) {
	Yak.findById(fetched_yak._id, function(err, yak) {
		if (err) {
			util.log('Error: ' + err);
		} else {
			// New Yak
			if (!yak) {
				util.log('Creating Yak: ' + fetched_yak._id + ' - ' + fetched_yak.content);
				Yak.create(fetched_yak, function(err, yuk) {
					if (err) {
						util.log('Error: ' + err);
					} else {
						Yakker.locate(yuk);
					}
				});
			}
		
			// Exists
			if (yak) {
				// fetched_likes > likes?
				if (fetched_yak.likes > yak.likes) {
					yak.likes = fetched_yak.likes;
					yak.save(function(err) {
						if (err) {
							util.log('Error: ' + err);
						} else {
							Switchboard.yaks.emit('fetch_comments', yak);
						}
					});
				} else {
					Switchboard.yaks.emit('fetch_comments', yak);
				}
			}
		}
	});
});



/**
 * Located Yak
 */
Switchboard.yaks.on('located_yak', function(yak) {
	util.log('Yakker Located: ' + yak.id + ' - ' + yak.address);
	yak.save(function(err) {
		if (err) {
			util.log('Error: ' + err);
		} else {
			Switchboard.yaks.emit('fetch_comments', yak);
		}
	});
});



/**
 * Fetch Comments
 */
Switchboard.yaks.on('fetch_comments', function(yak) {
	Yakker.comments(yak);
});



/**
 * Fetched Comments
 */
Switchboard.yaks.on('fetched_comment', function(yak, comment) {
	var exists = yak.comments.id(comment._id);
	//console.log(exists);
	
	// New Comment
	if (!exists) {
		util.log('New Comment: ' + yak.id + ' - ' + comment.content);
		yak.comments.push(comment);
		yak.save(function(err) {
			if (err) {
				util.log('Error !exists (' + yak.id + '): ' + err);
			} else {
				Switchboard.yaks.emit('yak_processed', yak);
			}
		});
	}
	
	// Exists
	else {
		// fetched likes > existing likes?
		if (comment.likes > exists.likes) {
			exists.likes = comment.likes;
			yak.save(function(err) {
				if (err) {
					util.log('Error (' + yak.id + '): ' + err);
				} else {
					Switchboard.yaks.emit('yak_processed', yak);
				}
			});
		} else {
			Switchboard.yaks.emit('yak_processed', yak);
		}
	}
});



/**
 * Yak Processed
 */
Switchboard.yaks.on('yak_processed', function(yak) {
	//util.log('Yak Processed! ' + yak.id);
});