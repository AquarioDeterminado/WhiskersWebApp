export function keepAuthInfo(username, authKey) {
    localStorage.setItem("username", username);
    localStorage.setItem("token", authKey);
}

export function getAuthInfo() {
    let authInfo = {
        username: localStorage.getItem("username"),
        token: localStorage.getItem("token")
    }

    return authInfo;
}
