import React, { useState, useEffect } from 'react';
import { Pressable, Text, View, StyleSheet } from 'react-native';
import Wrapper from '../../components/Wrapper';
import tw from '../../common/themeTailwind';
import DownArrow from '../../assets/down_filter.svg';
import UpArrow from '../../assets/upArrow.svg';
import SelectableChips from 'react-native-chip/SelectableChips';
import MaterialChip from 'react-native-material-chip';
import Tags from 'react-native-tags';
import { useDispatch, useSelector } from 'react-redux';
import {
  BrandFilterAction,
  CategoryFilterAction,
} from '../../redux/actions/searchFilterAction';
import CustomButton from '../../components/CustomButton';

const ProductFilter = ({ navigation }) => {
  const [isOpenBrand, setIsOpenBrand] = useState(false);
  const [isOpenCategory, setIsOpenCategory] = useState(false);

  const [categoryUpdatedData, setCatUpdatedData] = useState(null);
  const [brandUpdatedData, setBrandUpdatedData] = useState(null);
  const [selected, setSelected] = useState(false);
  const [selectBrand, setSelectBrand] = useState(false);
  const [selectCat, setSelectCat] = useState(false);

  const dispatch = useDispatch();
  const cat = useSelector((state) => state?.categoryFilter);

  const categoryData = cat?.categoryFilter?.data;

  const brand = useSelector((state) => state.brandFilter);
  const brandData = brand?.brandFilter?.data;

  useEffect(() => {
    dispatch(BrandFilterAction());
    dispatch(CategoryFilterAction());
  }, [dispatch]);

  useEffect(() => {
    let updatedBrand = [];
    if (brandData) {
      brandData?.map((product) => {
        updatedBrand.push({ ...product, selected });
      });
    }
    setBrandUpdatedData(updatedBrand);
  }, [brandData]);

  useEffect(() => {
    let category = [];
    if (categoryData) {
      categoryData?.map((item, index) => {
        category.push({ ...item, selected });
      });
    }
    setCatUpdatedData(category);
  }, [categoryData]);

  const renderBata = (code, selected) => {
    let newBataData = brandUpdatedData?.map((item) => {
      if (item.code === code) {
        return { ...item, selected: !selected };
      }
      return item;
    });
    let count = 1;
    newBataData?.map((item) => {
      if (item.selected === true) {
        count = 0;
        setSelectBrand(item.selected);
      } else if (count === 1) {
        setSelectBrand(false);
      }
    });
    setBrandUpdatedData(newBataData);
  };
  const renderCategory = (code, selected) => {
    let newCategoryData = categoryUpdatedData?.map((item) => {
      if (item.code === code) {
        return { ...item, selected: !selected };
      }
      return item;
    });

    let count = 1;
    newCategoryData?.map((item) => {
      if (item.selected === true) {
        count = 0;
        setSelectCat(item.selected);
      } else if (count === 1) {
        setSelectCat(false);
      }
    });
    setCatUpdatedData(newCategoryData);
  };

  return (
    <Wrapper title='Filter' backIcon navigation={navigation}>
      <View>
        <Text
          style={[
            { fontFamily: 'SF_bold' },
            tw.style(` text-left mb-1 text-lg leading-7 `),
          ]}
        >
          Select Filter by
        </Text>
        <Pressable
          onPress={() => {
            setIsOpenBrand(!isOpenBrand);
          }}
          style={tw.style(
            `flex flex-row mt-3 bg-transparent w-full items-center p-2 rounded-md `
          )}
        >
          <Text style={[{ fontFamily: 'SF_semibold' }, tw.style(`text-base`)]}>
            Brand
          </Text>
          {isOpenBrand ? (
            <UpArrow style={tw.style(`ml-4`)} />
          ) : (
            <DownArrow style={tw.style(`ml-4 `)} stroke='#000' />
          )}
        </Pressable>
        {isOpenBrand && (
          <View style={tw.style(`flex flex-row flex-wrap`)}>
            {brandUpdatedData?.map(({ name, code, selected }) => {
              return (
                <View key={code}>
                  <Tags
                    initialTags={[name]}
                    onChangeTags={(tags) => console.log(tags)}
                    onTagPress={(index, tagLabel, event, deleted) => {
                      renderBata(code, selected);
                    }}
                    onPress={null}
                    readonly={true}
                    style={tw.style(`flex flex-row flex-wrap`)}
                    tagTextStyle={[
                      { fontFamily: 'SF_regular' },
                      tw.style(`text-xs`),
                    ]}
                    tagContainerStyle={
                      selected === true
                        ? {
                            backgroundColor: 'transparent',
                            borderWidth: 1,
                            borderColor: 'red',
                          }
                        : tw.style(`bg-gray-300`)
                    }
                  />
                </View>
              );
            })}
          </View>
        )}

        <Pressable
          onPress={() => {
            setIsOpenCategory(!isOpenCategory);
          }}
          style={tw.style(
            `flex flex-row mt-5 bg-transparent w-full items-center p-2 rounded-md `
          )}
        >
          <Text style={[{ fontFamily: 'SF_semibold' }, tw.style(`text-base`)]}>
            Category
          </Text>

          {isOpenCategory ? (
            <UpArrow style={tw.style(`ml-4`)} />
          ) : (
            <DownArrow style={tw.style(`ml-4`)} />
          )}
        </Pressable>
        {isOpenCategory && (
          <View style={tw.style(`flex flex-row flex-wrap`)}>
            {categoryUpdatedData?.map(({ name, code, selected }) => {
              return (
                <View key={code}>
                  <Tags
                    initialTags={[name]}
                    onChangeTags={(tags) => console.log(tags)}
                    onTagPress={(index, tagLabel, event, deleted) => {
                      renderCategory(code, selected);
                      // checkSelected();
                    }}
                    onPress={null}
                    readonly={true}
                    style={tw.style(`flex flex-row flex-wrap`)}
                    tagTextStyle={[
                      { fontFamily: 'SF_regular' },
                      tw.style(`text-xs`),
                    ]}
                    tagContainerStyle={
                      selected
                        ? {
                            backgroundColor: 'transparent',
                            borderWidth: 1,
                            borderColor: 'red',
                          }
                        : tw.style(`bg-gray-300`)
                    }
                  />
                </View>
              );
            })}
          </View>
        )}
      </View>
      {/* {/ FILER BUTTONS /} */}
      <View style={tw.style(`flex flex-row justify-evenly items-center my-5`)}>
        <View style={tw.style(`w-32  `)}>
          <CustomButton title='Clear' color='gray' />
        </View>
        <View style={tw.style(`w-32  `)}>
          {/* {/ {(selectBrand || selectCat) && ( /}
          <CustomButton
            title='Apply'
            color={selectBrand || selectCat ? 'red' : 'gray'}
            disabled={selectBrand || selectCat ? false : true}
          />
          {/ )} /} */}
        </View>
      </View>
    </Wrapper>
  );
};

const styles = StyleSheet.create({
  chip: {
    fontStyle: 'normal',
    height: 30,
    textTransform: 'capitalize',
    fontWeight: 'normal',
    borderColor: 'transparent',
    color: 'white',
    backgroundColor: '#DCDCDC',
  },
  selectedChip: {
    fontStyle: 'normal',
    height: 30,
    textTransform: 'capitalize',
    fontWeight: 'normal',
    borderColor: 'transparent',
    color: 'white',
    backgroundColor: 'white',
  },
});

export default ProductFilter;
