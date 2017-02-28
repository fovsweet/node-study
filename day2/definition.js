(function(name, definition){
    // 检测上下文是否为AMD或者CMD
    var hasDefine = typeof define === 'function',
        // 检测上下文是否为Node
        hasExports = typeof module !== 'undefined' && module.exports;

    if(hasDefine) {
        // 为AMD或者CMD
        define(definition)
    }else if(hasExports){
        // 定义为普通node模块
        module.exports = definition()
    } else{
        // 将模块执行结果挂在window变量中，在浏览器中this指向的是window对象
        this[name] = definition()
    }
})('hello' ,function(){
    var hello = function(){};
    return hello
})