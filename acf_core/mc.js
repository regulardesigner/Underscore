var mc, _;
(function() {

	mc = _ = function(selector) {
		return new Mc(selector);
	};
	var Mc = function(selector) {
		var sel = document.querySelectorAll(selector);
		for (var i = 0; i < sel.length; i++) {
            this[i] = sel[i];
        }
        this.length = sel.length;
		return this;
	};

	mc.fn = Mc.prototype = {
		hide: function() {
			for (var i = 0; i < this.length; i++) {
                this[i].style.display = 'none';
            }
            return this;
		},
		show: function() {
			for (var i = 0; i < this.length; i++) {
                this[i].style.display = 'block';
            }
            return this;
		},
        remove: function() {
            for (var i = 0; i < this.length; i++) {
                this[i].parentNode.removeChild(this[i]);
            }
            return this;
        }
	};

})();

mc.fn.addClass = function(value) {
	for (var i = 0; i < this.length; i++) {
		var listClass = this[i].className;
		this[i].className = listClass + " " + value; 
    }
    return this;
};
mc.fn.removeClass = function(value) {
	for (var i = 0; i < this.length; i++) {
		var listClass = " " + this[i].className + " ";
		this[i].className = listClass.replace(" "+value+" ", "").replace(/^\s+/, "").replace(/\s+$/, ""); 
    }
    return this;
};
mc.fn.on = function(evt, callback) {
	for (var i = 0; i < this.length; i++) {
		this[i].addEventListener(evt, callback, false);
    }
	return this;
};
mc.fn.preload = function(list, callback) {
	var imageLoaded = 0, listLength = list.length;
	if (listLength == 0) return callback();
	for (var i = 0; i < listLength; i++) {
		var image = new Image(),
			pipe = function() {
				imageLoaded++;
				if (imageLoaded == listLength) {
					mc('#loader').hide();
					callback();
				}
			};
		image.onload = pipe;
		image.onerror = pipe;
		image.src = images[i];
	}
};
/* 
	params = {
		coef : 1,
		x : 100,
		y : -30,
		pos : ['left', 'top'] <-- optional
	}
	usage : _('.monElement').scale({coef:1, x:50, y:20})
 */
mc.fn.scale = function(params) {
	if (!params.coef && !params.x && !params.y) return this;
	for (var i = 0; i < this.length; i++) {
		var that = this[i];
		if (params.pos) {
			// ex : params.pos = ['left', 'top']
			that.style[params.pos[0]] = parseInt(params.x*params.coef)+'px';
			that.style[params.pos[1]] = parseInt(params.y*params.coef)+'px';
		} else {
			that.style.width = parseInt(params.x*params.coef)+'px';
			that.style.height = parseInt(params.y*params.coef)+'px';
		}
	}
	return this;
};