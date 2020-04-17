import React from 'react';
import {
  Text,
} from 'react-native';
import { store } from './redux/store/store';
import { Provider } from 'react-redux';

const App = () => {
  return (
      <Provider store={store}>

        <Text> test</Text>
      </Provider>
  );
};


export default App;
