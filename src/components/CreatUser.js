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
              }
          }),
    })
    .then(function (response) {
        if (response.status===201) {
            succsessCallback();
            console.log('成功创建');
        }else if (response.status===400){
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