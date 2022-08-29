import http from "../http-common";

class ConceptosMaquilasServices {
    getConceptosMaquilas() {
        return http.get("/ConceptosMaquila");
    }

    newConceptosMaquila(data) {
        return http.post("/ConceptosMaquila/", data)
    }

    ConceptosMaquilaUpdate(data) {
        return http.put(`/ConceptosMaquila?id=${data.id}&column=${data.column}&value=${data.value}`)
    }

}

export default new ConceptosMaquilasServices();