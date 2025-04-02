import {TouchableOpacity, Text, ViewStyle, TextStyle} from 'react-native';
import React, {useState} from 'react';

// ** Third Party Components
// @ts-ignore
import {Badge, Menu} from 'react-native-paper';
// @ts-ignore
import {useNavigation} from '@react-navigation/native';
// @ts-ignore
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';

// ** Utils
import {showToast} from '../../../utils/utils';
import {theme as themeUtils} from '../../infrustructure/theme';
import {useTheme} from '../../infrustructure/context/ThemeContext';
import {useAppTheme} from '../../infrustructure/theme/useAppTheme';

// ** Custom Components
import {
  Avatar,
  AvatarWrapper,
  HeaderWrapper,
  IconCountWrapper,
  HeaderDetailWrapper,
} from '../../../styles/components';

// ** SVGs
import {appImages, Bell, Chat} from '../../../assets';

// ** Types
interface User {
  imageUrl?: string;
}

interface BarHeaderProps {
  onBack?: () => void;
  user?: User;
  menuColor?: string;
  customStyles?: ViewStyle;
  onPressBar?: () => void;
  backIconColor?: string;
  showChat?: {
    chat: boolean;
    badge: boolean;
  };
  showNotification?: {
    notification: boolean;
    badge: boolean;
  };
  calendarView?: string;
  onCalendarViewChange?: (view: string) => void;
}

const BarHeader: React.FC<BarHeaderProps> = props => {
  // ** Props
  const {
    onBack,
    menuColor,
    customStyles,
    onPressBar,
    backIconColor,
    showChat = {
      chat: true,
      badge: false,
    },
    showNotification = {
      notification: true,
      badge: false,
    },
    calendarView,
    onCalendarViewChange,
  } = props;

  // ** States
  const [calendarMenuVisible, setCalendarMenuVisible] =
    useState<boolean>(false);

  // ** navigation
  const navigation = useNavigation();

  // ** Theme
  const {palette} = useAppTheme();
  const {theme, toggleTheme} = useTheme();

  const gotoProfile = (): void => {
    navigation.navigate('MyDrawer', {screen: 'Profile'});
  };

  const goToNotification = (): void => {
    showToast({
      type: 'info',
      title: 'Notification',
      message: 'Coming Soon',
    });
    // navigation.navigate('Notifications');
  };

  const goToChat = (): void => {
    showToast({
      type: 'info',
      title: 'Chat',
      message: 'Coming Soon',
    });
    // navigation.navigate('ChatHub');
  };

  const openCalendarMenu = (): void => setCalendarMenuVisible(true);
  const closeCalendarMenu = (): void => setCalendarMenuVisible(false);

  return (
    <HeaderWrapper style={customStyles}>
      {onPressBar && (
        <TouchableOpacity
          style={styles.leftItem(backIconColor, palette)}
          onPress={onPressBar}>
          <Icon
            name={'menu'}
            size={themeUtils?.WP(8)}
            color={menuColor ? menuColor : palette.text.primary}
          />
        </TouchableOpacity>
      )}

      {onBack && (
        <TouchableOpacity
          style={styles.leftItem(backIconColor, palette)}
          onPress={onBack}>
          <Icon
            name="chevron-left"
            size={themeUtils?.WP(8)}
            color={palette?.text?.primary}
          />
        </TouchableOpacity>
      )}

      <HeaderDetailWrapper>
        {calendarView && onCalendarViewChange && (
          <Menu
            visible={calendarMenuVisible}
            onDismiss={closeCalendarMenu}
            anchor={
              <TouchableOpacity
                style={styles.calendarViewButton}
                onPress={openCalendarMenu}>
                <Text style={styles.calendarViewText(palette)}>
                  {calendarView.charAt(0).toUpperCase() + calendarView.slice(1)}
                </Text>
                <Icon
                  name="chevron-down"
                  size={themeUtils?.WP(5)}
                  color={palette?.text?.primary}
                  style={styles.dropdownIcon}
                />
              </TouchableOpacity>
            }
            contentStyle={styles.menuContent(palette)}>
            <Menu.Item
              onPress={() => {
                onCalendarViewChange('month');
                closeCalendarMenu();
              }}
              title="Month"
              titleStyle={[
                styles.menuItemText(palette),
                calendarView === 'month' && styles.menuItemTextActive(palette),
              ]}
              style={[
                styles.menuItem,
                calendarView === 'month' && styles.menuItemActive(palette),
              ]}
            />
            <Menu.Item
              onPress={() => {
                onCalendarViewChange('week');
                closeCalendarMenu();
              }}
              title="Week"
              titleStyle={[
                styles.menuItemText(palette),
                calendarView === 'week' && styles.menuItemTextActive(palette),
              ]}
              style={[
                styles.menuItem,
                calendarView === 'week' && styles.menuItemActive(palette),
              ]}
            />
          </Menu>
        )}
        <TouchableOpacity onPress={toggleTheme} style={styles.themeButton}>
          <Icon
            name={theme === 'dark' ? 'white-balance-sunny' : 'weather-night'}
            size={themeUtils.WP(8)}
            color={theme === 'dark' ? '#d1b32e' : palette.text.primary}
          />
        </TouchableOpacity>
        {showChat.chat && (
          <IconCountWrapper onPress={() => goToChat()}>
            {showChat.badge && (
              <Badge size={themeUtils?.WP(5)} style={styles.badge(palette)}>
                3
              </Badge>
            )}
            <Chat width={themeUtils?.WP(6)} height={themeUtils?.WP(6)} />
          </IconCountWrapper>
        )}

        {showNotification.notification && (
          <IconCountWrapper onPress={() => goToNotification()}>
            {showNotification.badge && (
              <Badge size={themeUtils?.WP(5)} style={styles.badge(palette)}>
                4
              </Badge>
            )}
            <Bell width={themeUtils?.WP(6)} height={themeUtils?.WP(6)} />
          </IconCountWrapper>
        )}

        <TouchableOpacity onPress={() => gotoProfile()}>
          <AvatarWrapper size={12}>
            <Avatar source={appImages?.logo} />
          </AvatarWrapper>
        </TouchableOpacity>
      </HeaderDetailWrapper>
    </HeaderWrapper>
  );
};

// Create separate styles object for function-based styles
const dynamicStyles = {
  leftItem: (backIconColor?: string, _palette?: any): ViewStyle => ({
    zIndex: 2,
    padding: themeUtils?.WP(0.5),
    borderRadius: themeUtils?.WP(10),
    backgroundColor: backIconColor ? backIconColor : 'transparent',
  }),
  badge: (_palette?: any): ViewStyle => ({
    position: 'absolute',
    zIndex: 2,
    top: themeUtils?.WP(-1),
    right: themeUtils?.WP(-1.5),
    backgroundColor: _palette?.error?.main,
  }),
  calendarViewText: (_palette?: any): TextStyle => ({
    color: _palette?.text?.primary,
    fontSize: themeUtils.WP(3.8),
    fontFamily: themeUtils.fonts?.medium,
    marginRight: themeUtils.WP(1),
  }),
  menuContent: (_palette?: any): ViewStyle => ({
    backgroundColor: _palette?.background?.paper,
    borderRadius: themeUtils.WP(2),
    marginTop: themeUtils.WP(1),
  }),
  menuItemActive: (_palette?: any): ViewStyle => ({
    backgroundColor: _palette?.primary?.main + '20',
  }),
  menuItemText: (_palette?: any): TextStyle => ({
    color: _palette?.text?.primary,
    fontSize: themeUtils.WP(3.5),
    fontFamily: themeUtils.fonts?.medium,
  }),
  menuItemTextActive: (_palette?: any): TextStyle => ({
    color: _palette?.primary?.main,
    fontWeight: '600',
  }),
};

// Static styles
const styles = {
  ...dynamicStyles,
  themeButton: {
    marginRight: themeUtils?.WP(2),
  } as ViewStyle,
  calendarViewButton: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: themeUtils.WP(3),
    paddingVertical: themeUtils.WP(1),
    borderRadius: themeUtils.WP(4),
    marginLeft: themeUtils.WP(2),
  } as ViewStyle,
  dropdownIcon: {
    marginTop: themeUtils.WP(0.5),
  } as ViewStyle,
  menuItem: {
    paddingHorizontal: themeUtils.WP(2),
  } as ViewStyle,
};

export {BarHeader};
