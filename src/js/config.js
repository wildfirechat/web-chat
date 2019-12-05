import { isElectron } from './platform'
export default class Config {
    // static APP_SERVER = 'http://wildfirechat.cn:8888';
    // 用于本地打包验证
    static APP_SERVER = 'http://localhost:8888';
    static QR_CODE_PREFIX_PC_SESSION = "wildfirechat://pcsession/";

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
