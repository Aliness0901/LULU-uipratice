export default function CreatUser(email, password, name, succsessCallback,failCallback) {
    fetch('https://bigfish-aliness.herokuapp.com/users',{
        method: 'POST',
        headers: new Headers({
          'Content-Type': 'application/json'
        }),
        body: JSON.stringify({
            "user": {
                "email": email,
                "password": password,
                "name": name,
                // "avatar_url": "http://5b0988e595225.cdn.sohucs.com/images/20190324/26b14ff8956b4661a456a7e6751ce085.jpeg",
                // "description": ""
              }
          }),
    })
    .then(function (response) {
        if (response===201) {
            succsessCallback();
            console.log('成功创建');
        }else if (response===400){
            failCallback();
            console.log('缺少参数');
        }else {
            console.log('error');
        }
    })
    .catch(function (error) {
        console.log('catch'+error);
    })
}