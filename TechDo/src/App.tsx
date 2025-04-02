import 'react-native-reanimated';
import 'react-native-gesture-handler';
import React, {FC} from 'react';

// ** Utils

// ** Third Party Packages
import Toast from 'react-native-toast-message';

// ** Custom Packages
import MainStack from './navigation';
import {ThemeProvider} from './@core/infrustructure/theme/ThemeProvider';
import {ThemeToggleProvider} from './@core/infrustructure/context/ThemeContext';

const App: FC = () => {
  return (
    <ThemeToggleProvider>
      <ThemeProvider>
        <MainStack />
        <Toast />
      </ThemeProvider>
    </ThemeToggleProvider>
  );
};

export default App;
