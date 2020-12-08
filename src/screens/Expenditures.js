import React, {useRef, useState, useEffect} from 'react';
import {connect} from 'react-redux';
import {useIsFocused} from '@react-navigation/native';
import Popover, {PopoverPlacement} from 'react-native-popover-view';
import {
  View,
  Text,
  StatusBar,
  SafeAreaView,
  Dimensions,
  StyleSheet,
  FlatList,
  TouchableOpacity,
} from 'react-native';
import Feather from 'react-native-vector-icons/Feather';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import {getDates} from '../components/getDates';
import NoDataFound from '../components/noData';
const {height, width} = Dimensions.get('window');

function Expenditures(props) {
  const touchable = useRef();
  const [showPopover, setShowPopover] = useState(false);
  const [totalExpenditure, setTotalExpenditure] = useState(0);
  const [expenditureData, setExpenditureData] = useState([]);
  const isFocused = useIsFocused();

  useEffect(() => {
    setExpenditureData(
      props.transactionRecord.filter((e) => e.type === 'expenditure'),
    );
  }, [isFocused]);

  let sum = expenditureData
    .filter((e) => e.type === 'expenditure')
    .map((e) => JSON.parse(e.amount));

  const handleFilterDays = (days) => {
    let m = props.transactionRecord
      .filter((each) => each.type === 'expenditure')
      .filter((e) => getDates(days).includes(e.date.slice(0, 10)));
    setExpenditureData(m);
    setShowPopover(false);
  };

  const renderItem = ({item}) => {
    const {amount, date, description, image, sourceOfIncome, type} = item;
    return (
      <View
        style={{
          minHeight: height * 0.09,
          width: width * 0.95,
          borderRadius: 10,
          backgroundColor: '#fff',
          alignSelf: 'center',
          margin: 3,
          padding: 10,
          justifyContent: 'space-between',
          flexDirection: 'row',
        }}>
        <TouchableOpacity
          onPress={() =>
            props.navigation.navigate('ShowRecordEntity', {
              type,
              date,
              description,
              image,
              amount,
              sourceOfIncome,
              type,
            })
          }>
          <View
            style={{
              flexDirection: 'row',
              justifyContent: 'space-between',
              alignItems: 'center',
            }}>
            <View
              style={{
                justifyContent: 'space-between',
                flexDirection: 'row',
                width: width * 0.4,
              }}>
              <Text style={{padding: 5, fontWeight: 'bold'}}>
                Amount & Source
              </Text>
              <Text style={{padding: 5, fontWeight: 'bold'}}>:</Text>
            </View>
            <View style={{width: width * 0.4}}>
              <Text
                style={{
                  color: type === 'income' ? 'green' : 'red',
                  textAlign: 'left',
                  fontWeight: 'bold',
                  fontSize: 20,
                }}>
                {amount.length ? (
                  type === 'income' ? (
                    <Text>
                      {' '}
                      + {amount}{' '}
                      <Text style={{fontSize: 19, fontWeight: '200'}}>
                        & {sourceOfIncome}
                      </Text>
                    </Text>
                  ) : (
                    <Text>
                      {' '}
                      - {amount}{' '}
                      <Text style={{fontSize: 19, fontWeight: '200'}}>
                        & {sourceOfIncome}
                      </Text>
                    </Text>
                  )
                ) : null}
              </Text>
            </View>
          </View>
          <View
            style={{
              flexDirection: 'row',
              justifyContent: 'space-between',
              alignItems: 'center',
            }}>
            <View
              style={{
                justifyContent: 'space-between',
                flexDirection: 'row',
                width: width * 0.4,
              }}>
              <Text style={{padding: 5, fontWeight: 'bold'}}>Date & Time</Text>
              <Text style={{padding: 5, fontWeight: 'bold'}}>:</Text>
            </View>
            <View style={{width: width * 0.4}}>
              <Text
                style={{
                  textAlign: 'left',
                }}>
                {date}
              </Text>
            </View>
          </View>
        </TouchableOpacity>
        <View>
          <TouchableOpacity
            onPress={() =>
              props.navigation.navigate('ExpenditureForm', {
                type,
                date,
                description,
                image,
                amount,
                sourceOfIncome,
                isUpdate: true,
              })
            }>
            <Feather size={20} name="edit" style={{padding: 5}} />
          </TouchableOpacity>
        </View>
      </View>
    );
  };

  return (
    <SafeAreaView
      style={{
        flex: 1,
        backgroundColor: '#60BABC',
        borderRadius: 50,
      }}>
      <StatusBar barStyle="light-content" />
      <View
        contentInsetAdjustmentBehavior="automatic"
        style={styles.scrollView}>
        <View
          style={{
            justifyContent: 'space-between',
            alignItems: 'center',
            padding: 10,
            flexDirection: 'row',
            borderBottomColor: '#000',
            borderBottomWidth: 1,
          }}>
          <Text
            style={{
              fontWeight: 'bold',
              width: width * 0.8,
              textAlign: 'center',
              fontSize: 20,
            }}>
            Expenditures
          </Text>

          <>
            <TouchableOpacity
              ref={touchable}
              style={{width: width * 0.1}}
              onPress={() => setShowPopover(true)}>
              <Feather size={30} name="more-vertical" style={{padding: 5}} />
            </TouchableOpacity>
            <Popover
              from={touchable}
              placement={PopoverPlacement.BOTTOM}
              isVisible={showPopover}
              onRequestClose={() => setShowPopover(false)}>
              <View style={{padding: 10}}>
                <TouchableOpacity
                  style={{paddingBottom: 10}}
                  onPress={() => handleFilterDays(1)}>
                  <Text>1 day</Text>
                </TouchableOpacity>
                <TouchableOpacity
                  style={{paddingBottom: 10}}
                  onPress={() => handleFilterDays(7)}>
                  <Text>7 days</Text>
                </TouchableOpacity>
                <TouchableOpacity
                  style={{paddingBottom: 10}}
                  onPress={() => handleFilterDays(30)}>
                  <Text>30 days</Text>
                </TouchableOpacity>
                <TouchableOpacity
                  style={{paddingBottom: 10}}
                  onPress={() => {
                    setExpenditureData(
                      props.transactionRecord.filter(
                        (e) => e.type === 'expenditure',
                      ),
                    );

                    setShowPopover(false);
                  }}>
                  <Text>all</Text>
                </TouchableOpacity>
              </View>
            </Popover>
          </>
        </View>

        {expenditureData.length ? (
          <FlatList
            data={expenditureData}
            style={{overflow: 'scroll', height: height * 0.8}}
            renderItem={renderItem}
            keyExtractor={(item, index) => index.toString()}
          />
        ) : (
          <NoDataFound />
        )}

        <View
          style={{
            justifyContent: 'center',
            width: width,
            marginTop: height * 0.06,
          }}>
          <View
            style={{
              padding: height * 0.02,
              borderTopLeftRadius: 25,
              borderTopRightRadius: 25,
              justifyContent: 'space-around',
              flexDirection: 'row',
              fontSize: 20,
              fontWeight: 'bold',
              backgroundColor: '#eee',
            }}>
            <View
              style={{
                flexDirection: 'row',
                justifyContent: 'space-between',
                width: width * 0.4,
              }}>
              <Text style={{fontWeight: 'bold', fontSize: 20}}>Total</Text>
              <Text style={{fontWeight: 'bold', fontSize: 20}}>:</Text>
            </View>
            <View>
              <Text style={{fontWeight: 'bold', fontSize: 20, color: 'red'}}>
                {sum.reduce((acc, val) => acc + val, 0)}
              </Text>
            </View>
          </View>
        </View>
      </View>

      <View
        style={{
          position: 'absolute',
          bottom: 100,
          right: 29,
          padding: 13,
        }}>
        <TouchableOpacity
          onPress={() => {
            props.navigation.navigate('ExpenditureForm', {
              type: 'expenditure',
            });
          }}>
          <FontAwesome name="plus" color="black" size={40} />
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  scrollView: {
    backgroundColor: '#60BABC',
    height: height * 0.78,
    borderTopRightRadius: 30,
    borderTopLeftRadius: 40,
  },
});

const mapStateToProps = (state) => {
  return {
    transactionRecord: state.transactionRecord,
  };
};

export default connect(mapStateToProps, {})(Expenditures);
