import React, { useEffect } from 'react';
import { View, Text, Pressable, ActivityIndicator } from 'react-native';

// components
import Wrapper from '../../../components/Wrapper';

// images
import backIcon from '../../../assets/images/backIcon.svg';
import ForwardArrow from '../../../assets/images/menu/forwardArrow.svg';

// style tailwind css
import tw from '../../../common/themeTailwind';
import { useDispatch, useSelector } from 'react-redux';
import {
  graphChartAction,
  graphSelectionAction,
} from '../../../redux/actions/graphAction';

const PerformanceAnalysis = ({ navigation }) => {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(graphSelectionAction());
  }, [dispatch]);
  const graphData = useSelector((state) => state.graphSelection);
  const { loading } = graphData;
  const graphSelectData = graphData?.graphSelection?.data;

  return (
    <Wrapper
      style='p-0'
      navigation={navigation}
      backIcon={backIcon}
      title='Performance Analysis'
    >
      {loading ? (
        <View style={tw.style(`my-auto `)}>
          <ActivityIndicator
            style={tw.style(``)}
            size='large'
            color='#ff0000'
          />
        </View>
      ) : (
        <>
          {graphSelectData &&
            graphSelectData?.map((item, index) => (
              <Pressable
                style={tw.style(`border-t border-b border-gray-200 px-6`)}
                key={index}
                onPress={() => {
                  dispatch(
                    graphChartAction({
                      id: item.id,
                      selection_type: item.selection_type,
                    })
                  );
                  navigation.navigate('GraphScreen');
                }}
              >
                <View
                  style={tw.style(`flex-row justify-between py-2 my-2`)}
                  key={index}
                >
                  <Text
                    style={[{ fontFamily: 'SF_regular' }, tw.style(`text-sm`)]}
                  >
                    {item.title}
                  </Text>
                  <View>
                    <ForwardArrow />
                  </View>
                </View>
              </Pressable>
            ))}

          <View style={tw.style(`border-t border-gray-200`)}></View>
        </>
      )}
    </Wrapper>
  );
};

export default PerformanceAnalysis;
