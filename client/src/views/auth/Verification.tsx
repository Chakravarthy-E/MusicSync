import React, {FC, useEffect, useRef, useState} from 'react';
import {View, StyleSheet, TextInput, Keyboard} from 'react-native';
import AppLink from '@ui/AppLink';
import AuthFormContainer from '@components/AuthFormContainer';
import OTPField from '@ui/OTPField';
import AppButton from '@ui/AppButton';

interface Props {}

const otpFields = new Array(6).fill('');

const Verification: FC<Props> = props => {
  const [otp, setOtp] = useState([...otpFields]);
  const [activeOptIndex, setActiveOptIndex] = useState(0);

  const inputRef = useRef<TextInput>(null);

  const handleChange = (value: string, index: number) => {
    const newOtp = [...otp];

    if (value === 'Backspace') {
      if (!newOtp[index]) setActiveOptIndex(index - 1);
      newOtp[index] = '';
    } else {
      setActiveOptIndex(index + 1);
      newOtp[index] = value;
    }
    setOtp([...newOtp]);
  };

  const handlePaste = (value: string) => {
    if (value.length === 6) {
      Keyboard.dismiss();
      const newOtp = value.split('');
      setOtp([...newOtp]);
    }
  };

  const handleSubmit = () => {
    console.log(otp);
  };

  useEffect(() => {
    inputRef.current?.focus();
  }, [activeOptIndex]);

  return (
    <AuthFormContainer heading="Please look in to your email !" subHeading="">
      <View style={styles.inputContainer}>
        {otpFields.map((_, index) => {
          return (
            <OTPField
              ref={activeOptIndex === index ? inputRef : null}
              key={index}
              placeholder="*"
              onKeyPress={({nativeEvent}) => {
                handleChange(nativeEvent.key, index);
              }}
              onChangeText={handlePaste}
              keyboardType="numeric"
              value={otp[index] || ''}
            />
          );
        })}
      </View>

      <AppButton title="Submit" onPress={handleSubmit} />
      <View style={styles.linkContainer}>
        <AppLink title="Re-Send OTP" />
      </View>
    </AuthFormContainer>
  );
};

const styles = StyleSheet.create({
  linkContainer: {
    width: '100%',
    marginTop: 20,
    alignItems: 'flex-end',
  },
  inputContainer: {
    width: '100%',
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 20,
  },
});

export default Verification;
