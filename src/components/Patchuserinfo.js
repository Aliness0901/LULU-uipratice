export default function Patchuserinfo(userinfo) {
    fetch('https://bigfish-aliness.herokuapp.com/user', {
        method: 'PATCH',
        headers: new Headers({
            'Content-Type': 'application/json',
            'Authorization': JSON.stringify({
                "user_token": {
                  "user_id": localStorage.user_id,
                  "key": localStorage.userkey,
                },                  //对象结束用逗号
              }),                   //报文头属性结束逗号
        }),//head结束逗号
        body: JSON.stringify({
            'user': userinfo
                    //这里如果用了键值对的话，就一定不要用{}，因为键值对传过来本身就是带着大括号的，如果再带着大括号，就会出现问题
                     //这里要的只是键值对，user也就是我们传过来的东西，这样就可以做成传什么改什么了
        }),
    })              //fetch结束
        .then(function (response) {
            if (response.status >= 200 && response.status < 300) {      
                return response.json();
              }
            else if (response.status>300) {
                return response.json();
            }
        })
        .then(function (data) {
            console.log("login successfully: " + JSON.stringify(data));
        });
}



