import MessageContent from '../messages/messageContent';
import MessageStatus from '../messages/messageStatus';
import Conversation from '../model/conversation';
//import impl from '../internal/wfcImpl';
import impl from '../proto/proto.min.js';
import ImageMessageContent from '../messages/imageMessageContent';
import ConversationType from '../model/conversationType';
import Message from '../messages/message';
import { EventEmitter } from 'events';

// 其实就是imclient，后续可能需要改下名字
export class WfcManager {
    // impl = new WfcImpl();
    eventEmiter = new EventEmitter();

    constructor() {
        impl.eventEmiter = this.eventEmiter;
    }

    /**
     * 
     * @param {messagecontent} content 
     */
    registerMessageContent(name, type, contentClazz) {
        impl.registerMessageContent(name, type, contentClazz);
    }

    disconnect() {
        impl.disconnect();
    }

    getClientId() {
        return impl.getClientId();
    }

    getUserId() {
        return impl.getUserId();
    }

    getServerDeltaTime() {
        return impl.getServerDeltaTime();
    }

    isLogin() {
        return impl.isLogin();
    }

    getConnectionStatus() {
        return impl.getConnectionStatus();
    }

    getMyGroupList() {
        return impl.getMyGroupList();
    }

    getUserInfo(userId, refresh = false) {
        return impl.getUserInfo(userId, refresh);
    }

    getUserInfos(userIds, groupId) {
        return impl.getUserInfos(userIds, groupId);
    }

    async searchUser(keyword, successCB, failCB) {
        impl.searchUser(keyword, successCB, failCB);
    }

    searchFriends(keyword) {
        return impl.searchFriends(keyword);
    }

    searchGroups(keyword) {
        return impl.searchGroups(keyword);
    }

    getIncommingFriendRequest() {
        return impl.getIncommingFriendRequest();
    }

    getOutgoingFriendRequest() {
        return impl.getOutgoingFriendRequest();
    }

    loadFriendRequestFromRemote() {
        return impl.loadFriendRequestFromRemote();
    }

    getUnreadFriendRequestCount() {
        return impl.getUnreadFriendRequestCount();
    }

    clearUnreadFriendRequestStatus() {
        return impl.clearUnreadFriendRequestStatus();
    }

    async deleteFriend(userId, successCB, failCB) {
        impl.deleteFriend(userId, successCB, failCB);
    }

    async handleFriendRequest(userId, accept, successCB, failCB) {
        impl.handleFriendRequest(userId, accept, successCB, failCB);
    }

    isBlackListed(userId) {
        return impl.isBlackListed(userId);
    }

    getBlackList() {
        return impl.getBlackList();
    }

    setBlackList(userId, block, successCB, failCB) {
        impl.setBlackList(userId, block, successCB, failCB);
    }

    getMyFriendList(fresh = false) {
        return impl.getMyFriendList(fresh);
    }

    async createGroup(groupId, groupType, name, portrait, memberIds = [], lines = [0], notifyContent, successCB, failCB) {
        impl.createGroup(groupId, groupType, name, portrait, memberIds, lines, notifyContent, successCB, failCB);
    }

    async setGroupManager(groupId, isSet, memberIds, lines, notifyMessageContent, successCB, failCB) {
        impl.setGroupManager(groupId, isSet, memberIds, lines, notifyMessageContent, successCB, failCB);
    }

    getGroupInfo(groupId, refresh = false) {
        return impl.getGroupInfo(groupId, refresh);
    }


    addGroupMembers(groupId, memberIds, notifyLines, notifyMessageContent, successCB, failCB) {
        impl.addGroupMembers(groupId, memberIds, notifyLines, notifyMessageContent, successCB, failCB);
    }

    getGroupMemberIds(groupId, fresh = false) {
        return impl.getGroupMemberIds(groupId, fresh);
    }

    getGroupMembers(groupId, fresh = false) {
        return impl.getGroupMembers(groupId, fresh);
    }

    getGroupMember(groupId, memberId) {
        return impl.getGroupMember(groupId, memberId);
    }

    kickoffGroupMembers(groupId, memberIds, notifyLines, notifyMsg, successCB, failCB) {
        impl.kickoffGroupMembers(groupId, memberIds, notifyLines, notifyMsg, successCB, failCB);
    }

    async quitGroup(groupId, lines, notifyMessageContent, successCB, failCB) {
        impl.quitGroup(groupId, lines, notifyMessageContent, successCB, failCB);
    }

    async dismissGroup(groupId, lines, notifyMessageContent, successCB, failCB) {
        impl.dismissGroup(groupId, lines, notifyMessageContent, successCB, failCB);
    }

    async modifyGroupInfo(groupId, type, newValue, lines, notifyMessageContent, successCB, failCB) {
        impl.modifyGroupInfo(groupId, type, newValue, lines, notifyMessageContent, successCB, failCB);
    }

    async modifyGroupAlias(groupId, alias, lines, notifyMessageContent, successCB, failCB) {
        impl.modifyGroupAlias(groupId, alias, lines, notifyMessageContent, successCB, failCB);
    }

    transferGroup(groupId, newOwner, lines, notifyMessageContent, successCB, failCB) {
        impl.transferGroup(groupId, newOwner, lines, notifyMessageContent, successCB, failCB);
    }

    getFavGroups() {
        return impl.getFavGroups();
    }

    isFavGroup(groupId) {
        return impl.isFavGroup(groupId);
    }

    async setFavGroup(groupId, fav, successCB, failCB) {
        impl.setFavGroup(groupId, fav, successCB, failCB);
    }

    getUserSetting(scope, key) {
        return impl.getUserSetting(scope, key);
    }

    getUserSettings(scope) {
        return impl.getUserSettings(scope);
    }

    async setUserSetting(scope, key, value, successCB, failCB) {
        impl.setUserSetting(scope, key, value, successCB, failCB);
    }

    modifyMyInfo(modifyMyInfoEntries, successCB, failCB) {
        impl.modifyMyInfo(entries, successCB, failCB);
    }

    isGlobalSlient() {
        impl.isGlobalSlient();
    }

    async setGlobalSlient(silent, successCB, failCB) {
        impl.setGlobalSlient(silent, successCB, failCB);
    }

    isHiddenNotificationDetail() {
        impl.isHiddenNotificationDetail();
    }

    async setHiddenNotificationDetail(hide, successCB, failCB) {
        impl.setHiddenNotificationDetail(hide, successCB, failCB);
    }

    isHiddenGroupMemberName(groupId) {
        return impl.isHiddenGroupMemberName(groupId);
    }

    async setHiddenGroupMemberName(groupId, hide, successCB, failCB) {
        impl.setHiddenGroupMemberName(groupId, hide, successCB, failCB);
    }

    async joinChatroom(chatroomId, successCB, failCB) {
        impl.joinChatroom(chatroomId, successCB, failCB);
    }

    async quitChatroom(chatroomId, successCB, failCB) {
        impl.quitChatroom(chatroomId, successCB, failCB);
    }

    async getChatroomInfo(chatroomId, updateDt, successCB, failCB) {
        impl.getChatroomInfo(chatroomId, updateDt, successCB, failCB);
    }

    async getChatroomMemberInfo(chatroomId, maxCount, successCB, failCB) {
        impl.getChatroomMemberInfo(chatroomId, maxCount, successCB, failCB);
    }

    createChannel(name, portrait, status, desc, extra, successCB, failCB) {
        impl.createChannel(name, portrait, status, desc, extra, successCB, failCB);
    }

    getChannelInfo(channelId, refresh) {
        return this.getChannelInfo(channelId, refresh);
    }

    async modifyChannelInfo(channelId, type, newValue, successCB, failCB) {
        impl.modifyChannelInfo(channelId, type, newValue, successCB, failCB);
    }

    searchChannel(keyword, successCB, failCB) {
        impl.searchChannel(keyword, successCB, failCB);
    }

    isListenedChannel(channelId) {
        return impl.isListenedChannel(channelId);
    }

    async listenChannel(channelId, listen, successCB, failCB) {
        impl.listenChannel(channelId, listen, successCB, failCB);
    }

    // return channelIds
    getMyChannels() {
        return impl.getMyChannels();
    }

    getListenedChannels() {
        return impl.getListenedChannels();
    }

    async destoryChannel(channelId, successCB, failCB) {
        impl.destoryChannel(channelId, successCB, failCB);
    }

    getConversationList(types, lines) {
        return impl.getConversationList(types, lines);
    }

    getConversationInfo(conversation) {
        return impl.getConversationInfo(conversation);
    }

    searchConversation(keyword, types = [], lines = []) {
        return impl.searchConversation(keyword, types, lines);
    }

    async removeConversation(conversation, clearMsg) {
        impl.removeConversation(conversation, clearMsg);
    }

    setConversationTop(conversation, top, successCB, failCB) {
        impl.setConversationTop(conversation, top, successCB, failCB);
    }

    setConversationSlient(conversation, silent, successCB, failCB) {
        impl.setConversationSlient(conversation, silent, successCB, failCB);
    }

    setConversationDraft(conversation, draft = '') {
        impl.setConversationDraft(conversation, draft);
    }

    getUnreadCount(types = [0, 1, 2], lines = [0]) {
        return impl.getUnreadCount(types, lines);
    }

    getConversationUnreadCount(conversation) {
        return impl.getConversationUnreadCount(conversation);
    }

    clearConversationUnreadStatus(conversation) {
        impl.clearConversationUnreadStatus(conversation);
    }

    clearAllUnreadStatus() {
        impl.clearAllUnreadStatus();
    }

    setMediaMessagePlayed(messageId) {
        return 'no implement'
        // impl.setMediaMessagePlayed(messageId);
    }

    isMyFriend(userId) {
        return impl.isMyFriend(userId);
    }

    async sendFriendRequest(userId, reason, successCB, failCB) {
        impl.sendFriendRequest(userId, reason, successCB, failCB);
    }

    /**
     * 
     * @param {Conversation} conversation
     * @param {number} fromIndex 
     * @param {boolean} before 
     * @param {number} count 
     * @param {string} withUser 
     */
    getMessages(conversation, fromIndex, before = true, count = 20, withUser = '') {
        return impl.getMessages(conversation, fromIndex, before, count, withUser);
    }

    loadRemoteMessages(conversation, beforeUid, count, successCB, failCB) {
        impl.loadRemoteMessages(conversation, beforeUid, count, successCB, failCB);
    }

    getMessageById(messageId) {
        return impl.getMessageById(messageId);
    }

    getMessageByUid(messageUid) {
        return impl.getMessageByUid(messageUid);
    }

    searchMessage(conversation, keyword) {
        return impl.searchMessage(conversation, keyword);
    }

    async sendConversationMessage(conversation, messageContent, toUsers, preparedCB, progressCB, successCB, failCB) {
        impl.sendConversationMessage(conversation, messageContent, toUsers, preparedCB, progressCB, successCB, failCB);
    }

    async sendMessage(message, preparedCB, progressCB, successCB, failCB) {
        impl.sendMessage(message, preparedCB, progressCB, successCB, failCB);
    }

    // toUsers 用来实现定向消息
    async sendMessageEx(message, toUsers = [], preparedCB, progressCB, successCB, failCB) {
        impl.sendMessageEx(message, toUsers, preparedCB, progressCB, successCB, failCB);
    }

    // 更新了原始消息的内容
    async recallMessage(messageUid, successCB, failCB) {
        impl.recallMessage(messageUid, successCB, failCB);
    }

    deleteMessage(messageId) {
        impl.deleteMessageById(messageId);
    }

    async clearMessages(conversation) {
        impl.clearMessages(conversation);
    }

    /**
     * 
     * @param {Conversation} conversation 
     * @param {MessageContent} messageContent 
     * @param {MessageStatus} status 
     * @param {boolean} notify 是否触发onReceiveMessage
     * @param {Number} serverTime 服务器时间，精度到毫秒
     */
    insertMessage(conversation, messageContent, status, notify = false, serverTime = 0) {
        impl.insertMessage(conversation, messageContent, status, notify, serverTime);
    }

    async updateMessageContent(messageId, messageContent) {
        impl.updateMessageContent(messageId, messageContent);
    }

    async uploadMedia(data, mediaType, successCB, failCB, progressCB) {
        impl.uploadMedia(data, mediaType, successCB, failCB, progressCB);
    }

    // 一定需要带上http://或者 wx://
    // 网页 http://pc.wildfirechat.cn
    // 微信小程序 wx://pc.wildifirechat.cn
    connect(appId, appKey, host, port, userId, clientId, token) {
        impl.connect(appId, appKey, host, port, userId, clientId, token);
    }

    async testSendImageMessage(file, thumbnail) {
        let imgMsg = new ImageMessageContent(file, thumbnail);
        let conv = new Conversation(ConversationType.Single, 'uiuJuJcc', 0);
        let msg = new Message(conv, imgMsg);

        let retValue = this.sendMessage(msg, function (messageId, timestamp) { //preparedCB
            console.log("sendMessage prepared:", messageId, timestamp);
        }, function (uploaded, total) { //progressCB
            console.log("sendMessage progress:", uploaded, total);
        }, function (messageUid, timestamp) { //successCB
            console.log("sendMessage success:", messageUid, timestamp);
        }, function (errorCode) { //errorCB
            console.log("sendMessage failed:", errorCode);
        });
        console.log("call sendMessage return:", retValue);
    }
}
// global.WfcManager = WfcManager;

const self = new WfcManager();
// global.WfcManager = self;
export default self;

// //remote
var username = 'GNMtGtZZ';
var clientId = '78E616BC-1F7C-405F-AB16-41539EA89150';
var token = 'Ni3ya43aML2x3fTWKwAsCuRE4SZpFi8ZDgqqgbmSfkWES0hIx6d8gvmFRIjT2Unhm6Et+wOV632kQrjMQTSo5Mu6u2yAL5fp0MVhI5E8Ln0/eohOsEK1JsFJfrc292l/9lrwgmCkqc7VhLcuYy/GEW6l2Db/rLXIkRMM2nSpYPE=';
var host = 'wildfirechat.cn';
var shortPort = 80;

// local
// var username = 'MUMmMm55'
// var clientId = '78E616BC-1F7C-405F-AB16-41539EA89150';
// var token = 'qQCBJD7nr31gtUB5zm4Oewhn3ec7Uxuw9aFJm7vwgNa9ZsYH0BQNgPjm4p9HNktC9t9kglUhoJokg2JzHkWJVuqqKNltOe5JWVNXf3qmvwQsogRYPErO6dxFhdRtx+ypgujYMJ9ZlRjZdJww0g55rwomXP9iWMjtupk9TxbnJgI='
// var host = '192.168.0.158';
// var shortPort = 80;


// self.connect(host, shortPort, username, token)
// self.impl.connect(host, username, clientId, token);
