$(function(){
	countDown("2014/12/26 00:00:00");
})

function countDown(time) {
	christmas();
    if (typeof time == "string") {
        var end_time = new Date(time).getTime(), //月份是实际月份-1
        	sys_second = (end_time - new Date().getTime()) / 1000;
        	
console.log("sys_second:"+sys_second+",end_time:"+end_time)
        var timer = setInterval(function () {	
             if (sys_second > 1) {
                sys_second -= 1;
                console.log(sys_second)
            	// christmas();		            	 
            } else {
                clearInterval(timer);
            	$(".christmas_logo,.christmas_tree,.christmas").remove();
            	$(".head_bg").removeAttr("style");
            	$("#jsChristmas,.jssnow").remove();
				removeSnow()
            }
        }, 1000);
 	} 
}
	


function christmas () {
		//头		
		var html_logo='<img class="christmas_logo" src="resources/images/christmas/christmas.gif" alt="圣诞快乐" style="position: absolute; top: 2px; right: -20px;" />';
		var html_tree='<div class="christmas_tree" style="position: absolute; right: 200px; bottom: 0;"><img src="resources/images/christmas/tree.png" /></div>';
		$(".head_bg").css({"background":"#fff  url(resources/images/christmas/chrhbg.png) no-repeat top center"});
		$("#head").css({"background-color": "transparent", "position": "relative"})
		$("#head h1").css("position","relative");
		
		$(".nav").css({"position": "relative", "z-index": "2"});
		$(".christmas_logo,.christmas_tree").remove();
		$("#head h1").append(html_logo);
		$("#head").append(html_tree);
		
		//圣诞树
		var html='<div class="christmas" style="background: url(resources/images/christmas/snow.png) repeat-x bottom left; height: 140px; width: 100%; position: absolute; left: 0; bottom: -10px; z-index: 3;"></div>';
		html+='<div class="christmas" style=" position: absolute; z-index: 1;bottom: -5px; left: 50%; margin-left: -480px;"><img src="resources/images/christmas/tree2.png" /></div>';
		html+='<div class="christmas" style=" position: absolute; z-index: 1;bottom: -5px; left: 50%; margin-left: 220px;"><img src="resources/images/christmas/tree2.png" /></div>';
		html+='<div class="christmas" style=" position: absolute; z-index: 4;bottom: 15px; left: 50%; margin-left: 400px;"><img src="resources/images/christmas/tree.png" /></div>';
		html+='<div class="christmas" style=" position: absolute; z-index: 4;bottom: 5px; left: 50%; margin-left: -380px;"><img src="resources/images/christmas/sheep.png" /></div>';
		$(".christmas").remove();
		$(".white_bg3").append(html).css({"position":"relative"})
		$(".white_bg3").find(".hx_product").css({"position":"relative",zIndex:6})
		
		//removeSnow();
//		if($(".snowimg")){
//			removeSnow();
//		}
//		createSnow("",60)
	var scr="<scr"+"ipt src='resources/js/snow.js' class='jssnow'></scr"+"ipt>";
	$(".jssnow").remove();
$("body").append(scr);	
	}


