import http from "../http-common";

class InOutServices {

    getInOuts() {
        return http.get("/InOut");
    }

    postInOut(data) {
        return http.post("/InOut/", data);
    }

    postInOutName(data, pName) {
        return http.post(`/InOut/AddByName?name=${pName}`, data);
    }
}

export default new InOutServices();