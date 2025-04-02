/* eslint-disable react-native/no-inline-styles */
import React, {useRef, useEffect, useState} from 'react';
import {
  View,
  Image,
  Platform,
  StyleSheet,
  KeyboardAvoidingView,
  ImageStyle,
  TextInput as RNTextInput,
  Text,
  TouchableOpacity,
  ScrollView,
  SafeAreaView,
} from 'react-native';

// ** Utils
import useJwt from '../../@core/auth/useJwt';
import {isObjEmpty} from '../../utils/utils';
import {theme as themeUtils} from '../../@core/infrustructure/theme';
import {useAppTheme} from '../../@core/infrustructure/theme/useAppTheme';

// ** Third Party Packages
import * as Yup from 'yup';
import {useFormik} from 'formik';
// import {useNavigation} from '@react-navigation/native';

// ** Custom Components
import { TextInput } from '../../@core/components/input/TextInput';

// ** Store && Actions
// import {useDispatch} from 'react-redux';

// ** SVGs
import {appImages} from '../../assets';

// ** Types
interface LoginCredentials {
  email: string;
  password: string;
}

interface LoginFormValues {
  email: string;
  password: string;
}

type CheckBoxState = 'checked' | 'unchecked' | 'indeterminate';

interface LoginFormData {
  email: string;
  password: string;
  rememberMe: boolean;
}

const Login: React.FC = () => {
  // ** Refs
  const email_ref = useRef<RNTextInput>(null);
  const password_ref = useRef<RNTextInput>(null);

  // ** Navigation
  const {palette} = useAppTheme();
  // const navigation = useNavigation();

  // ** Store
  // const dispatch = useDispatch();

  // ** States
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [login_creds, setLoginCreds] = useState<LoginCredentials | {}>({});
  const [rememberMe, setRememberMe] = useState<CheckBoxState>('checked');
  const [formData, setFormData] = useState<LoginFormData>({
    email: '',
    password: '',
    rememberMe: false,
  });

  useEffect(() => {
    (async () => {
      if (rememberMe === 'checked') {
        const data = await useJwt.getData('login_creds');
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

  const formik = useFormik<LoginFormValues>({
    initialValues: {
      email: (login_creds as LoginCredentials)?.email || '',
      password: (login_creds as LoginCredentials)?.password || '',
    },
    enableReinitialize: true,
    validationSchema: schema,
    onSubmit: async values => {
      if (isObjEmpty(formik.errors)) {
        console.log('Login with:', values);

        if (rememberMe === 'checked') {
          await useJwt.setData('login_creds', JSON.stringify(values));
        }
      }
    },
  });

  const handleLogin = () => {
    setIsLoading(true);
    // Simulate API call
    setTimeout(() => {
      setIsLoading(false);
      // Navigate to main app after login
      console.log('Login successful with:', formData);
    }, 1500);
  };

  const handleForgotPassword = () => {
    // Navigate to forgot password screen
    console.log('Navigate to forgot password');
  };

  return (
    <View style={styles.container}>
      <KeyboardAvoidingView
        behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
        style={styles.keyboardAvoidingView}>
        <ScrollView
          contentContainerStyle={styles.scrollView}
          keyboardShouldPersistTaps="handled">
          <View style={styles.logoContainer}>
            <Image style={styles.logo} source={appImages?.logo} />
            <Text style={[styles.logoText, {color: palette.primary.main}]}>
              Tech Do
            </Text>
          </View>

          <View style={styles.formContainer}>
            <Text style={[styles.title, {color: palette.secondary.main}]}>
              Login
            </Text>
            <Text style={[styles.subtitle, {color: palette.text.body}]}>
              Please sign in to continue
            </Text>

            <View style={styles.inputContainer}>
              <Text style={[styles.label, {color: palette.text.body}]}>
                Email
              </Text>
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
                onChangeText={(text: string) => formik.setFieldValue('email', text)}
                onBlur={() => formik.setFieldTouched('email', true)}
                styleData={{
                  labelStyles: {
                    weight: 'medium',
                    color: palette.text.body,
                  },
                }}
              />
            </View>

            <View style={styles.inputContainer}>
              <Text style={[styles.label, {color: palette.text.body}]}>
                Password
              </Text>
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
                onChangeText={(text: string) => formik.setFieldValue('password', text)}
                onBlur={() => formik.setFieldTouched('password', true)}
                styleData={{
                  labelStyles: {
                    weight: 'medium',
                    color: palette.text.body,
                  },
                }}
                submit={() => {
                  if (isObjEmpty(formik.errors)) {
                    formik.handleSubmit();
                  }
                }}
              />
            </View>

            <View style={styles.rememberContainer}>
              <TouchableOpacity
                onPress={() =>
                   {
                    setRememberMe(prev => prev === 'checked' ? 'unchecked' : 'checked');
                     setFormData({...formData, rememberMe: !formData.rememberMe});
                    }
                }
                style={styles.checkboxContainer}>
                <View
                  style={[
                    styles.checkbox,
                    {
                      backgroundColor: formData.rememberMe
                        ? palette.primary.main
                        : 'transparent',
                      borderColor: formData.rememberMe
                        ? palette.primary.main
                        : palette.grey[400],
                    },
                  ]}>
                  {formData.rememberMe && (
                    <Text style={styles.checkmark}>✓</Text>
                  )}
                </View>
                <Text style={[styles.rememberText, {color: palette.text.body}]}>
                  Remember me
                </Text>
              </TouchableOpacity>

              <TouchableOpacity onPress={handleForgotPassword}>
                <Text
                  style={[
                    styles.forgotPassword,
                    {color: palette.primary.main},
                  ]}>
                  Forgot password?
                </Text>
              </TouchableOpacity>
            </View>

            <TouchableOpacity
              style={[
                styles.loginButton,
                {backgroundColor: palette.primary.main},
              ]}
              onPress={handleLogin}
              disabled={isLoading}>
              <Text style={styles.loginButtonText}>
                {isLoading ? 'Logging in...' : 'Login'}
              </Text>
            </TouchableOpacity>
          </View>
        </ScrollView>
      </KeyboardAvoidingView>

      <View style={styles.footer}>
        <Text style={[styles.footerText, {color: 'white'}]}>
          © {new Date().getFullYear()} Tech Do. All rights reserved.
        </Text>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f5f5f5',
  },
  keyboardAvoidingView: {
    flex: 1,
  },
  scrollView: {
    flexGrow: 1,
    paddingHorizontal: 20,
  },
  logoContainer: {
    alignItems: 'center',
    marginTop: 60,
    marginBottom: 40,
  },
  logo: {
    marginVertical: themeUtils?.WP(5),
    height: themeUtils?.WP(20),
    width: themeUtils?.WP(20),
    marginRight: themeUtils?.WP(2),
  } as ImageStyle,
  logoText: {
    fontSize: 28,
    fontWeight: 'bold',
  },
  formContainer: {
    backgroundColor: 'white',
    borderRadius: 10,
    padding: 20,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.1,
    shadowRadius: 3.84,
    elevation: 5,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 8,
  },
  subtitle: {
    fontSize: 16,
    marginBottom: 30,
  },
  inputContainer: {
    marginBottom: 20,
  },
  label: {
    fontSize: 14,
    marginBottom: 8,
    fontWeight: '500',
  },
  input: {
    height: 50,
    borderWidth: 1,
    borderRadius: 8,
    paddingHorizontal: 15,
    fontSize: 16,
  },
  rememberContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 30,
  },
  checkboxContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  checkbox: {
    height: 20,
    width: 20,
    borderRadius: 4,
    borderWidth: 1,
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 10,
  },
  checkmark: {
    color: 'white',
    fontSize: 14,
  },
  rememberText: {
    fontSize: 14,
  },
  forgotPassword: {
    fontSize: 14,
  },
  loginButton: {
    height: 50,
    borderRadius: 8,
    justifyContent: 'center',
    alignItems: 'center',
  },
  loginButtonText: {
    color: 'white',
    fontSize: 16,
    fontWeight: 'bold',
  },
  footer: {
    padding: 20,
    alignItems: 'center',
    backgroundColor: '#333',
  },
  footerText: {
    fontSize: 12,
  },
});

export default Login;
