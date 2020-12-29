import { answers } from '../views/Answers'

export default function GetAnswer(id, success, fail,successgetAnsInfo, UserInfoMatch) {
    fetch(`https://bigfish-aliness.herokuapp.com/questions/${id}/answers`, {
        method: 'GET',
        headers: new Headers({
            'Content-Type': 'application/json',
            'Authorization': JSON.stringify({
                "user_token": {
                    "user_id": localStorage.user_id,
                    "key": localStorage.userkey,
                },
            }),
        })
    })
        .then(function (response) {
            if (response.ok) {
                return response.json();
            } else if (response.status === 404) {                      //不要在return里赋值的习惯
                return { answers: [] }                      //如何处理404的catch，传下去的时候会有一个data包着
            }       //一定要注意需要用大括号抱起来，这样才可以跟上面ok的情况保持一致，相当于传一个名字一样的对象下去
        })
        .then(function (data) {
            answers.answer = {}                       //每次提取之前，都把上一次的数据情况
            answers.userinfo = {}
            answers.answer = data.answers;
            for (let index = 0; index < answers.answer.length; index++) {
                success(answers.answer[index].user_id);
            }
            //同之前拿用户的数据一样，return在这里只能return给getquestion这个函数
            //而不能return出去，所以最好的解决办法还是在判断读取成功了之后，在函数本身里拿
            return data                //这里我们传的data是全局变量的answers,不是data.answers
        })
        .then(function (data) {
            //这里的['1']必须给，因为如果是空数组的话，下面的map连啊哦都不会显示了
            if (data.answers.length !== 0) {                      //这里不管怎么改都是引用传递，不是值传递，因此无法直接比较
                for (let n = 0; n < data.answers.length; n++) {
                    fetch(`https://bigfish-aliness.herokuapp.com/users/${data.answers[n].user_id}`, {                   //这里的返回也是异步的，所以并不能确定返回的顺序是否正确
                        method: 'GET',                              //所以最好的情况就是把所有的数据打包在一起，不要分开放，做成一个像字典一样的查询对象
                        headers: new Headers({
                            'Content-Type': 'application/json',
                            'Authorization': JSON.stringify({
                                "user_token": {
                                    "user_id": localStorage.user_id,
                                    "key": localStorage.userkey,
                                },
                            }),
                        }),
                    })
                        .then(function (response) {
                            if (response.status >= 200 && response.status < 300) {
                                return response.json();
                            }
                        })
                        .then(function (data) {
                            answers.userinfo[data.user.id] = data.user                //字典里面根据用户id来排序，因此如果要查询的话就需要用户id
                            console.log(data.user.id);
                            successgetAnsInfo(answers.userinfo[data.user.id].id);
                            console.log(answers.userinfo);
                            console.log(answers.answer);
                        });
                }
                //添加回调函数对比查询
            } else {
                console.log('什么都没干');
            }
            console.log('结束');
        })
        .catch((error) => {
            console.log('catch' + error);                         //这里总是给我报错说success不是函数，但是又不影响整体
        })
}

