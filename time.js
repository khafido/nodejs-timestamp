var moment = require("moment")

function utcformat(d){
    d= new Date(d).toGMTString;
    // var tail= 'GMT', D = [d.getUTCFullYear(), d.getUTCMonth()+1, d.getUTCDate()],
    // T = [d.getUTCHours(), d.getUTCMinutes(), d.getUTCSeconds()];
    
    // return D.join(' ')+' '+T.join(':')+ tail;
    return d;
}

var time = function(time){
    var patt = /^[0-9]*$/g;
    var isNum = patt.test(time);
    console.log(isNum);

    if(isNum){
        var date = moment.unix(time);
        var data = {
            unix: time,
            utc : utcformat(time)
        }
        return data;
    } else {
        if(moment(time,'MMMM DD YYYY').isValid()){
            var date = moment(time,'MMMM DD YYYY');            
            
            var data = {
                unix: date.format('X'),
                utc:  utcformat(time)
            }
            return data;
        } else {
            return {
                error: "Invalid Date"
            }
        }
    }
}
module.exports = time;