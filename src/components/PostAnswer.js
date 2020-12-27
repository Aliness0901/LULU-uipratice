export default function PostAnswer(id, content, success) {
    fetch(`https://bigfish-aliness.herokuapp.com/questions/${id}/answers`, {
        method: 'POST',
        headers: new Headers({
            'Content-Type': 'application/json',
            'Authorization': JSON.stringify({
                "user_token": {
                  "user_id": localStorage.user_id,
                  "key": localStorage.userkey,
                },                 
              }),
        }),body: JSON.stringify({                       //头部写验证，然后身部发post内容
            'answer':{
                'content':content
            }
        }),
    })
        .then(function (response) {
            if (response.ok) {
                return response.json();
            } else if (response.status === 404) { 
                //fail();                           这里可以写一个fail的回调
                return response.json                      
            }       
        })
        .then(function (data) {
            success();
            console.log(data);
        })
        .catch((error) => {
            console.log('catch' + error);                       
        })
}