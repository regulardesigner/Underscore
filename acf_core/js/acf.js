var acf, _;
(function() {

	acf = _ = function(selector) {
		return new Acf(selector);
	};
	var Acf = function(selector) {
		if (selector == window || selector == document || selector.nodeType) {
			this[0] = selector;
			this.length = 1;
			return this;
		}
		var sel = document.querySelectorAll(selector);
		for (var i = 0; i < sel.length; i++) {
            this[i] = sel[i];
        }
        this.length = sel.length;
		return this;
	};

	acf.fn = Acf.prototype = {
		hide: function(callback) {
			for (var i = 0; i < this.length; i++) {
                this[i].style.display = 'none';
            }
            if (callback) callback();
            return this;
		},
		show: function(callback) {
			for (var i = 0; i < this.length; i++) {
                this[i].style.display = 'block';
            }
            if (callback) callback();
            return this;
		},
        remove: function(callback) {
            for (var i = 0; i < this.length; i++) {
                this[i].parentNode.removeChild(this[i]);
            }
            if (callback) callback();
            return this;
        }
	};

})();

acf.fn.addClass = function(value, callback) {
	for (var i = 0; i < this.length; i++) {
		var listClass = this[i].className;
		if (listClass.indexOf(value) == -1) this[i].className = listClass + " " + value; 
    }
    if (callback) callback();
    return this;
};
acf.fn.removeClass = function(value, callback) {
	for (var i = 0; i < this.length; i++) {
		var listClass = " " + this[i].className + " ";
		this[i].className = listClass.replace(" "+value+" ", "").replace(/^\s+/, "").replace(/\s+$/, ""); 
    }
    if (callback) callback();
    return this;
};
acf.fn.on = function(evt, callback) {
	for (var i = 0; i < this.length; i++) {
		this[i].addEventListener(evt, function(e) {
			callback.apply(this, [e]);
		});
    }
	return this;
};
acf.fn.preload = function(list, callback) {
	var imageLoaded = 0, listLength = list.length, callback = "undefined" != typeof callback ? callback : function() {};
	if (listLength == 0) {
		callback();
	} else {
		for (var i = 0; i < listLength; i++) {
			var image = new Image(),
				pipe = function() {
					imageLoaded++;
					if (imageLoaded == listLength) {
						for (var i = 0; i < this.length; i++) {
							_(this[i]).hide();
					    }
						callback();
					}
				};
			image.onload = pipe;
			image.onerror = pipe;
			image.src = images[i];
		}
	}
	return this;
};
acf.fn.scale = function(params, callback) {
	if (!params.coef && !params.x && !params.y) return this;
	for (var i = 0; i < this.length; i++) {
		var that = this[i];
		if (params.pos) {
			that.style[params.pos[0]] = parseInt(params.x*params.coef)+'px';
			that.style[params.pos[1]] = parseInt(params.y*params.coef)+'px';
		} else {
			that.style.width = parseInt(params.x*params.coef)+'px';
			that.style.height = parseInt(params.y*params.coef)+'px';
		}
	}
	if (callback) callback();
	return this;
};
acf.timeline = function() {
	var timer;
	return function(params) {
		if (!params) return;
		if (("string" == typeof params) && (params == "stop")) return clearInterval(timer);
		var interval = params.interval || 1000,
			step = params.step || {},
			time = 0; 
		timer = window.setInterval(function() {
			time++;
			var checkIt = step[""+time];
			if (checkIt) checkIt();
		}, interval);
	};
};