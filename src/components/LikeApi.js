

export default function getuserInfo(questionID,success,fail){
    fetch(`https://bigfish-aliness.herokuapp.com/questions/${questionID}/like`, {
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
      if (response.status >= 200 && response.status < 300) {      //这里用这个的意思就是如果用户想要查看的时候，不存在，就会返回
        return response.json(); //等待所有后续的报文，第二个事情就是等待所有js的对象
      }else if (response.status>300){
            fail();
          return response.json();
      }
    })
    .then(function(data) {
        console.log(JSON.stringify(data));
      success();                    //这里的回调函数应该是让likebutton中的state加1显示，
    });
}