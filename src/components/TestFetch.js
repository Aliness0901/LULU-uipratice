import React from "react";


export default function TestFetch() {
  let user_id;
  let key;

  function login() {
    fetch('https://bigfish-aliness.herokuapp.com/user_tokens', {
      method: 'POST',
      headers: new Headers({
        'Content-Type': 'application/json'
      }),
      body: JSON.stringify({
        "credential": {
          "email": "i@bigfish.com",
          "password": "Ab123456"
        }
      }),
    })
    .then(function(response) {
      return response.json();
    })
    .then(function(data) {
      console.log("login successfully: " + JSON.stringify(data));
      user_id = data.user_token.user_id;
      key = data.user_token.key;
    });
  }

  function getUserInfo() {
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
    .then(function(response) {
      if (response.status >= 200 && response.status < 300) {      
        return response.json(); 
      }
    })
    .then(function(data) {
      console.log("get user info successfully: " + JSON.stringify(data));
    });
  }

  return (
    <div className="App">
      <div
        style={{width: 300, height: 50, backgroundColor: 'blue', display: 'flex', justifyContent: 'center', alignItems: 'center', color: 'white'}}
        onClick={login}>
        Login
      </div>
      <div
        style={{width: 300, height: 50, backgroundColor: 'purple', display: 'flex', justifyContent: 'center', alignItems: 'center', color: 'white'}}
        onClick={getUserInfo}>
        Get user info
      </div>
    </div>
  );
}
