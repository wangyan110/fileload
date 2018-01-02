$(function(){
	$('a.menu_action').click(function(){
		var tabTitle = $(this).text();

		var url = $(this).attr("href");

		addTab(tabTitle,url);
		$('a').removeClass("selected");
		$(this).addClass("selected");
		return false;
	});
	
	$('#tabs').tabs({
        onSelect: function (title) {
            var currTab = $('#tabs').tabs('getTab', title);
            var iframe = $(currTab.panel('options').content);

			var src = iframe.attr('src');
			if(src){
				//$('#tabs').tabs('update', { tab: currTab, options: { content: createFrame(src)} });
			}
        }
    });

});
function addTab(subtitle,url){
	if(!$('#tabs').tabs('exists',subtitle)){
		$('#tabs').tabs('add',{
			title:subtitle,
			content:createFrame(url),
			closable:true,
			fit:true,
			border:false
		});
	}else{
		$('#tabs').tabs('select',subtitle);
	}
	tabClose();
}

function createFrame(url)
{
	var s = '<iframe scrolling="auto" frameborder="0"  src="'+url+'" style="width:100%;height:100%;"></iframe>';
	return s;
}


	//退出
	$("#mm-exit").click(function(){
		$('#tabsMenu').menu('hide');
	});


//弹出信息窗口 title:标题 msgString:提示信息 msgType:信息类型 [error,info,question,warning]
function msgShow(title, msgString, msgType) {
	$.messager.alert(title, msgString, msgType);
}
