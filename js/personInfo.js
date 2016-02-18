$(function(){
	setup();
	$("#btn_submit").on("click",function(){
		if(false == Validator($("#nickname,#email,#province"))){
				return false;
			}
		openTipsError($("#nickname"),"该用昵称已被注册，请重新输入");
		$("#dialog1").show(250);
		$("#mask").fadeIn(250);
		//ajax提交
		var url =   "../data/data.json";
		var params = {};
		params['nickname'] =  $('#nickname').val();
		$.post(url,params,function(data){
			//openTipsError($("#nickname"),"该用昵称已被注册，请重新输入");
		})
		return false;
	})
	var CheckNickname=function(nickname,tag){
		var l=nickname.length;
		if(l-3>0 && 21-l>0){
			if(!tag){
				var url =   "../data/data.json";
				var params = {};
				params['nickname'] =  $('#nickname').val();
				$.post(url,params,function(data){
					if(data.code==1){
						openTipsError($("#nickname"),"该用昵称已被注册，请重新输入");
					}
				})
			}
			return true
		}else{return false;}
	}
	$("#nickname").Validator({hmsg:"4-20个字符，可由中文、英文、数字组合",emsg:"昵称不能为空",regexp:"nickname",fn:CheckNickname,fnmsg:"昵称必须在4—20个字符内"});
	$("#email").Validator({IsValidate:false,regexp:"email"});
	$("#province").Validator({fn:function(value){return value!="省份"},fnmsg:"请选择您当前的所在地",style:{offsetX:170},showok:false});
})