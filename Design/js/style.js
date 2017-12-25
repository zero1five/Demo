window.onload = function(){
    var literals = document.getElementById('literals');
    var drop1 = document.getElementById('drop1');
    var drop2 = document.getElementById('drop2');
    var ben = document.getElementById('ben');
    var cow = document.getElementById('cow');
    var prompting = document.getElementById('prompting');
    var plane = document.getElementById('plane');

    //漂浮效果
    function flash(){
        literals.style.cssText = 'animation: 4.5s qiaoqiao infinite;';
        cow.style.cssText = 'animation: 2.2s remove infinite;';
        setTimeout(function(){
            drop1.style.cssText = 'animation: 2.2s move infinite;';
            drop2.style.cssText = 'animation: 2.2s move infinite;';
            plane.style.cssText = 'animation: 2.2s move infinite;';
            ben.style.cssText = 'animation: 2.2s remove infinite;';
        },2200);
    }
    timer = setTimeout(flash,5000);

    //提示图标单独计时器
    setInterval(function(){
        prompting.style.cssText = 'transform: translate(0,0);transition: all 1.5s;';
        setTimeout(function(){
            prompting.style.cssText = 'transform: translate(0,-30%);transition: all 1.5s;';
        },1000)
    },2000);
    //存在bug
    /*
    document.onmouseover = function(e){
            var e = event || window.event;
            var scrollX = document.documentElement.scrollLeft || document.body.scrollLeft;
            var scrollY = document.documentElement.scrollTop || document.body.scrollTop;
            var x = e.pageX || e.clientX + scrollX;
            var y = e.pageY || e.clientY + scrollY;
            return (x,y);

            if(x>700){
                drop1.style.cssText = 'transform: translate3d( -20px,2px,0px);transition: all 3s;animation-play-state:paused;';
                drop2.style.cssText = 'transform: translate3d( -15px,2px,0px);transition: all 3s;animation-play-state:paused;';
            }
            else if(x<700){
                drop1.style.cssText = 'transform: translate3d( 10px,1px,0px);transition: all 3s;animation-play-state:paused;';
                drop2.style.cssText = 'transform: translate3d( 10px,2px,0px);transition: all 3s;animation-play-state:paused;';
            }                 
    };
    document.onmouseout = function(e){
        drop1.style.cssText = 'transform: translate3d(-1px,1px,0px);transition: all 3s;animation-play-state:running;';
        drop2.style.cssText = 'transform: translate3d(-1px,1px,0px);transition: all 3s;animation-play-state:running;';
        setTimeout(flash,5000);
    }
    */
    var menu = document.getElementById('menu');
    var mask = document.getElementById('mask');
    var submenu = document.getElementById('submenu');
    var oLi = menu.getElementsByTagName('li');
    var onOff = true;
    menu.onclick = function(){
        if(onOff){
            mask.style.cssText = 'right: -50vw;top: -50vw;';
            submenu.style.cssText = 'opacity: 1;z-index: 99999;';
            oLi[0].style.cssText = 'transform: rotate(20deg);';
            oLi[2].style.cssText = 'transform: rotate(-20deg);';
            onOff = false;
        }else{
            mask.style.cssText = 'right: -200vw;top: -200vw;';
            onOff = true;
            submenu.style.cssText = 'opacity: 0;z-index:0;';
            oLi[0].style.cssText = 'transform: rotate(0deg);';
            oLi[2].style.cssText = 'transform: rotate(0deg);';
        }
    }
}