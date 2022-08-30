import axios from "axios";

export default axios.create({
    // baseURL: "https://localhost:7213/api",
    baseURL: "http://utopia-api.us-east-2.elasticbeanstalk.com/api",
    headers: {
        "Content-type": "application/json"
    }
});