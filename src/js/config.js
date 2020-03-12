import {isElectron} from './platform'

export default class Config {
    static DEFAULT_PORTRAIT_URL = 'https://static.wildfirechat.cn/user-fallback.png';
    // 如果需要支持音视频通话功能，必须全站使用https(包括app server和im server) + wss，
    // WebSockets over SSL/TLS
    static USE_WSS = false;
    // WSS 的默认端口，其实是443
    static WSS_PORT = 8084;

    static APP_SERVER = 'http://wildfirechat.cn:8888';
    static QR_CODE_PREFIX_PC_SESSION = "wildfirechat://pcsession/";
    static ICE_ADDRESS = 'turn:turn.wildfirechat.cn:3478';
    static ICE_USERNAME = 'wfchat';
    static ICE_PASSWORD = 'wfchat';

    static WEB_APP_ID = 'web_12345678';
    static WEB_APP_KEY = '44889f61b0c4908761953fd178451b4e80308368';

    static MESSAGE_ROAMING = 1;
    // 拉取最近2小时的消息
    static MESSAGE_ROAMING_HOUR_COUNT = 2;

    static getWFCPlatform() {
        if (isElectron()) {
            if (window.process && window.process.platform === 'darwin') {
                // osx
                return 4;
            } else {
                // windows
                return 3;
            }

        } else {
            // web
            return 5;
        }
    }
}
