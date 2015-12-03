app.controller('AlbumCtrl', function($scope, $http, $rootScope, PlayerFactory, StatsFactory) {
  var player = PlayerFactory;
  var audio = player.audio;
  // load our initial data
  $http.get('/api/albums/')
  .then(res => $http.get('/api/albums/' + res.data[1]._id))
  .then(res => res.data)
  .then(album => {
    album.imageUrl = '/api/albums/' + album._id + '.image';
    album.songs.forEach(function(song){
      song.audioUrl = '/api/songs/' + song._id + '.audio';
    });
    $scope.album = album;
  })
  .then(function() {
    return StatsFactory.totalTime($scope.album)
  })
  .then(function(duration) {
    $scope.album.duration = Math.round(duration/60).toString() + ":00 minutes" ;
  })
  .catch(console.error.bind(console));


  // main toggle
  $scope.toggle = function (song) {
    if (player.isPlaying()) player.pause();
    else player.start(song);
  }

  // incoming events (from Player, toggle, or skip)
  //$scope.$on('pause', pause);
  //$scope.$on('play', play);
  //$scope.$on('next', next);
  //$scope.$on('prev', prev);

  // a "true" modulo that wraps negative to the top of the range
  function mod (num, m) { return ((num%m)+m)%m; };

  // jump `val` spots in album (negative to go back)
  function skip (val) {
    if (!$scope.currentSong) return;
    var idx = $scope.album.songs.indexOf($scope.currentSong);
    idx = mod( (idx + (val || 1)), $scope.album.songs.length );
    $rootScope.$broadcast('play', $scope.album.songs[idx]);
  };
  function next () { skip(1); };
  function prev () { skip(-1); };

});
