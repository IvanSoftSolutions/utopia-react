import http from "../http-common";

class StockServices {
    getStock() {
        return http.get("/Stock");
    }

    updateStock(data) {
        return http.put(`/Stock?id=${data.id}&qty=${data.qty}`)
    }
}

export default new StockServices();