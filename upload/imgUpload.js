var basePath='${basePath}';
var fileNames = {};
var width = window.screen.width/3;
var height = window.screen.height/3;
var oldFiles = [];  
var newFiles = [];
var acceptDoc = {//文档文件
				   title: 'intoTypes',
			       extensions: 'doc,docx,xls,xlsx,txt',
			       mimeTypes: '.docx,.doc,.xls,.xlsx,.txt'
		 	   };
		 	   
var acceptAutio = {//音频文件
	 		   title: 'intoTypes',
		       extensions: 'CD,OGG,MP3,ASF,WAV,MP3PRO,RM,REAL,APE,MODULE,MIDI,VQF',
		       mimeTypes: '.CD,.OGG,.MP3,.ASF,.WAV,.MP3PRO,.RM,.REAL,.APE,.MODULE,.MIDI,.VQF'
	 	   };
	 	   
var acceptExcel = {//表格
		 		   title: 'intoTypes',
			       extensions: 'xls,xlsx',
			       mimeTypes: '.xls,.xlsx'
		 	   };
		 	   
		 	   
var acceptVideo = {//视频文件
	 		   title: 'intoTypes',
		       extensions: 'AVI, wma, rmvb,rm, flash,mp4,mid,3GP',
		       mimeTypes: '.AVI, .wma, .rmvb,.rm, .flash,.mp4,.mid,.3GP'
	 	   };
	 	   
var acceptZip = {//压缩文件
	 		   title: 'intoTypes',
		       extensions: 'rar,zip,tar,cab,uue,jar,iso,z,7-zip,ace,lzh,arj,gzip,bz2,exe',
		       mimeTypes: '.rar,.zip,.tar,.cab,.uue,.jar,.iso,.z,.7-zip,.ace,.lzh,.arj,.gzip,.bz2,.exe'
	 	   };
	 	   
var acceptNoImg = {//压缩文件
	 		   title: 'intoTypes',
		       extensions: 'doc,docx,xls,xlsx,txt,CD,OGG,MP3,ASF,WAV,MP3PRO,RM,REAL,APE,MODULE,MIDI,VQF,AVI, wma, rmvb,rm, flash,mp4,mid,3GP,rar,zip,tar,cab,uue,jar,iso,z,7-zip,ace,lzh,arj,gzip,bz2,exe',
		       mimeTypes: '.docx,.doc,.xls,.xlsx,.txt,.CD,.OGG,.MP3,.ASF,.WAV,.MP3PRO,.RM,.REAL,.APE,.MODULE,.MIDI,.VQF,.AVI, .wma, .rmvb,.rm, .flash,.mp4,.mid,.3GP,.rar,.zip,.tar,.cab,.uue,.jar,.iso,.z,.7-zip,.ace,.lzh,.arj,.gzip,.bz2,.exe'
	 	   };


/**
 * @param entityId --特定id
 * @param entityName -- 特定id相关名字
 * @param entityField null
 * @param i同一个插件不同id序号
 */
function loadFile_img(entityId,entityName,entityField,param){
	if(!entityField){entityField='';}
	if(!param){	param='';}
	$.ajax({
		type : 'post',
		async : false,
		url : basePath + '/comm/webQueryFile.html?entityId='+entityId+'&entityName='+entityName+'&fileType=3&entityField='+entityField,
		dataType : 'json',
		success : function(data) {
			var baseFileEntities = data;
			if(baseFileEntities){
				 for(var i=0; i < baseFileEntities.length; i++) {
				 var name = baseFileEntities[i].path.substring(baseFileEntities[i].path.lastIndexOf("/") + 1, baseFileEntities[i].path.lastIndexOf("."));
				 var url = basePath + '/download/file.html?fileName=' + baseFileEntities[i].path+'&name='+baseFileEntities[i].fileName;
				 var $str = $(
				           '<div id="' + name + '" class="file-item thumbnail">' +
				           	   '<a href="#'+name+'aa">' +
				           	   	'<img src="'+url+'" id="'+ name +'"  width="120"  height="120px;"/>' +
				           	   '</a>' +
				               '<div class="info">' + baseFileEntities[i].fileName + '</div>' +
				               '<span style="width:20px" class="error" url="'+baseFileEntities[i].path+'" fd="'+name+'" onclick="deleteFile_img(this,\''+param+'\')">×</span>' +
				           '</div>' 
				           );
				 // $str.find('a').fancyZoom({scaleImg: true, closeOnClick: false});
				 var $div = $(
							 '<div id="'+name+'aa" style="display:none;">' +
							 	'<img src="'+url+'" style="width:'+width+'px;height:'+height+'px;" alt="图片不能浏览">' +
							 '</div>'
					 );
				 	$("#wrapper"+param).append($str);
				 	$('body').append($div);
				 }
				}
			}
		});
	};
	
	
	
/**
 * 删除附件
 * @param obj
 */
function deleteFile_img(obj,param) {
	if(!param){param='';}
	 var v = $("#photo_del"+param).val();
	 if(v == "") {
		$("#photo_del"+param).val($(obj).attr('url'));
	 } else {
		 $("#photo_del"+param).val(v + "," + $(obj).attr('url'));
	 }
	$('#' + $(obj).attr('fd')).remove();
	$('#' + $(obj).attr('fd') + 'aa').remove();
}


/**
 * 文件上传公共方法
 * @author wy 2017-12-26
 * 
 * @param $
 */
(function ($) {
	var basic_upload = window.basic_upload = window.basic_upload || {};
	var  ratio = window.devicePixelRatio || 1;
	 //文件上传
	basic_upload.imgUpload = function (param){
		if(!param){	param='';}
		$('#photo'+param).val("");
		$('#photo_name'+param).val("");
		$('#photo_del'+param).val("");
		$("#wrapper"+param).css({
			  "float":"left",
			  "max-width":"70%"
			  });
	 	 // 缩略图大小
	 	 thumbnailWidth = 100 * ratio,
	 	 thumbnailHeight = 100 * ratio,
	 	   // Web Uploader实例
	 	WebUploader.uploader;
	 	 // 初始化Web Uploader
	 	WebUploader.uploader = WebUploader.create({
	 	   // 自动上传。
	 	   auto: true,
	 	   // swf文件路径
	 	   swf:basePath+'/upload/Uploader.swf',
	 	   // 文件接收服务端。
	 	   server: basePath+'/comm/webuploaderUpload.html',
	 	   // 选择文件的按钮。可选。
	 	   // 内部根据当前运行是创建，可能是input元素，也可能是flash.
	 	   pick: {
	 	   	id:'#filePicker'+param,
	 	   	multiple:true
	 	   },
	 	   compress:false,
	 	   duplicate:true,
	 	   // 只允许选择文件，可选。
	 	   accept: {
	 	       title: 'Images',
	 	       extensions: 'gif,jpg,jpeg,bmp,png',
	 	       mimeTypes: 'image/*'
	 	   },
	 	  fileSingleSizeLimit :10*1024*1024
	 	 });
	 	  
	 	WebUploader.uploader.on("error",function (type){
	        if (type=="Q_TYPE_DENIED"){
	            $.messager.show({
	 				title:'提示消息',
	 				msg:'请上传gif,jpg,jpeg,bmp,png格式文件！',
	 				  timeout: 2000,  
		                showType: 'slide'
	 			});
	        }else if(type=="F_EXCEED_SIZE"){
	            $.messager.show({
	 				title:'提示消息',
	 				msg:'文件大小不能超过10M！',
	 				  timeout: 2000,  
		                showType: 'slide'
	 			});
	        }
	    });
	 	 // 当有文件添加进来的时候
	 	WebUploader.uploader.on( 'fileQueued', function( file ) {
	 		//判断文件是否已添加
	 		 if(fileNames[file.name] != null) {
	 			
	 			$.messager.show({
	 				title:'提示消息',
	 				msg:'您已上传该文件！',
	 				  timeout: 2000,  
		                showType: 'slide'
	 			});

	 			WebUploader.uploader.removeFile(file, true);
	 			 return;
	 		 }
	 		 var $li = $(
	 	           '<div id="' + file.id + '" class="file-item thumbnail">' +
	 	           	   '<a href="#'+file.id+'aa">' +
	 	           	   	'<img id="img'+ file.id +'" width="120" onclick=basic_upload.getFile("'+file.name+'")>' +
	 	           	   '</a>' +
	 	               '<div class="info">' + file.name + '</div>' +
	 	               '<span style="width:20px" class="error" onclick= basic_upload.removeFile("'+file.name+'","'+file.id+'","'+param+'")>×</span>' +
	 	           '</div>' 
	 	           ),
	 	     $img = $li.find('img');
	 		 $li.find('a').fancyZoom({scaleImg: true, closeOnClick: false});
	 		 $("#wrapper"+param).append($li);
	 		 // 创建缩略图
	 		WebUploader.uploader.makeThumb( file, function( error, src ) {
	 	       if ( error ) {
	 	           $img.replaceWith('<span>不能预览</span>');
	 	           return;
	 	       }
	 	       $img.attr( 'src', src );
	 		 }, thumbnailWidth, thumbnailHeight );
	 	 });
	 	 // 文件上传成功，给item添加成功class, 用样式标记上传成功。
	 	WebUploader.uploader.on( 'uploadSuccess', function( file ) {	
	 	    $( '#'+file.id ).addClass('upload-state-done');
	 	    //文件上传成功后，将原文件名追加
	 		 var v = $("#photo_name"+param).val();
	 		 if(v == "") {
	 			$("#photo_name"+param).val(file.name);
	 		 } else {
	 			 $("#photo_name"+param).val(v + "," + file.name);
	 		 }
	 	 });


		
	 	WebUploader.uploader.on('uploadProgress', function (file, percentage) {//进度条事件
	 		MaskUtil.mask();//遮罩
	            var $li =  $( '#'+file.id ),
	                $percent = $li.find('.progress .bar');
	 
	            // 避免重复创建
	            if (!$percent.length) {
	                $percent = $('<span class="progress">' +
	                    '<span  class="percentage"><span class="text"></span>' +
	                  '<span class="bar" role="progressbar" style="width: 0%">' +
	                  '</span></span>' +
	                '</span>').appendTo($li).find('.bar');
	            }
	 
	            $li.find('div.state').text('上传中');
	            $li.find(".text").text(Math.round(percentage * 100) + '%');
	            $percent.css('width', percentage * 100 + '%');
	        });
	 	WebUploader.uploader.on('uploadComplete', function (file) {//全部完成事件
	 		$( '#'+file.id ).find('.progress').fadeOut();
	 		MaskUtil.unmask();//遮罩
	 		var fp = $("#" + opts.hiddenInputId);
	 		fp.val(JSON.stringify(jsonData));
	 		opts.onAllComplete(jsonData.fileList);
	 	});
	 	
	 	
	 	 // 文件上传失败，现实上传出错。
	 	WebUploader.uploader.on( 'uploadError', function( file ) {
	 	   var $li = $( '#'+file.id ),
	 	       $error = $li.find('div.error');

	 	   // 避免重复创建
	 	   if ( !$error.length ) {
	 	       $error = $('<div class="error"></div>').appendTo( $li );
	 	   }

	 	   $error.text('上传失败');
	 	 });
	 	

	 	WebUploader.uploader.on( 'uploadAccept', function( file, ret ) {
	 		 if (!ret.fileName) {

	 			$.messager.show({
	 				title:'提示消息',
	 				msg:'上传该文件出错了！',
	 				  timeout: 2000,  
		                showType: 'slide'
	 			});
	 			
	 			$('#'+file.file.id).remove();
	 			return;
	 		 }
	 		 var url = basePath + "/comm/getFilePhoto.html?fileName=" + ret.fileName;
	 		 var width = window.screen.width/3;
	 			 height = window.screen.height/3;
	 		 var $div = $(
	 				 '<div id="'+file.file.id+'aa" style="display:none;">' +
	 				 	'<img src="'+url+'" style="width:'+width+'px;height:'+height+'px;" alt="图片不能浏览">' +
	 				 '</div>'
	 		 );
	 		 var v = $("#photo"+param).val();
	 		 if(v == "") {
	 			$("#photo"+param).val(ret.fileName);
	 		 } else {
	 			 $("#photo"+param).val(v + "," + ret.fileName);
	 		 }
	 		$('body').append($div);
	 		newFiles.push(ret.fileName);
	 		fileNames[file.file.name] = ret.fileName;
	 	 });
	 	 
	 }
	 
	 //点击查看上传的图片
	basic_upload.getFile=function (fileName) {
		 //查询到上传的图片的名称
		 fileName = fileNames[fileName];
		 if (!fileName) {
 			$.messager.show({
 				title:'提示消息',
 				msg:'图片没上传成功!',
 				  timeout: 2000,  
	                showType: 'slide'
 			});
			 return;
		 }
	 };
	 //删除删除的文件    
	  basic_upload.removeFile=function(name, id,param) {
		 var params = {"fileName":fileNames[name]};
		 var photo_names=$("#photo_name"+param).val().split(",");
		 var photo=$("#photo"+param).val().split(",");
		//从已添加的文件中移除
		for ( var i in fileNames) {
			if (i == name) {
				//将文件名剔除
				photo_names = $.grep(photo_names, function(value) {
					 return value != i;
					});
				//将文件路径剔除
				photo = $.grep(photo, function(value) {
					 return value != fileNames[i];
					});
				delete fileNames[i];
				
			} 
		}
		var flag = true;
		//发生ajax删除请求
		$.ajax({
			type : 'post',
			async : false,
			url : basePath+'/comm/deleteUpload.html',
			dataType : 'json',
			data : params,
			success : function(data) {
				if (data.success == false) {
					flag = false;
					
					$.messager.show({
		 				title:'提示消息',
		 				msg:data.msg,
		 				  timeout: 2000,  
			                showType: 'slide'
		 			});
					
				}
			}
		});
		if (flag) {
		$('#photo'+param).val(photo.join(','));
		$('#photo_name'+param).val(photo_names.join(','));
		$('#' + id).remove();
		$('#' + id + 'aa').remove();
		}
	 }  
	
})(jQuery);