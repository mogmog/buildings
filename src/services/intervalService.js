export const intervalService = {
  interval : function(callback,delay){
    var dateNow=Date.now,
      requestAnimation=window.requestAnimationFrame,
      start=dateNow(),
      stop,
      intervalFunc=function(){
        let i = dateNow()-start<delay||(start+=delay,callback());
        stop||requestAnimation(intervalFunc)
      }
    requestAnimation(intervalFunc);
    return{
      clear:function(){stop=1}
    }
  },

  timeout:function(callback,delay){
    var dateNow=Date.now,
      requestAnimation=window.requestAnimationFrame,
      start=dateNow(),
      stop,
      timeoutFunc=function(){
        dateNow()-start<delay?stop||requestAnimation(timeoutFunc):callback()
      };
    requestAnimation(timeoutFunc);
    return{
      clear:function(){stop=1}
    }
  }

}
