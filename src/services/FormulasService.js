import http from "../http-common";

class FormulasServices {
    getFormula(f_name) {
        return http.get(`Formula/getFormula/${f_name}`);
    }

    postLog(data) {
        return http.post("/Formula", data)
    }
}

export default new FormulasServices();