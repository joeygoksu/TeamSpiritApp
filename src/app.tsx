import 'react-native-gesture-handler';

import * as eva from '@eva-design/eva';
import { IconRegistry, ApplicationProvider } from '@ui-kitten/components';
import { EvaIconsPack } from '@ui-kitten/eva-icons';
import Amplify from 'aws-amplify';
import React from 'react';

import { enableScreens } from 'react-native-screens';

import { Provider as StoreProvider } from 'react-redux';
import { PersistGate } from 'redux-persist/integration/react';
import awsconfig from './aws-exports';
import Navigation from './navigation';
import { persistor, store } from './store/configureStore';

enableScreens();

Amplify.configure({
  ...awsconfig,
  PushNotification: {
    requestIOSPermissions: false,
  },
});

const App = () => {
  return (
    <>
      <IconRegistry icons={EvaIconsPack} />
      <StoreProvider store={store}>
        <PersistGate loading={null} persistor={persistor}>
          <ApplicationProvider {...eva} theme={eva.light}>
            <Navigation />
          </ApplicationProvider>
        </PersistGate>
      </StoreProvider>
    </>
  );
};

export default App;
