var macie = (navigator.userAgent.indexOf("MSIE") == -1) || (navigator.userAgent.indexOf("Mac") == -1) ? false : true;

// BROWSER-DETECT FUNCTIONS

function isMacIE() {
	return macie;
}

// IMAGE-HANDLING FUNCTIONS

function initImage(src) {
	if (document.images) {
		obj = new Image();
		obj.src = src;
	}
	return(obj);
}

function changeImage(imgName, imgObj) {
	document.images[imgName].src = imgObj.src;
}

// SOUND-HANDLING FUNCTIONS

// The audio variable is used as a reference to the current AudioPlayer applet.
var audio;
var javaAudio = 0;

// Assigns a reference to the AudioPlayer applet to audio variable.
function initAudio() {
	if (!isMacIE()) {
		if (document.applets["MultiAudioClipPlayer"] != null) {
			if (document.applets["MultiAudioClipPlayer"].isLoaded()) {
				audio = document.applets["MultiAudioClipPlayer"];
				javaAudio = 1;
			}
		}
	}
}

// Load and play the specified sound file.
function playSound(soundName) {
	if (!isMacIE()) {
		if (audio == null)
			initAudio();
		if (javaAudio)
			audio.playClip(soundName);
	}
}

// Load and play the specified sound file in a continuous loop.
function loopSound(soundName) {
	if (!isMacIE()) {
		if (audio == null)
			initAudio();
		if (javaAudio)
			audio.loopClip(soundName);
	}
}

// Stop the playing of the sound file.
function stopSound(soundName) {
	if (!isMacIE()) {
		if (audio == null)
			initAudio();
		if (javaAudio)
			audio.stopClip(soundName);
	}
}
