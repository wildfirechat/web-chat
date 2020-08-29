
import React, { Component } from 'react';
import { observer, inject } from 'mobx-react';
import { ipcRenderer, remote, isElectron } from '../../platform';

import classes from './Layout.css';
import Header from './Header';
import Footer from './Footer';
// import Login from './Login';
import Chats from './Home/Chats';
import UserInfo from './UserInfo';
import AddFriend from './AddFriend';
import NewChat from './NewChat';
import Members from './Members';
import AddMember from './AddMember';
import OverallUserCard from './OverallUserCard';
import Forward from './Forward';
import ConfirmImagePaste from './ConfirmImagePaste';
import Loader from 'components/Loader';
import Snackbar from 'components/Snackbar';
import Offline from 'components/Offline';
import Login from './Login';
import wfc from '../../wfc/client/wfc'
import { observable, action } from 'mobx';
import EventType from '../../wfc/client/wfcEvent';
import ConnectionStatus from '../../wfc/client/connectionStatus';
import clazz from 'classname';
import Screenshot from "react-screenshots";
import html2canvas from "html2canvas";

@inject(stores => ({
    isLogin: () => !!stores.sessions.auth,
    loading: stores.sessions.loading,
    message: stores.snackbar.text,
    show: stores.snackbar.show,
    process: stores.chat.process,
    reconnect: stores.sessions.checkTimeout,
    close: () => stores.snackbar.toggle(false),
    canidrag: () => !!stores.chat.conversation && !stores.batchsend.show,
}))
@observer
export default class Layout extends Component {
    @observable connectionStatus = 0;


    state = {
        offline: false,
        showScreenshot: false,
        image: null
    };

    componentDidMount() {
        if (isElectron()) {
            var templates = [
                {
                    label: 'Undo',
                    role: 'undo',
                }, {
                    label: 'Redo',
                    role: 'redo',
                }, {
                    type: 'separator',
                }, {
                    label: 'Cut',
                    role: 'cut',
                }, {
                    label: 'Copy',
                    role: 'copy',
                }, {
                    label: 'Paste',
                    role: 'paste',
                }, {
                    type: 'separator',
                }, {
                    label: 'Select all',
                    role: 'selectall',
                },
            ];
            var menu = new remote.Menu.buildFromTemplate(templates);

            document.body.addEventListener('contextmenu', e => {
                e.preventDefault();

                let node = e.target;

                while (node) {
                    if (node.nodeName.match(/^(input|textarea)$/i)
                        || node.isContentEditable) {
                        menu.popup(remote.getCurrentWindow());
                        break;
                    }
                    node = node.parentNode;
                }
            });
        }

        var canidrag = this.props.canidrag;
        // window.addEventListener('offline', () => {
        //     this.setState({
        //         offline: true,
        //     });
        // });

        // window.addEventListener('online', () => {
        //     // Reconnect to wechat
        //     this.props.reconnect();
        //     this.setState({
        //         offline: false,
        //     });
        // });


        if (window.process && window.process.platform != 'darwin') {
            document.body.classList.add('isWin');
        }

        window.ondragstart = e => {
            e.dataTransfer.setData('text/plain', '')
            console.log('drag start.......');
        }

        window.ondragover = e => {
            if (this.props.canidrag()) {
                this.refs.holder.classList.add(classes.show);
                this.refs.viewport.classList.add(classes.blur);
            }

            // If not st as 'copy', electron will open the drop file
            e.dataTransfer.dropEffect = 'copy';
            return false;
        };

        window.ondragleave = () => {
            console.log('drag leave.......');
            if (!this.props.canidrag()) return false;

            this.refs.holder.classList.remove(classes.show);
            this.refs.viewport.classList.remove(classes.blur);
        };

        window.ondragend = e => {
            console.log('drag end.......');
            return false;
        };

        window.ondrop = e => {
            console.log('on drop......');
            var files = e.dataTransfer.files;
            e.preventDefault();
            e.stopPropagation();

            if (files.length && this.props.canidrag()) {
                Array.from(files).map(e => this.props.process(e));
            }

            this.refs.holder.classList.remove(classes.show);
            this.refs.viewport.classList.remove(classes.blur);
            return false;
        };
    }

    dataURLtoBlob(dataurl) {
        var arr = dataurl.split(','), mime = arr[0].match(/:(.*?);/)[1],
            bstr = atob(arr[1]), n = bstr.length, u8arr = new Uint8Array(n);
        while(n--){
            u8arr[n] = bstr.charCodeAt(n);
        }
        return new Blob([u8arr], {type:mime});
    }

    onStartScreenshot = ()=>{
        html2canvas(document.body).then((canvas) => {
            let img = canvas.toDataURL("image/png");
            this.setState({showScreenshot: true, image: img})
        });
    }

    onScreenshotOk = (data)=>{
        this.setState({showScreenshot: false, image: null})
        wfc.eventEmitter.emit('screenshot-ok')
        console.log('screenshotOK', data)
        let blob = this.dataURLtoBlob(data.dataURL);
        navigator.clipboard.write([
            new ClipboardItem({
                [blob.type]: blob
            })]);
    }

    onScreenshotSave = (data)=>{
        this.setState({showScreenshot: false, image: null})
        wfc.eventEmitter.emit('screenshot-end')
        // TODO save
    }

    onScreenshotCancel = ()=>{
        this.setState({showScreenshot: false, image: null})
    }

    onConnectionStatusChange = (status) => {
        console.log('layout connection status', status)
        this.updateConnectionStatus(status)
    }

    @action
    updateConnectionStatus(status){
        this.connectionStatus = status;
    }

    componentWillMount() {
        console.log('lyaout--------------wfc', wfc);
        wfc.eventEmitter.on(EventType.ConnectionStatusChanged, this.onConnectionStatusChange);

        if (!isElectron()){
            wfc.eventEmitter.on('screenshot-start', this.onStartScreenshot);
        }
    }

    componentWillUnmount() {
        console.log('layout', 'will unmount')
        wfc.eventEmitter.removeListener(EventType.ConnectionStatusChanged, this.onConnectionStatusChange);

        if (!isElectron()) {
            wfc.eventEmitter.removeAllListeners('screenshot-start')
        }
    }

    isMac(){
        // var agent = navigator.userAgent.toLowerCase();
        // var isMac = /macintosh|mac os x/i.test(navigator.userAgent);
        // if(isMac){
        //   return true;
        // }
        return   (navigator.platform === "Win32") || (navigator.platform === "Windows");
      }
    render() {
        var { isLogin, loading, show, close, message, location } = this.props;

        // if (!window.navigator.onLine) {
        //     return (
        //         <Offline show={true} style={{
        //             top: 0,
        //             paddingTop: 30
        //         }} />
        //     );
        // }
        if(this.state.showScreenshot){
           return (
               <Screenshot
                image={this.state.image}
                width={window.innerWidth}
                height={window.innerHeight}
                onSave={this.onScreenshotSave}
                onCancel={this.onScreenshotCancel}
                onOk={this.onScreenshotOk}
            />
           )
        }

        if (this.connectionStatus === ConnectionStatus.ConnectionStatusRejected
            || this.connectionStatus === ConnectionStatus.ConnectionStatusLogout
            || this.connectionStatus === ConnectionStatus.ConnectionStatusSecretKeyMismatch
            || this.connectionStatus === ConnectionStatus.ConnectionStatusTokenIncorrect
            || this.connectionStatus === ConnectionStatus.ConnectionStatusUnconnected
            || wfc.getUserId() === '') {
            return <Login />;
        }

        if (ipcRenderer) {
            ipcRenderer.send('logined');
        }
        loading = !wfc.isLogin() && (this.connectionStatus === 0 || this.connectionStatus === 2/** receving */);

        return (
            <div>
                <Snackbar
                    close={close}
                    show={show}
                    text={message} />

                <Loader show={loading} />
                <div
                    className={clazz(classes.container,{
                        [classes.winContainer]:this.isMac()
                    })}
                    ref="viewport">
                    {this.props.children}
                </div>
                <Footer
                    className={classes.footer}
                    location={location}
                    isMac={this.isMac}
                    ref="footer" />
                <UserInfo />
                <AddFriend />
                <NewChat />
                <Members />
                <OverallUserCard />
                <AddMember />
                <ConfirmImagePaste />
                <Forward />

                {/* <Offline show={this.state.offline} />; */}

                <div
                    className={classes.dragDropHolder}
                    ref="holder">
                    <div className={classes.inner}>
                        <div>
                            <img src="assets/images/filetypes/image.png" />
                            <img src="assets/images/filetypes/word.png" />
                            <img src="assets/images/filetypes/pdf.png" />
                            <img src="assets/images/filetypes/archive.png" />
                            <img src="assets/images/filetypes/video.png" />
                            <img src="assets/images/filetypes/audio.png" />
                        </div>

                        <i className="icon-ion-ios-cloud-upload-outline" />

                        <h2>Drop your file here</h2>
                    </div>
                </div>
            </div>
        );
    }
}
