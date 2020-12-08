import React from 'react';
import {View, Text, Dimensions, Image, TouchableOpacity} from 'react-native';
import {connect, useSelector} from 'react-redux';
import Feather from 'react-native-vector-icons/Feather';
const {height, width} = Dimensions.get('window');

function ShowRecordEntity(props) {
  const {
    date,
    amount,
    description,
    image,
    sourceOfIncome,
    type,
  } = props.route.params;
  const allTransactionRecords = props.transactionRecord.filter(
    (e) => e.date === date && e.type === type,
  );

  return (
    <View
      style={{
        backgroundColor: '#60BABC',
        alignSelf: 'center',
        paddingTop: height * 0.13,
        width: width * 0.99,
        height: height * 0.89,
      }}>
      <View style={{alignSelf: 'center', justifyContent: 'center'}}>
        {/* <View
          style={{
            padding: 10,
            width: width * 0.2,
            marginBottom: 2,
            justifyContent: 'center',
            alignSelf: 'center',
            marginLeft: 1,
            marginRight: 1,
            backgroundColor: '#fff',
            flexDirection: 'row',
            alignItems: 'center',
            borderRadius: 20,
          }}>
          <TouchableOpacity
            onPress={() =>
              props.navigation.navigate('ExpenditureForm', {
                type: allTransactionRecords[0].type,
                date: allTransactionRecords[0].date,
                amount: allTransactionRecords[0].amount,
                description: allTransactionRecords[0].description,
                image: allTransactionRecords[0].image,
                sourceOfIncome: allTransactionRecords[0].sourceOfIncome,
                isUpdate: true,
              })
            }>
            <Feather size={30} name="edit" style={{padding: 5}} />
          </TouchableOpacity>
        </View> */}
        <View
          style={{
            padding: 10,
            width: width * 0.8,
            justifyContent: 'space-between',
            marginLeft: 1,
            marginRight: 1,
            backgroundColor: '#fff',
            flexDirection: 'row',
            borderTopLeftRadius: 10,
            alignItems: 'center',
            borderTopRightRadius: 10,
          }}>
          <View
            style={{
              justifyContent: 'space-between',
              flexDirection: 'row',
              width: width * 0.3,
            }}>
            <Text>Amount</Text>
            <Text>: </Text>
          </View>
          <Text
            style={{
              fontSize: 20,
              fontWeight: 'bold',
              width: width * 0.3,
              color: type === 'income' ? 'green' : 'red',
            }}>
            {' '}
            {type === 'income' ? <Text>+ </Text> : <Text>- </Text>}
            {allTransactionRecords[0].amount}
          </Text>
        </View>

        <View
          style={{
            padding: 10,
            marginTop: 3,
            marginLeft: 1,
            marginRight: 1,
            width: width * 0.8,
            justifyContent: 'space-between',
            backgroundColor: '#fff',
            flexDirection: 'row',
            borderTopLeftRadius: 10,
            alignItems: 'center',
            borderTopRightRadius: 10,
          }}>
          <View
            style={{
              justifyContent: 'space-between',
              flexDirection: 'row',
              width: width * 0.3,
            }}>
            <Text>Notes</Text>
            <Text>: </Text>
          </View>
          <Text
            style={{
              width: width * 0.4,
              fontWeight: 'bold',
              textAlign: 'left',
            }}>
            {' '}
            {allTransactionRecords[0].description}
          </Text>
        </View>
        <View
          style={{
            padding: 10,
            marginTop: 3,
            marginLeft: 1,
            marginRight: 1,
            width: width * 0.8,
            justifyContent: 'space-between',
            backgroundColor: '#fff',
            flexDirection: 'row',
            borderTopLeftRadius: 10,
            alignItems: 'center',
            borderTopRightRadius: 10,
          }}>
          <View
            style={{
              justifyContent: 'space-between',
              flexDirection: 'row',
              width: width * 0.3,
            }}>
            <Text>Date</Text>
            <Text>: </Text>
          </View>
          <Text
            style={{
              fontWeight: 'bold',
              textAlign: 'left',
              width: width * 0.4,
            }}>
            {' '}
            {allTransactionRecords[0].date}
          </Text>
        </View>

        <View
          style={{
            padding: 10,
            marginTop: 3,
            marginLeft: 1,
            marginRight: 1,
            width: width * 0.8,
            justifyContent: 'space-between',
            backgroundColor: '#fff',
            flexDirection: 'row',
            borderTopLeftRadius: 10,
            alignItems: 'center',
            borderTopRightRadius: 10,
          }}>
          <View
            style={{
              justifyContent: 'space-between',
              flexDirection: 'row',
              width: width * 0.3,
            }}>
            <Text>Source</Text>
            <Text>: </Text>
          </View>
          <Text
            style={{
              fontWeight: 'bold',
              textAlign: 'left',
              width: width * 0.4,
            }}>
            {' '}
            {allTransactionRecords[0].sourceOfIncome}
          </Text>
        </View>

        <View style={{alignSelf: 'center', marginTop: 20}}>
          <Image
            source={{uri: image}}
            style={{
              resizeMode: 'stretch',
              height: 100,
              width: 100,
              borderRadius: 10,
            }}
          />
        </View>
      </View>
    </View>
  );
}

const mapStateToProps = (state) => {
  return {
    transactionRecord: state.transactionRecord,
  };
};

export default connect(mapStateToProps, {})(ShowRecordEntity);
