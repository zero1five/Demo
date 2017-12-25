window.onload = function(){
    var show = document.getElementById('show-wall');
    var imgs = show.getElementsByTagName('img');
    var now = 3;
    var target;
    var onoff = true;
    var ins = document.getElementById('ins');


    setTimeout(function(){
        tab(now);
    },200);
    
    for( var i=0; i<imgs.length; i++){
        imgs[i].index = i;
        var arr2=[];

        imgs[i].onclick = function(){

            if( ! onoff){
                return;
            }
            if(this.style.transform == 'translateZ(300px)'){
                return;
            }
            onoff = false;
            target = this.index;
            if(target > now){
                if(target - now <= 3){
                    goNext();
                }else{
                    goPrev();
                }
            }else {
                if(target + 7 -now <=3){
                    goNext();
                }else{
                    goPrev();
                }
            }   
        }
    }

    function goPrev(){   //前切换
        now --;
        if(now < 0){
            now = 6;
        }
        tab(now);
        if(now === target){
            onoff = true;
            return;
        }
        setTimeout(function(){
            goPrev();
        },700)
    }
    function goNext(){   //后切换
        now ++;
        if(now > 6){
            now = 0;
        }
        tab(now);
        if(now === target){
            onoff = true;
            return;
        }
        setTimeout(function(){
            goNext();
        },700)
    }

    function tab(n){
        for (let i = 0; i < 3; i++) {
            var left = n - 1 -i;
            var right = n + 1 + i;
            if(left <0){
                left = left + 7;
            }
            if(right > 6){
                right = right - 7;
            }
            imgs[left].style.transform = 'translateX('+ (-150*(i+1)) +'px) translateZ('+ (200-100*i) +'px) rotateY(30deg)';
            imgs[right].style.transform = 'translateX('+ (150*(i+1)) +'px) translateZ('+ (200-100*i) +'px) rotateY(-30deg)';
        }
        imgs[n].style.transform = 'translateZ(300px)';
    }
    var oWrap = document.getElementById('wrap');
    var aDiv = oWrap.getElementsByTagName('div');
    var i = 0;
    var timer = null;
    flash();
    function flash(){
        setTimeout(function(){
            timer = setInterval(function(){
                aDiv[i].className = 'show';
                i ++;
                if(i == aDiv.length){
                    clearInterval(timer);
                }
            },150)
        },2500);
    }

}