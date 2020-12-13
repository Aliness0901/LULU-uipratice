
//这个方程的目的就是在登录成功之后，如果有对用户信息有需求的话，我们需要用这个fetch来获得该用户在后端保存的信息
//后面有可能在用户信息页需要用到
export let getuserInfo=(user_id,key)=>{
    fetch('https://bigfish-aliness.herokuapp.com/user', {
      method: 'GET',
      headers: new Headers({
        'Content-Type': 'application/json',
        'Authorization': JSON.stringify({
          "user_token": {
            "user_id": user_id,
            "key": key,
          },
        }),
      }),
    })
    .then(function(response) {
      if (response.status >= 200 && response.status < 300) {      //这里用这个的意思就是如果用户想要查看的时候，不存在，就会返回
        return response.json(); //等待所有后续的报文，第二个事情就是等待所有js的对象
      }
    })
    .then(function(data) {
      console.log("get user info successfully: " + JSON.stringify(data));
    });
}