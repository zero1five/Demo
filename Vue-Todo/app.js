"use strict";

let store = {
    save(key,value){
        localStorage.setItem(key,JSON.stringify(value));
    },
    fetch(key){
        return JSON.parse(localStorage.getItem(key)) || [];
    }
}
let list = store.fetch("test");

let filter = {
    all: function(){
        return list;
    },
    finished: function(list){
        return list.filter(function(item){
            return  item.isChecked;
        })
    },
    unfinished: function(){
        return list.filter(function(item){
            return  !item.isChecked;
        })
    }
}

// el 挂载 '' 与 " " 皆可以
let vm = new Vue({
    el: '.main',
    data: {
        list: list,
        todo: '',
        edtorTodos: '',  //记录正在编辑的数据
        beforeTitle: '',
        visibility: 'all' 
    }, 
    watch: {    
/*         list: function(){   
            store.save("test",this.list);
        }, */       //浅监控
        list: {
            handler: function(){
                store.save("test",this.list);
            },
            deep:true  //深监控
        }
    },
    computed: {     //计算属性
        noCheckeLength: function(){
            return  this.list.filter(function(item){
                        return !item.isChecked
                    }).length
        },
        filteredList: function(){
            // all finished unfinished
    
            return  filter[this.visibility] ? filter[this.visibility](list) : list;
        }
    },
    methods: { 
        addTodo(){  //添加任务  

            //事件处理函数中的this指向的是 Vue实例

            this.list.push({
                title: this.todo,
                isChecked: false
            });
            this.todo = '';
        },
        deleteTodo(todo){  //删除任务
            let index = this.list.indexOf(todo);
            this.list.splice(index,1);
        },
        edtorTodo(todo){  //编辑任务      dblclick
            this.edtorTodos = todo;
            this.beforeTitle = todo.title;   //记录title 
        },
        edtorTodoed(todo){ //编辑任务成功  blur || enter
            this.edtorTodos = '';
        },
        cancelTodo(todo){  //取消编辑任务  ESC
            //获取之前的title
            todo.title = this.beforeTitle;
            // 隐藏input
            this.edtorTodos = '';
        }
    },
    directives: {
        'focus': {
            update(el,binding){
                if(binding.value){
                    el.focus();
                }
            }
        }
    }
});

function watchHashChange(){
    let hash = window.location.hash.slice(1);
    vm.visibility = hash;
};
watchHashChange();

window.addEventListener("hashchange",watchHashChange);