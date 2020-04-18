import React from 'react';
import {store} from './redux/store/store';
import {Provider} from 'react-redux';

import Labeling_screen from './src/UI/labeling_screen';

const App = () => {
  return (
    <Provider store={store}>
      <Labeling_screen />
    </Provider>
  );
};

export default App;

// React Strict Mode does not work due to image crop library, needs to be adressed
