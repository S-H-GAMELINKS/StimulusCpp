import { Controller } from "stimulus";

export default class extends Controller {
    static get targets() {
        return ["chats", "content"];
    }

    connect() {
        this.update();
    }

    chat() {
        this.chatsTarget.innerHTML += `<p>${this.contentTarget.value}</p>`;
        this,update();
    }

    update() {
        window.location.reload();
    }
}