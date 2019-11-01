
import React, { Component } from 'react';
import { render } from 'react-dom';
import { Provider } from 'mobx-react';
import { HashRouter } from 'react-router-dom';

import './global.css';
import './assets/fonts/icomoon/style.css';
import 'utils/albumcolors';
import getRoutes from './js/routes';
import stores from './js/stores';

class App extends Component {
    async componentWillMount() {
        if (window.navigator.onLine) {
        }
    }

    canisend() {
        return this.refs.navigator.history.location.pathname === '/'
            && stores.chat.user;
    }

    componentDidMount() {
        var navigator = this.refs.navigator;

    }

    render() {
        return (
            <Provider {...stores}>
                <HashRouter ref="navigator">
                    {getRoutes()}
                </HashRouter>
            </Provider>
        );
    }
}

render(
    <App />,
    document.getElementById('root')
);
