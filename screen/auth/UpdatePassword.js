import React, { useState, Fragment } from 'react';
import { useForm } from 'react-hook-form';
import { useDispatch, useSelector } from 'react-redux';

// components
import FormWrapper from '../../components/auth/AuthFormWrapper';
import AuthFooter from '../../components/auth/AuthFooter';
import Wrapper from '../../components/auth/AuthWrapper';
import CustomInput from '../../components/CustomInput';
import CustomButton from '../../components/CustomButton';
import Model from '../../components/model/CustomModel';

// images
import ForgotPasswordVector from '../../assets/images/forgotpassword-vector.svg';
import { updatePasswordAction } from '../../redux/actions/updatePasswordAction';

const UpdatePassword = ({ navigation }) => {
  const [modalVisible, setModalVisible] = useState(false);
  const dispatch = useDispatch();
  const updatePassword = useSelector((state) => state.updatePassword);
  const { success, error } = updatePassword;
  const userLogin = useSelector((state) => state.userLogin);
  const data = userLogin?.userInfo?.data;
  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const onSubmit = (newData) => {
    const editChange = {
      userName: data.UserName,
      oldPassword: newData.oldPassword,
      newPassword: newData.password,
      confirmPassword: newData.confirmPassword,
    };
    dispatch(updatePasswordAction(editChange));
    setModalVisible(true);
  };
  // else if (newData.oldPassword !== data.UserPassword) {
  //   newSetError(false);
  //   oldSetError(true);
  //   setModalVisible(true);
  // } else if (newData.password !== newData.confirmPassword) {
  //   oldSetError(false);
  //   newSetError(true);
  //   setModalVisible(true);
  // }

  return (
    <Fragment>
      <Wrapper
        vectorIcon={ForgotPasswordVector}
        navigation={navigation}
        backIcon
        heading='Change Password'
      >
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
            title='Password has been changed successfully!'
            navigateTo=''
            success
          />
        )}

        <FormWrapper heading='Set New Password'>
          <CustomInput
            control={control}
            errors={errors}
            label='Enter Old Password'
            name='oldPassword'
            rules={{
              required: 'true',
            }}
            password
            errorMessage='Required Field'
            placeholder='Enter Old Password'
          />

          <CustomInput
            control={control}
            errors={errors}
            label='Enter New Password'
            name='password'
            password
            rules={{
              required: 'true',
            }}
            errorMessage='Required Field'
            placeholder='Enter Password'
          />

          <CustomInput
            control={control}
            errors={errors}
            label='Confirm New Password'
            password
            name='confirmPassword'
            rules={{
              required: 'true',
            }}
            errorMessage='Required Field'
            placeholder='Enter Password'
          />

          <CustomButton title='Done' onPress={handleSubmit(onSubmit)} />

          <AuthFooter />
        </FormWrapper>
      </Wrapper>
    </Fragment>
  );
};

export default UpdatePassword;
