import React, { useState } from 'react';
import { FormProvider, useForm } from 'react-hook-form';
import {
  Switch,
  View,
  Text,
  Alert,
  StyleSheet,
  KeyboardAvoidingView,
  Platform,
  SafeAreaView,
} from 'react-native';
import LottieView from 'lottie-react-native';
import CreditCardForm, { Button } from 'rn-credit-card';
// import Wrapper
import Wrapper from '../../components/Wrapper';
import CustomButton from '../../components/CustomButton';
// images
import backIcon from '../../assets/images/backIcon.svg';
import tw from '../../common/themeTailwind';

const AddCardPayment = ({ navigation }) => {
  const formMethods = useForm({
    // to trigger the validation on the blur event
    mode: 'onBlur',
    defaultValues: {
      holderName: '',
      cardNumber: '',
      expiration: '',
      cvv: '',
    },
  });
  const { handleSubmit, formState } = formMethods;
  const [isEnabled, setIsEnabled] = useState(false);
  const toggleSwitch = () => setIsEnabled((previousState) => !previousState);
  function onSubmit(model) {
    console.log('Success: ' + JSON.stringify(model, null, 2));
  }

  return (
    <>
      <Wrapper navigation={navigation} backIcon={backIcon} title='Payment'>
        <FormProvider {...formMethods}>
          <SafeAreaView style={tw.style(`flex-1  -mx-4 mt-5`)}>
            <KeyboardAvoidingView
              style={tw.style(`flex-1 px-6 `)}
              behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
            >
              <CreditCardForm
                LottieView={LottieView}
                horizontalStart
                overrides={{
                  labelText: {
                    marginTop: 16,
                  },
                  input: {
                    backgroundColor: '#F6F6F6',
                    padding: 10,
                  },
                  labelContainer: {
                    backgroundColor: '#F6F6F6',
                  },
                }}
              />
            </KeyboardAvoidingView>
            <View
              style={tw.style(
                `flex flex-row items-center justify-between px-6 mb-20`
              )}
            >
              <Text
                style={[
                  { fontFamily: 'SF_regular' },
                  tw.style(`font-bold text-base`),
                ]}
              >
                Save Details
              </Text>
              <Switch
                trackColor={{ false: '#767577', true: '#81b0ff' }}
                thumbColor={isEnabled ? '#81b0ff' : '#f4f3f4'}
                ios_backgroundColor='#3e3e3e'
                onValueChange={toggleSwitch}
                value={isEnabled}
              />
            </View>
            <View style={tw.style(`w-1/2 mt-2 mx-auto`)}>
              <CustomButton
                title='Add Card'
                onPress={() => handleSubmit(onSubmit)}
              />
            </View>
          </SafeAreaView>
        </FormProvider>
      </Wrapper>
    </>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  avoider: {
    flex: 1,
    padding: 36,
  },
  button: {
    margin: 36,
    marginTop: 0,
  },
});

export default AddCardPayment;
