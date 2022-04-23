import { combineReducers } from 'redux';
import {
  userLoginReducer,
  forgotPasswordReducer,
  verifyOtpReducer,
  changePasswordReducer,
} from './reducers/userReducer';
import {
  bannerReducer,
  suggestedProductReducer,
} from './reducers/dashboardReducer';
import {
  categoriesReducer,
  catlogReducer,
  orderDetailReducer,
} from './reducers/categoryReducer';
import {
  cartReducer,
  checkoutReducer,
  customOrderCartReducer,
} from './reducers/cartReducer';
import { walletTransReducer } from './reducers/walletReducer';
import { orderHistoryReducer } from './reducers/orderHistoryReducer';
import { ledgerReducer } from './reducers/ledgerReducer';
import { feedbackReducer } from './reducers/feedbackReducer';
import { storeProfileReducer } from './reducers/storeProfileReducer';
import { orderScheduleReducer } from './reducers/orderScheduleReducer';
import { summaryHistoryReducer } from './reducers/summaryHistoryReducer';
import { TrackOrderReducer } from './reducers/trackOrderReducer';
import { EditProfileReducer } from './reducers/editProfileReducer';
import { storeLocatorReducer } from './reducers/storeLocatorReducer';
import { updatePasswordReducer } from './reducers/updatePasswordReducer';
import {
  BrandFilterReducer,
  CategoryFilterReducer,
} from './reducers/searchFilterReducer';
import { orderNotificationReducer } from './reducers/orderNotificationReducer';
import {
  graphSelectionReducer,
  graphChartReducer,
} from './reducers/graphReducer';
export default combineReducers({
  userLogin: userLoginReducer,
  verifyOtp: verifyOtpReducer,
  changePassword: changePasswordReducer,
  forgotPassword: forgotPasswordReducer,
  banners: bannerReducer,
  suggestedProducts: suggestedProductReducer,
  category: categoriesReducer,
  catlog: catlogReducer,
  orderDetail: orderDetailReducer,
  cart: cartReducer,
  customCart: customOrderCartReducer,
  wallet: walletTransReducer,
  checkout: checkoutReducer,
  orderHistory: orderHistoryReducer,
  orderSchedule: orderScheduleReducer,
  ledgerHistory: ledgerReducer,
  feedback: feedbackReducer,
  storeProfile: storeProfileReducer,
  summaryHistory: summaryHistoryReducer,
  trackOrder: TrackOrderReducer,
  userProfile: EditProfileReducer,
  storeLocator: storeLocatorReducer,
  updatePassword: updatePasswordReducer,
  brandFilter: BrandFilterReducer,
  categoryFilter: CategoryFilterReducer,
  graphSelection: graphSelectionReducer,
  graphChart: graphChartReducer,
  orderNotification: orderNotificationReducer,
});
