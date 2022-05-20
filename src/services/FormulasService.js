import http from "../http-common";

class FormulasServices {
    getFormula(f_name) {
        return http.get(`Formula/getFormula/${f_name}`);
    }
}

export default new FormulasServices();