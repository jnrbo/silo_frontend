// axios - usado para fazer requisicoes
var axiosInstance = axios.create({
    baseURL: 'http://localhost:3000',
    timeout: 1000,
    crossDomain: true,
    headers: {
        "Auth": getUser() ? getUser().token : "",
        "Access-Control-Allow-Origin": "*",
        "Access-Control-Allow-Headers": "Auth",
    },
});

// axiosInstance came from app.js

function setUser(user) {
    localStorage.setItem("USER", JSON.stringify(user));
}

function getUser() {
    return JSON.parse(localStorage.getItem("USER"));
}

function performLogin(username, password, success, error) {
    axiosInstance.get('/user/login', {
        params: {
            username: username,
            password: password
        }
    }).then(function (response) {
        var data = response.data;
        if (data.success) {
            data.user.token = data.token; // set token to user
            success(data.user);
        } else {
            error(data.error);
        }
    }).catch(function (re) {
        loginPage()
    });
}



function getSilos() {
    var arrays = [];

    arrays.push(
        {
            temperature: 20,
            humidity: 15,
            volume: 49,
            date: '2019-07-20'
        }

    );

    arrays.push({
        temperature: 14,
        humidity: 13,
        volume: 59,
        date: '2019-07-21'
    });

    arrays.push({
        temperature: 16,
        humidity: 14,
        volume: 32,
        date: '2019-07-22'
    });

    return arrays;
}