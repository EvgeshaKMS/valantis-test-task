import { BrowserRouter } from 'react-router-dom';
import { Provider } from 'react-redux';
import { ConfigProvider } from 'antd';

import store from './store/store';
import { Router } from './components';
import { antdConfig } from './configs/antdConfig';

import 'assets/styles/normalize.scss';

function App() {
  return (
    <div className='App'>
      <Provider store={store}>
        <BrowserRouter>
          <ConfigProvider theme={antdConfig}>
            <Router />
          </ConfigProvider>
        </BrowserRouter>
      </Provider>
    </div>
  );
}

export default App;
