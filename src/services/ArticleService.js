import http from "../http-common";

class ArticleServices {
    getArticles() {
        return http.get("/Article");
    }
}

export default new ArticleServices();