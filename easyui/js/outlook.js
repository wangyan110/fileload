Array.prototype.remove=function(obj) {   
    for(var i =0;i <this.length;i++){   
        var temp = this[i];   
        if(!isNaN(obj)){   
            temp=i;   
        }   
        if(temp == obj){   
            for(var j = i;j <this.length;j++){   
                this[j]=this[j+1];   
            }   
            this.length = this.length-1;   
        }      
    }   
};
 
Array.prototype.remove=function(dx) {
	if(isNaN(dx)||dx>this.length) {
		return false;
	}
	for(var i=0,n=0;i<this.length;i++)
	{
		if(this[i]!=this[dx])
		{
			this[n++]=this[i];
		}
	}
	this.length-=1;
};

$(function() {
	
    tabClose();
    tabCloseEven();
    //导航菜单点击切换
   $('#css3menu a').click(function() {
        $('#css3menu a').removeClass('active');
        $('#css3menu li').removeClass('active');
        $(this).addClass('active');
        $(this).parent().addClass('active');
        var d = _menus[$(this).attr('name')];
        Clearnav();
        addNav(d);
        InitLeftMenu();
    });
   
    // 导航菜单绑定初始化
    $("#wnav").accordion({
        animate: true
    });
    
    //初使化a active
    if(_menus != null) {
	    var firstMenuName = $('#css3menu a.active').attr('name');
	    if(firstMenuName != null && firstMenuName != '') {
	    	addNav(_menus[firstMenuName]); //首次加载basic 左侧菜单
	    } else {
	    	  var firstMenuName = $('#css3menu a:first').attr('name');
	    	  addNav(_menus[firstMenuName]); //首次加载basic 左侧菜单
	    }
    }
	InitLeftMenu();
});

function Clearnav() {
    do {
    	try{
    		var pp = $('#wnav').accordion('panels');
    		for(var i=0; i<pp.length; i++) {
        		var index = $('#wnav').accordion('getPanelIndex', pp[i]);
    	    	$('#wnav').accordion('remove', index);
        	}
    	} catch(e) {}
    } while(pp.length > 0);
}

function GetMenuList(data, menulist) {
    if (data.menus == null) {
        return menulist;
    } else {
        menulist += '';
        $.each(data.menus, function(i, sm) {
            if (sm.menuUrl != null) {
                menulist += '<li ><a ref="' + sm.menuSysId +  '" href="javascript:addTab(\''+sm.menuName +'\', \'' + sm.menuUrl + '\', \''+sm.menuIcon+'\');\" rel="' + sm.menuUrl + '" ><span class="nav">' + sm.menuName + '</span></a></li>';
            }
            else {
                menulist += '<li state="close"><span class="nav">' + sm.menuName + '</span></li>';
            }
            menulist = GetMenuList(sm, menulist);
        });
    }
    return menulist;
}

//左侧导航加载
function addNav(data) {
    $.each(data, function(i, sm) {
        var menulistChilds = "";
        //sm 常用菜单  邮件 列表
        menulistChilds = GetMenuList(sm, menulistChilds);
        var menulist = "<ul id='" + sm.menuName + "' class='easyui-tree' animate='true' dnd='true'>" + menulistChilds + "</ul>"; 
        $('#wnav').accordion('add', {
        	selected: true,
            title: sm.menuName,
            content: menulist,
            iconCls: 'icon ' + sm.menuIcon
        });
    });
    var pp = $('#wnav').accordion('panels');
    if(pp.length > 1) {
	    var t = pp[0].panel('options').title;
	    $('#wnav').accordion('select', t);
    }
}

// 初始化左侧
function InitLeftMenu() {
    hoverMenuItem();
}

/**
* 菜单项鼠标Hover
*/
function hoverMenuItem() {
    $(".easyui-accordion").find('a').hover(function() {
        $(this).parent().addClass("hover");
    }, function() {
        $(this).parent().removeClass("hover");
    });
}

// 获取左侧导航的图标Tab
function getIcon(menuSysId) {
    var icon = 'icon ';
    $.each(_menus, function(i, n) {
        $.each(n, function(j, o) {
            $.each(o.menus, function(k, m) {
                if (m.menuSysId == menuSysId) {
                    icon += m.menuIcon;
                    return false;
                }
            });
        });
    });
    return icon;
}

function addTab(subtitle, url, icon) {
    if (!$('#tabs').tabs('exists', subtitle)) {
        $('#tabs').tabs('add', {
            title: subtitle,
            content: createFrame(url, subtitle),
            closable: true,
            icon: icon
        });
    } else {
        $('#tabs').tabs('select', subtitle);
        $('#mm-tabupdate').click();
    }
    tabClose();
}

function getTab(subtitle) {
	 return $('#tabs').tabs('getTab', subtitle);
}

function getSelected() {
	 return $('#tabs').tabs('getSelected');
}

function getTabIndex(tab) {
	 return $('#tabs').tabs('getTabIndex',tab);
}

function tabFefresh(tab, url) {
	$(tab).panel('refresh', "'" + url + "'");
}

function createFrame(url, subtitle) {
    var s = '<iframe name="'+subtitle+'" scrolling="auto" frameborder="0"  src="' + url + '" style="width:100%;height:100%;"></iframe>';
    return s;
}

//关闭指定tab
function tabTitleClose(subtitle){
	$('#tabs').tabs('close', subtitle);
}

function tabClose() {
    /* 双击关闭TAB选项卡 */
    $(".tabs-inner").dblclick(function() {
        var subtitle = $(this).children(".tabs-closable").text();
        $('#tabs').tabs('close', subtitle);
    });
    /* 为选项卡绑定右键 */
    $(".tabs-inner").bind('contextmenu', function(e) {
        $('#tabsMenu').menu('show', {
            left: e.pageX,
            top: e.pageY
        });

        var subtitle = $(this).children(".tabs-closable").text();

        $('#tabsMenu').data("currtab", subtitle);
        $('#tabs').tabs('select', subtitle);
        return false;
    });
}
// 绑定右键菜单事件
function tabCloseEven() {
    // 刷新
    $('#mm-tabupdate').click(function() {
        var currTab = $('#tabs').tabs('getSelected');
        var url = $(currTab.panel('options').content).attr('src');
        if(url == null || url == "" || url == undefined){
        	return;
        }else{
        	$('#tabs').tabs('update', {
                tab: currTab,
                options: {
                    content: createFrame(url)
                }
            });
        }
    });
    // 关闭当前
    $('#mm-tabclose').click(function() {
        var currtab_title = $('#tabsMenu').data("currtab");
        $('#tabs').tabs('close', currtab_title);
    });
    // 全部关闭
    $('#mm-tabcloseall').click(function() {
        $('.tabs-inner span').each(function(i, n) {
        	if(i!=0){
	    		var t = $(n).text();
	            $('#tabs').tabs('close', t);
        	}
           
        });
    });
    // 关闭除当前之外的TAB
    $('#mm-tabcloseother').click(function() {
        $('#mm-tabcloseright').click();
        $('#mm-tabcloseleft').click();
    });
    // 关闭当前右侧的TAB
    $('#mm-tabcloseright').click(function() {
        var nextall = $('.tabs-selected').nextAll();
        if (nextall.length == 0) {
            return false;
        }
        nextall.each(function(i, n) {
            var t = $('a:eq(0) span', $(n)).text();          
            $('#tabs').tabs('close', t);
        });
        return false;
    });
    // 关闭当前左侧的TAB
    $('#mm-tabcloseleft').click(function() {
        var prevall = $('.tabs-selected').prevAll();
        if (prevall.length == 0) {
            return false;
        }
        prevall.each(function(i, n) {
        	if($(n).find(".tabs-close").length>0){
        		var t = $('a:eq(0) span', $(n)).text();
                $('#tabs').tabs('close', t);
        	}            
        });
        return false;
    });

    // 退出
    $("#mm-exit").click(function() {
        $('#tabsMenu').menu('hide');
    });
}

// 弹出信息窗口 title:标题 msgString:提示信息 msgType:信息类型 [error,info,question,warning]
function msgShow(title, msgString, msgType) {
    $.messager.alert(title, msgString, msgType);
}

// 本地时钟
function clockon() {
    var now = new Date();
    var year = now.getFullYear(); // getFullYear getYear
    var month = now.getMonth();
    var date = now.getDate();
    var day = now.getDay();
    var hour = now.getHours();
    var minu = now.getMinutes();
    var sec = now.getSeconds();
    var week;
    month = month + 1;
    if (month < 10)
        month = "0" + month;
    if (date < 10)
        date = "0" + date;
    if (hour < 10)
        hour = "0" + hour;
    if (minu < 10)
        minu = "0" + minu;
    if (sec < 10)
        sec = "0" + sec;
    var arr_week = new Array("星期日", "星期一", "星期二", "星期三", "星期四", "星期五", "星期六");
    week = arr_week[day];
    var time = "";
    time = year + "年" + month + "月" + date + "日" + " " + hour + ":" + minu
			+ ":" + sec + " " + week;

    $("#bgclock").html(time);

    var timer = setTimeout("clockon()", 200);
}

function reloadTabGrid(title){
	if ($("#tabs" ).tabs('exists', title)) {
		$( '#tabs').tabs('select' , title);
		window.top.reload_Abnormal_Monitor.call();
	}
}

function refreshParentPage(title){
	if ($("#tabs" ).tabs('exists', title)) {
		$( '#tabs').tabs('select' , title);
		window.top.refreshTab.call();
	}
}