export default function GetQustion() {
    fetch('https://bigfish-aliness.herokuapp.com/questions', {
        method: 'GET',
        headers: new Headers({
            'Content-Type': 'application/json'
        })
    })
        .then(function (response) {
            return response.json();
        })
        .then(function (data) {
            console.log(data);
        });
}
