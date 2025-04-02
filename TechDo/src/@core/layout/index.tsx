import React, {ReactNode} from 'react';
import {
  View,
  StatusBar,
  StyleSheet,
  StatusBarStyle,
  ViewStyle,
  ColorValue,
} from 'react-native';

// ** Utils
import {theme as AppTheme} from '../../@core/infrustructure/theme';

// ** Custom Components
import {SafeArea} from '../../styles/infrustucture';

interface LayoutProps {
  barStyle?: StatusBarStyle;
  isLoading?: boolean;
  children?: ReactNode;
  loadingHeight?: number;
  background?: string;
  customStyles?: ViewStyle;
  animated?: boolean;
  hidden?: boolean;
  barBG?: ColorValue;
}

const Layout: React.FC<LayoutProps> = ({
  barStyle = 'dark-content',
  children,
  background,
  customStyles,
  animated = true,
  hidden = false,
  barBG = AppTheme.DefaultPalette('dark').background.paper,
}) => {
  return (
    <SafeArea background={background}>
      <View style={[styles.layoutContainer, customStyles]}>
        <StatusBar
          hidden={hidden}
          barStyle={barStyle}
          animated={animated}
          backgroundColor={barBG}
          showHideTransition={'fade'}
        />
        {children}
      </View>
    </SafeArea>
  );
};

const styles = StyleSheet.create({
  layoutContainer: {
    flexGrow: 1,
    position: 'relative',
    padding: AppTheme?.WP(4),
  },
});

export {Layout};
