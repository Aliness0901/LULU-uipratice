export default function AnswerLikeApi(method,answerID,success,fail){
    fetch(`https://bigfish-aliness.herokuapp.com/answers/${answerID}/like`, {
      method: method,
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
    .then(function(response) {
      if (response.status >= 200 && response.status < 300) {     
        return response.json(); 
      }else if (response.status>300){
            fail();
          return response.json();
      }
    })
    .then(function(data) {
        console.log(data);
      success();                   
    });
}