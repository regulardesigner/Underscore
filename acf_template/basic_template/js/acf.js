//document.getElementById("acf-loader").style.lineHeight=window.innerHeight+"px";
window.addEventListener("resize", resize);
function loaderLineHeight(){
	document.getElementById('acf-loader').style.lineHeight = window.innerHeight+"px";
}
function init(){
	loaderLineHeight();
}
function resize(){
	loaderLineHeight();
}