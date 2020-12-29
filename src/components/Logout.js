export default function PostAnswer(sucess) {
    fetch(`https://bigfish-aliness.herokuapp.com/user_token`, {
        method: 'DELETE',
        headers: new Headers({
            'Content-Type': 'application/json',
            'Authorization': JSON.stringify({
                "user_token": {
                  "user_id": localStorage.user_id,
                  "key": localStorage.userkey,
                },                 
              }),
        })
    })
        .then(function (response) {
            if (response.ok) {
                sucess();
                return response.json();
            } else if (response.status === 404) { 
                //fail();                           这里可以写一个fail的回调
                return response.json                      
            }       
        })
        .then(function (data) {
            console.log(data);
        })
        .catch((error) => {
            console.log('catch' + error);                       
        })
}