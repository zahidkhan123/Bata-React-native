import React, {useState} from "react";
import {Pressable, Text, TouchableOpacity, View} from "react-native";
import tw from "tailwind-react-native-classnames";
import DownPay from "../assets/down_pay.svg";
const PayableAmount = ({
	order,
	suggested,
	custom,
	summery,
	suggested_order,
	custom_order,
	order_summery,
}) => {
	const [showSummery, setShowSummery] = useState(false);

	return (
    <>
      {suggested && (
        <View style={tw.style(`mt-2 border border-gray-200  rounded-lg `)}>
          <View style={tw.style(`flex-row  px-2 justify-between`)}>
            <View style={tw.style(`justify-between items-center py-2`)}>
              <Text
                style={[
                  { fontFamily: 'SF_bold' },
                  tw.style(`text-black  text-center`),
                ]}
              >
                Payable Amount
              </Text>
            </View>
            <View style={tw.style(`flex-2 flex-row items-center py-2 px-2`)}>
              <Text
                style={[
                  { fontFamily: 'SF_bold' },

                  tw.style(`text-red-500  text-center`),
                ]}
              >
                {suggested_order && suggested_order.total_value}
              </Text>
              <TouchableOpacity onPress={() => setShowSummery(!showSummery)}>
                <DownPay style={tw.style(`ml-2 p-2`)} />
              </TouchableOpacity>
            </View>
          </View>
          {showSummery && (
            <View>
              <View
                style={tw.style(
                  `mt-0 pt-0 p-3 flex-row   rounded-b-lg justify-between `
                )}
              >
                <Text style={{ fontFamily: 'SF_regular' }}>Total Products</Text>
                <Text
                  style={[{ fontFamily: 'SF_bold' }, tw.style(` text-center`)]}
                >
                  {suggested_order && suggested_order.total_products}
                </Text>
              </View>
              <View
                style={tw.style(
                  `mt-0 pt-0 p-3 flex-row   rounded-b-lg justify-between `
                )}
              >
                <Text style={{ fontFamily: 'SF_regular' }}>No of Pairs</Text>
                <Text
                  style={[{ fontFamily: 'SF_bold' }, tw.style(` text-center`)]}
                >
                  {suggested_order && suggested_order.total_pairs}
                </Text>
              </View>
              <View
                style={tw.style(
                  `mt-0 pt-0 p-3 flex-row   rounded-b-lg justify-between `
                )}
              >
                <Text style={{ fontFamily: 'SF_regular' }}>Values</Text>
                <Text
                  style={[{ fontFamily: 'SF_bold' }, tw.style(` text-center`)]}
                >
                  {suggested_order && suggested_order.total_value}
                </Text>
              </View>
              <View
                style={tw.style(
                  `mt-0 pt-0 p-3 flex-row   rounded-b-lg justify-between `
                )}
              >
                <Text style={{ fontFamily: 'SF_regular' }}>Discount</Text>
                <Text
                  style={[{ fontFamily: 'SF_bold' }, tw.style(` text-center`)]}
                >
                  {suggested_order && suggested_order.discount}
                </Text>
              </View>
              <View
                style={tw.style(
                  `mt-0 pt-0 p-3 flex-row   rounded-b-lg justify-between `
                )}
              >
                <Text style={{ fontFamily: 'SF_regular' }}>Gross Total</Text>
                <Text
                  style={[{ fontFamily: 'SF_bold' }, tw.style(` text-center`)]}
                >
                  {suggested_order && suggested_order.gross_total}
                </Text>
              </View>
              <View
                style={tw.style(
                  `mt-0 pt-0 p-3 flex-row   rounded-b-lg justify-between `
                )}
              >
                <View style={tw.style(`flex-row`)}>
                  <Text style={{ fontFamily: 'SF_regular' }}>
                    Add Sales Tax{' '}
                  </Text>
                  <Text
                    style={[
                      { fontFamily: 'SF_regular' },
                      tw.style(`text-red-600`),
                    ]}
                  >
                    (6%)
                  </Text>
                </View>
                <Text
                  style={[{ fontFamily: 'SF_bold' }, tw.style(` text-center`)]}
                >
                  {suggested_order && suggested_order.sales_tax}
                </Text>
              </View>
              <View
                style={tw.style(
                  `mt-0 pt-0 p-3 flex-row border-b  rounded-b-lg justify-between `
                )}
              >
                <View style={tw.style(`flex-row`)}>
                  <Text style={{ fontFamily: 'SF_regular' }}>
                    Add Further GST{' '}
                  </Text>
                  <Text
                    style={[
                      { fontFamily: 'SF_regular' },
                      tw.style(`text-red-600`),
                    ]}
                  >
                    (6%)
                  </Text>
                </View>
                <Text
                  style={[{ fontFamily: 'SF_bold' }, tw.style(` text-center`)]}
                >
                  {suggested_order && suggested_order.gs_tax}
                </Text>
              </View>
              <View
                style={tw.style(
                  `mt-0 pt-0 p-3 border-b flex-row   rounded-b-lg justify-between `
                )}
              >
                <Text style={{ fontFamily: 'SF_regular' }}>Net Total</Text>
                <Text
                  style={[{ fontFamily: 'SF_bold' }, tw.style(` text-center`)]}
                >
                  {suggested_order && suggested_order.net_total}
                </Text>
              </View>
              <View
                style={tw.style(
                  `mt-0 pt-0 p-3 flex-row   rounded-b-lg justify-between `
                )}
              >
                <Text
                  style={[{ fontFamily: 'SF_bold' }, tw.style(` text-center`)]}
                >
                  Grand Total
                </Text>
                <Text
                  style={[{ fontFamily: 'SF_bold' }, tw.style(` text-center`)]}
                >
                  {suggested_order && suggested_order.net_total}
                </Text>
              </View>
            </View>
          )}
        </View>
      )}
      {custom && custom_order !== null && (
        <View style={tw.style(`mt-2 border border-gray-200  rounded-lg `)}>
          <View style={tw.style(`flex-row   px-2 justify-between`)}>
            <View style={tw.style(`justify-between items-center py-2`)}>
              <Text
                style={[
                  { fontFamily: 'SF_bold' },
                  tw.style(`text-black  text-center`),
                ]}
              >
                Payable Amount
              </Text>
            </View>
            <Pressable
              onPress={() => setShowSummery(!showSummery)}
              style={tw.style(`flex-2 flex-row items-center py-2 px-2`)}
            >
              <Text
                style={[
                  { fontFamily: 'SF_bold' },
                  tw.style(`text-red-500   text-center`),
                ]}
              >
                {custom_order && custom_order.total_value}
              </Text>
              <TouchableOpacity onPress={() => setShowSummery(!showSummery)}>
                <DownPay style={tw.style(`ml-2 p-2`)} />
              </TouchableOpacity>
            </Pressable>
          </View>
          {showSummery && (
            <View>
              <View
                style={tw.style(
                  `mt-0 pt-0 p-3 flex-row   rounded-b-lg justify-between `
                )}
              >
                <Text style={{ fontFamily: 'SF_regular' }}>Total Products</Text>
                <Text
                  style={[{ fontFamily: 'SF_bold' }, tw.style(` text-center`)]}
                >
                  {custom_order && custom_order.total_products}
                </Text>
              </View>
              <View
                style={tw.style(
                  `mt-0 pt-0 p-3 flex-row   rounded-b-lg justify-between `
                )}
              >
                <Text style={{ fontFamily: 'SF_regular' }}>No of Pairs</Text>
                <Text
                  style={[{ fontFamily: 'SF_bold' }, tw.style(` text-center`)]}
                >
                  {custom_order && custom_order.total_pairs}
                </Text>
              </View>
              <View
                style={tw.style(
                  `mt-0 pt-0 p-3 flex-row   rounded-b-lg justify-between `
                )}
              >
                <Text style={{ fontFamily: 'SF_regular' }}>Values</Text>
                <Text
                  style={[{ fontFamily: 'SF_bold' }, tw.style(` text-center`)]}
                >
                  {custom_order && custom_order.total_value}
                </Text>
              </View>
              <View
                style={tw.style(
                  `mt-0 pt-0 p-3 flex-row   rounded-b-lg justify-between `
                )}
              >
                <Text style={{ fontFamily: 'SF_regular' }}>Discount</Text>
                <Text
                  style={[{ fontFamily: 'SF_bold' }, tw.style(` text-center`)]}
                >
                  {custom_order && custom_order.discount}
                </Text>
              </View>
              <View
                style={tw.style(
                  `mt-0 pt-0 p-3 flex-row   rounded-b-lg justify-between `
                )}
              >
                <Text style={{ fontFamily: 'SF_regular' }}>Gross Total</Text>
                <Text
                  style={[{ fontFamily: 'SF_bold' }, tw.style(` text-center`)]}
                >
                  {custom_order && custom_order.gross_total}
                </Text>
              </View>
              <View
                style={tw.style(
                  `mt-0 pt-0 p-3 flex-row   rounded-b-lg justify-between `
                )}
              >
                <View style={tw.style(`flex-row`)}>
                  <Text style={{ fontFamily: 'SF_regular' }}>
                    Add Sales Tax{' '}
                  </Text>
                  <Text
                    style={[
                      { fontFamily: 'SF_regular' },
                      tw.style(`text-red-600`),
                    ]}
                  >
                    (6%)
                  </Text>
                </View>
                <Text
                  style={[{ fontFamily: 'SF_bold' }, tw.style(` text-center`)]}
                >
                  {custom_order && custom_order.sales_tax}
                </Text>
              </View>
              <View
                style={tw.style(
                  `mt-0 pt-0 p-3 flex-row border-b  rounded-b-lg justify-between `
                )}
              >
                <View style={tw.style(`flex-row`)}>
                  <Text style={{ fontFamily: 'SF_regular' }}>
                    Add Further GST
                  </Text>
                  <Text
                    style={[
                      { fontFamily: 'SF_regular' },
                      tw.style(`text-red-600`),
                    ]}
                  >
                    (6%)
                  </Text>
                </View>
                <Text
                  style={[{ fontFamily: 'SF_bold' }, tw.style(` text-center`)]}
                >
                  {custom_order && custom_order.gs_tax}
                </Text>
              </View>
              <View
                style={tw.style(
                  `mt-0 pt-0 p-3 border-b flex-row   rounded-b-lg justify-between `
                )}
              >
                <Text style={{ fontFamily: 'SF_regular' }}>Net Total</Text>
                <Text
                  style={[{ fontFamily: 'SF_bold' }, tw.style(` text-center`)]}
                >
                  {custom_order && custom_order.net_total}
                </Text>
              </View>
              <View
                style={tw.style(
                  `mt-0 pt-0 p-3 flex-row   rounded-b-lg justify-between `
                )}
              >
                <Text style={{ fontFamily: 'SF_regular' }}>Grand Total</Text>
                <Text
                  style={[{ fontFamily: 'SF_bold' }, tw.style(` text-center`)]}
                >
                  {custom_order && custom_order.net_total}
                </Text>
              </View>
            </View>
          )}
        </View>
      )}

      {summery && order_summery !== null && (
        <View style={tw.style(`mt-10 border border-gray-200  rounded-lg `)}>
          <View style={tw.style(` pt-0 p-3 flex-row  justify-between `)}>
            <Text style={{ fontFamily: 'SF_regular' }}>Available Balance</Text>
            <Text style={[{ fontFamily: 'SF_bold' }, tw.style(` text-center`)]}>
              {order_summery && order_summery.available_balance}
            </Text>
          </View>
          <View
            style={tw.style(
              `mt-0 pt-0 p-3 flex-row   rounded-b-lg justify-between `
            )}
          >
            <Text style={{ fontFamily: 'SF_regular' }}>Payable Balance</Text>
            <Text style={[{ fontFamily: 'SF_bold' }, tw.style(` text-center`)]}>
              {order_summery && order_summery.payable_balance}
            </Text>
          </View>
          <View
            style={tw.style(
              `mt-0 pt-0 p-3 flex-row   rounded-b-lg justify-between `
            )}
          >
            <Text style={{ fontFamily: 'SF_regular' }}>Total Products</Text>
            <Text style={[{ fontFamily: 'SF_bold' }, tw.style(` text-center`)]}>
              {order_summery && order_summery.total_products}
            </Text>
          </View>
          <View
            style={tw.style(
              `mt-0 pt-0 p-3 flex-row   rounded-b-lg justify-between `
            )}
          >
            <Text style={{ fontFamily: 'SF_regular' }}>No of Pairs</Text>
            <Text style={[{ fontFamily: 'SF_bold' }, tw.style(` text-center`)]}>
              {order_summery && order_summery.total_pairs}
            </Text>
          </View>
          <View
            style={tw.style(
              `mt-0 pt-0 p-3 flex-row   rounded-b-lg justify-between `
            )}
          >
            <Text style={{ fontFamily: 'SF_regular' }}>Values</Text>
            <Text style={[{ fontFamily: 'SF_bold' }, tw.style(` text-center`)]}>
              {order_summery && order_summery.total_value}
            </Text>
          </View>
          <View
            style={tw.style(
              `mt-0 pt-0 p-3 flex-row   rounded-b-lg justify-between `
            )}
          >
            <Text style={{ fontFamily: 'SF_regular' }}>Discount</Text>
            <Text style={[{ fontFamily: 'SF_bold' }, tw.style(` text-center`)]}>
              {order_summery && order_summery.discount}
            </Text>
          </View>
          <View
            style={tw.style(
              `mt-0 pt-0 p-3 flex-row   rounded-b-lg justify-between `
            )}
          >
            <Text style={{ fontFamily: 'SF_regular' }}>Gross Total</Text>
            <Text style={[{ fontFamily: 'SF_bold' }, tw.style(` text-center`)]}>
              {order_summery && order_summery.gross_total}
            </Text>
          </View>
          <View
            style={tw.style(
              `mt-0 pt-0 p-3 flex-row   rounded-b-lg justify-between `
            )}
          >
            <View style={tw.style(`flex-row`)}>
              <Text style={{ fontFamily: 'SF_regular' }}>Add Sales Tax </Text>
              <Text
                style={[{ fontFamily: 'SF_regular' }, tw.style(`text-red-600`)]}
              >
                (6%)
              </Text>
            </View>
            <Text style={[{ fontFamily: 'SF_bold' }, tw.style(` text-center`)]}>
              {order_summery && order_summery.sales_tax}
            </Text>
          </View>
          <View
            style={tw.style(
              `mt-0 pt-0 p-3 flex-row border-b  rounded-b-lg justify-between `
            )}
          >
            <View style={tw.style(`flex-row`)}>
              <Text style={{ fontFamily: 'SF_regular' }}>Add Further GST </Text>
              <Text
                style={[{ fontFamily: 'SF_regular' }, tw.style(`text-red-600`)]}
              >
                (6%)
              </Text>
            </View>
            <Text style={[{ fontFamily: 'SF_bold' }, tw.style(` text-center`)]}>
              {order_summery && order_summery.gs_tax}
            </Text>
          </View>
          <View
            style={tw.style(
              `mt-0 pt-0 p-3 border-b flex-row   rounded-b-lg justify-between `
            )}
          >
            <Text style={{ fontFamily: 'SF_regular' }}>Net Total</Text>
            <Text style={[{ fontFamily: 'SF_bold' }, tw.style(` text-center`)]}>
              {order_summery && order_summery.net_total}
            </Text>
          </View>
          <View
            style={tw.style(
              `mt-0 pt-0 p-3 flex-row   rounded-b-lg justify-between `
            )}
          >
            <Text style={{ fontFamily: 'SF_regular' }}>Grand Total</Text>
            <Text style={[{ fontFamily: 'SF_bold' }, tw.style(` text-center`)]}>
              {order_summery && order_summery.net_total}
            </Text>
          </View>
        </View>
      )}
      {order && !showSummery && (
        <View style={tw.style(`mt-2 border border-gray-200  rounded-lg `)}>
          <View>
            <View
              style={tw.style(
                `mt-0 pt-0 p-3 flex-row   rounded-b-lg justify-between `
              )}
            >
              <Text
                style={[{ fontFamily: 'SF_regular' }, tw.style(`text-base`)]}
              >
                Total Products
              </Text>
              <Text
                style={[
                  { fontFamily: 'SF_bold' },
                  tw.style(`text-base text-center`),
                ]}
              >
                {order && order.total_products}
              </Text>
            </View>
            <View
              style={tw.style(
                `mt-0 pt-0 p-3 flex-row   rounded-b-lg justify-between `
              )}
            >
              <Text
                style={[{ fontFamily: 'SF_regular' }, tw.style(`text-base`)]}
              >
                No of Pairs
              </Text>
              <Text
                style={[
                  { fontFamily: 'SF_bold' },
                  tw.style(`text-base text-center`),
                ]}
              >
                {order && order.total_pairs}
              </Text>
            </View>
            <View
              style={tw.style(
                `mt-0 pt-0 p-3 flex-row   rounded-b-lg justify-between `
              )}
            >
              <Text
                style={[{ fontFamily: 'SF_regular' }, tw.style(`text-base`)]}
              >
                Values
              </Text>
              <Text
                style={[
                  { fontFamily: 'SF_bold' },
                  tw.style(`text-base text-center`),
                ]}
              >
                {order && order.total_value}
              </Text>
            </View>
            <View
              style={tw.style(
                `mt-0 pt-0 p-3 flex-row   rounded-b-lg justify-between `
              )}
            >
              <Text
                style={[{ fontFamily: 'SF_regular' }, tw.style(`text-base`)]}
              >
                Discount
              </Text>
              <Text
                style={[
                  { fontFamily: 'SF_bold' },
                  tw.style(`text-base text-center`),
                ]}
              >
                {order && order.discount}
              </Text>
            </View>
            <View
              style={tw.style(
                `mt-0 pt-0 p-3 flex-row   rounded-b-lg justify-between `
              )}
            >
              <Text
                style={[{ fontFamily: 'SF_regular' }, tw.style(`text-base`)]}
              >
                Gross Total
              </Text>
              <Text
                style={[
                  { fontFamily: 'SF_bold' },
                  tw.style(`text-base text-center`),
                ]}
              >
                {order && order.gross_total}
              </Text>
            </View>
            <View
              style={tw.style(
                `mt-0 pt-0 p-3 flex-row   rounded-b-lg justify-between `
              )}
            >
              <View style={tw.style(`flex-row`)}>
                <Text
                  style={[{ fontFamily: 'SF_regular' }, tw.style(`text-base`)]}
                >
                  Add Sales Tax{' '}
                </Text>
                <Text
                  style={[
                    { fontFamily: 'SF_regular' },
                    tw.style(`text-red-600`),
                  ]}
                >
                  (6%)
                </Text>
              </View>
              <Text
                style={[
                  { fontFamily: 'SF_bold' },
                  tw.style(`text-base text-center`),
                ]}
              >
                {order && order.sales_tax}
              </Text>
            </View>
            <View
              style={tw.style(
                `mt-0 pt-0 p-3 flex-row border-b  rounded-b-lg justify-between `
              )}
            >
              <View style={tw.style(`flex-row`)}>
                <Text
                  style={[{ fontFamily: 'SF_regular' }, tw.style(`text-base`)]}
                >
                  Add Further GST{' '}
                </Text>
                <Text
                  style={[
                    { fontFamily: 'SF_regular' },
                    tw.style(`text-red-600`),
                  ]}
                >
                  (6%)
                </Text>
              </View>

              <Text
                style={[
                  { fontFamily: 'SF_bold' },
                  tw.style(`text-base text-center`),
                ]}
              >
                {order && order.gs_tax}
              </Text>
            </View>
            <View
              style={tw.style(
                `mt-0 pt-0 p-3 border-b flex-row   rounded-b-lg justify-between `
              )}
            >
              <Text
                style={[{ fontFamily: 'SF_regular' }, tw.style(`text-base`)]}
              >
                Net Total
              </Text>
              <Text
                style={[
                  { fontFamily: 'SF_bold' },
                  tw.style(`text-base  text-center`),
                ]}
              >
                {order && order.net_total}
              </Text>
            </View>
            <View
              style={tw.style(
                `mt-0 pt-0 p-3 flex-row  items-center rounded-b-lg justify-between `
              )}
            >
              <Text
                style={[{ fontFamily: 'SF_bold' }, tw.style(`text-base  `)]}
              >
                Grand Total
              </Text>
              <Text
                style={[{ fontFamily: 'SF_bold' }, tw.style(`text-base  `)]}
              >
                {order && order.net_total}
              </Text>
            </View>
          </View>
        </View>
      )}
    </>
  );
};

export default PayableAmount;
