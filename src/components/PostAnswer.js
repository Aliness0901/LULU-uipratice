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
        }),body: JSON.stringify({                       
            'answer':{
                'content':content
            }
        }),
    })
        .then(function (response) {
            if (response.ok) {
                return response.json();
            } else if (response.status === 404) { 
                return response.json()                      
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