import React, { useCallback, useState, useEffect } from 'react';
import {
  StyleSheet,
  Pressable,
  Text,
  View,
  ActivityIndicator,
} from 'react-native';
import { useForm } from 'react-hook-form';
import { NavigationContainer, CommonActions } from '@react-navigation/native';
// components
import FormWrapper from '../../components/auth/AuthFormWrapper';
import AuthFooter from '../../components/auth/AuthFooter';
import Wrapper from '../../components/auth/AuthWrapper';
import CustomInput from '../../components/CustomInput';
import CustomButton from '../../components/CustomButton';
import Model from '../../components/model/CustomModel';

// Redux
import { useDispatch, useSelector } from 'react-redux';
import { login } from '../../redux/actions/userActions';
// import { useNavigation } from '@react-navigation/native';
// images
import logo from '../../assets/images/new-logo.svg';
import LoginVector from '../../assets/images/login-vector.svg';

const LoginScreen = ({ navigation }) => {
  const [modalVisible, setModalVisible] = useState(false);
  // const navigation = useNavigation();
  const dispatch = useDispatch();
  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const userLogin = useSelector((state) => state.userLogin);
  const { error, loading, userInfo } = userLogin;
  const token = !loading && userInfo?.data?.Token;

  const onLoginSubmit = (data) => {
    console.log(data);
    dispatch(login(data, navigation));
    setModalVisible(true);
    if (userInfo?.status?.message === 'success') {
      navigation.navigate('Home', { screen: 'HomeScreen' });
    }
  };

  return (
    <>
      <Wrapper logo={logo} vectorIcon={LoginVector}>
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
        <FormWrapper heading='Sign In'>
          <CustomInput
            control={control}
            errors={errors}
            label='Outlet ID / Username'
            name='UserName'
            rules={{
              required: 'true',
            }}
            errorMessage='Username is required!'
            placeholder='Enter ID'
          />
          <CustomInput
            control={control}
            errors={errors}
            label='Password'
            password
            name='password'
            rules={{
              required: 'true',
            }}
            errorMessage='Password is required!'
            placeholder='Enter Password'
          />

          <Pressable onPress={() => navigation.navigate('ForgotPassword')}>
            <Text style={styles.forgotPasswordText}>Forgot password ?</Text>
          </Pressable>

          <CustomButton
            color='red'
            title='Login'
            onPress={handleSubmit(onLoginSubmit)}
          />

          <AuthFooter />
        </FormWrapper>
      </Wrapper>
    </>
  );
};

export default LoginScreen;

const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
    justifyContent: 'space-between',
  },

  forgotPasswordText: {
    marginBottom: 15,
    textAlign: 'right',
    fontFamily: 'SF_regular',
  },
});
