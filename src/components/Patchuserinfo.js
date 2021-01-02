export default function Patchuserinfo(userInfo) {
    fetch('https://bigfish-aliness.herokuapp.com/user', {
        method: 'PATCH',
        headers: new Headers({
            'Content-Type': 'application/json',
            'Authorization': JSON.stringify({
                "user_token": {
                  "user_id": localStorage.userID,
                  "key": localStorage.userKey,
                },                 
              }),                  
        }),
        body: JSON.stringify({
            'user': userInfo
        }),
    })            
        .then(function (response) {
            if (response.status >= 200 && response.status < 300) {      
                return response.json();
              }
            else if (response.status>300) {
                return response.json();
            }
        })
        .then(function (data) {
            console.log("login successfully: " + JSON.stringify(data));
        });
}



