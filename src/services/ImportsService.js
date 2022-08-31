import http from "../http-common";

class ImportsServices {
    getImports() {
        return http.get("/Imports");
    }

    newImport(data) {
        return http.post("/Imports/", data)
    }

    ImportUpdate(data) {
        return http.put(`/Imports?id=${data.id}&column=${data.column}&value=${data.value}`)
    }

}

export default new ImportsServices();