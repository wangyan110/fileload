$.extend($.fn.datagrid.defaults.editors, {
	datetimebox: {
		init: function(container, options){
             var input = $('<input class="easyui-datetimebox" required></input>').appendTo(container);
             return input.datetimebox();
         },
         getValue: function(target)
		 {
             return $(target).datetimebox("getValue");
         },
         setValue: function(target, value){
             $(target).datetimebox("setValue",value);
         },
         resize: function(target, width){
             $(target).combogrid('resize', width);
		}
	},
	timespinner: {
		init: function(container, options){
             var input = $('<input class="easyui-timespinner" showSeconds="false"></input>').appendTo(container);
             return input.timespinner(options);
         },
         getValue: function(target)
		 {
        	 return $(target).timespinner('getValue');
         },
         setValue: function(target, value){
    		 $(target).timespinner('setValue', '00:00');
        	 $(target).timespinner('setValue', value);
         },
         resize: function(target, width){
             $(target).timespinner('resize', width);
		}
	},
	combogrid: {
		init: function(container, options){
             var input = $('<select class="easyui-combogrid"></select>').appendTo(container);
             return input.combogrid(options);
         },
         getValue: function(target)
		 {
             return $(target).combogrid('getValue');
         },
         setValue: function(target, value){
             $(target).combogrid('setValue', value);
         },
         resize: function(target, width){
             $(target).combogrid('resize', width);
		}
	},
	combogrid_mul_type: {
		init: function(container, options){
             var input = $('<select class="easyui-combogrid"></select>').appendTo(container);
             return input.combogrid(options);
         },
         getValue: function(target)
		 {
             var temp=$(target).combogrid('getValues');
			 return temp.join(',');
         },
         setValue: function(target, value){
			if (value != null && value != '') {
				 var temp=value.split(',');
	             $(target).combogrid('setValues', temp);
             }
         },
         resize: function(target, width){
             $(target).combogrid('resize', width);
		}
	},
	combotree_mul_type: {
		init: function(container, options){
             var input = $('<select class="easyui-combotree"></select>').appendTo(container);
             return input.combotree(options);
         },
         getValue: function(target)
		 {
             var temp=$(target).combotree('getValues');
			 return temp.join(',');
         },
         setValue: function(target, value){
 			if (value != null && value != '') {
 				 var temp=value.split(',');
 	             $(target).combotree('setValues', temp);
            }
         },
         resize: function(target, width){
             $(target).combotree('resize', width);
		}
	},
	password: {
		init: function(container, options){
             var input = $('<input class="easyui-password" type="password" style="width:150px"></input>').appendTo(container);
			 return input; 
         },
         getValue: function(target)
		 {
             return $(target).val(); 
         },
         setValue: function(target, value){
             $(target).val(value);
         },
         resize: function(target, width){
             var input = $(target);
             if ($.boxModel == true){
				 input.width(width -(input.outerWidth() -input.width()));
             } else {
                 input.width(width);
             }
		}
	}
});

var buttons = $.extend([], $.fn.datebox.defaults.buttons);
buttons.splice(1, 0, {
    text: '清除',
    handler: function(target){
        $(target).combo('clear','').combo('hidePanel');
    }
});
$.fn.datebox.defaults.buttons = buttons;

$.ajaxSetup ({
    cache: false
});