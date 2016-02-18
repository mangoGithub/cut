$(function(){
	/*产品详情进度条
	 */
	var oNum=parseInt($(".porZy_num_view").text()),
		oSchedule=$(".proZy_num_move");
	if(parseInt(oNum)>=100){
		oSchedule.animate({"width":"100%"},1000);
	}else{
		oSchedule.animate({"width":oNum+"%"},1000);
	}


	/*des:左侧导航超过一定高度固定
	 *
	 */
	(function(){
		if($(".cx_aside").length==1){
			var navH = $(".cx_aside").offset().top;
			$(window).scroll(function(){
				var scroH=$(window).scrollTop();
				if(scroH>=navH){
					$(".cx_aside").addClass("fixed");
				}else{
					$(".cx_aside").removeClass("fixed");
				}
			});
		}
	})();


	//左侧导航锚点链接到相应位置
	var $subMenu=$(".submenu");
	var $mainR=$(".cx_right_con");
	var $body=$("body");
	
	$subMenu.find("dt:last-child>div").remove();
	$subMenu.eq(0).find("dd").show();
	$subMenu.each(function(i){
		$(this).find("dt").click(function(){
			
			if(i==2){
				$(this).find("div").toggle();
			}
			$(this).toggleClass("on");
			$subMenu.find("dd").hide();
			$(this).siblings("dd").slideToggle();
		})
		$(this).find("a").click(function(){
			var name=$(this).attr("href").substr(1);
			scrollFixed($body,name);			
			$(this).parent().siblings("dd").removeClass("cur");
			$subMenu.find("dd").removeClass("cur");
			$(this).parent().addClass("cur");
			return false;
		});
	});

	$(".productZy_btn").find("a:eq(0)").click(function(){
		var name=$(this).attr("href").substr(1);
		scrollFixed($mainR,name);
		return false;
	});

	//内容右侧滚动固定左侧导航位置
	//遍历锚点  
var dla = $(".submenu a");
//navon(0)
var arrMd = [];  
var name;
for(var i = 0, len = dla.length;i<len;i++){  
	name=dla.eq(i).attr("href").substr(1);
	arrMd.push(name);  
}  
function update(){  
	var scrollH = $(window).scrollTop();
	dla.each(function(i){
		
		var taregt=$("#cx_infoContainer").find ("a[name="+arrMd[i]+"]");
		var returnValue = null;
		var windowHeight = Math.round($(window).height() * 0.5);
			//console.log(taregt.length)
	
			if(taregt.length){
				var mdHeight =taregt.offset().top;
				//console.log(mdHeight-windowHeight+","+scrollH)
				if(mdHeight-windowHeight < scrollH-200){
					returnValue=i;
					navon(returnValue)
				}
			}
	})
	
	
}  
   
	//高亮导航菜单  
	function navon(id){  
	   $(".submenu dd").hide();
	   dla.eq(id).parent().parent().find("dd").show();
	   $(".submenu dd,.submenu dt").removeClass('cur');  
	   dla.eq(id).parent().addClass("cur");
	   $(".submenu dd.cur a i span").css("animation","none")
	}  
	   
	//绑定滚动事件  
	$(window).bind('scroll',update);  
 

	function scrollFixed (obj,name) {
		var scroT =obj.find ("a[name="+name+"]").offset().top;
		$('html,body').stop().animate({scrollTop:scroT},800,"swing");
	}

	/*
	 * 数量加减
	 */
	$(".item").each(function(i) {
		var _this=$(this);
		var oTotalNum=$(this).find(".layer2 span:eq(0)").text(); //限额
		var oLimitNum=$(this).find(".layer2 span:eq(1)").text(); //剩余
		var oValue=_this.find("#pro-account"); //文本框
		var id=$('.item').eq(i).find(".btn_add").attr("id").substr(4);
		var num=oValue.val();

		fnSupport(i);

		modify(oTotalNum,oLimitNum,num,i);


	    oValue.keyup(function(){
            var n=$(this).val();
            if(parseInt(n)>parseInt(oLimitNum)){
            	$(this).val(oLimitNum);//值超过限额，值=限额
            }
		});


		//焦点图
		$(this).find(".item_l li").each(function(i){
			var oBigPic=_this.find(".cx_b_img").find("a");
			oBigPic.eq(0).show();
			$(this).on("mouseover",function(){
				oBigPic.eq(i).show().siblings().hide();
				return false;
			})
			if(!$(this).parent().siblings().hasClass("disabled_mask")){
				oBigPic.colorbox({rel:'group'+i,current:'', width: 800,height: 535});
			}
		});


	});

	$(".btn_add").on("click",function(){
		var id=$(this).attr("id").substr(4);
		plus(id);
	});

	$(".btn_reduce").on("click",function(){
		var id=$(this).attr("id").substr(7);
		reduce(id);
	});


	/*
	 * @param a  总数
	 * @param b  剩余数
	 * @param c  文本值
	 * @param i
	 */
	function modify (a,b,c,i) {
		if(c==0){
			$(".item").eq(i).find(".btn_reduce").addClass("disabled");
			$(".item").eq(i).find(".btn_reduce,.btn_add").unbind("click")
		}else if(c==a){
			$(".item").eq(i).find(".btn_add").addClass("disabled");
		}
	}

	/*
	 * 加
	 */
	function plus(id){
			var obj=$("#add_"+id);
			var a=obj.parent().siblings(".layer2").find("span").eq(0).text();//获取剩余人数
	        var oValue=obj.parent().siblings(".layer2").find("span").eq(1).text()//获取剩余人数
	        var otxt=obj.siblings("input");
	        var num=parseInt(otxt.val());
	        $("#reduce_"+id).removeClass("disabled");

	        if(num+1>=oValue){
	        	obj.addClass("disabled");
			 	otxt.prop("value",oValue);
			 }else{
			 	otxt.prop("value",num+1);
			 }

			 if(oValue==0){
			 	obj.unbind("click");
			 	$("#reduce_"+id).addClass("disabled");
			 }
	}

	function reduce (id) {
		var obj=$("#reduce_"+id);
		var otxt=obj.siblings("input");
		var num=parseInt(otxt.val());
		var oValue=obj.parent().siblings(".layer2").find("span").eq(1).text()//获取剩余人数

		$("#add_"+id).removeClass("disabled");
		if(num-1<1){
			obj.addClass("disabled");
			otxt.prop("value",0);
		}else{
			obj.removeClass("disabled");
			otxt.prop("value",num-1);
		}

		if(oValue==0){
		 	obj.unbind("click");
		 	$("#add_"+id).addClass("disabled");
		 }

	}

	/*
	 * 支持/喜欢按钮
	 */
	function fnSupport (i) {
		var obj=$(".item").eq(i);
		var oTotal=obj.find(".layer2").find("span:eq(0)").text();
		var oSurplus=obj.find(".layer2").find("span:eq(1)").text();
		if(oSurplus==0){
			obj.find(".layer5").addClass("disabled");
			obj.find(".layer5 a").attr("href","javascript:;");
			obj.find(".btn_reduce,.btn_add").addClass("disabled");
			obj.find("#pro-account").val(0).attr("disabled",true);

			obj.addClass("disabled");
			obj.find(".item_l").append('<div class="disabled_mask"></div>');
			return false;
		}
	}

	$(".liveZy_btn").on("click",function(){
		var oSpan=$(this).find("span");
		var oEm=oSpan.eq(1).find("em");
		$(this).find("i").css({
			"-webkit-animation":"shine 0.5s ease-in-out 100ms  both",
			"-moz-animation":"shine 0.5s ease-in-out 100ms  both",
			"animation": "shine 0.5s ease-in-out 100ms both"
		});
		oSpan.eq(0).html("已喜欢");
		oEm.html(parseInt(oEm.html())+1);
		$(this).addClass("disabled").unbind("click");
		return false;
	}).mouseleave(function(){
		$(this).find("i").removeAttr("style");
	});


	// towne
	// 发起人 ---> dialog ---->info.html
	$("#js_user").on("click", function(){
		$(this).dialogOpen();
	})
	$(".zy_ballUser .zy_ballUser_close").on('click', function(){
		$(this).dialogClose();
	})
	
	//项目进度
	$(".zone_progress ol li:last").find("div").remove();
})
