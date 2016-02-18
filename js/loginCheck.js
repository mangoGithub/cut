jQuery(function($){
	/*单选按钮特效*/
	$('.loginZy_radio').on('click',function(){
		$(this).children('i').toggle();	
	});
	$('.radioTit').on('click',function(){
		$(this).prev().children('i').toggle();
	});
	
	/*
		describe:login check
		Update:2014-11-04
		author:zhongyan
	*/
	$('#loginSet').formCheck({
		iphone:'iphone', //input 的name属性值
		password:'password',
		Login:true,
		iptext:'请输入手机号！',
		patext:'请输入密码！'
	});
	/*
		describe:regsiter
		Update:2014-11-04
		author:zhongyan
	*/
	$('#js_regsiter').formCheck({
		iphone:'iphone', //input 的name属性值
		password:'password',
		repassword:'repassword',
		code:'code',
		codeNum:'1234', // 手机收的验证码
		Login:false
	});
	/*
		describe:forget
		Update:2014-11-04
		author:zhongyan
	*/
	$('#js_forget').formCheck({
		iphone:'phone', //input 的name属性值
		code:'icode',
		codeNum:'8223', // 随机验证码
		Login:false
	});
	$('#js_forCheck').formCheck({
		code:'code',//input 的name属性值
		codeNum:'1234', // 手机收的验证码
		Login:false
	});
	$('#js_forReset').formCheck({
		password:'password',//input 的name属性值
		repassword:'repassword',
		Login:false
	});


	// towne 
	// dialog ----> regsiter.html
	$(".register_radio a").on('click', function(){
		$(this).dialogOpen(function(){
			$('[jscrollPane]').jScrollPane();
		});
	})
	$(".hx_xieyi .hx_close").on('click', function(){
		$(this).dialogClose();
	})


});
//表单验证插件
$.fn.extend({
	formCheck:function(options){
		var defaults = {
				iphone:'iphone',
				password:'password',
				repassword:'repassword',
				code:'code',
				codeNum:'',
				Login:true,
				iptext:'请输入手机号',
				patext:''
			};
		var options = $.extend(defaults,options);
		if( options.Login ){
			//登录验证
			return this.each(function(){
				var o = options;
				var obj = $(this);
				var items = $('div input',obj);
				items.on('focus',function(){
					$(this).parent().addClass('focus');
				});
				items.on('blur',function(){
					var value = $(this).val();
					if( !value || /\s/.test(value) ){
						$(this).parent().removeClass('focus');
						$(this).val('');
						$(this).parent().addClass('error');
						if($(this).attr('name')== o.iphone){
							$(this).parents('form').prev('p').text(o.iptext);
						}
						if($(this).attr('name')== o.password){
							$(this).parents('form').prev('p').text(o.patext);
						}
					}else{
						$(this).parent().addClass('focus');
						$(this).parent().removeClass('error');
						$(this).parents('form').prev('p').text('');
					}
				})
			})
		}else{
			//注册验证
			return this.each(function(){
				var o = options;
				var obj = $(this);
				var items = $('li input',obj);
				var pass = '';
				items.on('focus',function(){
					$(this).addClass('focus');
					$(this).removeClass('error');
					$(this).siblings('.win').hide();
					$(this).siblings('.warn').hide();
					$(this).siblings('.error').fadeIn();
				})
				items.on('blur',function(){
					var value = $(this).val();
					if( !value || /\s/.test(value) ){
						$(this).removeClass('focus');
						$(this).val('');
						$(this).removeClass('error');
						$(this).siblings('span').hide();
						return false;	
					}
					if($(this).attr('name')== o.iphone){
						var partten =/^[1]([3|5|8][0-9]{1}|59|58|88|89)[0-9]{8}$/;
						if(partten.test(value)){
							 ischeck($(this));
						 }else{
							nocheck($(this)) ;
						 }
					}
					if($(this).attr('name')== o.password){
						pass = $(this).val();
						var partten =/^[0-9A-Za-z]{6,}$/;
						if(partten.test(value)){
								ischeck($(this));
						}else{
								nocheck($(this));
						}
					}
					if($(this).attr('name')== o.repassword){
						if( value == pass ){
								ischeck($(this));
						}else{
								nocheck($(this));
						}
					}
					if($(this).attr('name') == o.code){
						if( value == o.codeNum ){//输入的value值和后端获取的值的比较
								ischeck($(this))
						}else{
								nocheck($(this))
						}
					}
				});
				function ischeck(obj){
					obj.removeClass('error');
					obj.siblings('.warn').hide();
					obj.siblings('.win').fadeIn();
					obj.siblings('.error').hide();
				};
				function nocheck(obj){
					obj.addClass('error');
					obj.siblings('.warn').fadeIn();
					obj.siblings('.win').hide();
					obj.siblings('.error').hide();
				};
			});
		}
	}	
})