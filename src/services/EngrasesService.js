import http from "../http-common";

class EngrasesServices {
    getEngrases() {
        return http.get("/Engrases");
    }

    newEngrase(data) {
        return http.post("/Engrases/", data)
    }

    engraseUpdate(data) {
        return http.put(`/Engrases?id=${data.id}&column=${data.column}&value=${data.value}`)
    }
}

export default new EngrasesServices();