// node中每一个文件模块都是一个对象

function Module(id,parent){
    this.id = id;
    this.exports = {}
    this.parent = parent
    if( parent && parent.children ){
        parent.children.push(this)
    }

    this.filename = null
    this.loaded = false
    this.childrent = []
}

/* node对不同的文件有着不同的解析方式 */

/*
 .js文件 => 通过fs模块同步读取文件后编译执行
 .node => C/C++ 编写的扩展文件，通过 dlopen() 方法加载最后编译执行
 .json => 通过fs模块同步读取文件后，用JSON.parse() 解析返回结果
 其余扩展名文件当做js文件载入
 */

// Native extension for .json

Module._extensions['.json'] = function (module,filename) {
    var content = NativeModule.require('fs').readFileSync(filename,'utf-8')
    try {
        module.exports = JSON.parse(stripBom(content))
    } catch (err) {
        err.message = filename + ':' + err.message
        throw err
    }
}

// Native extension for .js

Module._extensions['.js'] = function (module, filename) {
    var content = fs.readFileSync(filename, 'utf8');
    module._compile(internalModule.stripBOM(content), filename);
}


// Native extension for .node

Module._extensions['.node'] = function (module, filename) {
    return process.dlopen(module, path._makeLong(filename));
}
