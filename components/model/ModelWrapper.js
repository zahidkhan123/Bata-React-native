import React, { useEffect, useState } from 'react';
import {
  Pressable,
  Text,
  Image,
  Modal,
  View,
  TouchableOpacity,
} from 'react-native';
import PropTypes from 'prop-types';

// Component
import CustomButton from '../CustomButton';

// Style / Tailwind
import tw from '../../common/themeTailwind';
import { useNavigation, useRoute } from '@react-navigation/native';
// Images
import CloseIcon from '../../assets/images/close.svg';
import { useDispatch, useSelector } from 'react-redux';
import { suggestedProducts } from '../../redux/actions/dashboardAction';
import { catlog } from '../../redux/actions/categoryAction';

const ModelWrapper = ({
  children,
  modalVisible,
  setModalVisible,
  closeIcon,
  navigateTo,
  article,
  editOrderdata,
  order_detail,
  totalquantity,
  categoryIDs,
}) => {
  const catalog = useSelector((state) => state.catlog);
  const pageNumber = catalog?.paginData?.page;
  const perPage = catalog?.paginData?.per_page;
  const [pageIndex, setPageIndex] = useState(pageNumber);
  const [pageSize, setPageSize] = useState(perPage);
  const navigation = useNavigation();
  const route = useRoute();
  const path = route.name;
  const dispatch = useDispatch();
  const userLogin = useSelector((state) => state.userLogin);
  const UserName = userLogin?.userInfo?.data?.UserName;

  const catalogHandler = () => {
    setModalVisible(false);
    dispatch(
      catlog({
        pageIndex: pageIndex || 1,
        pageSize: pageSize || 20,
        category_ids: categoryIDs,
        brand_ids: null,
      })
    );
  };
  return (
    <Modal
      animationType='slide'
      transparent={true}
      visible={modalVisible}
      onRequestClose={() => {
        setModalVisible(!modalVisible);
      }}
    >
      <View
        style={tw.style('flex-1 justify-center items-center bg-black-opacity')}
      >
        <View
          style={tw.style(
            'bg-white relative rounded-xl py-8 px-8 w-5/7 items-center'
          )}
        >
          {closeIcon && (
            <TouchableOpacity
              onPress={() => setModalVisible(!modalVisible)}
              style={tw.style('absolute right-6 top-6')}
            >
              <CloseIcon />
            </TouchableOpacity>
          )}

          {children}

          <View style={tw.style('w-full')}>
            {/* {/ {!customOrder && ( /} */}
            {editOrderdata && (
              <CustomButton
                title={'Submit'}
                onPress={
                  navigateTo
                    ? () =>
                        navigation.navigate(navigateTo, {
                          article: article,
                          newData: editOrderdata,
                          totalQuantity: totalquantity,
                          order_detail: order_detail,
                          path: 'editorder',
                        })
                    : setModalVisible
                }
              />
            )}
            {!editOrderdata && (
              <CustomButton
                title={'Ok'}
                onPress={
                  navigateTo
                    ? () => navigation.navigate(navigateTo)
                    : categoryIDs.length > 0 && path === 'SuggestedOrder'
                    ? () => {
                        setModalVisible(false);
                        dispatch(
                          suggestedProducts({
                            outletID: UserName,
                            pageIndex: pageIndex || 1,
                            pageSize: pageSize || 20,
                            category_ids: categoryIDs,
                            brand_ids: null,
                          })
                        );
                      }
                    : categoryIDs.length > 0 && path === 'Catalog'
                    ? catalogHandler
                    : setModalVisible
                }
              />
            )}
            {/* {/ )} /} */}
            {/* {customOrder && (
              <CustomButton
                title={'Submit Order'}
                onPress={
                  navigateTo
                    ? (navigateTo) => customOrderHandler(navigateTo)
                    : setModalVisible
                }
              />
            )} */}
            {/* <CustomButton
              title={'OK'}
              onPress={
                navigateTo
                  ? () => navigation.navigate(navigateTo)
                  : setModalVisible
              }
            /> */}
          </View>
        </View>
      </View>
    </Modal>
  );
};

export default ModelWrapper;

ModelWrapper.propTypes = {
  children: PropTypes.node,
  modalVisible: PropTypes.oneOfType([PropTypes.bool, PropTypes.object]),
  setModalVisible: PropTypes.func,
  closeIcon: PropTypes.bool,
  title: PropTypes.string,
  titleBold: PropTypes.bool,
};

ModelWrapper.defaultProps = {
  closeIcon: true,
};
