import React, { useEffect, useState } from 'react';
import { View, Text } from 'react-native';
import Model from '../../components/model/CustomModel';
// use hook form
import { useForm } from 'react-hook-form';

// components
import Wrapper from '../../components/Wrapper';
import CustomInput from '../../components/CustomInput';
import CustomButton from '../../components/CustomButton';

// images
import backArrow from '../../assets/images/Nevigationbar.svg';
import tw from 'tailwind-react-native-classnames';
import { feedbackAction } from '../../redux/actions/feedbackAction';
import { useDispatch, useSelector } from 'react-redux';
const Feedback = ({ navigation }) => {
  const [modalVisible, setModalVisible] = useState(false);
  const {
    control,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm();
  const dispatch = useDispatch();
  const userLogin = useSelector((state) => state.userLogin);
  const { UserName } = userLogin?.userInfo?.data;
  const feedData = useSelector((state) => state.feedback);
  const data = feedData?.feedback?.status?.message;

  const onSubmitHandler = (data) => {
    dispatch(feedbackAction({ outletID: UserName, message: data.feedback }));
    setModalVisible(true);
    reset();
  };

  return (
    <>
      <Wrapper navigation={navigation} title='Feedback' backArrow={backArrow}>
        {data && (
          <Model
            modalVisible={modalVisible}
            setModalVisible={() => setModalVisible(!modalVisible)}
            title='Your feedback has been submitted'
            Feedback
          />
        )}
        <View>
          <CustomInput
            control={control}
            errors={errors}
            name='feedback'
            rules={{
              required: 'true',
            }}
            errorMessage='Required Field'
            placeholder='Write your feedback'
            style='bg-smoke border border-gray-200 p-4'
            multiline={true}
            feedback
          />
        </View>

        <View style={tw.style(`w-1/2 mx-20 my-20`)}>
          <CustomButton
            title='Submit'
            color='red'
            onPress={handleSubmit(onSubmitHandler)}
          />
        </View>
      </Wrapper>
    </>
  );
};

export default Feedback;
