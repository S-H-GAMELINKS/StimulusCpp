import { Controller } from "stimulus";
import axios from "axios";

export default class extends Controller {
    static get targets() {
        return ["chats", "content", "response"];
    }

    connect() {
        this.load();

        if (this.data.has("refreshInterval")) {
            this.startRefreshing()
        }
    }

    load() {
        axios.get(this.data.get("url")).then((res) => {
            this.responseTarget.innerHTML = res.data;
        }, (error) => {
            console.log(error);
        })
    }

    chat() {
        axios.post(this.data.get("url"), `${this.contentTarget.value}`).then((res) => {
            console.log(res);
        }, (error) => {
            console.log(error);
        })
    }

    startRefreshing() {
        this.refreshTimer = setInterval(() => {
          this.load()
        }, this.data.get("refreshInterval"))
    }

    stopRefreshing() {
        if (this.refreshTimer) {
          clearInterval(this.refreshTimer)
        }
    }
}