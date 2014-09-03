var isResize = false;
var counter = 0;

var fontSize1 = 26;
var fontSize2 = 18;
var fontSize3 = 20;
var textMargin = 18;
var textMargin2 = 0;
var textMargin3 = 20;

var num = 0;
var goAcc = true;

var xcoef = 1;
var coef = 1;
var diff = 0;

var locked = false;
var moved = 0;

var step = 0;
var lock = false;
var lock2 = false;

var changed = 0;
var launched = false;

var flowers = new Array();
var dateOri = 0;

var isMobile = {
	Android: function() {
		return navigator.userAgent.match(/Android/i);
	},
	BlackBerry: function() {
		return navigator.userAgent.match(/BlackBerry/i);
	},
	iOS: function() {
		return navigator.userAgent.match(/iPhone|iPod|iPad/i);
	},
	Opera: function() {
		return navigator.userAgent.match(/Opera Mini/i);
	},
	Windows: function() {
		return navigator.userAgent.match(/IEMobile/i);
	},
	any: function() {
		return (isMobile.Android() || isMobile.BlackBerry() || isMobile.iOS() || isMobile.Opera() || isMobile.Windows());
	}
};


if (typeof $ === 'undefined') {
	$ = function(id){
		return document.getElementById(id);
	};
}

window.addEventListener('load', function(){
	preload();
});

function scale( id,x,y) {
	document.getElementById(id).style.width = parseInt(x*coef)+"px";
	document.getElementById(id).style.height = parseInt(y*coef)+"px";
}

function scale2( id,x,y) {
	document.getElementById(id).style.width = parseInt(x*coef2)+"px";
	document.getElementById(id).style.height = parseInt(y*coef2)+"px";
}

function scalePosLT( id,x,y) {
	document.getElementById(id).style.left = parseInt(x*coef)+"px";
	document.getElementById(id).style.top = parseInt(y*coef)+"px";
}

function scalePosLB( id,x,y) {
	document.getElementById(id).style.left = parseInt(x*coef)+"px";
	document.getElementById(id).style.bottom = parseInt(y*coef)+"px";
}

function scalePosRT( id,x,y) {
	document.getElementById(id).style.right = parseInt(x*coef)+"px";
	document.getElementById(id).style.top = parseInt(y*coef)+"px";
}

function scalePosRB( id,x,y) {
	document.getElementById(id).style.right = parseInt(x*coef)+"px";
	document.getElementById(id).style.bottom = parseInt(x*coef)+"px";
}

function centerH(id) {
	document.getElementById(id).style.left = parseInt((window.innerWidth - document.getElementById(id).offsetWidth) / 2)+"px";
}

preload = function() {

	console.log("preload");
	$('loader').style.width = window.innerWidth+"px";
	$('loader').style.height = window.innerHeight+"px";
	var images = new Array();

	images.push('images/kenzo_BT_decouvrez.png');
	images.push('images/kenzo_coquelicot_seul.png');
	images.push('images/kenzo_elan.png');
	images.push('images/kenzo_fille.png');
	images.push('images/kenzo_flacon.png');
	images.push('images/kenzo_hashtag.png');
	images.push('images/kenzo_logo.png');
	images.push('images/kenzo_macaron.png');
	images.push('images/kenzo_fond_2.jpg');
	
	var imagesLoadedNumber = 0;
	if ( images.length == 0 ) {
		init();
	} else {
		for(var i=0; i<images.length; i++)
		{
			var image = new Image();
			image.onload = function(){
				imagesLoadedNumber++;
				console.log("imagesLoadedNumber = "+imagesLoadedNumber);
				if(imagesLoadedNumber == images.length)
				{
					console.log("Loaded");
					document.getElementById("loader").style.display = "none";
					init();
				}
			}
			image.onerror = function(){
				imagesLoadedNumber++;
				console.log("imagesLoadedNumber = "+imagesLoadedNumber);
				if(imagesLoadedNumber == images.length)
				{
					console.log("Loaded");
					document.getElementById("loader").style.display = "none";
					init();
				}
			}
			image.src = images[i];
		}
	}
}


function init() {

	$('loader').style.display = 'none';
	$('wrapper').style.display = 'block';
	
	dateOri = new Date().getTime();
	
	if ( isMobile.Android()) {
		xcoef = -1
	}
	
	setTimeout(goStep2, 3000);
	setTimeout( resize, 200);

}

function resize() {

	if ( !isResize) {
		isResize = true;
		coef = 1;
		coef = window.innerWidth/640;
		
		diff = (window.innerHeight - (960*coef));
		if ( diff < 0 ) diff = 0;
		
		scale('fond', 940, 1436);
		centerH('fond');
		$('fond').style.bottom = parseInt(0*coef)+"px";
		
		scale('logo', 200, 48);
		$('logo').style.top = parseInt(40*coef)+"px";
		$('logo').style.left = parseInt(40*coef)+"px";	
			
		$('balancoire').style.top = parseInt(-110*coef+(diff/2))+"px";
		$('balancoire').style.left = parseInt(250*coef)+"px";
		scale('balancoire', 158, 740);
		//centerH('balancoire');
		
		scale('elan', 376,64);
		centerH('elan');
		$('elan').style.bottom = parseInt(180*coef+(diff/2))+"px";
		
		scale('macaron', 150,150);
		centerH('macaron');
		$('macaron').style.bottom = parseInt(10*coef+(diff/2))+"px";
		
		
		scale('dream', 308,32);
		centerH('dream');
		if ( step < 4 )
			$('dream').style.bottom = parseInt(150*coef+(diff/2))+"px";
		else 
			$('dream').style.bottom = parseInt(50*coef)+"px";
			
		scale('final', 416,630);
		centerH('final');
		$('final').style.top = parseInt(100*coef+(diff/2))+"px";
		
		scale('bouton', 410,86);
		centerH('bouton');
		$('bouton').style.bottom = parseInt(120*coef)+"px";
		
		var allSize = 960*coef;
		if ( window.innerHeight > allSize) {
		 	allSize = window.innerHeight;
		}
		
		$('wrapper').style.width = parseInt(640*coef)+'px';
		$('wrapper').style.height = allSize+'px';
		
		$('flowerPanel').style.width = parseInt(640*coef)+'px';
		$('flowerPanel').style.height = allSize+'px';
	}
	setTimeout( function() { isResize = false; } , 200);
}

window.addEventListener("devicemotion", function(event) {

		if ( !locked) {
		
			locked = true;
		
      		var accelerationX = event.accelerationIncludingGravity.x;  
	    	
	    	$('balancoire').style.webkitTransitionDuration = '0.5s';
			$('balancoire').style.webkitTransform = 'rotate('+parseInt((-xcoef * accelerationX * 2))+'deg)';


			if ((  accelerationX < -3 ) || (  accelerationX > 3 )) {
				moved++;
					
			}
			
			if ( moved == 3) {
			// declenchement step 2
				try {
					_s4mq.push(['trackAction', { name: "Balance", callback: function() { 
						}
					}]);
				} catch (e) {}
				
				goStep2();	
			}
			setTimeout(function() { locked = false}, 200);
		}
		
}, true);

 
function goStep2() {

	if ( !launched) {
		launched = true;
		step = 2;
		$('macaron').style.display = 'none';
		$('elan').style.display = 'none';
		$('dream').style.opacity = '1';
	
		launchFlower(); 	
	}
} 
    
function goStep4() {
	step = 4;
	$('balancoire').style.webkitTransitionDuration = '1s';
 	$('balancoire').style.opacity = '0';
 	
 	$('final').style.webkitTransitionDuration = '1.2s';
 	$('final').style.transitionDuration = '1.2s';
 	$('final').style.opacity = '1';
 	$('dream').style.bottom = parseInt(50*coef)+'px';
 	
 	$('bouton').style.webkitTransitionDuration = '1.2s';
 	$('bouton').style.transitionDuration = '1.2s';
 	$('bouton').style.opacity = '1';
 	//$('logo').style.display = 'none';
}  

function addFlower( numf) {

	var left = Math.floor((Math.random() * $('wrapper').offsetWidth ) + 1);
	
	var size = Math.floor((Math.random() * 55) + 10);
	var speed = 10+ (65 -size)/5;
	var flower = document.createElement("div");
	
	flower.className = 'flower';
	flower.id = 'flower_'+numf;
	
	flower.style.width = (size*coef)+'px';
	flower.style.height = (size*coef)+'px';
	
	flower.style.position = 'absolute';
	flower.style.bottom = '0px';
	flower.style.left = left+'px';
	
	flower.style.webkitTransitionDuration = speed+'s';
	
	$('flowerPanel').appendChild(flower);
	
	setTimeout(function() {  flower.style.marginBottom = $('flowerPanel').offsetHeight + 'px'; } , 100);
	setTimeout(function() {  flower.style.display = 'none'; } , speed*800);
}
    	
function doClick() {

var end = parseInt((new Date().getTime() - dateOri)/1000);
//alert('Click after : '+end+' s');

    		try {
				_s4mq.push(['trackAction', { name: "Click;"+end, callback: function() { 
					$('alink').href = dest_URL;
					
					event = document.createEvent( 'HTMLEvents' );
					event.initEvent( 'click', true, true );
					$('alink').dispatchEvent( event );
					}
				}]);
	
			} catch (e) {
				$('alink').href = adinapp_URL;
				event = document.createEvent( 'HTMLEvents' );
				event.initEvent( 'click', true, true );
				$('alink').dispatchEvent( event );
			}
}
    
function launchFlower() {
	
	 addFlower( num++ );
	 if ( num < 9) {
	 	//setTimeout( launchFlower, 1000-45*num);
	 	setTimeout( launchFlower, 872-2*num*num);
	 } else {
	 
	    setTimeout( launchFlower, 500);
	    if ( num == 9) {
	 		setTimeout(goStep4, 1800);
	 	}
	 }
}
