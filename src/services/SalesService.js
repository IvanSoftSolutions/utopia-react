import http from "../http-common";

class SalesServices {
    getSales() {
        return http.get("/Sales");
    }

    newSale(data) {
        return http.post("/Sales/", data)
    }

    saleUpdate(data) {
        return http.put(`/Sales?id=${data.id}&column=${data.column}&value=${data.value}`)
    }

}

export default new SalesServices();