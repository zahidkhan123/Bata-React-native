import React, { useState, useEffect, useCallback } from 'react';
import {
  View,
  Pressable,
  Text,
  ActivityIndicator,
  StyleSheet,
} from 'react-native';
import OtpTextInput from 'react-native-otp-textinput';
import useCountDown from 'react-countdown-hook';
// components
import FormWrapper from '../../components/auth/AuthFormWrapper';
import AuthFooter from '../../components/auth/AuthFooter';
import Wrapper from '../../components/auth/AuthWrapper';
import CustomButton from '../../components/CustomButton';
import { useForm, Controller } from 'react-hook-form';
import Model from '../../components/model/CustomModel';

// Redux
import { useDispatch, useSelector } from 'react-redux';
import { verifyPin } from '../../redux/actions/userActions';

// Tailwind / CSS
import tw from '../../common/themeTailwind';

// Images
import OtpVector from '../../assets/images/otp-vector.svg';
import { TouchableOpacity } from 'react-native-gesture-handler';

const OtpverifyScreen = ({ navigation }) => {
  const [modalVisible, setModalVisible] = useState(false);

  const dispatch = useDispatch();

  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const verifyOtp = useSelector((state) => state.verifyOtp);
  const { error, loading, success } = verifyOtp;

  const onPinSubmit = (data) => {
    dispatch(verifyPin(data));
    setModalVisible(true);
  };
  const [timeLeft, { start }] = useCountDown(60000, 1000);

  useEffect(() => {
    start();
  }, []);

  useEffect(() => {
    if (success) {
      navigation.navigate('ChangePassword');
    }
  }, [!loading]);

  const restart = useCallback(() => {
    const newTime = 60 * 1000;
    start(newTime);
    onPinSubmit();
  }, []);

  return (
    <Wrapper
      backIcon
      vectorIcon={OtpVector}
      navigation={navigation}
      title='Enter 6 digit code that you
          received on your registered number'
    >
      {loading && (
        <View>
          <ActivityIndicator size='large' color='#ff0000' />
        </View>
      )}
      {error && (
        <Model
          modalVisible={modalVisible}
          setModalVisible={() => setModalVisible(!modalVisible)}
          title={error}
          error
        />
      )}

      <FormWrapper heading='Enter Confirmation Code'>
        <View style={{ marginBottom: 20 }}>
          <Controller
            control={control}
            rules={{
              required: true,
            }}
            render={({ field: { onChange, onBlur, value } }) => (
              <OtpTextInput
                inputCount={6}
                tintColor='#E4001C'
                onBlur={onBlur}
                handleTextChange={onChange}
                defaultValue={value}
                containerStyle={styles.textInputContainer}
                keyboardType='default'
              />
            )}
            name='otpCode'
          />
        </View>

        <View style={tw.style(`flex-row justify-center items-center mb-6`)}>
          <Text style={{ fontFamily: 'SF_regular' }}>
            00:{timeLeft / 1000}{' '}
          </Text>
          <TouchableOpacity onPress={restart}>
            <Text style={styles.resendCode}>Resend code</Text>
          </TouchableOpacity>
        </View>

        <CustomButton
          color='red'
          title='Submit'
          onPress={handleSubmit(onPinSubmit)}
        />

        <AuthFooter />
      </FormWrapper>
    </Wrapper>
  );
};

const styles = StyleSheet.create({
  textInputContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 5,
  },
  resendCode: {
    textDecorationLine: 'underline',
    fontWeight: '700',
    fontFamily: 'SF_regular',
  },
});

export default OtpverifyScreen;
