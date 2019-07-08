function setUser(user) {
    localStorage.setItem("USER", JSON.stringify(user));
}

function getUser() {
    return JSON.parse(localStorage.getItem("USER"));
}


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

function performLogin(username, password, success, error) {
    console.log(username);
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
        alert('Erro!');
    });
}



function getSilos(success, error) {
    axiosInstance.get('/silo/', {}).then(function (response) {
        var data = response.data;
        if (data.success) {
            success(data.silos);
        } else {
            error(data.error);
        }
    }).catch(function (re) {
        alert('DEU ERRO!');
    });
}

//
// function saveSilo(volume, humidity, temperature, success, error) {
//     var body = {
//         volume: volume,
//         humidity: humidity,
//         temperature: temperature,
//     };
//
//     axiosInstance.post('/silo/', body).then(function (response) {
//         var data = response.data;
//
//         if (data.success) {
//             success(data.silo);
//         } else {
//             error(data.error);
//         }
//     }).catch(function (re) {
//         alert('Erro!');
//     });
// }
