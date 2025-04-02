import React, {useRef, useEffect, useState} from 'react';
import {
  View,
  Image,
  Keyboard,
  Platform,
  StyleSheet,
  KeyboardAvoidingView,
  TouchableWithoutFeedback,
  Pressable,
} from 'react-native';

// ** Third Party Packages
import * as Yup from 'yup';
import moment from 'moment';
import {useFormik} from 'formik';
import {useNavigation} from '@react-navigation/native';
import {NativeStackNavigationProp} from '@react-navigation/native-stack';

// ** Utils
import {theme as themeUtils} from '../../@core/infrustructure/theme';
import {useAppTheme} from '../../@core/infrustructure/theme/useAppTheme';
import {ColumnStart, RowCenter, TextItem} from '../../styles/infrustucture';
import {appImages} from '../../assets';
import {
  AuthActivityWrapper,
  AuthContainer,
  UserActivityWrapper,
} from '../../styles/screens/Auth';
import {CheckBox, TextInput} from '../../@core/components';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {isObjEmpty} from '../../utils/utils';
import {ButtonAction} from '../../components';

type AuthStackParamList = {
  Login: undefined;
  Registration: undefined;
};

const Login = () => {
  // ** Refs
  const email_ref = useRef<typeof TextInput>(null);
  const password_ref = useRef<typeof TextInput>(null);

  // ** Theme
  const {palette} = useAppTheme();
  const navigation =
    useNavigation<NativeStackNavigationProp<AuthStackParamList>>();

  // ** States
  const [isLoading, setIsLoading] = useState<String>('');
  const [login_creds, setLoginCreds] = useState<Object>({});
  const [rememberMe, setRememberMe] = useState<String>('checked');

  useEffect(() => {
    (async () => {
      if (rememberMe === 'checked') {
        const data = await AsyncStorage.getItem('login_creds');
        if (data) {
          setLoginCreds(JSON.parse(data));
        }
      } else {
        setLoginCreds({});
      }
    })();
  }, [rememberMe]);

  // ** Schema
  const schema = Yup.object().shape({
    email: Yup.string().email().required('Email is a required field'),
    password: Yup.string().required('Password is a required field'),
  });

  const formik = useFormik({
    initialValues: {
      email: (login_creds as {email?: string})?.email || '',
      password: (login_creds as {password?: string})?.password || '',
    },
    enableReinitialize: true,
    validationSchema: schema,
    onSubmit: async values => {
      if (isObjEmpty(formik.errors)) {
        setIsLoading('login_pending');
      }

      if (rememberMe === 'checked') {
        await AsyncStorage.setItem('login_creds', JSON.stringify(values));
      }
    },
  });

  return (
    <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
      <>
        <KeyboardAvoidingView
          behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
          style={styles.keyboardAvoding}>
          <View
            style={[
              styles.MainContainer,
              {backgroundColor: palette.background.paper},
            ]}>
            <RowCenter>
              <Image style={styles.logo} source={appImages?.logo} />
              <TextItem
                weight={'xBold'}
                family={'semiBold'}
                size={8}
                color={palette?.secondary?.main}>
                Tech Do
              </TextItem>
            </RowCenter>

            <AuthContainer
              contentContainerStyle={{paddingBottom: themeUtils?.WP(20)}}
              showsHorizontalScrollIndicator={false}
              showsVerticalScrollIndicator={false}
              keyboardShouldPersistTaps={'handled'}>
              <ColumnStart style={{marginVertical: themeUtils?.WP(3)}}>
                <TextItem
                  size={8}
                  weight={'bold'}
                  family={'semiBold'}
                  color={palette?.secondary?.main}>
                  Login
                </TextItem>
                <TextItem
                  size={4.5}
                  weight={'regular'}
                  family={'regular'}
                  color={palette?.text?.body}>
                  To continue your account!
                </TextItem>
              </ColumnStart>

              <TextInput
                ref={email_ref}
                title={'Email'}
                multiline={false}
                leftIcon={'email'}
                inputMode={'email'}
                variant={'outlined'}
                returnKeyType={'next'}
                value={formik.values.email}
                nextInputRef={password_ref}
                placeholder={'Enter your email'}
                formikError={formik.errors?.email}
                formikTouched={formik.touched.email}
                onChangeText={(text: string) =>
                  formik.setFieldValue('email', text)
                }
                onBlur={() => formik.setFieldTouched('email', true)}
                styleData={{
                  labelStyles: {
                    weight: 'medium',
                    color: palette?.text?.body,
                  },
                }}
              />

              <TextInput
                multiline={false}
                ref={password_ref}
                title={'Password'}
                variant={'outlined'}
                secureTextEntry={true}
                returnKeyType={'done'}
                leftIcon={'lock'}
                value={formik.values.password}
                placeholder={'**************'}
                formikError={formik.errors.password}
                formikTouched={formik.touched.password}
                onChangeText={(text: string) =>
                  formik.setFieldValue('password', text)
                }
                onBlur={() => formik.setFieldTouched('password', true)}
                styleData={{
                  labelStyles: {
                    weight: 'medium',
                    color: palette?.text?.body,
                  },
                }}
                submit={() => {
                  if (isObjEmpty(formik.errors)) {
                    formik.handleSubmit();
                  }
                }}
              />

              <AuthActivityWrapper mt={2} mb={8}>

              <CheckBox
                  disabled={false}
                  // @ts-ignore
                  state={rememberMe}
                  label={'Remember me'}
                  color={palette?.secondary?.main}
                  onPress={() =>
                    setRememberMe(prev =>
                      prev === 'checked' ? 'unchecked' : 'checked',
                    )
                  }
                  uncheckedColor={palette?.grey[400]}
                />
              </AuthActivityWrapper>

              <UserActivityWrapper
                  direction={'column'}
                  alignItems={'flex-end'}
                  justifyContent={'flex-end'}>
                  <ButtonAction
                    end={true}
                    title={'Login'}
                    titleWeight={'bold'}
                    border={'transparent'}
                    loading={isLoading === 'login_pending'}
                    onPress={() => formik.handleSubmit()}
                    color={palette?.primary?.main}
                    labelColor={palette?.common?.white}
                    loadingColor={palette?.common?.white}
                    disabled={!isObjEmpty(formik.errors)}
                  />
                </UserActivityWrapper>

                  <RowCenter style={{marginTop: themeUtils?.WP(4)}}>

                <Pressable
                  disabled={false}
                  onPress={() => navigation.navigate('Registration')}>
                  <TextItem color={palette?.secondary?.main}>
                    Don't have an account? Sign up
                  </TextItem>
                </Pressable>
                    </RowCenter>
            </AuthContainer>

          </View>

          <RowCenter style={styles.LoginFooter}>
            <TextItem color={'white'}>
              © {moment().format('YYYY')} WorkBox. All rights reserved.
            </TextItem>
          </RowCenter>
        </KeyboardAvoidingView>
      </>
    </TouchableWithoutFeedback>
  );
};
const styles = StyleSheet.create({
  MainContainer: {
    flex: 1,
    paddingTop: themeUtils?.WP(Platform.OS === 'ios' ? 14 : 2),
    borderBottomLeftRadius: themeUtils?.WP(10),
    borderBottomRightRadius: themeUtils?.WP(10),
  },
  title: {
    paddingHorizontal: themeUtils?.WP(4),
    marginBottom: themeUtils?.WP(2),
  },
  logo: {
    marginVertical: themeUtils?.WP(5),
    height: themeUtils?.WP(20),
    width: themeUtils?.WP(20),
    marginRight: themeUtils?.WP(2),
  },
  LoginFooter: {
    width: '100%',
    marginVertical: themeUtils?.WP(4),
  },
  keyboardAvoding: {
    flex: 1,
  },
});

export default Login;
