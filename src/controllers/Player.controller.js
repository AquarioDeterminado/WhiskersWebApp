function sendSingUpRequest(newUser, after) {
    console.log(newUser);

    const request =  new Request('http://' + process.env.REACT_APP_API_URL + ':' + process.env.REACT_APP_API_PORT + '/register/', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(newUser),
    });

    var status = 0;
    fetch(request)
        .then((res) => {
            status = res.status;
            return res.json()
        })
        .then((data) => {
            console.log(data);
            after(data, status);
        });
}

function sendLogInRequest(logInInfo, after) {
    console.log(logInInfo);

    const request =  new Request('http://' + process.env.REACT_APP_API_URL + ':' + process.env.REACT_APP_API_PORT + '/login/', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(logInInfo),
    });

    var status = 0;
    fetch(request)
        .then((res) => {
            console.log(res.headers.get('Authorization'));
            status = res.status;
            return res.json()
        })
        .then((data) => {
            console.log(data);
            after(data, status);
        });
}

export {sendSingUpRequest, sendLogInRequest}