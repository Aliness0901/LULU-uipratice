export default function Patchuserinfo(user_id, key, email, password,name, avatar_url, description) {
    fetch('https://bigfish-aliness.herokuapp.com/user', {
        method: 'PATCH',
        headers: new Headers({
            'Content-Type': 'application/json',
            'Authorization': JSON.stringify({
                "user_token": {
                  "user_id": user_id,
                  "key": key,
                },                  //对象结束用逗号
              }),                   //报文头属性结束逗号
        }),//head结束逗号
        body: JSON.stringify({
            "credential": {
                "email":email,
                "password":password,
                "name": name,
                "avatar_url": avatar_url,
                "description": description
            }
        }),
    })              //fetch结束
        .then(function (response) {
            if (response.status >= 200 && response.status < 300) {      
                return response.json();
              }
            else if (response.status>300) {
                return response.json
            }
        })
        .then(function (data) {
            console.log("login successfully: " + JSON.stringify(data.errors));
        });
}



