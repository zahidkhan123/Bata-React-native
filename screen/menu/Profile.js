import React, { useEffect, useState } from 'react';
import {
  Text,
  Pressable,
  StyleSheet,
  View,
  TouchableOpacity,
  Image,
} from 'react-native';
import * as ImagePicker from 'expo-image-picker';
// use hook form
import { useForm } from 'react-hook-form';

// componets
import Wrapper from '../../components/Wrapper';
import FormWrapper from '../../components/auth/AuthFormWrapper';
import CustomInput from '../../components/CustomInput';
import CustomButton from '../../components/CustomButton';

// images
import backArrow from '../../assets/images/Nevigationbar.svg';
import Avatar from '../../assets/Avatar.png';
import editIcon from '../../assets/images/ic_edit_white.svg';
import Editpro from '../../assets/editpro.svg';
// tailwind css
import tw from '../../common/themeTailwind';
import { useDispatch, useSelector } from 'react-redux';
import { EditProfileAction } from '../../redux/actions/editProfileAction';

const Profile = ({ navigation }) => {
  const dispatch = useDispatch();
  const [image, setImage] = useState(null);
  const userLogin = useSelector((state) => state.userLogin);
  const data = userLogin?.userInfo?.data;
  const editProfile = useSelector((state) => state.userProfile);
  const userData = editProfile?.editProfile?.status?.message;
  console.log(editProfile);
  useEffect(() => {
    (async () => {
      if (Platform.OS === 'android' && Platform.OS === 'ios') {
        const { status } =
          await ImagePicker.requestMediaLibraryPermissionsAsync();
        if (status !== 'granted') {
          alert('Sorry, we need camera roll permissions to make this work!');
        }
      }
    
  })();
}, []);

const {
  control,
  handleSubmit,
  formState: { errors },
} = useForm();

const onSubmit = (data) => {
  const profileData = {
    picture: image,
    userName: data?.Full_Name,
    fullName: data?.Full_Name,
    email: data?.Registered_Email,
    registerNo: data?.Registered_Number,
  };

  dispatch(EditProfileAction(profileData));
};
  const imagePickerHandler = async () => {
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.All,
      allowsEditing: true,
      aspect: [4, 3],
      quality: 1,
    });

    if (!result.cancelled) {
      setImage(result.uri);
    }
  };
  let icon = image ? { uri: image } : Avatar;
  return (
    <Wrapper
      navigation={navigation}
      backArrow={backArrow}
      title='Profile'
      editIcon={editIcon}
    >
      <View style={tw.style(`mt-14`)}>
        <FormWrapper style='#FFFFFF'>
          <View style={tw.style(`flex-row py-1 pb-4`)}>
            <View>
              <View style={imageUploaderStyles.container}>
                <Image source={icon} style={{ width: 85, height: 85 }} />
              </View>
              <View style={imageUploaderStyles.uploadBtnContainer}>
                <TouchableOpacity onPress={imagePickerHandler}>
                  <Editpro />
                </TouchableOpacity>
              </View>
            </View>
            <View style={tw.style(`py-5 px-4`)}>
              <Text style={tw.style(`font-bold text-lg`)}>{`${
                data && data?.UserName
              } `}</Text>
              <Text style={tw.style(`py-2 text-gray font-bold text-sm`)}>
                {`${data && data?.UserId} `}
              </Text>
            </View>
          </View>
          <View style={tw.style(`border border-gray-200`)}></View>
          <View style={tw.style(`py-2`)}>
            <CustomInput
              control={control}
              errors={errors}
              label='Full Name'
              name='Full_Name'
              defaultValue={`${data && data?.UserName} `}
              style='bg-smoke'
            />
            <CustomInput
              control={control}
              errors={errors}
              label='Registered ID'
              name='Registered_ID'
              defaultValue={`${data && data?.UserName} `}
              style='bg-smoke'
              editable={false}
            />
            <CustomInput
              control={control}
              errors={errors}
              label='Registered Number'
              name='Registered_Number'
              defaultValue={`${data && data?.RegisterNo} `}
              style='bg-smoke'
            />
            <CustomInput
              control={control}
              errors={errors}
              label='Registered Email'
              name='Registered_Email'
              defaultValue={`${data && data?.Email} `}
              style='bg-smoke'
            />

            <View style={tw.style(`w-1/2 mx-20 mt-4`)}>
              <CustomButton
                color='red'
                title='Save'
                onPress={handleSubmit(onSubmit)}
              />
            </View>
          </View>
        </FormWrapper>
      </View>
    </Wrapper>
  );
};

export default Profile;
const imageUploaderStyles = StyleSheet.create({
  container: {
    overflow: 'hidden',
    elevation: 2,
    height: 85,
    width: 85,
    backgroundColor: '#efefef',
    borderRadius: 20,
  },
  uploadBtnContainer: {
    position: 'absolute',
    bottom: 0,
    elevation: 3,
    top: 65,
    right: -7,
    backgroundColor: 'lightgray',
    width: 30,
    height: 30,
    borderRadius: 60,
    padding: 6,
    justifyContent: 'center',
  },
  uploadBtn: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
