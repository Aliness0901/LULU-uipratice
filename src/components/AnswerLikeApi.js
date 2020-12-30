export default function AnswerLikeApi(answerID,success,fail){
    fetch(`https://bigfish-aliness.herokuapp.com/questions/${answerID}/like`, {
      method: 'POST',
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