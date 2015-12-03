// Player factory -- controls player functionality
var audio = document.createElement('audio');

app.factory('PlayerFactory', function() {
	var playerObj = {
		//start -- loads & plays a song
		start: function(song) {
			this.pause();
			audio.src = song.audioUrl;
			audio.load();
    		audio.play();
		},

		//pause -- pauses current song
		pause: function() {
			audio.pause();
		},
		//resume -- continues playing song after pause
		resume: function() {
			if (!this.isPlaying()) {
				audio.play();
			}
		},

		//isPlaying -- returns boolean
		isPlaying: function() {
			return !audio.paused;
		}

		//getCurrentSong -- gets songId of current song

		//next -- moves to next song, and back to first on last song

		//previous -- moves to previous song in list, and back to last on first song

		//getProgress -- gets percentage of song done 
	};

	return playerObj;
})