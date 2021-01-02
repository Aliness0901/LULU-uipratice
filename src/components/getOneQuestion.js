export default function getQustion(id,success) {
    fetch(`https://bigfish-aliness.herokuapp.com/questions/${id}`, {
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
            }
        })
        .then(function (data) {
            success(data.question);
        })
}
