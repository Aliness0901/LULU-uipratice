import {answers} from '../views/Answers'

export default function GetAnswer(id, success, fail) {
    fetch(`https://bigfish-aliness.herokuapp.com/questions/${id}/answers`, {
        method: 'GET',
        headers: new Headers({
            'Content-Type': 'application/json'
        })
    })
        .then(function (response) {
            if (response.ok) {
                return response.json();   
            }else if (response.status===404) {                      //不要在return里赋值的习惯
                return {answers:['']}                     //如何处理404的catch
            }
        })
        .then(function (data) {
            answers.answer=data.answers
            success();
            //同之前拿用户的数据一样，return在这里只能return给getquestion这个函数
            //而不能return出去，所以最好的解决办法还是在判断读取成功了之后，在函数本身里拿
        })
        .catch((error)=>{
             console.log('catch'+error);                         //这里总是给我报错说success不是函数，但是又不影响整体
        })
}


/*
以上代码已经合并到了GetQustion中
*/ 