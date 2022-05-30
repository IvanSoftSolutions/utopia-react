import http from "../http-common";

class UserServices {
    get(id) {
        return http.get(`/User/${id}`);
    }

    getAll() {
        return http.get("/User");
    }

    create(data) {
        return http.post("/User", data);
    }

    update(id, data) {
        return http.put(`/User/${id}`, data);
    }

    delete(id) {
        return http.delete(`/User/${id}`);
    }

    login(data) {
        return http.post(`/login?UName=${data.uName}&Pass=${data.pass}`);
    }
}

export default new UserServices();