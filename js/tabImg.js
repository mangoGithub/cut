var oDiv = document.getElementById('js_banner');
var oUl = document.getElementById('js_view'); 
var oP = document.getElementById('js_list');
var oLeft = document.getElementById('js_prev');
var oRight = document.getElementById('js_next');

var aLi = oUl.getElementsByTagName('li');
var aSpan = oP.getElementsByTagName('a');

oUl.innerHTML += oUl.innerHTML;

var iLen = aLi.length;
var iWidth = aLi[0].offsetWidth;
var iCur = 0 ,iTimer = null;

oUl.style.width = iLen * iWidth + 'px';
autoPlay();
for (var i=0; i<iLen/2; i++) {
	aSpan[i].index = i;
	aSpan[i].onclick = function() {
		
		iCur = this.index;
		
		play();
		
	}
}
oDiv.onmouseover= function(){
	clearInterval(iTimer);
}
oDiv.onmouseout= autoPlay;
oLeft.onclick = function() {
	
	iCur--;
	
	if (iCur < 0) {
		oUl.style.left = - oUl.offsetWidth / 2 + 'px';
		iCur = iLen / 2 - 1;
	}
	
	play();
	
}

oRight.onclick = function() {
	
	iCur++;
	
	if (iCur == iLen/2+1) {
		oUl.style.left = '0px';
		iCur = 1;
	}
	
	play();
	
}


function play() {
	for (var i=0; i<iLen/2; i++) {
		aSpan[i].className = '';
	}
	aSpan[iCur % (iLen/2)].className = 'act';
	doMove(oUl, {
		left : - (iCur * iWidth)
	}, 'bounceOut', 1000);
}
function autoPlay(){
	clearInterval(iTimer);
	iTimer = setInterval(function(){
		iCur++;
		if (iCur == iLen/2+1) {
			oUl.style.left = '0px';
			iCur = 1;
		}
		play();
	},3000);
}