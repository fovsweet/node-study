/* node中事件继承 */
var events = require('events');
var db = require('mysql');

function Stream(){
    events.EventEmitter.call(this)
}

util.inherits(Stream,events.EventEmitter)

/* 利用once解决请求雪崩情况 */
var proxy = new events.EventEmitter();
var status = 'ready';
proxy.setMaxListeners(0);     //取消侦听器上限

var select = function(callback){
    proxy.once('select',callback);
    if(status === 'ready'){
        status = 'pending';
        db.select('SQL',function(result){
            proxy.emit('select',result);
            status = 'ready'
        })
    }
};