import {loginCheck } from './loginCheck'

export default function creatUser(email, password, name, succsessCallback, failCallback,getUserSucess, getUserFail) {
    fetch('https://bigfish-aliness.herokuapp.com/users', {
        method: 'POST',
        headers: new Headers({
            'Content-Type': 'application/json'
        }),
        body: JSON.stringify({
            "user": {
                "email": email,
                "password": password,
                "name": name,
            }
        }),
    })
        .then(function (response) {
            if (response.status === 201) {
                succsessCallback();
                console.log('成功创建');
                return response.json()
            } else if (response.status === 400) {
                failCallback();
                return response.json()
            } else {
                return response.json()
            }
        })
        .then(function(data) {                   //因为这里的api并不返回usertoken，所以没办法直接跳转到主页
               console.log(JSON.stringify(data));
            }
        )
        .then(function () {
            loginCheck(email, password, getUserSucess, getUserFail)
        })
        .catch({function (error) {
            console.log(error);
        }})
}