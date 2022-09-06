const axios = require("axios");
const api = require("../configs/api")


class Repository {
    constructor(options = {}) {
        this.BaseURL = api.base_url || "http://localhost:4000/";
        this.headers = options.headers || {};
        this.headers["Content-Type"] = "application/json"

        this.params = {};
        this.ignorePaths = [
            "auth/login",
            "auth/register"
        ]
    }

    setHeader(key, value) {
        this.headers[key] = value;
        return this;
    }

    static name(params) {
        this.headers = {}
        this.headers["Content-Type"] = "application/json"
        console.log(this.headers)
    }

    async get(url, params) {
        try {
            this.headers = {}
            this.headers["Content-Type"] = "application/json"

            let user = localStorage.getItem("user")
            if (user && !this.ignorePaths.includes(url)) {
                user = JSON.parse(user)
                this.headers["Authorization"] = 'Bearer ' + user.token
            }

            url = api.base_url + url;
            params = { ...params } || {};

            const response = await axios.get(url, { params: params, headers: this.headers });
            const status = response.status == 200;
            if (status) {
                return response.data;
            }
        } catch (e) {
            return e;
        }
    }

    async post(url, body, params) {
        try {
            this.headers = {}
            this.headers["Content-Type"] = "application/json"

            let user = localStorage.getItem("user")
            if (user && !this.ignorePaths.includes(url)) {
                user = JSON.parse(user)
                this.headers["Authorization"] = 'Bearer ' + user.token
            }

            url = api.base_url + url;
            params = { ...params } || {};
            body = body || {};
            const response = await axios.post(url, body, { params: params, headers: this.headers });
            const status = response.status == 200;
            // console.log('response', response)
            if (status) {
                return response.data;
            }

        } catch (e) {
            return e;
        }
    }

    async uploadFile(url, body) {
        try {
            this.headers = {}
            this.headers["Content-Type"] = "multipart/form-data"

            let user = localStorage.getItem("user")
            if (user && !this.ignorePaths.includes(url)) {
                user = JSON.parse(user)
                this.headers["Authorization"] = 'Bearer ' + user.token
            }

            url = api.base_url + url;

            body = body || {};
            const response = await axios.post(url, body, { headers: this.headers });
            const status = response.status == 200;
            // console.log('response', response)
            if (status) {
                return response.data;
            }
        } catch (e) {
            return e;
        }

    }



    async getAllDevice() {
        try {
            const response = await this.get("goip_get_status.html");
            if (!response || response?.status?.length === 0) {
                return { code: false };
            }
            let data = response.status.filter((f) => {
                return (
                    f.hasOwnProperty("st") &&
                    (f.st == 3 || f.st == 4) &&
                    f.hasOwnProperty("opr") &&
                    (f.opr !== "" || f.opr !== null)
                );
            });
            return data;
        } catch (e) {
            return e;
        }
    }

    async sendSms(smsList) {
        try {
            const devices = await this.getAllDevice();
            if (devices.length === 0) {
                return {
                    code: false,
                    message: "no slot available",
                };
            }
            // let slot = devices.sort(() => Math.random() - 0.5)[0];
            let slot = devices.map((d) => parseInt(d.port)).join(",");

            let task_num = await redis.incr("task_num");

            let body = {
                type: "send-sms",
                sr_url: `${env.baseUrl}/smtp/notify`,
                task_num: task_num,
                tasks: smsList,
            };

            // // console.log(body)

            const response = await this.post("goip_post_sms.html", {}, body);

            return response;
        } catch (e) {
            return e;
        }
    }
}

module.exports = Repository;