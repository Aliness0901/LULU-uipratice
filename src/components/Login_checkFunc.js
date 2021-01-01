/*
需要传参：
    url 地址
    email 用户输入邮箱
    password 用户输入密码
    success    成功登陆之后需要做的事情
    fail        失败之后需要做的事情
作用：
    用来验证用户输入的账户和密码是否和数据库中的相同
    相同就登录
    不相同就返回invalid_credential
    缺少参数就会返回missing_field
*/
import { user_token } from '../views/Login'
//这里是我暂时把全局变量写在了login里面，所以这里我们import的这个文件看起来有点怪怪的


export let Login_Check = (email, password, success, fail) => {
    fetch('https://bigfish-aliness.herokuapp.com/user_tokens', {
        method: 'POST',
        headers: new Headers({
            'Content-Type': 'application/json'   
        }),
        body: JSON.stringify({      
            'credential': {          
                'email': email,
                'password': password   
            }
        }),
    })
        .then(function (response) {         
            if (response.ok) {              
                return response.json();         
            } else {
                fail();                
            }
        })
        .then(function (data) {             
            user_token.user_id = data.user_token.user_id;      
            user_token.key = data.user_token.key;                
            localStorage.user_id=data.user_token.user_id;
            localStorage.userkey=data.user_token.key;
            console.log(data);
            success();
        })
        .catch(function (error) {        
            console.log('There has been a problem with your fetch operation: ', error.message);
        });    
}

