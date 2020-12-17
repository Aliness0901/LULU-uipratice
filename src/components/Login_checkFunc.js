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


export let Login_Check = (url, email, password, success, fail) => {
    fetch(url, {
        method: 'POST',
        headers: new Headers({
            'Content-Type': 'application/json'   //世界固定格式
        }),
        body: JSON.stringify({      //这里就是传一个对象键值对进去
            'credential': {          //对象名是写好的，必须是这个，后端写好的request
                //用来验证
                'email': email,
                'password': password    //这里的键就是string的，后端会匹配
            }
        }),
    })
        .then(function (response) {         //status只有在这里会生成
            if (response.ok) {              //在这里判断response是否返回正确
                success();                      //response会在这里返回一个属性，如果是正确的，.ok就会返回true
                return response.json();         //把拿到的数据返回一个json格式的文件，并在下面接收data.属性
            } else {
                fail();                 //如果是错误的，.ok返回的就是一个false，所以这里我们可以写两个callback函数
                // return Promise.reject('something went wrong!')
            }
        })
        .then(function (data) {             //这里的话就是成功了会进这里
            // console.log(JSON.stringify(data));          //这里可以logdata出来看data现在是什么属性，如果没有成功拿到，那就是undefined
            user_token.user_id = data.user_token.user_idl;      //如果成功的话，这里会返回user_id
            user_token.key = data.user_token.key                //以及返回key
            // window.open('http://localhost:3000/mainpage', '_blank')      //无法用这种方式来打开新网页，不符合react用法，不是onepageapp了
            console.log(data.user_token.id);
            console.log(data.user_token.key );
            console.log('用户信息' + user_token.user_id);
            //这里写的稍微有点不一样，因为不是在同一个作用域中，所以用return来接收这两个返回值
        })
        .catch(function (error) {        //如果不写这个catch的话，就会整个页面都弹错
            console.log('There has been a problem with your fetch operation: ', error.message);
            // return 400               //函数本身是没办法跨域来return东西的，所以对于这个fetch是否拿到东西了，我们只能在ok的时候判断，然后加callback函数，这个也是fetch的最常用方法
        });     //因此这个return本身就是没有任何的意义的，除非是在同一个component里，那么return是可以的，但是如果是不同组件的话，是没有用的
}

// export  default Login_Check        //如果你想要导出方程的话，就用这种方式