import React, {FC, useEffect, useRef, useState} from 'react';
import {View, StyleSheet, TextInput, Keyboard, Text} from 'react-native';
import AppLink from '@ui/AppLink';
import AuthFormContainer from '@components/AuthFormContainer';
import OTPField from '@ui/OTPField';
import AppButton from '@ui/AppButton';
import {NativeStackScreenProps} from '@react-navigation/native-stack';
import {AuthStackParamList} from 'src/@types/navigation';
import client from 'src/api/client';
import {NavigationProp, useNavigation} from '@react-navigation/native';
import colors from '@utils/colors';

type Props = NativeStackScreenProps<AuthStackParamList, 'Verification'>;

const otpFields = new Array(6).fill('');

const Verification: FC<Props> = ({route}) => {
  const navigation = useNavigation<NavigationProp<AuthStackParamList>>();

  const [otp, setOtp] = useState([...otpFields]);
  const [activeOptIndex, setActiveOptIndex] = useState(0);
  const [submitting, setSubmitting] = useState(false);
  const [countDown, setCountDown] = useState(60);
  const [canSendNewOtpRequest, setcanSendNewOtpRequest] = useState(false);

  const {userInfo} = route.params;

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

  const isValidOtp = otp.every(value => {
    return value.trim();
  });

  const handleSubmit = async () => {
    if (!isValidOtp) return;

    setSubmitting(true);

    try {
      const {data} = await client.post('/auth/verify-email', {
        userId: userInfo.id,
        token: otp.join(''),
      });
      // console.log(data);
      navigation.navigate('SignIn');
    } catch (error) {
      console.log('Error inside verification', error);
    }
    setSubmitting(false);
  };

  const requestForOTP = async () => {
    setCountDown(60);
    setcanSendNewOtpRequest(false);

    try {
      await client.post('/auth/re-verify-email', {userId: userInfo.id});
    } catch (error) {
      console.log('error from new otp', error);
    }
  };

  useEffect(() => {
    inputRef.current?.focus();
  }, [activeOptIndex]);

  useEffect(() => {
    if (canSendNewOtpRequest) return;

    const intervealId = setInterval(() => {
      setCountDown(oldCountDown => {
        if (oldCountDown <= 0) {
          setcanSendNewOtpRequest(true);
          clearInterval(intervealId);
          return 0;
        }
        return oldCountDown - 1;
      });
    }, 1000);

    return () => {
      clearInterval(intervealId);
    };
  }, [canSendNewOtpRequest]);

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

      <AppButton busy={submitting} title="Submit" onPress={handleSubmit} />
      <View style={styles.linkContainer}>
        {countDown > 0 ? (
          <Text style={styles.countDown}>{countDown} sec</Text>
        ) : null}
        <AppLink
          active={canSendNewOtpRequest}
          title="Re-Send OTP"
          onPress={requestForOTP}
        />
      </View>
    </AuthFormContainer>
  );
};

const styles = StyleSheet.create({
  linkContainer: {
    width: '100%',
    marginTop: 20,
    justifyContent: 'flex-end',
    flexDirection: 'row',
  },
  inputContainer: {
    width: '100%',
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 20,
  },
  countDown: {
    color: colors.SECONDARY,
    marginRight: 7,
  },
});

export default Verification;
