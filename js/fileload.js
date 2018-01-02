function showdialog(file,fileshow,booleans){
	if(booleans === true){
			var getdialog = $('#'+file);
			// getdialog.html('');
			$('.fileloadmasking').fadeIn();
			getdialog.fadeIn();
			var dialogcon = '';
			dialogcon += '<div class="dialogtitle">上传图片<a class="closedialog" onclick="closedialog(\''+file+'\',\''+fileshow+'\')"></a></div>';
			dialogcon += '<div class="inputbtn"><span class="padr20">图片上传</span><div class="fileload">请选择图片<input type="file" onchange="getFile(this,\''+file+'\',\''+fileshow+'\')" accept="image/*"></div><span class="filename"></span></div>';
			dialogcon += '<div class="areashow"><div class="picshowarea"><img src=""/></div><div class="smallpic"><div class="picbeforeshow"></div><p>图片预览区域</p></div></div>';
			dialogcon += '<div class="operate">';
			dialogcon += '<button class="btns leftromate" onclick="leftromate()"><span class="icon"></span><span>向左旋转</span></button>';
			dialogcon += '<button class="btns rightromate" onclick="rightromate()"><span class="icon"></span><span>向右旋转</span></button>';
			dialogcon += '<button class="btns bigger" onclick="bigger()"><span class="icon"></span><span>放大</span></button>';
			dialogcon += '<button class="btns smaller" onclick="smaller()"><span class="icon"></span><span>缩小</span></button>';
			dialogcon += '<button class="btns resert" onclick="resert()"><span class="icon"></span><span>重置</span></button>';
			// dialogcon += '<button class="btns download" onclick="download()"><span class="icon"></span><span>下载</span></button>';
			dialogcon += '<button type="button" class="btns savebtn" onclick="savebtnOriginal(\''+file+'\',\''+fileshow+'\')"><span class="icon"></span><span>保存原图</span></button>';
			dialogcon += '<button class="btns savebtn savebtns" onclick="getCanvas(this,\''+fileshow+'\',\''+file+'\')"  data-method="getCroppedCanvas" data-option="{ &quot;maxWidth&quot;: 4096, &quot;maxHeight&quot;: 4096 }"><span class="icon"></span><span>保存</span></button>';
			dialogcon += '</div>';
			getdialog.html(dialogcon);
	}else{
		var getdialogmore = $("#"+file);
		$('.fileloadmasking').fadeIn();
		getdialogmore.fadeIn();
		var moreStr ='';
		// var moreStr = '<input type="file"  name="file" id="doc" multiple="multiple"  style="width:150px;" onchange="javascript:setImagePreviews();" accept="image/*" />';
		moreStr     += '<div class="dialogtitle">上传图片<a class="closedialog" onclick="closedialog(\''+file+'\',\''+fileshow+'\')"></a></div>';
		moreStr	    += '<div class="inputbtn"><span class="padr20">图片上传</span><div class="fileload"><span>请选择图片</span><span id="'+file+'btn'+'"><input type="file" name="file" id="input'+file+'" multiple="multiple" onchange="setImagePreviews(this,\''+file+'\',\''+fileshow+'\')" accept="image/*"></span></div><span class="filename"></span></div>';
		moreStr     += '<div class="imgShow clearfix"></div>';
		moreStr     += '<button class="btns savebtn savebtns" onclick="morePicsave(this,\''+fileshow+'\',\''+file+'\')"><span class="icon"></span><span>保存</span></button>';
		getdialogmore.html(moreStr);
	}
}

		function getFile(node,name,filsw){
			var filemaxsize = 1024 * 5;//5M
			var filename = node.value;
			var filetype = node.files[0].type;
			var Size = node.files[0].size / 1024;
			if(Size > filemaxsize) {
				alert('图片过大，请重新选择!');
				return false;
			}
			if(!filetype.match(/image.*/)) {
					alert('请选择正确的图片!')
				} else {
					teststr = filename;
					var fileNewname = $('#'+name).find('.filename');
					var testend = teststr.match(/[^\\]+\.[^\(]+/i); //直接完整文件名的
					fileNewname.text(testend);//附图片名字
					getImgURL(node,name,filsw);
				}
		}


		function getImgURL(node,m,filsw) {    
		    var imgURL = "";
		    try{     
		        var file = null;  
		        if(node.files && node.files[0] ){  
		            file = node.files[0];   
		        }else if(node.files && node.files.item(0)) {                                  
		            file = node.files.item(0);     
		        }     
		        //Firefox 因安全性问题已无法直接通过input[file].value 获取完整的文件路径  
		        try{  
		            //Firefox7.0   
		            imgURL =  file.getAsDataURL();    
		            //alert("//Firefox7.0"+imgRUL);                           
		        }catch(e){  
		            //Firefox8.0以上                                
		            imgRUL = window.URL.createObjectURL(file);  
		            //alert("//Firefox8.0以上"+imgRUL);  
		        }  
		     }catch(e){                 
		        //支持html5的浏览器,比如高版本的firefox、chrome、ie10  
		        if (node.files && node.files[0]) {                            
		            var reader = new FileReader();   
		            reader.onload = function (e) {                                        
		                imgURL = e.target.result;    
		            };  
		            reader.readAsDataURL(node.files[0]);   
		        }    
		     }  
		    getpic(imgRUL,m);
		    $(filsw).find('img').attr('original',imgRUL);
		    return imgURL;  
		}
		var pimg;
		var image;
		function getpic(url,filesh){
			getImg = $('#'+filesh).find('.picshowarea').empty().append('<img id="'+filesh+'0'+'" src=""/>').find('img')[0];
			pimg = $('#'+filesh).find('.picbeforeshow');
			getImg.src = url;
			var imgId = getImg.id
			image = getImg;
			var $image = $(getImg);
			var options = {
		        aspectRatio: 'Free',
		        preview: pimg.selector
		    };
		   $image.cropper(options);
		}

		function leftromate(){$(image).cropper('rotate',-90)}
		function rightromate(){$(image).cropper('rotate',90)}
		function smaller(){$(image).cropper('zoom',-0.1)}
		function bigger(){$(image).cropper('zoom',0.1)}
		function resert(){$(image).cropper('reset')}
		// 关闭弹框
		function closedialog(close,closeshow){
			$(closeshow).find('img').attr('value','');
			$('#'+close).fadeOut();
			$('.fileloadmasking').fadeOut();
		}
		
		var uploadedImageType = 'image/jpeg';
		var uploadedImageURL;
		function getCanvas(e,fshow,close){
			var $img = $(image);
			var $this = $(e);
			var data = $this.data();
			var cropper = $img.data('cropper');
		    var cropped;
		    var $target;
		    var result;

		    if (cropper && data.method) {
		      data = $.extend({}, data); // Clone a new one

		      if (typeof data.target !== 'undefined') {
		        $target = $(data.target);

		        if (typeof data.option === 'undefined') {
		          try {
		            data.option = JSON.parse($target.val());
		          } catch (e) {
		            console.log(e.message);
		          }
		        }
		      }

		      cropped = cropper.cropped;

		      switch (data.method) {
		        case 'getCroppedCanvas':
		          if (uploadedImageType === 'image/jpeg') {
		            if (!data.option) {
		              data.option = {};
		            }

		            data.option.fillColor = '#fff';
		          }

		          break;
		      }
		      result = $img.cropper(data.method, data.option, data.secondOption);
		      uploadedImageURL = result.toDataURL(uploadedImageType);
		       // 上传图片到服务器
		      imgUpload(uploadedImageURL);

		      switch (data.method) {
		        case 'getCroppedCanvas':
		          if (result) {
		            $(fshow).find('img').attr('src', result.toDataURL(uploadedImageType));
		          }
		          break;
		      }

		    }
		    // console.log();return
		    if(result == undefined || result ==''){alert('请上传图片');return}
		    if($(fshow).find('a').length == 0){
				$(fshow).append('<a class="removePic" onclick="removePic(this,\''+fshow+'\')">x</a>');
		    }else{
		    	$(fshow).find('a').remove();
		    	$(fshow).append('<a class="removePic" onclick="removePic(this,\''+fshow+'\')">x</a>')
		    }
			$('#'+close+',.fileloadmasking').fadeOut();
		    
		}

		// 保存原图
		function savebtnOriginal(mo,fd) {
			var osrc = $(fd).find('img').attr('original');
			$(fd).find('img').attr('src',osrc);
			if(osrc == undefined || osrc == ''){alert('请上传图片');return}
			imgUpload(osrc);//保存原图
			if($(fd).find('a').length == 0){
				$(fd).append('<a class="removePic" onclick="removePic(this,\''+fd+'\')">x</a>');
		    }else{
		    	$(fd).find('a').remove();
		    	$(fd).append('<a class="removePic" onclick="removePic(this,\''+fd+'\')">x</a>')
		    }
		    $('#'+mo+',.fileloadmasking').fadeOut();
		}

		function removePic(e,picr){
			$(e).remove();
			$(picr).find('img').attr('src','');
			$(picr).find('img').attr('original','');
		}



// 多张
var indexpic = 0;
function setImagePreviews(docObj,avalue,showid) {
        var imgShow = $('#'+avalue).find('.imgShow')[0];
        var filemaxsize = 1024 * 5;//5M
        var fileList = docObj.files;
        var picsrc = [];//获取图片路径
        var imgspic = $('#'+avalue).find('.textname');
        var picname =[];
        for (var i = 0; i < fileList.length; i++) {  
        	var filetype = docObj.files[i].type;
        	var fileNames = filetype.substring(6);
			var Size = docObj.files[i].size / 1024;
			if(Size > filemaxsize) {
				alert('图片过大，请重新选择!');
				return false;
			}
			indexpic++;
			// 验证重复图片
			for (var j = 0; j < imgspic.length; j++) {
				if(imgspic[j].title == docObj.files[i].name){
					$('#'+avalue).find('#input'+$('#'+avalue).attr('id')).val()
					alert('你已上传该图片，请重新上传！');
					return false;
				}
			}
            // 验证图片类型
			if(fileNames !="jpg" && fileNames !="jpeg" && fileNames !="pdf" && fileNames !="png" && fileNames !="dwg" && fileNames !="gif") {
				$('#'+avalue).find('#input'+$('#'+avalue).attr('id')).val()
				alert("请选择图片格式文件上传(jpg,png,gif,dwg,pdf,gif等)！");
				return;
			}
			//通过验证后执行添加图片
			var childrenStr = "<div class='imgPics' > <img id='img" + avalue+indexpic + "'/><span class='textname' id='text" + avalue+indexpic + "'></span><a class='removePic' onclick='closeThisPic(this,"+avalue+")'>x</a></div>";
            $(imgShow).append(childrenStr);
			var imgObjPreview = document.getElementById("img"+avalue+indexpic);
            var imgObjtext = document.getElementById("text"+avalue+indexpic);
            var fileNewname = $(imgObjtext);
			fileNewname.text(docObj.files[i].name);//附图片名字
			picname.push(docObj.files[i].name);
			fileNewname.attr('title',docObj.files[i].name);//附图片名字

            if (docObj.files && docObj.files[i]) {
                //火狐下，直接设img属性
                imgObjPreview.style.display = 'block';
                imgObjPreview.style.width = '150px';
                imgObjPreview.style.height = '120px';
                // imgObjPreview.style.height = '180px';
                //imgObjPreview.src = docObj.files[0].getAsDataURL();
                //火狐7以上版本不能用上面的getAsDataURL()方式获取，需要一下方式
                imgObjPreview.src = window.URL.createObjectURL(docObj.files[i]);
                picsrc.push(window.URL.createObjectURL(docObj.files[i]));
            }else {
                //IE下，使用滤镜
                docObj.select();
                var imgSrc = document.selection.createRange().text;
                // alert(imgSrc)
                var localImagId = document.getElementById("img" +avalue+ i);
                //必须设置初始大小
                localImagId.style.width = "150px";
                // localImagId.style.height = "180px";
                //图片异常的捕捉，防止用户修改后缀来伪造图片
                try {
                    localImagId.style.filter = "progid:DXImageTransform.Microsoft.AlphaImageLoader(sizingMethod=scale)";
                    localImagId.filters.item("DXImageTransform.Microsoft.AlphaImageLoader").src = imgSrc;
                }
                catch (e) {
                    alert("您上传的图片格式不正确，请重新选择!");
                    return false;
                }
                imgObjPreview.style.display = 'none';
                document.selection.empty();
            }
        }  
        $('#'+avalue).find('#input'+$('#'+avalue).attr('id')).val()
        $(showid).find('img').attr('value',picsrc);
        $(showid).find('img').attr('name',picname);
        return true;
    }

function closeThisPic(e,id){
	$(e).parent().remove();
}

function morePicsave(e,id,id2){
		var picsrc = $(id).find('img').attr('value');
		// var ulstrn = $(id).find('img').attr('name');
		// var ulstrname = ulstrn.split(",")
		if(picsrc == undefined || picsrc ==''){alert('请上传图片');return}
		$(id).find('.showi').html($('#'+id2).find('.imgShow'));
        imgUpload(picsrc);
         $('#'+id2+',.fileloadmasking').fadeOut();

}
function closepic(e){
	$(e).parent().remove()
}
/**
 * 图片上传方法
 */
function imgUpload(addFilePath){
	$("#addFilePaths").val(""); // 上传的文件路径
	$("#addFileNames").val(""); // 上传的文件名
	$("#delFilePaths").val(""); // 旧文件路径，需要删除的文件
	$.ajax({
		url: basePath+"/fileUpload/addImgUpload.html",
		type: "POST",	
		dataType : 'json',
		data: {"addFilePath":addFilePath},
		success:function(data){
			if(data != null){
				if(data.success = true){
					$("#addFilePaths").val(data.fileName);
				}
			}
		}
	});
}



