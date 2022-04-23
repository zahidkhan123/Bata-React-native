import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import {
  StyleSheet,
  Pressable,
  Text,
  View,
  ActivityIndicator,
} from 'react-native';
import { useForm } from 'react-hook-form';

// components
import FormWrapper from '../../components/auth/AuthFormWrapper';
import AuthFooter from '../../components/auth/AuthFooter';
import Wrapper from '../../components/auth/AuthWrapper';
import CustomInput from '../../components/CustomInput';
import CustomButton from '../../components/CustomButton';
import { forgotPassword } from '../../redux/actions/userActions';
import Model from '../../components/model/CustomModel';

// images
import ForgotPasswordVector from '../../assets/images/forgotpassword-vector.svg';

const ForgotPassword = ({ navigation }) => {
  const [modalVisible, setModalVisible] = useState(false);

  const dispatch = useDispatch();

  const {
    control,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm();
  const forgotpass = useSelector((state) => state.forgotPassword);
  const { error, success, loading } = forgotpass;

  const onForgotPasswordSubmit = (data) => {
    dispatch(forgotPassword(data));
    setModalVisible(true);
  };

  return (
    <Wrapper
      vectorIcon={ForgotPasswordVector}
      backIcon
      navigation={navigation}
      heading='Forgot Password'
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
      {success && (
        <Model
          modalVisible={modalVisible}
          setModalVisible={() => setModalVisible(!modalVisible)}
          title='OTP has been sent to your registered number!'
          navigateTo='OtpVerify'
          success
        />
      )}

      <FormWrapper heading='Forgot Password'>
        <CustomInput
          control={control}
          errors={errors}
          label='Enter your number'
          name='mobileNumber'
          rules={{
            required: 'true',
          }}
          errorMessage='Required Field'
          keyboardType='numeric'
          placeholder='+92 000 000 0000'
        />

        <Pressable>
          <Text style={styles.forgotPasswordText}>
            Please Enter Your Registered Number
          </Text>
        </Pressable>

        <CustomButton
          color='red'
          title='Update Password'
          onPress={handleSubmit(onForgotPasswordSubmit)}
        />

        <AuthFooter />
      </FormWrapper>
    </Wrapper>
  );
};

export default ForgotPassword;

const styles = StyleSheet.create({
  forgotPasswordText: {
    marginBottom: 15,
    textAlign: 'center',
    fontFamily: 'SF_regular',
  },
});
