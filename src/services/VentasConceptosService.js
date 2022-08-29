import http from "../http-common";

class SalesConceptosServices {
    getSalesConceptos() {
        return http.get("/ConceptosVenta");
    }

    newSalesConcepto(data) {
        return http.post("/ConceptosVenta/", data)
    }

    saleConceptoUpdate(data) {
        return http.put(`/ConceptosVenta?id=${data.id}&column=${data.column}&value=${data.value}`)
    }

}

export default new SalesConceptosServices();