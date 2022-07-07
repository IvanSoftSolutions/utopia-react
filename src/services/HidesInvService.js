import http from "../http-common";

class HidesInvServices {
    getHidesInv() {
        return http.get("/InvHide");
    }
}

export default new HidesInvServices();