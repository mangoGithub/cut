$(function(){
	$(".file").on("change",function(){
		$(this).parent().next(".ps_list_9").text($(this).val());
		$("#dialog1").show(250);
		$("#mask").fadeIn(250);
	})
})