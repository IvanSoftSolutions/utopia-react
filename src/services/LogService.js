import http from "../http-common";

class LogServices {
    getLogs() {
        return http.get("/Log");
    }
}

export default new LogServices();