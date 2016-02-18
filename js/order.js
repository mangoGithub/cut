(function(){
	//城市联动
	if($("#province").length>0){
		setup();
	}

	//订单步骤
	var o={
		$add:    $(".btn_address"),     //添加新地址按钮
		$list:   $(".deliveAdd"),    //地址列表
		$save:   $(".btn_save_add"),    //保存收货地址按钮
		$cancle: $(".btn_cancle_add"),  //取消按钮
		$newlist:$(".address_item"),     //添加/编辑收货地址
		$del:    $(".j_delive_delete"),
		$edit:   $(".j_delive_edit"),
		$fullName:$("#fullName"),
		$detailAddress:$("#detailAddress"),
		$phone: $("#phone")
	}

	o.$add.on("click",function(){
		if(o.$list.find("li").length==7){
			$(this).Validator();
			openTipsError($(this),"收货地址最多为7个，请删除旧地址后添加");
			return false;
		}
		$(this).hide();
		o.$newlist.show();
	}).on("mouseleave",function(){
		$(this).poshytip("destroy");
	})

	//点击地址列表，新添加地址一栏消失；新增地址按钮显示
	o.$list.find("li").each(function(i){
		var _this=$(this);
		$(this).find("label").on("click",function(){
			if(o.$newlist .is(":visible")){
				o.$newlist.hide();
				o.$add.show();
			}
		});

	});

	o.$edit.on("click",function() {
		var id=$(this).attr("data-value");
		showConsignee(id);
		$(".tip-error,.tip-ok").remove();
	});

	o.$del.on("click",function(){
		var id=$(this).attr("data-value");
		delete_Consignee(id);
		$(".tip-error,.tip-ok").remove();
	})

	o.$cancle.on("click",function(){
		o.$newlist.hide();
		o.$add.show();
		empty_Consignee();
		$(".tip-error,.tip-ok").remove();
	})

	o.$save.on("click",function(){
		if(false == Validator($("#fullName,#phone,#detailAddress,#province"))){
			return false;
		}
		return false;
	})


	$("#fullName").Validator({hmsg:"长度不超过25个字符",emsg:"姓名不能为空",regexp:"chinname",fn:"",fnmsg:""});
	$("#phone").Validator({hmsg:"6-20个数字",emsg:"联系电话不能为空",regexp:"phone",fn:"",fnmsg:""});
	$("#detailAddress").Validator({hmsg:"",emsg:"请填写收货人详细地址",regexp:"",fn:"",fnmsg:""})
	$("#province").Validator({fn:function(value){return value!="省份"},fnmsg:"请选择您当前的所在地",style:{offsetX:220},showok:false});


	/*
	 *编辑常用收货地址，展开对应信息
	*/
	function showConsignee (id) {
		$("input[name='consignee_radio']").removeAttr("checked")
		$("#addrId_"+id).prop("checked","checked");
		o.$newlist.show();
		o.$add.hide();

		$("#fullName").val(id)
	}

	/*
	 * 删除收货人地址
	*/
	function delete_Consignee(id) {
		$("#addrId_"+id).parent().remove();
		o.$newlist.hide();
		o.$add.show();
		empty_Consignee();


		var length=$("#addrId_"+id).parents("ul.deliveAdd").find("li").length;
		if(length==0){
			o.$list.find("li").eq(0).find("input").attr("checked","checked");
		}
	}

	/*
	 * 清空新增收货人信息
	 */
	function empty_Consignee () {
		o.$fullName.val('');
		o.$phone.val('');
		o.$detailAddress.val('');
		$("#province").empty().append('<option selected="">省份</option>');
		$("#city").empty().append('<option selected="">省份</option>');
		$("#county").empty().append('<option selected="">省份</option>');
		setup();
	}
})()
