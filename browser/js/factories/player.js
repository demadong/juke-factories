// Player factory -- controls player functionality

app.factory('PlayerFactory', function() {
	var audio = document.createElement('audio');
	var currentSong = null;
	var songList = null;
	var playerObj = {
		//start -- loads & plays a song
		start: function(song, songObj) {
			if(songObj) songList = songObj.songs;
			this.pause();
			audio.src = song.audioUrl;
			audio.load();
    		audio.play();
    		currentSong = song;
    		
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
		},

		//getCurrentSong -- gets current song
		getCurrentSong: function() {
			return currentSong;
		},

		//next -- moves to next song, and back to first on last song
		next: function() {
			if(songList.indexOf(currentSong) === songList.length - 1) {
				this.start(songList[0], songList);
			} else {
				this.start(songList[songList.indexOf(currentSong)+1])
			}
		},

		//previous -- moves to previous song in list, and back to last on first song
		previous: function() {
			if(songList.indexOf(currentSong) === 0) {
				this.start(songList[songList.length - 1], songList);
			} else {
				this.start(songList[songList.indexOf(currentSong)-1])
			}
		},

		//getProgress -- gets percentage of song done 
		getProgress: function() {
			if (!currentSong) return 0;
			return audio.currentTime / audio.duration;
		}
	};

	return playerObj;
})