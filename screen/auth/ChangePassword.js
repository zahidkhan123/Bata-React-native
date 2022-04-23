import React, { useState, Fragment } from 'react';
import { useForm } from 'react-hook-form';

// components
import FormWrapper from '../../components/auth/AuthFormWrapper';
import AuthFooter from '../../components/auth/AuthFooter';
import Wrapper from '../../components/auth/AuthWrapper';
import CustomInput from '../../components/CustomInput';
import CustomButton from '../../components/CustomButton';
import Model from '../../components/model/CustomModel';
import { ActivityIndicator, StyleSheet, View } from 'react-native';

import { useDispatch, useSelector } from 'react-redux';
import { ChangePasswordAction } from '../../redux/actions/userActions';
// images
import ForgotPasswordVector from '../../assets/images/forgotpassword-vector.svg';

const ChangePassword = ({ navigation }) => {
  const [modalVisible, setModalVisible] = useState(false);
  const dispatch = useDispatch();

  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const changePassword = useSelector((state) => state.changePassword);
  const { error, success, loading } = changePassword;
  const forgotPassword = useSelector((state) => state.forgotPassword);
  const { UserName } = !loading && forgotPassword?.userData?.data;
  const onChangePasswordSubmit = (data) => {
    dispatch(
      ChangePasswordAction({
        UserName: UserName,
        NewPassword: data.NewPassword,
        ConfirmPassword: data.ConfirmPassword,
      })
    );
    setModalVisible(true);
  };

  return (
    <Fragment>
      <Wrapper
        vectorIcon={ForgotPasswordVector}
        navigation={navigation}
        backIcon
        heading='Set New Password'
      >
        {success && (
          <Model
            modalVisible={modalVisible}
            setModalVisible={() => setModalVisible(!modalVisible)}
            title='Password has been changed successfully!'
            navigateTo='Login'
            success
          />
        )}
        {error && (
          <Model
            modalVisible={modalVisible}
            setModalVisible={() => setModalVisible(!modalVisible)}
            title={error}
            error
          />
        )}
        <FormWrapper heading='Set New Password'>
          <CustomInput
            control={control}
            errors={errors}
            label='Outlet ID'
            name='UserName'
            errorMessage='User ID is required'
            placeholder='Enter ID'
            defaultValue={UserName}
            editable={false}
          />

          <CustomInput
            control={control}
            errors={errors}
            label='Enter New Password'
            password
            name='NewPassword'
            rules={{
              required: 'true',
            }}
            errorMessage='Password is required'
            placeholder='Enter Password'
          />

          <CustomInput
            control={control}
            errors={errors}
            label='Confirm New Password'
            password
            name='ConfirmPassword'
            rules={{
              required: 'true',
            }}
            errorMessage='Confirm password is required'
            placeholder='Enter Password'
          />

          <CustomButton
            title='Update Password'
            onPress={handleSubmit(onChangePasswordSubmit)}
          />

          <AuthFooter />
        </FormWrapper>
      </Wrapper>
    </Fragment>
  );
};

export default ChangePassword;
