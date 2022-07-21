import http from "../http-common";

class HidesInvServices {
    getHidesInv() {
        return http.get("/InvHide");
    }

    getPalletId() {
        return http.get("/InvHide/getPallet")
    }

    deletePallet(id) {
        return http.delete(`/InvHide?id=${id}`)
    }
}

export default new HidesInvServices();