import { answers } from '../pages/Answers'

export default function getAnswer(id, success, fail,successGetAnsInfo) {
    fetch(`https://bigfish-aliness.herokuapp.com/questions/${id}/answers`, {
        method: 'GET',
        headers: new Headers({
            'Content-Type': 'application/json',
            'Authorization': JSON.stringify({
                "user_token": {
                    "user_id": localStorage.userID,
                    "key": localStorage.userKey,
                },
            }),
        })
    })
        .then(function (response) {
            if (response.ok) {
                return response.json();
            } else if (response.status === 404) {                     
                return { answers: [] }                     
            }      
        })
        .then(function (data) {
            answers.answer = {}                      
            answers.userInfo = {}
            answers.answer = data.answers;
            console.log(data);
            for (let index = 0; index < answers.answer.length; index++) {
                success(answers.answer[index].user_id);
            }
            return data                
        })
        .then(function (data) {
            if (data.answers.length !== 0) {                    
                for (let n = 0; n < data.answers.length; n++) {
                    fetch(`https://bigfish-aliness.herokuapp.com/users/${data.answers[n].user_id}`, {                   
                        method: 'GET',                              
                        headers: new Headers({
                            'Content-Type': 'application/json',
                            'Authorization': JSON.stringify({
                                "user_token": {
                                    "user_id": localStorage.userID,
                                    "key": localStorage.userKey,
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
                            console.log(data);
                            answers.userInfo[data.user.id] = data.user                
                            successGetAnsInfo(answers.userInfo[data.user.id].id);   
                        });
                }
            } else {
                console.log('什么都没干');
            }
        })
        .catch((error) => {
            console.log('catch' + error);                       
        })
}

