 /* 
    * html5 placeholder pollfill 
    * - 使用绝对定位内嵌层 
    * - 也适用于密码域 
    * 目标浏览器: IE 6~9, FF 3.5 
     
    // 默认 
    $('input[placeholder]').placeholder() 
 
    // autofocus 与 placeholder 搭配时，非 webkit 清空了提示文本，推荐 
    $('input[placeholder]').placeholder({ 
      // 将删除原有 placehodler 属性，强制用 JS 实现替代 
      useNative: false, 
      // focus 时不清除提示文本， keypress 有效字符时才清空 
      hideOnFocus: false, 
      // 附加样式 
      style: { 
        textShadow: 'none' 
      } 
    }) 
     
    */ 
    (function($){
      var attr = 'placeholder', nativeSupported = attr in document.createElement('input') 
      $.fn.placeholder = function (options) { 
        return this.each(function () { 
          var $input = $(this) 
 
          if ( typeof options === 'string' ) { 
            options = { text: options } 
          } 
 
          var opt = $.extend({ 
            text     : '', 
            style    : {}, 
            namespace: 'placeholder', 
            useNative: true, 
            hideOnFocus: true 
          }, options || {}) 
 
          if ( !opt.text ) { 
            opt.text = $input.attr(attr) 
          } 
 
          if (!opt.useNative) { 
            $input.removeAttr(attr) 
          }else if ( nativeSupported ) { 
            // 仅改变文本 
            $input.attr(attr, opt.text) 
            return 
          } 
 
          var width     = $input.width(), height = $input.height();
          var box_style = ['marginTop', 'marginLeft', 'paddingTop', 'paddingLeft', 'paddingRight','lineHeight']
 
          var show      = function () { $layer.show() } 
          var hide      = function () { $layer.hide() } 
          var is_empty  = function () { return !$input.val() } 
          var check     = function () { is_empty() ? show() : hide() } 
 
          var position  = function () { 
            var pos = $input.position() 
            if (!opt.hideOnFocus) { 
              // 按??藏的情况，需要移?庸?肆较袼 
              pos.left += 2 
            } 
            $layer.css(pos) 
            $.each(box_style, function (i, name) { 
              $layer.css(name, $input.css(name))
            }) 
          } 
 
          var layer_style = {
              color     : 'gray', 
              cursor    : 'text', 
              textAlign : 'left',
              position  : 'absolute',
              fontSize  : $input.css('fontSize'),
              fontFamily: $input.css('fontFamily'),
              display   : is_empty() ? 'block' : 'none' 
          } 
 
          // create 
          var layer_props = {
            text  : opt.text, 
            width : width, 
            height: height
          } 
 
          // 确保只绑定一次 
          var ns = '.' + opt.namespace, $layer = $input.data('layer' + ns) 
          if (!$layer) { 
            $input.data('layer' + ns, $layer = $('<div>', layer_props).appendTo($input.offsetParent()) ) 
          }
          // activate 
          $layer 
          .css($.extend(layer_style, opt.style))
          .unbind('click' + ns)
          .bind('click' + ns, function () { 
            opt.hideOnFocus && hide() 
            $input.focus() 
          })
          $input 
          .unbind(ns) 
          .bind('blur' + ns, check) 
 
          if (opt.hideOnFocus) { 
            $input.bind('focus' + ns, hide) 
          }else{ 
            $input.bind('keypress keydown' + ns, function(e) { 
              var key = e.keyCode 
              if (e.charCode || (key >= 65 && key <=90)) { 
                hide() 
              } 
            }) 
            .bind('keyup' + ns,check) 
          } 
 
          // 由于 ie 记住密码的特性，需要监听值改变 
          // ie9 不支持 jq bind 此事件 
          $input.get(0).onpropertychange = check 
          position() 
          check() 
        }) 
      } 
    })(jQuery)
      
    var support = (function(input){
      return function(attr) { return attr in input }
    })(document.createElement('input'));
    
    $(function(){
      if ( !(support('placeholder')) ) {
        $('input[placeholder],textarea[placeholder]').placeholder(); 
      } 
    });
    
   (function($){
      $.extend($.fx.step,{
          backgroundPosition: function(fx){
              if (fx.state === 0 && typeof fx.end == 'string'){
                  var start = $.curCSS(fx.elem,'backgroundPosition');
                  start = toArray(start);
                  fx.start = [start[0],start[2]];
                  var end = toArray(fx.end);
                  fx.end = [end[0],end[2]];
                  fx.unit = [end[1],end[3]];
              }
              var nowPosX = [];
              nowPosX[0] = ((fx.end[0] - fx.start[0]) * fx.pos) + fx.start[0] + fx.unit[0];
              nowPosX[1] = ((fx.end[1] - fx.start[1]) * fx.pos) + fx.start[1] + fx.unit[1];
              fx.elem.style.backgroundPosition = nowPosX[0]+' '+nowPosX[1];

             function toArray(strg){
                 strg = strg.replace(/left|top/g,'0px');
                 strg = strg.replace(/right|bottom/g,'100%');
                 strg = strg.replace(/([0-9\.]+)(\s|\)|$)/g,"$1px$2");
                 var res = strg.match(/(-?[0-9\.]+)(px|\%|em|pt)\s(-?[0-9\.]+)(px|\%|em|pt)/);
                 return [parseFloat(res[1],10),res[2],parseFloat(res[3],10),res[4]];
             }
          }
      });
  })(jQuery);