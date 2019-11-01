import ConversationType from "./conversationType";

/**
 * 
        "conversation":{
            "conversationType": 0, 
            "target": "UZUWUWuu", 
            "line": 0, 
        }
 */
export default class Conversation {
    type = ConversationType.Single;
    target = '';
    line = 0;

    constructor(type, target, line) {
        this.type = type;
        this.target = target;
        this.line = line;
    }

    equal(conversation) {
        return this.type === conversation.type
            && this.target === conversation.target
            && this.line === conversation.line;
    }
}