import http from "../http-common";

class HidesInvServices {
    getHidesInv() {
        return http.get("/InvHide");
    }

    getPalletId() {
        return http.get("/InvHide/getPallet")
    }
}

export default new HidesInvServices();