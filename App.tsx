import React from 'react';
import {store} from './redux/store/store';
import {Provider} from 'react-redux';

import Labeling_screen from './src/UI/labeling_screen';

const App = () => {
  return (
    <Provider store={store}>
      <React.StrictMode>
        <Labeling_screen />
      </React.StrictMode>
    </Provider>
  );
};

export default App;
