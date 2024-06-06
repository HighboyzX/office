const Moment = require("moment");

exports.log = function(){
    let data = [];
    data[0] = Moment().format("YYYY-MM-DD HH:mm:ss");
    if(arguments.length > 0){
        for(let i=0;i<arguments.length;i++){
            data[data.length] = arguments[i];
        }
    }
    console.log.apply(console,data);
};

exports.error = function(){
    let data = [];
    data[0] = Moment().format("YYYY-MM-DD HH:mm:ss");
    if(arguments.length > 0){
        for(let i=0;i<arguments.length;i++){
            data[data.length] = arguments[i];
        }
    }
    console.error.apply(console,data);
}

exports.info = function(){
    let data = [];
    data[0] = Moment().format("YYYY-MM-DD HH:mm:ss");
    if(arguments.length > 0){
        for(let i=0;i<arguments.length;i++){
            data[data.length] = arguments[i];
        }
    }
    console.info.apply(console,data);
}