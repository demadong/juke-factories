app.controller('PlayerCtrl', function($scope, $rootScope, PlayerFactory){
  var player = PlayerFactory;
  var audio = player.audio;
  var progress;
  audio.addEventListener('ended', function () {
    player.next();
  });
  audio.addEventListener('timeupdate', function () {
    progress = player.getProgress();
  });

  // state variables
  var currentSong;
  var isPlaying = player.isPlaying();

  // main toggle
  $scope.toggle = function (song) {
    if (isPlaying) player.pause();
    else player.start(song);
  }

  // incoming events (from Album or toggle)
  //$scope.$on('pause', pause);
  //$scope.$on('play', play);

  // functionality

  // outgoing events (to Album)
  $scope.next = player.next();
  $scope.prev = player.previous();

});
