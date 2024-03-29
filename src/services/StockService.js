import http from "../http-common";

class StockServices {
    getStock() {
        return http.get("/Stock");
    }

    newChemical(data) {
        return http.post("/Stock/", data)
    }

    updateStock(data) {
        return http.put(`/Stock?id=${data.id}&qty=${data.qty}`)
    }

    addStock(data) {
        return http.put(`/Stock/addStock?name=${data.name}&qty=${data.qty}`)
    }

    editStock(data) {
        return http.put(`/Stock/editStock?id=${data.id}&column=${data.column}&value=${data.value}`)
    }

}

export default new StockServices();