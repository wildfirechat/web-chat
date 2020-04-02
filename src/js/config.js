import {isElectron} from './platform'

export default class Config {
    // 是否支持多人音视频通话
    static ENABLE_MULTI_VOIP_CALL = false;
    // 是否支持1对1音视频通话
    static ENABLE_SINGLE_VOIP_CALL = true;

    static DEFAULT_PORTRAIT_URL = 'https://static.wildfirechat.cn/user-fallback.png';
    // 如果需要支持音视频通话功能，必须全站使用https(包括app server和im server) + wss，
    // WebSockets over SSL/TLS，启用https时，一定要配置为true；不启用https，可为false
    static USE_WSS = true;
    // WSS 端口
    static WSS_PORT = 8084;

    // APP SERVER的地址，启用https时，APP SERVER也需要支持https
    // 默认的app server使用端口是8888
    static APP_SERVER = 'https://app.wildfirechat.cn';
    static QR_CODE_PREFIX_PC_SESSION = "wildfirechat://pcsession/";
    static ICE_ADDRESS = 'turn:turn.wildfirechat.cn:3478';
    static ICE_USERNAME = 'wfchat';
    static ICE_PASSWORD = 'wfchat';
    static LANGUAGE = 'zh_CN';

    // appId和appKey和专业版im server是绑定的，一定要做对应修改
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
