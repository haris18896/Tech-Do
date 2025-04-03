import React, {useRef, useState} from 'react';
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
import YupPassword from 'yup-password';
import {useNavigation} from '@react-navigation/native';
import {NativeStackNavigationProp} from '@react-navigation/native-stack';

// ** Utils
import {isObjEmpty} from '../../utils/utils';
import {theme as themeUtils} from '../../@core/infrustructure/theme';
import {useAppTheme} from '../../@core/infrustructure/theme/useAppTheme';
import { useAuth } from '../../@core/infrustructure/context/AuthContext';

// ** Custom Components
import {AuthContainer, UserActivityWrapper} from '../../styles/screens/Auth';
import {ButtonAction} from '../../components';
import {TextInput} from '../../@core/components';
import {ColumnStart, RowCenter, TextItem} from '../../styles/infrustucture';

// ** Assets
import {appImages} from '../../assets';

type AuthStackParamList = {
  Login: undefined;
  Registration: undefined;
  App: undefined;
};

YupPassword(Yup);

const Registration: React.FC = () => {
  // ** Refs
  const name_ref = useRef<typeof TextInput>(null);
  const email_ref = useRef<typeof TextInput>(null);
  const phone_ref = useRef<typeof TextInput>(null);
  const password_ref = useRef<typeof TextInput>(null);
  const confirm_password_ref = useRef<typeof TextInput>(null);

  // ** Theme && Navigation
  const {palette} = useAppTheme();
  const navigation =
    useNavigation<NativeStackNavigationProp<AuthStackParamList>>();
  const { signUp } = useAuth();

  // ** States
  const [isLoading, setIsLoading] = useState<String>('');

  // ** Schema
  const schema = Yup.object().shape({
    email: Yup.string().email().required('Email is a required field'),
    password: Yup.string()
      .required('Password is a required field')
      .min(
        8,
        'Password must contain 8 or more characters with at least one of each: uppercase, lowercase, number and special',
      )
      .minNumbers(1, 'password must contain at least 1 number')
      .minLowercase(1, 'password must contain at least 1 lower case letter')
      .minUppercase(1, 'password must contain at least 1 upper case letter')
      .minSymbols(1, 'password must contain at least 1 special character'),
    confirm_password: Yup.string()
      .required('Confirm Password is a required field')
      .oneOf([Yup.ref('password')], 'Passwords must match'),
    name: Yup.string().required('Name is a required field'),
    phone: Yup.string().required('Phone is a required field'),
  });

  const formik = useFormik({
    initialValues: {
      email: '',
      password: '',
      confirm_password: '',
      name: '',
      phone: '',
    },
    enableReinitialize: true,
    validationSchema: schema,
    onSubmit: async values => {
      if (isObjEmpty(formik.errors)) {
        setIsLoading('registration_pending');

        try {
          await signUp(values.email, values.password, values.name);

          navigation.navigate('App');
        } catch (error) {
          console.error('Registration error:', error);
        } finally {
          setIsLoading('');
        }
      }
    },
  });

  return (
    <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
      <View style={styles.keyboardAvoding}>
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
                  Registration
                </TextItem>
                <TextItem
                  size={4.5}
                  weight={'regular'}
                  family={'regular'}
                  color={palette?.text?.body}>
                  Create your account to get started.
                </TextItem>
              </ColumnStart>

              <TextInput
                ref={name_ref}
                title={'Name'}
                multiline={false}
                leftIcon={'account'}
                inputMode={'text'}
                variant={'outlined'}
                returnKeyType={'next'}
                value={formik.values.name}
                nextInputRef={email_ref}
                placeholder={'Enter your name'}
                formikError={formik.errors?.name}
                formikTouched={formik.touched.name}
                onChangeText={(text: string) =>
                  formik.setFieldValue('name', text)
                }
                onBlur={() => formik.setFieldTouched('name', true)}
                styleData={{
                  labelStyles: {
                    weight: 'medium',
                    color: palette?.text?.body,
                  },
                }}
              />

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
                ref={phone_ref}
                title={'Phone'}
                multiline={false}
                leftIcon={'phone'}
                inputMode={'tel'}
                variant={'outlined'}
                returnKeyType={'next'}
                value={formik.values.phone}
                nextInputRef={password_ref}
                placeholder={'Enter your phone number'}
                formikError={formik.errors?.phone}
                formikTouched={formik.touched.phone}
                onChangeText={(text: string) =>
                  formik.setFieldValue('phone', text)
                }
                onBlur={() => formik.setFieldTouched('phone', true)}
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
                returnKeyType={'next'}
                leftIcon={'lock'}
                nextInputRef={confirm_password_ref}
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
              />

              <TextInput
                multiline={false}
                ref={confirm_password_ref}
                title={'Confirm Password'}
                variant={'outlined'}
                secureTextEntry={true}
                returnKeyType={'done'}
                leftIcon={'lock'}
                value={formik.values.confirm_password}
                placeholder={'**************'}
                formikError={formik.errors.confirm_password}
                formikTouched={formik.touched.confirm_password}
                onChangeText={(text: string) =>
                  formik.setFieldValue('confirm_password', text)
                }
                onBlur={() => formik.setFieldTouched('confirm_password', true)}
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

              <UserActivityWrapper
                marginTop={4}
                direction={'column'}
                alignItems={'flex-end'}
                justifyContent={'flex-end'}>
                <ButtonAction
                  end={true}
                  title={'Sign Up'}
                  titleWeight={'bold'}
                  border={'transparent'}
                  loading={isLoading === 'registration_pending'}
                  onPress={() => formik.handleSubmit()}
                  color={palette?.primary?.main}
                  labelColor={palette?.common?.white}
                  loadingColor={palette?.common?.white}
                  disabled={!isObjEmpty(formik.errors)}
                />
              </UserActivityWrapper>

              <RowCenter style={{marginTop: themeUtils?.WP(4)}}>
                <Pressable disabled={false} onPress={() => navigation.goBack()}>
                  <TextItem color={palette?.secondary?.main}>
                    Already have an account? Sign in
                  </TextItem>
                </Pressable>
              </RowCenter>
            </AuthContainer>
          </View>

          <RowCenter style={styles.LoginFooter}>
            <TextItem color={'white'}>
              © {moment().format('YYYY')} Tech Do. All rights reserved.
            </TextItem>
          </RowCenter>
        </KeyboardAvoidingView>
      </View>
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

export default Registration;
