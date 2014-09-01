//document.getElementById("acf-loader").style.lineHeight=window.innerHeight+"px";
window.addEventListener("resize", resize);
function loaderLineHeight(){
	document.getElementById('acf-loader').style.lineHeight = window.innerHeight+"px";
}
function preloader(){
	console.log("preloader");
}
function init(){
	loaderLineHeight();
	preloader();
}
function resize(){
	loaderLineHeight();
}