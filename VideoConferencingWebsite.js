let localVideo = document.getElementById('localVideo');
    let fullscreenButton = document.getElementById('fullscreen-btn');
    let pipButton = document.getElementById('pip-btn');
    let startButton = document.getElementById('start-call-btn');
    let endButton = document.getElementById('end-call-btn');
    let localStream;
    let remoteStream;
    let peerConnection;

    // Start the video call
    startButton.addEventListener('click', function() {
      startButton.disabled = true;
      endButton.disabled = false;

      // Get user media
      navigator.mediaDevices.getUserMedia({ video: true, audio: true })
        .then(function(stream) {
          localStream = stream;
          localVideo.srcObject = localStream;
        })
        .catch(function(error) {
          console.log('Error accessing media devices: ', error);
        });

      // Create and configure the peer connection
      // ...
    });

    // End the video call
    endButton.addEventListener('click', function() {
      startButton.disabled = false;
      endButton.disabled = true;

      // Stop local video stream
      if (localStream) {
        localStream.getTracks().forEach(function(track) {
          track.stop();
        });
      }

      // Clear local video element
      localVideo.srcObject = null;

      // Close peer connection and clean up
      // ...
    });

    // Enter full screen
    fullscreenButton.addEventListener('click', function() {
      let videoContainer = document.getElementById('video-container');
      if (videoContainer.requestFullscreen) {
        videoContainer.requestFullscreen();
      } else if (videoContainer.mozRequestFullScreen) {
        videoContainer.mozRequestFullScreen();
      } else if (videoContainer.webkitRequestFullscreen) {
        videoContainer.webkitRequestFullscreen();
      } else if (videoContainer.msRequestFullscreen) {
        videoContainer.msRequestFullscreen();
      }
    });

    // Exit full screen
    document.addEventListener('fullscreenchange', exitFullScreenHandler);
    document.addEventListener('mozfullscreenchange', exitFullScreenHandler);
    document.addEventListener('webkitfullscreenchange', exitFullScreenHandler);
    document.addEventListener('msfullscreenchange', exitFullScreenHandler);

    function exitFullScreenHandler() {
      if (
        !document.fullscreenElement &&
        !document.mozFullScreenElement &&
        !document.webkitFullscreenElement &&
        !document.msFullscreenElement
      ) {
        exitFullScreen();
      }
    }

    function exitFullScreen() {
      if (document.exitFullscreen) {
        document.exitFullscreen();
      } else if (document.mozCancelFullScreen) {
        document.mozCancelFullScreen();
      } else if (document.webkitExitFullscreen) {
        document.webkitExitFullscreen();
      } else if (document.msExitFullscreen) {
        document.msExitFullscreen();
      }
    }

    // Enter Picture-in-Picture mode
    pipButton.addEventListener('click', function() {
      if (localVideo !== document.pictureInPictureElement) {
        localVideo.requestPictureInPicture();
      } else {
        document.exitPictureInPicture();
      }
    });
