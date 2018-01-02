var MaskUtil = window.MaskUtil = window.MaskUtil || {};
	// var  ratio = window.devicePixelRatio || 1;


MaskUtil.mask = function(){
	$('.loading').show();
}
MaskUtil.unmask = function(){
	$('.loading').hide();
}

// jQuery.fn.fancyZoom = function(options){
// 	// console.log(options)
// 	var _this = this;
// 	if(options.scaleImg){
// 		$('body').append('<img src="'+options.scaleImg+'"/>')
// 	}
// }