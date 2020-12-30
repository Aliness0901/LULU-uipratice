import { otheruserdatadetail } from '../views/OtherUserPro'

export default function getuserInfo(otheruserid,successother,) {
    fetch('https://bigfish-aliness.herokuapp.com/user', {
      method: 'GET',
      headers: new Headers({
        'Content-Type': 'application/json',
        'Authorization': JSON.stringify({
          "user_token": {
            "user_id": localStorage.user_id,
            "key": localStorage.key,
          },
        }),
      }),
    })
      .then(function(){
          //************************************************************* */
          fetch(`https://bigfish-aliness.herokuapp.com/users/${otheruserid}`, {
            method: 'GET',
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
          .then(function (response) {
            if (response.status >= 200 && response.status < 300) {      
              return response.json(); 
            }
          })
          .then(function (data) {
            otheruserdatadetail.detail=data.user
            successother();
            console.log(otheruserdatadetail.detail);
          })
      })
  }