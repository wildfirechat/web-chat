export default class EventType {
    // function (message) {}
    static SendMessage = 'sendMsg';
    // function (message) {}
    static ReceiveMessage = 'receiveMsg';
    // function (Map(userId, receiveTime)) {}
    static MessageReceived = 'msgReceived';
    // function ([readEntry]) {}
    static MessageRead = 'msgRead';
    // function (operator, messageUid) {}
    static RecallMessage = 'recallMsg';
    // function (messageId) {}
    static DeleteMessage = 'deleteMsg';
    // function (message) {}
    static MessageStatusUpdate = 'msgStatusUpdate';
    // function (connectionStatus) {}
    static ConnectionStatusChanged = 'connectionStatusChanged';
    // function (userInfos) {}
    static UserInfosUpdate = 'userInfosUpdate';
    // function (channelInfos) {}
    static ChannelInfosUpdate = 'channelInfosUpdate';
    // function (groupInfos) {}
    static GroupInfosUpdate = 'groupInfosUpdate';
    // function (updatedFriendIds) {}
    static FriendListUpdate = 'friendListUpdate';
    // function () {}
    static FriendRequestUpdate = 'friendRequestUpdate';
    // function (conversationInfo) {}
    static ConversationInfoUpdate = 'conversationInfoUpdate';
    // function () {}
    static SettingUpdate = 'settingUpdate';
    // function (groupId) {}
    static GroupMembersUpdate = 'groupMembersUpdate';
}
