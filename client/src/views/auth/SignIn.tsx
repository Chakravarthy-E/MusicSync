import React, {FC, useState} from 'react';
import * as yup from 'yup';
import {View, StyleSheet} from 'react-native';
import AuthInputField from '@components/form/AuthInputField';
import Form from '@components/form';
import SubmitBtn from '@components/form/SubmitBtn';
import PasswordVisibilityIcon from '@ui/PasswordVisibilityIcon';
import AppLink from '@ui/AppLink';
import AuthFormContainer from '@components/AuthFormContainer';

const signupSchema = yup.object({
  email: yup
    .string()
    .trim('Name is missing')
    .email('Invalid email')
    .required('Email is required'),
  password: yup
    .string()
    .trim('Password is missing')
    .min(8, 'Password is too short')
    .required('Password is required'),
});

interface Props {}

const initialValues = {
  email: '',
  password: '',
};

const SignIn: FC<Props> = props => {
  const [secureEntry, setSecureEntry] = useState(true);

  const togglePasswordView = () => {
    setSecureEntry(!secureEntry);
  };

  return (
    <Form
      onSubmit={values => {
        console.log(values);
      }}
      initialValues={initialValues}
      validationSchema={signupSchema}>
      <AuthFormContainer heading="Welcome back !" subHeading="">
        <View style={styles.formContainer}>
          <AuthInputField
            name="email"
            placeholder="john@email.com"
            label="Email"
            keyboardType="email-address"
            autoCapitalize="none"
            containerStyle={styles.marginBottom}
          />
          <AuthInputField
            name="password"
            placeholder="********"
            label="Password"
            autoCapitalize="none"
            secureTextEntry={secureEntry}
            containerStyle={styles.marginBottom}
            rightIcon={<PasswordVisibilityIcon privateIcon={secureEntry} />}
            onRightIconPress={togglePasswordView}
          />
          <SubmitBtn title="Sign in" />

          <View style={styles.linkContainer}>
            <AppLink title="Forgetten Password" />
            <AppLink title="Sign up" />
          </View>
        </View>
      </AuthFormContainer>
    </Form>
  );
};

const styles = StyleSheet.create({
  formContainer: {
    width: '100%',
  },
  marginBottom: {
    marginBottom: 20,
  },
  linkContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginTop: 20,
  },
});

export default SignIn;
