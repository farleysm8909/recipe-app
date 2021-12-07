class Message {
    constructor(message, type) {
        this.message = message;
        this.type = type;
    }

    sendMessage() {
        return this.type + '(\"' + this.message + '\")'
    }

}

export { Message };