import http from "../http-common";

class UserServices {

    login(data) {
        return http.post(`/login?UName=${data.uName}&Pass=${data.pass}`);
    }
}

export default new UserServices();