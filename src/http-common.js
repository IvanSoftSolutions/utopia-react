import axios from "axios";

export default axios.create({
    baseURL: "https://localhost:7213/api",
    // baseURL: "http://salon-api-dev.us-east-2.elasticbeanstalk.com/api",
    headers: {
        "Content-type": "application/json"
    }
});