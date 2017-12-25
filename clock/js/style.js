	window.onload = function(){

		//第一个功能按钮
		var onebox = document.getElementById('onebox');
		var twobox = document.getElementById('twobox');


         function twoB(){
            twobox.style.opacity = '1';
            twobox.style.top = '6' + 'rem';
            twobox.style.borderRadius = '0%';        	
        }		

        //timer = setTimeout(twoB,1000);

        clockbox.onmouseover = function(){
            onebox.style.opacity = '1';
            onebox.style.top = '6' + 'rem';
            setTimeout(twoB,100);
            threebox.style.opacity = '1';
            threebox.style.top = '6' + 'rem';
            onebox.style.left = '-1' + 'rem';
            threebox.style.right = '-1' + 'rem';
        }
        /*
        onebox.onmouseout = function(){
        	setTimeout(function(){
        	onebox.style.opacity = '0';
       	   // onebox.style.top = '-1' + 'rem';     	
       	},1000);}
        */
        //第二个盒子的效果
        twobox.onclick = function(){
           twobox.style.width = '20' + 'rem';
           twobox.style.height = '1' + 'rem';
           twobox.style.top = '10' + 'rem';
           twobox.style.left = '0' + 'rem';
           onebox.style.left = '-6' + 'rem';
           threebox.style.right = '-6' + 'rem';
        }

        //基础时钟效果
        clearInterval(fnTime);
        setInterval(fnTime, 1000);
        fnTime();
        function fnTime(){
			var myTime = new Date();
			var iHours = myTime.getHours();
			var iMin = myTime.getMinutes();
			var iSec = myTime.getSeconds();
			var clockbox = document.getElementById('clockbox');
			var aImg = clockbox.getElementsByTagName('img');

			var str = toTwo(iHours) + toTwo(iMin) + toTwo(iSec);

			function toTwo(n){ return n < 10 ? '0' + n : '' + n };

			aImg[0].src = 'img/'+str.charAt(0)+'.gif';
			aImg[1].src = 'img/'+str.charAt(1)+'.gif';
			aImg[3].src = 'img/'+str.charAt(2)+'.gif';
			aImg[4].src = 'img/'+str.charAt(3)+'.gif';
			aImg[6].src = 'img/'+str.charAt(4)+'.gif';
			aImg[7].src = 'img/'+str.charAt(5)+'.gif';

			clearInterval(flashing);
			setInterval(flashing,1000);
		    	function flashing(){
					aImg[2].src = 'img/colon.gif';
					aImg[5].src = 'img/colon.gif';
			    setTimeout(stop,500);
			        function stop(){
						aImg[2].src = 'img/flashing.gif';
						aImg[5].src = 'img/flashing.gif';
				}   		
			}       
		}
	}
