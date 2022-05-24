import http from "../http-common";

class StockServices {
    getStock() {
        return http.get("/Stock");
    }
}

export default new StockServices();