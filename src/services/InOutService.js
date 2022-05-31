import http from "../http-common";

class InOutServices {

    getInOuts() {
        return http.get("/InOut");
    }

    postInOut(data) {
        return http.post("/InOut/", data);
    }
}

export default new InOutServices();