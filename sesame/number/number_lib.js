var ns = (document.layers) ? true : false;
var ie = (document.all) ? true : false;
var macie = (navigator.userAgent.indexOf("MSIE") == -1) || (navigator.userAgent.indexOf("Mac") == -1) ? false : true;

if (ns) {
	show = "show";
	hide = "hide";
} else if (ie) {
	show = "visible";
	hide = "hidden";
}

// BROWSER-DETECT FUNCTIONS

function isMacIE() {
	return macie;
}

// LAYER-HANDLING FUNCTIONS

function initLayer(layerName) {
	if (ns) {
		obj = document.layers[layerName];
	} else if (ie) {
		obj = document.all[layerName].style;
		obj.wr = document.all[layerName];
	}
	obj.xpos = parseInt(obj.left);
	obj.ypos = parseInt(obj.top);
	return(obj);
}

function showLayer(obj) {
	obj.visibility = show;
}

function hideLayer(obj) {
	obj.visibility = hide;
}

function moveLayer(obj, x, y) {
	obj.xpos = x;
	obj.ypos = y;
	obj.left = obj.xpos;
	obj.top = obj.ypos;
}

function moveLayerBy(obj, x, y) {
	a = obj.left;
	b = obj.top;
	obj.xpos = parseInt(a) + parseInt(x);
	obj.ypos = parseInt(b) + parseInt(y);
	obj.left = obj.xpos;
	obj.top = obj.ypos;
}

function getClipValue(obj, which) {
	if (ns) {
		if (which == "t")
			return obj.clip.top;
		if (which == "r")
			return obj.clip.right;
		if (which == "b")
			return obj.clip.bottom;
		if (which == "l")
			return obj.clip.left;
	} else if (ie) {
		var clipv = obj.clip.split("rect(")[1].split(")")[0].split("px");
		if (which == "t")
			return Number(clipv[0]);
		if (which == "r")
			return Number(clipv[1]);
		if (which == "b")
			return Number(clipv[2]);
		if (which == "l")
			return Number(clipv[3]);
	}
}

function clipLayer(obj, l, t, r, b) {
	x = parseInt(obj.left);
	y = parseInt(obj.top);
	tnew = t - y;
	rnew = r - x + 1;
	bnew = b - y + 1;
	lnew = l - x;
	if (ns) {
		obj.clip.top = tnew;
		obj.clip.right = rnew;
		obj.clip.bottom = bnew;
		obj.clip.left = lnew;
	} else if (ie)
		obj.clip = "rect(" + tnew + "px " + rnew + "px " + bnew + "px " + lnew + "px)";
}

function clipLayerTo(obj, l, t, r, b) {
	if (ns) {
		obj.clip.top = t;
		obj.clip.right = r;
		obj.clip.bottom = b;
		obj.clip.left = l;
	} else if (ie)
		obj.clip = "rect(" + t + "px " + r + "px " + b + "px " + l + "px)";
}

function clipLayerBy(obj, l, t, r, b) {
	if (ns) {
		obj.clip.top = getClipValue(obj, 't') + t;
		obj.clip.right = getClipValue(obj, 'r') + r;
		obj.clip.bottom = getClipValue(obj, 'b') + b;
		obj.clip.left = getClipValue(obj, 'l') + l;
	} else if (ie)
		obj.clip = "rect(" + (this.getClipValue(obj, 't') + t) + "px " + (this.getClipValue(obj, 'r') + r) + "px " + Number(this.getClipValue(obj, 'b') + b) + "px " + Number(this.getClipValue(obj, 'l') + l) + "px)";
}

function writeLayer(obj, text) {
	if (ns) {
		obj.document.open();
		obj.document.write(text);
		obj.document.close();
	} else if (ie) {
		obj.wr.innerHTML = text;
	}
}

// IMAGE-HANDLING FUNCTIONS

function initImage(src) {
	if (document.images) {
		obj = new Image();
		obj.src = src;
	}
	return(obj);
}

function initSizedImage(src, x, y) {
	if (document.images) {
		obj = new Image(x, y);
		obj.src = src;
	}
	return(obj);
}

function changeImage(layer, imgName, imgObj) {
	if (document.layers && layer != null)
		layer.document.images[imgName].src = imgObj.src;
	else
		document.images[imgName].src = imgObj.src;
}

function xImage(imgName) {
	if (ns)
		return document.images[imgName].x;
	else if (ie) {
		var xObject = document.images[imgName];
		var xOffset = xObject.offsetLeft;
		while (xObject.offsetParent != null) {
			xObject = xObject.offsetParent;
			xOffset += xObject.offsetLeft;
		}
		return xOffset;
	}
}
	
function yImage(imgName) {
	if (ns)
		return document.images[imgName].y;
	else if (ie) {
		var yObject = document.images[imgName];
		var yOffset = yObject.offsetTop;
		while (yObject.offsetParent != null) {
			yObject = yObject.offsetParent;
			yOffset += yObject.offsetTop;
		}
		return yOffset;
	}
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
