var oldPath = "";
/**
 * @param entityId --特定id
 * @param entityName -- 特定id相关名字
 * @param entityField null
 * @param i同一个插件不同id序号
 */
function loadFile(entityId,entityName,entityField,param){
	if(!param){	param='';}
	if(!entityField){	entityField='';}
	$.ajax({
		type : 'post',
		async : false,
		url : basePath + '/comm/webQueryFile.html?entityId='+entityId+'&entityName='+entityName+'&entityField='+entityField,
		dataType : 'json',
		success : function(data) {
			var baseFileEntities = data;
			if(baseFileEntities.length>0){
				 for(var i=0; i < baseFileEntities.length; i++) {
			   		 var name =baseFileEntities[i].path.substring(baseFileEntities[i].path.lastIndexOf("/") + 1, baseFileEntities[i].path.lastIndexOf("."));
			   		 var $str = $(
			   				'<div id="' + name + '">' +
			 	               '<span class="info" style="width:190px;height:19px;margin-left:20px;overflow:auto;">已上传附件：<a href="' +basePath +'/download/file.html?fileName='+baseFileEntities[i].path+'&name='+baseFileEntities[i].fileName+'">'+ baseFileEntities[i].fileName + '</a></span>' +
			 	               '<a style="margin-left:10px; color:red;" url="'+baseFileEntities[i].path+'" fd="'+name+'" onclick="deleteFile(this,\''+param+'\')")>删除</a>' +
			 	           '</div>'
			 	 	    
			 	 	           );
			   		 oldFiles.push(baseFileEntities[i].path);
				 	 $("#wrapper"+param).append($str);
				 }
				 oldPath = baseFileEntities[0].path;
			}

		}
	});
	
};

function deleteFile(obj,param,isSingle) {
	if(!param){	param='';}
	if(!isSingle){	isSingle=false;}
	if(isSingle==false){
		 var v = $("#fileupload_del"+param).val();
		 if(v == "") {
			$("#fileupload_del"+param).val($(obj).attr('url'));
		 } else {
			 $("#fileupload_del"+param).val(v + "," + $(obj).attr('url'));
		 }
		 $('#' + $(obj).attr('fd')).remove();
		 $('#' + $(obj).attr('fd') + 'aa').remove();
	}else{
		$("#fileupload_del"+param).val($(obj).attr('url'));
		$("#wrapper"+param).html("");
		newFileName = "";
	}
}

/**
 * 文件上传公共方法
 * @author wy 2017-12-25
 * 
 * @param $
 */
(function ($) {
	var basic_upload_att = window.basic_upload_att = window.basic_upload_att || {};
	var  ratio = window.devicePixelRatio || 1;
	 //文件上传
	basic_upload_att.fileUpload = function (param,accept,isSingle,size){
		if(!accept){
			 accept = {
					   title: 'intoTypes',
				       extensions: 'doc,docx,xls,xlsx,txt',
				       mimeTypes: '.docx,.doc,.xls,.xlsx,.txt'
			 	   };
		}
		var fileSize = 100*1024*1024;
		if(!param){	param='';}
		if(!size){size="1G";}
		if(size=="1g"||size=="1G"){
			fileSize=1024*1024*1024;
		}
		$('#fileupload'+param).val("");
		$('#fileupload_name'+param).val("");
		$('#fileupload_del'+param).val("");
		if(!isSingle){	isSingle=false;}
		
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
	 	   accept: accept,
	 	   fileSingleSizeLimit :fileSize
	 	 });
	 	
	 	WebUploader.uploader.on("error",function (type){
	        if (type=="Q_TYPE_DENIED"){
	            $.messager.show({
	 				title:'提示消息',
	 				msg:'请上传正确的格式文件！',
	 				  timeout: 2000,  
		                showType: 'slide'
	 			});
	        }else if(type=="F_EXCEED_SIZE"){
	            $.messager.show({
	 				title:'提示消息',
	 				msg:'文件大小不能超过'+size+'！',
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
	                title: '提示消息',  
	                msg: '您已上传该文件!',  
	                timeout: 2000,  
	                showType: 'slide'  
	            });

	 			WebUploader.uploader.removeFile(file, true);
	 			 return;
	 		 }
	 		 var $li = $(
	 				'<div id="' + file.id + '">' +
	 	               '<span class="info" style="width:190px;height:19px;margin-left:20px;overflow:auto;">已上传附件：'+ file.name + '</span>' +
	 	               "<a class='basic_upload_att_close' onclick= basic_upload_att.removeFile('"+file.name+"','"+file.id+"','"+param+"')>删除</a>" + 
	 	           '</div>'
	 	           );
	 		 if(isSingle==false){
	 			 $("#wrapper"+param).append($li);
	 		 }else{
	 			 $("#wrapper"+param).html($li);
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
	 	});
	 	
	 	 // 文件上传成功，给item添加成功class, 用样式标记上传成功。
	 	WebUploader.uploader.on( 'uploadSuccess', function( file ) {	
	 	   $( '#'+file.id ).addClass('upload-state-done');
	 	   
	 	//文件上传成功后，将原文件名追加
	 	   if(isSingle==false){
	 		 var v = $("#fileupload_name"+param).val();
	 		 if(v == "") {
	 			$("#fileupload_name"+param).val(file.name);
	 		 } else {
	 			 $("#fileupload_name"+param).val(v + "," + file.name);
	 		 }
	 	   }else{
	 		  $("#fileupload_name"+param).val(file.name);
	 		  
	 		 if($("#fileupload_del"+param).val()==""){
		 		  $("#fileupload_del"+param).val(oldPath);
		 	   }
	 	   }
	 	   
	 	   
	 	 });


	 	 // 文件上传失败，显示上传出错。
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
	 		 var v = $("#fileupload"+param).val();
	 		 var $div = $(
	 				 '<div id="'+file.file.id+'aa" style="display:none;">' +
	 				 	'<span class="info" style="width:190px;height:19px;margin-left:20px;overflow:auto;">已上传附件：'+ file.name + '</span>' +
	 				 	"<a style='margin-left:10px; color:red;' onclick= basic_upload_att.removeFile('"+file.name+"','"+file.id+"','"+param+"')>删除</a>" + 
	 				 '</div>'
	 		 );
	 		 if(isSingle==false){
		 		 if(v == "") {
		 			$("#fileupload"+param).val(ret.fileName);
		 		 } else {
		 			 $("#fileupload"+param).val(v + "," + ret.fileName);
		 		 }
		 		 $('body').append($div);
		 		 newFiles.push(ret.fileName);
		 		 fileNames[file.file.name] = ret.fileName;
	 		 }else{
	 			$("#fileupload"+param).val(ret.fileName);
		 		$('body').append($div);
		 		fileNames={};
		 		fileNames[file.file.name] = ret.fileName;
		 		newFileName = ret.fileName;
	 		 }
	 	 });
	 	 
	 }
	 
	 //点击查看上传的图片
	basic_upload_att.getFile=function (fileName) {
		 //查询到上传的图片的名称
		 fileName = fileNames[fileName];
		 if (!fileName) {
			 $.messager.show({
	 				title:'提示消息',
	 				msg:'附件没上传成功！',
	 				  timeout: 2000,  
		                showType: 'slide'
	 			});

			 return;
		 }
	 };
	 //删除的文件
	  basic_upload_att.removeFile=function(name, id, param) {
		 var params = {"fileName":fileNames[name]};
		 var names=$("#fileupload_name"+param).val().split(",");
		 var fileupload=$("#fileupload"+param).val().split(",");
		//从已添加的文件中移除
		for ( var i in fileNames) {
			if (i == name) {
				//剔除删除的文件名
				names = $.grep(names, function(value) {
					 return value != i;
					});
				//剔除删除的文件路径
				fileupload = $.grep(fileupload, function(value) {
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
		$('#fileupload'+param).val(fileupload.join(','));
		$('#fileupload_name'+param).val(names.join(','));
		$('#' + id).remove();
		}
	 };
})(jQuery);