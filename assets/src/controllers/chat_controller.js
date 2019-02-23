import { Controller } from "stimulus";

export default class extends Controller {
    static get targets() {
        return ["chats", "content"];
    }

    chat() {
        this.chatsTarget.innerHTML += `<p>${this.contentTarget.value}</p>`;
        this.contentTarget.value = ""
    }
}