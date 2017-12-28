
var tab_show = document.getElementById('tab_show');
var aImg = [
    'img/1503556305.jpg',
    'img/1513752457.jpg',
    'img/1513860697.jpg',
    'img/1513860835.jpg'
    ];
var ball_box = document.getElementById('ball_box');
var aBall = ball_box.getElementsByTagName('div');
var img_show = document.getElementById('img_show');
var num = 0;
var shuffling_img = document.getElementById('shuffling_img');
var timer =null;


//图片淡入效果
window.onload = function(){
    tab_show.style.cssText = 'transform: translate3d(0,0,0);opacity: 1;';
}

//自定义属性 改变图片和active
for(var i=0; i<aBall.length; i++){
    aBall[i].index = i;
    aBall[i].onclick = function(){

        img_show.src = aImg[this.index];
        num = this.index;
        for(var i=0; i<aBall.length; i++){
            aBall[i].className = '';
        }
        this.className = 'active';
    }
}  
// 轮播主体
function auto(){
    img_show.src = aImg[num];
    //清除全局active样式再附加
    for(var i=0; i<aBall.length; i++){
        aBall[i].className = '';
    }  
    aBall[num].className = 'active';            
}; 
timer = setInterval(function(){
    num ++;
    num%=aBall.length;
    auto();
},3000);
//hover 清除定时器
shuffling_img.onmouseover = function(){
    clearInterval(timer);
}
ball_box.onmouseover = function(){
    clearInterval(timer);
}
shuffling_img.onmouseout = function(){
    clearInterval(timer);
    timer = setInterval(function(){
        num ++;
        num%=aBall.length;
        auto();
    },3000);
};
ball_box.onmouseout = function(){
    clearInterval(timer);
    timer = setInterval(function(){
        num ++;
        num%=aBall.length;
        auto();
    },3000);
};
// 不能停止定时器么...
var hiddenProperty = 'hidden' in document ? 'hidden' :    
'webkitHidden' in document ? 'webkitHidden' :    
'mozHidden' in document ? 'mozHidden' :    
null;
var visibilityChangeEvent = hiddenProperty.replace(/hidden/i, 'visibilitychange');
var onVisibilityChange = function(){
if (!document[hiddenProperty]) {    
    timer = setInterval(function(){
        num ++;
        num%=aBall.length;
        auto();
    },3300);

}else{
    clearInterval(timer);
}
}
document.addEventListener(visibilityChangeEvent, onVisibilityChange);
//二屏展示
var twoshow = document.getElementById('twoshow');
var doc = document;

var control = doc.getElementById('control');
var ins = doc.getElementById('ins');
var onOff = true;

control.onclick = function(){
    if(onOff){
        ins.style.cssText = 'transform: rotateY(0deg) rotateZ(0deg); opacity: 1;';
        onOff = false;
    }else {
        ins.style.cssText = 'transform: rotateY(-90deg) rotateZ(-90deg); opacity: 0;';
        onOff = true;
    }
}
var oIframe = doc.getElementById('mainframe');
var oF = doc.getElementById('friend');
var view = doc.getElementById('view');
var friend_show = doc.getElementById('friend_show');
var aImg2 = friend_show.getElementsByTagName('img');  //获取所有的图片

oF.onclick = function(ev){

    oIframe.style.cssText = 'transform: rotateY(-90deg); opacity: 0;';
    friend_show.style.cssText = 'transform: rotateY(0deg); opacity: 1;';

    var ev = ev || window.event; 
    var len = aImg2.length;
    for(var i=0; i<len; i++){
        aImg2[i].style.left = parseInt( Math.random()*800 ) + 'px';
        aImg2[i].style.top = parseInt( Math.random()*600 ) + 'px';
    }


}
view.onclick = function(){
    oIframe.style.cssText = 'transform: rotateY(0deg); opacity: 1;';
    friend_show.style.cssText = 'transform: rotateY(90deg); opacity: 0;';
}



//图片按需加载
var num1 = friend_show.getElementsByTagName('img').length;
var img1 = friend_show.getElementsByTagName("img");
var n = 0; //存储图片加载到的位置，避免每次都从第一张图片开始遍历

lazyload(); //页面载入完毕加载可视区域内的图片

window.onscroll = lazyload;

function lazyload() { //监听页面滚动事件
    var seeHeight = document.documentElement.clientHeight; //可见区域高度
    var scrollTop = document.documentElement.scrollTop || document.body.scrollTop; //滚动条距离顶部高度
    for (var i = n; i < num1; i++) {
        if (img1[i].offsetTop < seeHeight + scrollTop) {
            if (img1[i].getAttribute("src") == "default.jpg") {
                img1[i].src = img1[i].getAttribute("data-src");
            }
            n = i + 1;
        }
    }
}