$(function(){
	//绑定手机
	$(".mobileBind .next_show").on("click",function(){
		if($(".cur_active").is(".setp0")){
			$(".tip-error,.tip-ok,.tip-info").remove();
			$(".cur_active").removeClass("cur_active").next(".none").addClass("cur_active");
		}else if($(".cur_active").is(".setp1")){
			if(false == Validator($(".verifyCode1"))){
				return false;
			}
			/**ajax提交验证
			openTipsError($(".verifyCode1"),"验证码错误");
			return false;**/
			$(".tip-error,.tip-ok,.tip-info").remove();
			$(".cur_active").removeClass("cur_active").next(".none").addClass("cur_active");
		}else if($(".cur_active").is(".setp2")){
			if(false == Validator($("#phone,.verifyCode2"))){
				return false;
			}
			$(".tip-error,.tip-ok,.tip-info").remove();
			$("#dialog1").show(250);
			$("#mask").fadeIn(250);
			return false;
		}
	})
	//修改密码
	$(".changepwd .next_show").on("click",function(){
		if($(".cur_active").is(".setp0")){
			if(false == Validator($(".verifyCode1"))){
				return false;
			}
			/**ajax提交验证
			openTipsError($(".verifyCode1"),"验证码错误");
			return false;**/
			$(".tip-error,.tip-ok,.tip-info").remove();
			$(".cur_active").removeClass("cur_active").next(".none").addClass("cur_active");
		}else if($(".cur_active").is(".setp1")){
			if(false == Validator($("#pasword,#passwordConf"))){
				return false;
			}
			$(".tip-error,.tip-ok,.tip-info").remove();
			$("#dialog1").show(250);
			$("#mask").fadeIn(250);
			return false;
		}
	})
	$(".send_code").on("click",function(){
		var $this=$(this);
		if($this.is(".ps_btn_1dis")){return false;}
		if($(".cur_active").is(".mobileBind .setp2")){//绑定新手机发送验证码之前进行验证
			if(false == Validator($("#phone"))){
				return false;
			}
			$.post("../data/send.json",{phone:$("#phone").val()},function(data){
				if(data.code==1){
					djs($this);
				}else{
					openTipsError($this,data.message);
				}
			},"json")
		}else{
			$.post("../data/send.json",function(data){
				if(data.code==1){
					djs($this);
				}else{
					openTipsError($this,data.message);
				}
			},"json")
		}

	})
	var CheckPhone=function(phone,tag){
			if(!tag){
				var url =   "../data/data.json";
				var params = {};
				params['phone'] =  $('#phone').val();
				$.post(url,params,function(data){
					if(data.code==1){
						openTipsError($("#phone"),"手机号已被占用");
					}
				},"json");
			}
			return true
	}
	$(".verifyCode1,.verifyCode2").Validator({emsg : "验证码不能为空"});
	$("#phone").Validator({hmsg : "请输入手机号",emsg : "请输入手机号",regexp:"phone",fn:CheckPhone});
	$("#pasword").Validator({hmsg:"最少6个字符，可由英文、数字及符号组成",emsg:"密码不能为空",regexp:"password"});
	$("#passwordConf").Validator({emsg:"请确认密码",fn:function(value){return $("#pasword").val()==value},fnmsg:"两次输入密码不一致"});
})