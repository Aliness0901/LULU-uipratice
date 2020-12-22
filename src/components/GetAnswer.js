import {answers} from '../views/MainPage'

export default function GetQustion(id, success, fail) {
    fetch(`https://bigfish-aliness.herokuapp.com/questions/${id}/answers`, {
        method: 'GET',
        headers: new Headers({
            'Content-Type': 'application/json'
        })
    })
        .then(function (response) {
            if (response.ok) {
                return response.json();   
            }else{
                fail();
                console.log('something error'+response.error);
            }
        })
        .then(function (data) {
            answers.answer=data.answers
            success();
            console.log(answers.answer);
            // console.log(data.answers);
            // return data                         //同之前拿用户的数据一样，return在这里只能return给getquestion这个函数
            //而不能return出去，所以最好的解决办法还是在判断读取成功了之后，在函数本身里拿
        })
        .catch(function (error) {
            console.log('catch'+error);
        })
}