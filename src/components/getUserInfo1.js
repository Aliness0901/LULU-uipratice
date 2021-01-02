import { userDataDetail } from '../pages/Profile'

export default function getUserInfo(user_id, key, success) {
  fetch('https://bigfish-aliness.herokuapp.com/user', {
    method: 'GET',
    headers: new Headers({
      'Content-Type': 'application/json',
      'Authorization': JSON.stringify({
        "user_token": {
          "user_id": user_id,
          "key": key,
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
        userDataDetail.detail = data.user
        success();
    })
}



