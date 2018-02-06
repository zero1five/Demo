;(() => {
    'use strict';

    function Get(id) {
        return document.getElementById(id);
    }
    function Tag(tag) {
        return document.getElementsByTagName(tag);
    }
    init();

    /* 初始化 */
    function init() {
        let eleHTML = `
            <div id="customer_service_robot">
                <svg class="icon" aria-hidden="true">
                    <use xlink:href="#icon-jiqiren"></use>
                </svg>
                <div id="customer_dialog">
                    <div class="customer-dialog-title">与02小姐姐聊天中</div>
                    <!-- 文本生成区域 -->
                    <div id="customer_dialog_content">
                        <div>
                            <span class="msg-row-left">
                            你好！我是02
                            </span>
                        </div>
                        <div>
                            <span class="msg-row-right">
                            02小姐姐好！
                            </span>
                        </div>
                    </div>
                    <div class="customer-dialog-choose">
                        <ul id="choose_slot">

                        </ul>
                    </div>
                </div>
            </div>`;
        document.getElementsByTagName('body')[0].innerHTML += eleHTML;
    };
    
    let customer_service_robot = Get('customer_service_robot')
      , customer_dialog = Get('customer_dialog')
      , isOn = true
      , oUl = Get('choose_slot')
      ;

    customer_service_robot.onclick = () => {
        /* 开关对话框 */
        if (isOn) {
            customer_dialog.style.cssText = 'width: 300px; height: 600px; opacity: 1; transform: translate(-75%,-70%);'
            isOn = false;
        }
        else {
            customer_dialog.style.cssText = 'width: 0px; height: 0px; opacity: 0; transform: translate(0,0); z-index: -1;'
            isOn = true;
        }
    };

    customer_dialog.onclick = ev => {
        /* 阻止冒泡 */
        window.event? window.event.cancelBubble = true : e.stopPropagation();
    }

    /* 交互流程 */
    (function process(){
        /* for in 获得 value */
        for(let value in process_content.firstData) {
            oUl.innerHTML += '<li>'+ process_content.firstData[value] +'</li>';
        }
        /* 自定义属性 获得 item */
        let length = Tag('li').length
          , onOff = true
          , content = Get('customer_dialog_content')
          ; 
        for (let i=0; i<length; i++) {
            Tag('li').num = i;
            /* 这里不用箭头函数，没有指定this箭头函数就没有this 换成普通函数 谁调用指向谁 */
            Tag('li')[i].onclick = function() {
                if (onOff) {
                    onOff = false;
                    content.innerHTML += '<div><span class="msg-row-right">'+ this.innerHTML +'</span></div>';
                    /* 传 i 这个下标给 update 函数 就可以 形成 firstData <-> firstReply 的对应关系 */
                    update(i,process_content.firstReply);
                    onOff = true;
                }
                else {
                    return;
                }
            }
        }
        /* 通过上面的click事件 拿到对应的 key值 ->  */
        function update(i,data) {
            console.log(data);
            setTimeout(()=>{
                content.innerHTML += '<div><span class="msg-row-left">'+ data[i] +'</span></div>';
                if (content.scrollTop + content.offsetHeight != content.scrollHeight) {
                    /* 使最新信息一直出现在屏幕上 */
                    content.scrollTop = content.scrollHeight - content.offsetHeight;
                }
            },500)
        }

        /* 查看更多选项 */
        Tag('li')[2].onclick = () => {
            viewMore();
        }
        
        function viewMore() {
            /* 更新下一轮的数据 */
            oUl.innerHTML = '';
            for(let value in process_content.secondData) {
                oUl.innerHTML += '<li>'+ process_content.secondData[value] +'</li>';
            }
            let length = Tag('li').length
            , onOff = true
            , content = Get('customer_dialog_content')
            ; 
            for (let i=0; i<length; i++) {
                Tag('li').num = i;
                /* 这里不用箭头函数，没有指定this箭头函数就没有this 换成普通函数 谁调用指向谁 */
                Tag('li')[i].onclick = function() {
                    if (onOff) {
                        onOff = false;
                        content.innerHTML += '<div><span class="msg-row-right">'+ this.innerHTML +'</span></div>';
                        /* 传 i 这个下标给 update 函数 就可以 形成 firstData <-> firstReply 的对应关系 */
                        update(i,process_content.secondReplay);
                        onOff = true;
                    }
                    else {
                        return;
                    }
                }
            }                       
        }
    })();

})();