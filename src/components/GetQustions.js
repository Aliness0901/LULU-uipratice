import { questionsdata } from '../views/MainPage'
// import {answers} from '../views/MainPage'

export default function GetQustion(success, AnswerSucess, AnswerFail) {
    fetch('https://bigfish-aliness.herokuapp.com/questions', {
        method: 'GET',
        headers: new Headers({
            'Content-Type': 'application/json'
        })
    })
        .then(function (response) {
            if (response.ok) {
                return response.json();
            } else {
                // fail();
            }
        })
        .then(function (data) {
            questionsdata.data = data.questions
            console.log(data.questions);
            success();
            // console.log(questionsdata.data);
            // return questionsdata.data.length                        //同之前拿用户的数据一样，return在这里只能return给getquestion这个函数
            //而不能return出去，所以最好的解决办法还是在判断读取成功了之后，在函数本身里拿
        })
        // .then(function (id) {
        //     for(let n =1;n<=id;n++){
        //         fetch(`https://bigfish-aliness.herokuapp.com/questions/${n}/answers`, {
        //         method: 'GET',
        //         headers: new Headers({
        //             'Content-Type': 'application/json'
        //         })
        //     })
        //         .then(function (response) {
        //             if (response.ok) {
        //                 return response.json();
        //             } else {
        //                 AnswerFail();
        //             }
        //         })
        //         .then(function (data) {
        //             answers.answer.push(data.answers)
        //             AnswerSucess();
        //             // console.log(answers.answer);
        //             // console.log(data.answers);
        //             //同之前拿用户的数据一样，return在这里只能return给getquestion这个函数
        //             //而不能return出去，所以最好的解决办法还是在判断读取成功了之后，在函数本身里拿
        //         })
        //         .catch(function (error) {
        //             console.log('catch' + error);
        //         })
        //     }
        // })
}
