export default function PostAnswer(title,content,success) {
    fetch(`https://bigfish-aliness.herokuapp.com/questions`, {
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
            'question':{
                'title':title,
                'content':content
            }
        }),
    })
        .then(function (response) {
            if (response.ok) {
                return response.json();
            } else if (response.status === 404) { 
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