Underscore
===================

Usage
-----

### 1. Retrieve element from DOM

_("#myElement");
```

### 2. Add or remove a css class / show or hide an element

```
// addClass
_("#myElement").addClass("myNewClass");

// removeClass
_("#myElement").removeClass("myNewClass");

// hide
_("#myElement").hide();

// show
_("#myElement").show();

// with a callback
_("#myElement").show(function() {
	// do something after
});
```

### 3. Add an event listener

```
_("#myElement").on("click", function(e) {
	// do something when someone click on the element
});
```
```
_(window).on("resize", function(e) {
	// do something when my window is resized
});
```

### 4. Add a preload

```
var listImgs = ["url/de/mon/image1.jpg", "url/de/mon/image2.jpg", "url/de/mon/image8.jpg"];
_("#myLoader").preload(listImgs, function() {
	// do something after all the preloaded imgs
});
```

### 5. Scale an element

```
// scale dimensions
_("#myElementToScale").scale({
	coef: 1,
	x : 100,
	y : 30
});

// scale positioning
_("#myElementToScale").scale({
	coef: 1,
	x : 100,
	y : 30,
	pos : ["left", "top"]
});

// scale with a callback
_("#myElementToScale").scale({
	coef: 1,
	x : 100,
	y : 30
}, function() {
	// do something ...
});
```

### 6. Timeline

```
// create a reference of the timeline
var myTimeline = _.timeline();

// pass params in the reference when you want to start the timeline execution
myTimeline({
	interval : 1000, // 1000 = 1 second
	step : {
		"2" : function() {
			// do something after 2 seconds
		}, 
		"3" : function() {
			// do something after 3 seconds
		}, 
		"8" : function() {
			// do something after 8 seconds
		}
	}
});

// you can stop the timeline whenever you want with ...
myTimeline("stop");
```