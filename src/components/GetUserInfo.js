import {userdatadetail} from '../views/Profile'

//这个方程的目的就是在登录成功之后，如果有对用户信息有需求的话，我们需要用这个fetch来获得该用户在后端保存的信息
//后面有可能在用户信息页需要用到
export default function getuserInfo(user_id,key,success){
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
      //console.log("get user info successfully: " + JSON.stringify(data));     //如果这里没有stringify的话，就会显示obj obj这样奇怪的东西
      //但是在调用赋值的时候，千万不要加JSON.stringify，不然会出现赋值完拿不出来的情况，stringify只是看一下里面有什么而已
      userdatadetail.detail=data.user
      console.log((userdatadetail.detail)); 
      success();
    });
}