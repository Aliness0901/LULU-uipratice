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
            }else if(response.status===404){
                return ''
            }
        })
        .then(function (data) {
            answers.answer=data.answers
            success();
            console.log(data.answers);
                        //同之前拿用户的数据一样，return在这里只能return给getquestion这个函数
            //而不能return出去，所以最好的解决办法还是在判断读取成功了之后，在函数本身里拿
        })
        .catch(function (error){
            console.log('catch'+error);
        })
}


/*
以上代码已经合并到了GetQustion中
*/ 