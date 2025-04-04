import React, {useRef, useState} from 'react';
import {
  View,
  Platform,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  KeyboardAvoidingView,
  Alert,
} from 'react-native';

// ** Third Party Packages
import * as Yup from 'yup';
import {useFormik} from 'formik';
import {DrawerActions, useNavigation} from '@react-navigation/native';
// @ts-ignore
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';

// ** Utils
import {isObjEmpty, showToast} from '../../utils/utils';
import {theme as themeUtils} from '../../@core/infrustructure/theme';
import {useTheme} from '../../@core/infrustructure/context/ThemeContext';
import {useAppTheme} from '../../@core/infrustructure/theme/useAppTheme';
import {useAuth} from '../../@core/infrustructure/context/AuthContext';

// ** Custom Components
import {ButtonAction} from '../../components';
import {BarHeader, TextInput} from '../../@core/components';
import {ProfileContainer} from '../../styles/screens/Profile';
import {UserActivityWrapper} from '../../styles/screens/Auth';
import {Avatar, AvatarWrapper} from '../../styles/components';
import {
  Card,
  CardWrapper,
  ColumCenter,
  RowStart,
  TextItem,
} from '../../styles/infrustucture';

// ** SVGs
import {appImages} from '../../assets';

const Profile: React.FC = () => {
  // ** Refs
  const name_ref = useRef<typeof TextInput>(null);
  const email_ref = useRef<typeof TextInput>(null);
  const phone_ref = useRef<typeof TextInput>(null);

  // ** Theme && Navigation
  const {palette} = useAppTheme();
  const navigation = useNavigation();
  const {theme, toggleTheme} = useTheme();
  const {user, logout} = useAuth();

  // ** States
  const [isLoading, setIsLoading] = useState<boolean>(false);

  const schema = Yup.object().shape({
    name: Yup.string().required('Name is required'),
    email: Yup.string().email().required('Email is a required field'),
    contactNumber: Yup.string().required('Contact number is a required field'),
  });

  const formik = useFormik({
    initialValues: {
      name: user?.displayName || '',
      email: user?.email || '',
      contactNumber: '',
    },
    enableReinitialize: true,
    validationSchema: schema,
    onSubmit: async values => {
      if (isObjEmpty(formik.errors)) {
        setIsLoading(true);
        console.log(values);
        setIsLoading(false);
        showToast({
          type: 'info',
          title: 'Profile Update',
          message: 'Coming Soon...',
        });
      }
    },
  });

  const handleLogout = async () => {
    Alert.alert(
      'Logout Confirmation',
      'Are you sure you want to logout?',
      [
        {
          text: 'Cancel',
          style: 'cancel',
        },
        {
          text: 'Logout',
          style: 'destructive',
          onPress: async () => {
            try {
              await logout();
              // @ts-ignore
              navigation.navigate('Auth', {screen: 'Login'});
            } catch (error) {
              console.error('Logout error:', error);
            }
          },
        },
      ],
      {cancelable: true},
    );
  };

  return (
    <View
      style={[styles.MainContainer, {backgroundColor: palette.primary.main}]}>
      <BarHeader
        showChat={{badge: false, chat: false}}
        showNotification={{notification: false, badge: false}}
        // @ts-ignore
        onPressBar={() => navigation.dispatch(DrawerActions.openDrawer())}
      />

      <ProfileContainer>
        <CardWrapper style={styles.profileCardHolder}>
          <Card style={[styles.shadow, {position: 'relative'}]}>
            <TouchableOpacity onPress={toggleTheme} style={styles.themeButton}>
              <Icon
                name={
                  theme === 'dark' ? 'white-balance-sunny' : 'weather-night'
                }
                size={themeUtils.WP(6)}
                color={theme === 'dark' ? '#d1b32e' : '#3f403f'}
              />
            </TouchableOpacity>
            <ColumCenter>
              <AvatarWrapper size={18}>
                <Avatar source={appImages?.logo} />
              </AvatarWrapper>
              <TextItem
                style={styles.UserName}
                weight={'semiBold'}
                family={'semiBold'}
                size={5}
                color={palette.text?.title}>
                {user?.displayName || 'User'}
              </TextItem>

              <TextItem
                weight={'semiBold'}
                family={'semiBold'}
                size={4}
                color={palette.grey[500]}>
                {user?.email || 'No email provided'}
              </TextItem>
            </ColumCenter>
          </Card>
        </CardWrapper>

        <KeyboardAvoidingView
          behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
          style={styles.keyboardAvoding}>
          <ScrollView
            contentContainerStyle={styles.scrollViewContainer}
            showsHorizontalScrollIndicator={false}
            showsVerticalScrollIndicator={false}
            keyboardShouldPersistTaps={'handled'}>
            <CardWrapper>
              <Card style={[styles.shadow, styles.cardWrapper]}>
                <RowStart style={styles.rowStart}>
                  <Icon
                    style={styles.icon}
                    name={'phone'}
                    size={themeUtils.WP(5)}
                    color={palette.secondary?.main}
                  />
                  <TextItem>
                    {user?.phoneNumber || 'No phone number provided'}
                  </TextItem>
                </RowStart>

                <RowStart>
                  <Icon
                    style={styles.icon}
                    name={'email'}
                    size={themeUtils.WP(5)}
                    color={palette.secondary?.main}
                  />
                  <TextItem>{user?.email || 'No email provided'}</TextItem>
                </RowStart>
              </Card>
            </CardWrapper>

            <CardWrapper>
              <Card style={[styles.shadow, styles.cardWrapper]}>
                <TextInput
                  disabled={false}
                  ref={name_ref}
                  multiline={false}
                  leftIcon={'account'}
                  title={''}
                  variant={'outlined'}
                  inputMode={'text'}
                  returnKeyType={'next'}
                  styleData={{
                    labelStyles: {
                      weight: 'medium',
                      color: palette.text?.title,
                    },
                  }}
                  secureTextEntry={false}
                  value={formik.values.name}
                  nextInputRef={email_ref}
                  placeholder={'Enter your first name'}
                  formikError={formik.errors?.name}
                  formikTouched={formik.touched.name}
                  placeholderColor={palette.grey[500]}
                  onChangeText={(text: string) =>
                    formik.setFieldValue('name', text)
                  }
                  onBlur={() => formik.setFieldTouched('name', true)}
                />

                <TextInput
                  disabled={true} // Email can't be changed in Firebase without re-authentication
                  ref={email_ref}
                  multiline={false}
                  leftIcon={'email'}
                  title={''}
                  variant={'outlined'}
                  inputMode={'email'}
                  returnKeyType={'next'}
                  styleData={{
                    labelStyles: {
                      weight: 'medium',
                      color: palette.text?.title,
                    },
                  }}
                  secureTextEntry={false}
                  value={formik.values.email}
                  nextInputRef={phone_ref}
                  placeholder={'Enter your email'}
                  formikError={formik.errors?.email}
                  formikTouched={formik.touched.email}
                  placeholderColor={palette.grey[500]}
                  onChangeText={(text: string) =>
                    formik.setFieldValue('email', text)
                  }
                  onBlur={() => formik.setFieldTouched('email', true)}
                />

                <TextInput
                  disabled={false}
                  maxLength={10}
                  ref={phone_ref}
                  multiline={false}
                  leftIcon={'phone'}
                  title={''}
                  variant={'outlined'}
                  inputMode={'decimal'}
                  returnKeyType={'done'}
                  styleData={{
                    labelStyles: {
                      weight: 'medium',
                      color: palette.text?.title,
                    },
                  }}
                  secureTextEntry={false}
                  value={formik.values.contactNumber}
                  placeholder={'Enter your contact number'}
                  formikError={formik.errors?.contactNumber}
                  formikTouched={formik.touched.contactNumber}
                  placeholderColor={palette.grey[500]}
                  onChangeText={(text: string) =>
                    formik.setFieldValue('contactNumber', text)
                  }
                  onBlur={() => {
                    formik.setFieldTouched('contactNumber', true);
                  }}
                  submit={() => {
                    if (isObjEmpty(formik.errors)) {
                      formik.handleSubmit();
                    }
                  }}
                />
              </Card>
            </CardWrapper>
          </ScrollView>
        </KeyboardAvoidingView>

        <UserActivityWrapper
          style={styles.buttonsWrapper}
          direction={'column'}
          alignItems={'flex-end'}>
          <ButtonAction
            end={true}
            title={'Update'}
            titleWeight={'bold'}
            loading={isLoading}
            onPress={() => formik.handleSubmit()}
            border={palette.primary?.main}
            color={palette.primary?.main}
            labelColor={palette.common.white}
            loadingColor={palette.common.white}
            disabled={!isObjEmpty(formik.errors) || isLoading}
          />

          <ButtonAction
            end={true}
            title={'Logout'}
            titleWeight={'bold'}
            loading={false}
            onPress={handleLogout}
            border={palette.error?.main}
            color={palette.error?.main}
            labelColor={palette.common.white}
            loadingColor={palette.common.white}
          />
        </UserActivityWrapper>
      </ProfileContainer>
    </View>
  );
};
const styles = StyleSheet.create({
  shadow: {
    zIndex: 10,
    elevation: 2,
    shadowRadius: 5,
    shadowOpacity: 0.2,
    shadowOffset: {width: 0, height: 2},
    shadowColor: 'rgba(0,0,0,0.2)',
  },
  MainContainer: {
    flex: 1,
    paddingTop: Platform?.OS === 'ios' ? themeUtils.WP(14) : themeUtils.WP(4),
  },
  authContainer: {
    paddingBottom: themeUtils.WP(15),
  },
  EditButton: {
    zIndex: 10,
    position: 'absolute',
    borderRadius: themeUtils.WP(10),
    width: themeUtils.WP(8),
    height: themeUtils.WP(8),
    bottom: 0,
    right: 0,
  },
  scrollView: {
    flex: 1,
    backgroundColor: 'red',
  },
  buttonsWrapper: {
    marginBottom: themeUtils.WP(8),
    paddingHorizontal: themeUtils.WP(6),
  },
  profileCardHolder: {
    position: 'absolute',
    width: '100%',
    top: themeUtils.WP(-25),
    zIndex: 10,
    paddingHorizontal: themeUtils.WP(4),
  },
  UserName: {
    marginTop: themeUtils.WP(3),
  },
  scrollViewContainer: {
    marginTop: Platform.OS === 'ios' ? themeUtils.WP(20) : themeUtils.WP(23),
    position: 'relative',
    width: '100%',
    flex: 1,
    height: themeUtils.scrHeight / 1.7,
  },
  cardWrapper: {
    marginHorizontal: themeUtils.WP(4),
  },
  icon: {
    marginRight: themeUtils.WP(2),
  },
  rowStart: {
    marginBottom: themeUtils.WP(2),
  },
  themeButton: {
    position: 'absolute',
    top: themeUtils.WP(2),
    right: themeUtils.WP(2),
    zIndex: 10,
    width: themeUtils.WP(10),
    height: themeUtils.WP(10),
    borderRadius: themeUtils.WP(10),
    alignItems: 'center',
    justifyContent: 'center',
  },
  keyboardAvoding: {
    flex: 1,
  },
});

export default Profile;
