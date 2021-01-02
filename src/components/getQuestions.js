import { questionsdata } from '../views/MainPage'

export default function GetQustion(success) {
    fetch('https://bigfish-aliness.herokuapp.com/questions', {
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
            } else {
                // fail();
            }
        })
        .then(function (data) {
            questionsdata.data = data.questions
            console.log(data.questions);
            success();
        })
}
