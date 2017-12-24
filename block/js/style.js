window.onload = function(){
	var oV = document.getElementById('v1');
	var start = document.getElementById('start');
	var icon1 = document.getElementById('icon1');
	var time = document.getElementById('time');
	var dot = document.getElementById('dot');
	var bar = document.getElementById('bar');
	var ball = document.getElementById('ball');
	var contorlmenu = document.getElementById('contorlmenu');
	var player = document.getElementById('player');
	var timeline = document.getElementById('timeline');
    var voiceline = document.getElementById('voiceline');
    var voicedot2 = document.getElementById('voicedot2');
    var voiceball = document.getElementById('voiceball');
    var voice = document.getElementById('voice');
    var full = document.getElementById('Full');
	var timer = null;
    var i = voice.getElementsByTagName('i');
    var mask = document.getElementById('mask');

	start.onclick = function(){
		if( oV.paused ){
	    	oV.play();
	    	oV.paused = false;
	    	icon1.className = 'fa fa-pause';
	    	nowTime();
	    	timer = setInterval(nowTime,1000);
            mask.style.cssText = 'animation: sz 2s linear 0s infinite forwards;animation-iteration-count:1;';

		}else{
	        oV.pause();
	        oV.paused = true;
	        icon1.className = 'fa fa-play';
	        clearInterval(timer);

		}
	}
	//定时更新当前进度/进度条同步/滚珠同步
    function nowTime(){
     time.innerHTML = changeTime(oV.duration,oV.currentTime);

     var percent = oV.currentTime / oV.duration;
     dot.style.width = percent * (bar.offsetWidth)  + "px";
     ball.style.left = percent * (bar.offsetWidth) - 1 + "px";  


    }
    function nowTimeTwo() {
    	time.innerHTML = changeTime(oV.duration,oV.currentTime);
    }

    //滚珠状态
    contorlmenu.onmouseover = function(){
    	ball.style.display = 'block';
    }
    contorlmenu.onmouseout = function(){
    	ball.style.display = 'none';
    }

    //初始化的时间number
	time.innerHTML = changeTime(oV.duration,oV.currentTime);

	//取零
	function getZero(num){
		if (num<=9) {
			return '0' + num ;
		}else {
			return '' + num ;
		}
	}
    //播放时长与总时长
	function changeTime(iNum,iNam){
	    
		iNum = parseInt(iNum);
	    
		var iM = getZero(Math.floor(iNum%3600/60));
		var iS = getZero(Math.floor(iNum%60));
	    var iN = getZero(Math.floor(iNam%3600/60));
        var iA = getZero(Math.floor(iNam%60));
		return iN +':'+ iA +' / '+iM +':'+ iS;
	}

    //滚珠移动效果  
    ball.onmousedown = function(){
    	var ev = ev || window.event;
    	disX = ev.clientX - ball.offsetLeft;

    	document.onmousemove = function(ev){
    		var ev = ev || window.event;

    		var L = ev.clientX - disX;


    		if (L<0) {
    			L = 0;
    		}else if(L>bar.offsetWidth - ball.offsetWidth){
    			L = bar.offsetWidth - ball.offsetWidth;
    		}
            
    		ball.style.left = L + 'px';
    		var scale = L/(bar.offsetWidth - ball.offsetWidth);
    		oV.currentTime = scale * oV.duration;
    		nowTime();
    	};

    	document.onmouseup = function(){
    		document.onmousemove = null;
    	}
    	return false;
        
    }
    //进度条点击效果 
     bar.onclick = function(e) {
     	var length = e.clientX - player.offsetLeft - 70; 
        var percent = length / bar.offsetWidth;

        dot.style.width = percent * (bar.offsetWidth)  + "px";
        ball.style.left = percent * (bar.offsetWidth) - 10 + "px";

        nowTimeTwo();
	    timer = setTimeout(nowTimeTwo,50);
        oV.currentTime = percent * oV.duration;
    }
    //进度条悬浮出现 时间轴
    bar.onmouseover = function(e){

    	var length = e.clientX - player.offsetLeft - 70;  //鼠标落点的距离
        var barLength = bar.offsetWidth;    // 进度条的长度
        var proportion = length / barLength;   // 落点比长度
        changeTime(oV.duration,oV.currentTime);  
        var E =  oV.duration;
        var G =  oV.currentTime;
        G = E * proportion;
        var iN = getZero(Math.floor(G%3600/60));
        var iA = getZero(Math.floor(G%60));

        timeline.style.left = proportion * (bar.offsetWidth)  + "px"; 
        timeline.innerHTML = iN + ':'+ iA;
        timeline.style.display = 'block';
        
    }
    bar.onmouseout = function(){
    	timeline.style.display = 'none';
    } 
    // 声音滚珠效果

     voiceball.onmousedown = function(ev){
        var ev = ev || window.event;
        disX2 = ev.clientX - voiceball.offsetLeft;
        
        document.onmousemove = function(ev){
            var ev = ev || window.event;
            
            var L = ev.clientX - disX2;
            
            if(L<0){
                L = 0;
            }
            else if(L>voiceline.offsetWidth - voiceball.offsetWidth){
                L = voiceline.offsetWidth - voiceball.offsetWidth;
            }
            
            voiceball.style.left = L + 'px';
            
            var scale = L/(voiceline.offsetWidth - voiceball.offsetWidth);
            oV.volume = scale;

            voicedot2.style.width = scale  * (voiceline.offsetWidth)  + "px";

            if (scale == 0) {
                i[0].className = '';
                i[0].className = 'fa fa-volume-off';
            }else{
                i[0].className = 'fa fa-rss';
            }

            
        };
        document.onmouseup = function(){
            document.onmousemove = null;
        };
        return false;
    };


    // 全屏化
    full.onclick = function(){
        oV.webkitRequestFullScreen();
    }
    // 视频可点击
    oV.onclick = function(){
        if( oV.paused ){
            oV.play();
            oV.paused = false;
            icon1.className = 'fa fa-pause';
            nowTime();
            timer = setInterval(nowTime,1000);
            mask.style.cssText = 'animation: sz 2s linear 0s infinite forwards;animation-iteration-count:1;';

        }else{
            oV.pause();
            oV.paused = true;
            icon1.className = 'fa fa-play';
            clearInterval(timer);

        }
    }
    var remind = document.getElementById('remind');
    var body = document.getElementsByTagName('body')[0];
    var onOff = true;
    remind.onclick = function(){
        if( onOff){
            body.style.cssText = "background:black";
            onOff = false;
        }
        else {
            body.style.cssText = "background:#eee;";
            onOff = true;
        }
    }

}    
