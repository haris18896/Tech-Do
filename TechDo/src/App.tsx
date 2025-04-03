import 'react-native-reanimated';
import 'react-native-gesture-handler';
import React, {FC} from 'react';

// ** Utils

// ** Third Party Packages
import Toast from 'react-native-toast-message';
import {PaperProvider} from 'react-native-paper';

// ** Custom Packages
import MainStack from './navigation';
import {AuthProvider} from './@core/infrustructure/context/AuthContext';
import {ThemeProvider} from './@core/infrustructure/theme/ThemeProvider';
import {ThemeToggleProvider} from './@core/infrustructure/context/ThemeContext';

const App: FC = () => {
  return (
    <AuthProvider>
      <ThemeToggleProvider>
        <ThemeProvider>
          <PaperProvider>
            <MainStack />
            <Toast />
          </PaperProvider>
        </ThemeProvider>
      </ThemeToggleProvider>
    </AuthProvider>
  );
};

export default App;
