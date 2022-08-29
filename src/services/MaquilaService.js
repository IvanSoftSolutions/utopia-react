import http from "../http-common";

class MaquilasServices {
    getMaquilas() {
        return http.get("/Maquila");
    }

    newMaquila(data) {
        return http.post("/Maquila/", data)
    }

    maquilaUpdate(data) {
        return http.put(`/Maquila?id=${data.id}&column=${data.column}&value=${data.value}`)
    }

}

export default new MaquilasServices();