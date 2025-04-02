import React, {ReactNode} from 'react';
import {StyleSheet} from 'react-native';
import {
  ParamListBase,
  DrawerActions,
  DrawerNavigationState,
} from '@react-navigation/native';

// ** Utils
import {navigateTo} from '../utils';
import useJwt from '../../@core/auth/useJwt';
import {theme as themeUtils} from '../../@core/infrustructure/theme';
import {useAppTheme} from '../../@core/infrustructure/theme/useAppTheme';

// ** Third Party Packages
// @ts-ignore
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';

// ** Custom Components
import {
  Avatar,
  MenuItemText,
  DrawerFooter,
  DrawerLogout,
  DrawerWrapper,
  AvatarWrapper,
  UserDetailWrapper,
  MenuItemComponent,
  DrawerListWrapper,
  DrawerAvatarWrapper,
  DrawerAvatarContainer,
} from '../../styles/components';
import {TextItem} from '../../styles/infrustucture';
import {ProfileImageWrapper} from '../../styles/screens/Profile';

// ** SVGs
import {LogoutIcon, appImages} from '../../assets';

// ** Type definitions
interface MenuItem {
  id: number;
  name: string;
  screen: string;
  icon: ReactNode;
  iconActive: ReactNode;
  list: string[];
}

interface SideMenuProps {
  state: DrawerNavigationState<ParamListBase>;
  navigation: {
    dispatch: (action: any) => void;
    navigate: (name: string, params?: any) => void;
    goBack: () => void;
  };
}

const SideMenu: React.FC<SideMenuProps> = ({state, navigation}) => {
  // ** Theme
  const {palette} = useAppTheme();

  const onClose = (): void => {
    navigation.dispatch(DrawerActions.closeDrawer());
  };

  const gotoProfileScreen = (): void => {
    onClose();
    navigation.navigate('MyDrawer', {screen: 'Profile'});
  };

  const menu: MenuItem[] = [
    {
      id: 1,
      name: 'Dashboard',
      screen: 'Dashboard',
      icon: (
        <Icon
          name={'file-tree'}
          color={palette.grey[600]}
          size={themeUtils.WP(5)}
        />
      ),
      iconActive: (
        <Icon
          name={'file-tree'}
          color={palette.common.white}
          size={themeUtils.WP(5)}
        />
      ),
      list: ['Dashboard'],
    },
    {
      id: 2,
      name: 'All Tasks',
      screen: 'Weekly',
      icon: (
        <Icon
          name={'briefcase-off'}
          color={palette.grey[600]}
          size={themeUtils.WP(5)}
        />
      ),
      iconActive: (
        <Icon
          name={'briefcase-off'}
          color={palette.common.white}
          size={themeUtils.WP(5)}
        />
      ),
      list: ['Weekly', 'Monthly', 'Daily', 'NewTask', 'EditTask'],
    },
    {
      id: 3,
      name: 'Profile',
      screen: 'Profile',
      icon: (
        <Icon
          name={'account'}
          color={palette.grey[600]}
          size={themeUtils.WP(5)}
        />
      ),
      iconActive: (
        <Icon
          name={'account'}
          color={palette.common.white}
          size={themeUtils.WP(5)}
        />
      ),
      list: ['Profile', 'EditProfile'],
    },
  ];

  const handleLogout = async (): Promise<void> => {
    await useJwt.removeData('token');
    navigateTo('Auth');
  };

  return (
    <DrawerWrapper>
      <DrawerAvatarWrapper onPress={gotoProfileScreen}>
        <DrawerAvatarContainer>
          <ProfileImageWrapper size={{width: 12, height: 12}}>
            <AvatarWrapper size={12}>
              <Avatar source={appImages?.logo} />
            </AvatarWrapper>
          </ProfileImageWrapper>

          <UserDetailWrapper>
            <TextItem weight={'semiBold'} size={4} color={palette.text.title}>
              Haris Ahmad
            </TextItem>
            <TextItem weight={'semiBold'} size={3.5} color={palette.text.body}>
              haris18896@gmail.com
            </TextItem>
          </UserDetailWrapper>
        </DrawerAvatarContainer>
      </DrawerAvatarWrapper>

      {menu.length > 0 && (
        <DrawerListWrapper
          showsVerticalScrollIndicator={false}
          showsHorizontalScrollIndicator={false}>
          {menu.map((item, index) => {
            const isActive = item.list.includes(state.routes[state.index].name);
            return (
              <MenuItemComponent
                key={index}
                active={isActive}
                style={styles.shadow}
                onPress={() =>
                  navigation.navigate('MyDrawer', {screen: item?.screen})
                }>
                {isActive ? item?.iconActive : item?.icon}
                <MenuItemText active={isActive}>{item?.name}</MenuItemText>
              </MenuItemComponent>
            );
          })}
        </DrawerListWrapper>
      )}

      <DrawerFooter>
        <DrawerLogout onPress={() => handleLogout()}>
          <LogoutIcon width={themeUtils.WP(6)} height={themeUtils.WP(7)} />
          <TextItem
            style={{marginLeft: themeUtils.WP(2)}}
            color={palette.error.main}
            weight={'semiBold'}
            size={4.5}>
            Logout
          </TextItem>
        </DrawerLogout>
      </DrawerFooter>
    </DrawerWrapper>
  );
};

const styles = StyleSheet.create({
  shadow: {
    shadowColor: 'rgba(0,0,0,0.2)',
    shadowOffset: {width: 0, height: 2},
    shadowOpacity: 0.2,
    shadowRadius: 5,
    elevation: 2,
    zIndex: 10,
  },
});

export default SideMenu;
