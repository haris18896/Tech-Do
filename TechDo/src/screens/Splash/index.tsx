import React, {useEffect} from 'react';
import {
  ActivityIndicator,
  View,
  StyleSheet,
  Image,
  ViewStyle,
} from 'react-native';

// ** Utils
import {theme as themeUtils} from '../../@core/infrustructure/theme';
import {useAppTheme} from '../../@core/infrustructure/theme/useAppTheme';
import {useAuth} from '../../@core/infrustructure/context/AuthContext';

// ** Custom Components
import {PageCenter, TextItem} from '../../styles/infrustucture';

// ** Assets
import {appImages} from '../../assets';

// ** Third Party
import AsyncStorage from '@react-native-async-storage/async-storage';
import {useNavigation, CommonActions} from '@react-navigation/native';

interface Palette {
  background: {
    paper: string;
  };
  primary: {
    main: string;
  };
  secondary: {
    main: string;
  };
}

// Style functions
const getTopRightCornerStyle = (palette: Palette): ViewStyle => ({
  width: themeUtils?.WP(70),
  height: themeUtils?.WP(70),
  borderRadius: themeUtils?.WP(100),
  position: 'absolute',
  backgroundColor: palette?.primary?.main,
  top: themeUtils?.WP(-40),
  right: themeUtils?.WP(-40),
  shadowColor: '#000',
});

const getBottomLeftCornerStyle = (palette: Palette): ViewStyle => ({
  width: themeUtils?.WP(90),
  height: themeUtils?.WP(90),
  borderRadius: themeUtils?.WP(100),
  position: 'absolute',
  backgroundColor: palette?.primary?.main,
  bottom: themeUtils?.WP(-35),
  left: themeUtils?.WP(-40),
});

const Splash: React.FC = () => {
  // ** Navigation
  const navigation = useNavigation();

  // ** Theme
  const {palette} = useAppTheme();

  // ** Auth
  const {user, loading} = useAuth();

  useEffect(() => {
    if (loading) {
      return;
    }

    const checkAuthState = async () => {
      try {
        if (user) {
          navigation.dispatch(
            CommonActions.reset({
              index: 0,
              routes: [{name: 'App'}],
            }),
          );
        } else {
          const storedUserId = await AsyncStorage.getItem('userId');

          if (storedUserId) {
            navigation.dispatch(
              CommonActions.reset({
                index: 0,
                routes: [{name: 'App'}],
              }),
            );
          } else {
            navigation.dispatch(
              CommonActions.reset({
                index: 0,
                routes: [{name: 'Auth'}],
              }),
            );
          }
        }
      } catch (error) {
        console.error('Error checking authentication state:', error);
        navigation.dispatch(
          CommonActions.reset({
            index: 0,
            routes: [{name: 'Auth'}],
          }),
        );
      }
    };

    const timer = setTimeout(() => {
      checkAuthState();
    }, 2000);

    return () => clearTimeout(timer);
  }, [navigation, user, loading]);

  return (
    <View
      style={[
        styles.MainContainer,
        {backgroundColor: palette.background.paper},
      ]}>
      <View style={getTopRightCornerStyle(palette)} />
      <View style={getBottomLeftCornerStyle(palette)} />
      <PageCenter>
        <Image style={styles.logo} source={appImages?.logo} />
        <TextItem
          weight={'xBold'}
          family={'semiBold'}
          size={8}
          color={palette.secondary.main}>
          Tech Do
        </TextItem>
        <ActivityIndicator
          style={styles.indicator}
          color={palette.secondary.main}
          size={'large'}
        />
      </PageCenter>
    </View>
  );
};

const styles = StyleSheet.create({
  MainContainer: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  logo: {
    width: themeUtils?.WP(20),
    height: themeUtils?.WP(20),
    marginBottom: themeUtils?.WP(2),
  },
  indicator: {
    marginTop: themeUtils?.WP(4),
  },
});

export default Splash;
