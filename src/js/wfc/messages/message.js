/**
 * 
    message in json format
    {
        "conversation":{
            "conversationType": 0, 
            "target": "UZUWUWuu", 
            "line": 0, 
        }
        "from": "UZUWUWuu", 
        "content": {
            "type": 1, 
            "searchableContent": "1234", 
            "pushContent": "", 
            "content": "", 
            "binaryContent": "", 
            "localContent": "", 
            "mediaType": 0, 
            "remoteMediaUrl": "", 
            "localMediaPath": "", 
            "mentionedType": 0, 
            "mentionedTargets": [ ]
        }, 
        "messageId": 52, 
        "direction": 1, 
        "status": 5, 
        "messageUid": 75735276990792720, 
        "timestamp": 1550849394256, 
        "to": ""
    }
 */
import Conversation from '../model/conversation'
import NotificationMessageContent from './notification/notificationMessageContent'
import wfc from '../client/wfc'
import MessageConfig from '../client/messageConfig';
import UnknownMessageContent from './unknownMessageContent';
import PersistFlag from './persistFlag';
import MessageStatus from './messageStatus';
import ConversationType from '../model/conversationType';
import { encode } from 'base64-arraybuffer';


export default class Message {
    conversation = {};
    from = '';
    content = {}; // 实际是payload
    messageContent = {};
    messageId = 0;
    direction = 0;
    status = 0;
    messageUid = 0;
    timestamp = 0;
    to = '';

    constructor(conversation, messageContent) {
        this.conversation = conversation;
        this.messageContent = messageContent;
    }

    static fromProtoMessage(obj) {
        let msg = new Message();
        msg.from = obj.fromUser;
        msg.content = obj.content;
        // big integer to number
        // msg.messageId = Number(msg.messageId);
        // if (msg.messageId === -1) {
        //     return null;
        // }

        msg.messageUid = obj.messageId;
        msg.timestamp = Number(obj.serverTimestamp);
        let contentClazz = MessageConfig.getMessageContentClazz(obj.content.type);
        if (contentClazz) {
            let content = new contentClazz();
            try {
                if (obj.content.data && obj.content.data.length > 0) {
                    obj.content.binaryContent = encode(obj.content.data);
                }
                content.decode(obj.content);
                content.extra = obj.content.extra;
                if (content instanceof NotificationMessageContent) {
                    content.fromSelf = msg.from === wfc.getUserId();
                }
            } catch (error) {
                console.log('decode message payload failed, fallback to unkownMessage', obj.content, error);
                let flag = MessageConfig.getMessageContentPersitFlag(obj.content.type);
                if (PersistFlag.Persist === flag || PersistFlag.Persist_And_Count === flag) {
                    content = new UnknownMessageContent(obj.content);
                } else {
                    return null;
                }
            }
            msg.messageContent = content;

        } else {
            console.error('message content not register', obj);
        }


        if (msg.from === wfc.getUserId()) {
            msg.conversation = new Conversation(obj.conversation.type, obj.conversation.target, obj.conversation.line);
            // out
            msg.direction = 0;
            msg.status = MessageStatus.Sent;
        } else {
            if (obj.conversation.type === ConversationType.Single) {
                msg.conversation = new Conversation(obj.conversation.type, obj.fromUser, obj.conversation.line);
            } else {
                msg.conversation = new Conversation(obj.conversation.type, obj.conversation.target, obj.conversation.line);
            }

            // in
            msg.direction = 1;
            msg.status = MessageStatus.Unread;

            if (msg.content.mentionedType === 2) {
                msg.status = MessageStatus.AllMentioned;
            } else if (msg.content.mentionedType === 1) {
                for (const target of msg.content.mentionedTarget) {
                    if (target === wfc.getUserId()) {
                        msg.status = MessageStatus.Mentioned;
                        break;
                    }
                }
            }
        }
        return msg;
    }

    /**
 * Encodes a buffer to a base64 encoded string.
 * @param {Uint8Array} buffer Source buffer
 * @param {number} start Source start
 * @param {number} end Source end
 * @returns {string} Base64 encoded string
 */
    encode(buffer, start, end) {
        var parts = null,
            chunk = [];
        var i = 0, // output index
            j = 0, // goto index
            t;     // temporary
        while (start < end) {
            var b = buffer[start++];
            switch (j) {
                case 0:
                    chunk[i++] = b64[b >> 2];
                    t = (b & 3) << 4;
                    j = 1;
                    break;
                case 1:
                    chunk[i++] = b64[t | b >> 4];
                    t = (b & 15) << 2;
                    j = 2;
                    break;
                case 2:
                    chunk[i++] = b64[t | b >> 6];
                    chunk[i++] = b64[b & 63];
                    j = 0;
                    break;
            }
            if (i > 8191) {
                (parts || (parts = [])).push(String.fromCharCode.apply(String, chunk));
                i = 0;
            }
        }
        if (j) {
            chunk[i++] = b64[t];
            chunk[i++] = 61;
            if (j === 1)
                chunk[i++] = 61;
        }
        if (parts) {
            if (i)
                parts.push(String.fromCharCode.apply(String, chunk.slice(0, i)));
            return parts.join("");
        }
        return String.fromCharCode.apply(String, chunk.slice(0, i));
    };


}