import http from "../http-common";

class EngrasesServices {
    getEngrases() {
        return http.get("/Engrases");
    }
}

export default new EngrasesServices();