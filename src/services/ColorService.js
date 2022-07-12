import http from "../http-common";

class ColorServices {
    getColors() {
        return http.get("/Color");
    }
}

export default new ColorServices();