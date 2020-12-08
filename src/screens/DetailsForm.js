import React, {useEffect} from 'react';
import {
  View,
  Image,
  Text,
  TextInput,
  Dimensions,
  // Picker,
  Alert,
} from 'react-native';
import {Picker} from '@react-native-community/picker';
import {TouchableOpacity} from 'react-native-gesture-handler';
import {
  atnAddTransaction,
  atnUpdateTransaction,
} from '../redux/actions/transactionActions';
import {connect, useDispatch, useSelector} from 'react-redux';
import ImagePicker from 'react-native-image-crop-picker';
import DatePicker from '../components/DatePicker';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import {SafeAreaView} from 'react-native-safe-area-context';
const {height, width} = Dimensions.get('window');

function DetailsForm(props) {
  const trueArray = props.transactionRecord.map(
    (e, index) =>
      e.type === props.route.params.type &&
      e.date === props.route.params.date &&
      e.amount === props.route.params.amount &&
      e.description === props.route.params.description,
  );
  const indexVal = trueArray.indexOf(true);
  const [data, setData] = React.useState({
    type: 'income',
    amount: '',
    sourceOfIncome: '',
    date: '',
    description: '',
    image: null,
  });

  const getDate = (date) => {
    setData({...data, date: date});
  };

  const handleSubmit = () => {
    if (props.route.params.isUpdate === true) {
      props.atnUpdateTransaction(data, indexVal);
      Alert.alert('message', 'Done Successfully', [
        {
          text: 'OK',
          onPress: () => {
            props.navigation.goBack();
          },
        },
      ]);
    } else {
      props.atnAddTransaction(data);
      Alert.alert('message', 'Done Successfully', [
        {
          text: 'OK',
          onPress: () => {
            props.navigation.goBack();
          },
        },
      ]);
    }
  };

  const selectPhotoFromGallery = () => {
    ImagePicker.openPicker({
      width: 300,
      height: 400,
      cropping: true,
    })
      .then((image) => {
        setData({...data, image: image.path});
      })
      .catch(() => {
        console.log('cancelled');
      });
  };
  useEffect(() => {
    if (props.route.params !== undefined) {
      setData(props.route.params);
    }
  }, []);

  return (
    <View style={{flex: 1, backgroundColor: '#60bAbC'}}>
      <SafeAreaView
        style={{
          width: width * 0.8,
          alignSelf: 'center',
          marginTop: height * 0.1,
        }}>
        <View
          style={{
            alignItems: 'center',
            justifyContent: 'center',
            backgroundColor: '#FFF',
            borderRadius: 10,
            borderWidth: 1,
            marginBottom: 2,
          }}>
          <Picker
            selectedValue={data.type}
            style={{width: width * 0.8}}
            onValueChange={(itemValue, itemIndex) =>
              setData({...data, type: itemValue})
            }>
            <Picker.Item label="Income" value="income" />
            <Picker.Item label="Expenditure" value="expenditure" />
          </Picker>
        </View>
        <View
          style={{
            borderWidth: 1,
            backgroundColor: '#FFF',
            borderRadius: 10,
            justifyContent: 'center',
            alignItems: 'center',
            marginBottom: 2,
          }}>
          <TextInput
            style={{height: 40, borderColor: 'gray', width: width * 0.8}}
            onChangeText={(text) => setData({...data, amount: text})}
            placeholder="Enter Amount"
            value={data.amount}
          />
        </View>
        <View
          style={{
            borderWidth: 1,
            justifyContent: 'center',
            alignItems: 'center',
            backgroundColor: '#FFF',
            borderRadius: 10,
            marginBottom: 2,
          }}>
          <TextInput
            style={{height: 40, borderColor: 'gray', width: width * 0.8}}
            onChangeText={(text) => setData({...data, sourceOfIncome: text})}
            placeholder="Enter Source Of Income"
            value={data.sourceOfIncome}
          />
        </View>
        <View
          style={{
            borderWidth: 1,
            backgroundColor: '#FFF',
            borderRadius: 10,
            justifyContent: 'space-between',
            flexDirection: 'row',
            marginBottom: 2,
            alignItems: 'center',
          }}>
          <TextInput
            style={{height: 40, borderColor: 'gray'}}
            onChangeText={(text) => setData({...data, date: text})}
            placeholder="Enter Date"
            value={data.date}
          />
          <TouchableOpacity
            style={{justifyContent: 'center', alignContent: 'center'}}>
            <DatePicker getDate={getDate} />
          </TouchableOpacity>
        </View>
        <View
          style={{
            borderWidth: 1,
            justifyContent: 'center',
            alignItems: 'center',
            backgroundColor: '#FFF',
            marginBottom: 2,
            borderRadius: 10,
          }}>
          <TextInput
            style={{height: 100, borderColor: 'gray', width: width * 0.8}}
            onChangeText={(text) => setData({...data, description: text})}
            placeholder="Enter description"
            multiline
            numberOfLines={4}
            value={data.description}
          />
        </View>
        <View
          style={{
            borderWidth: 1,
            alignItems: 'center',
            borderRadius: 10,
          }}>
          <View
            style={{
              height: 85,
              width: width * 0.8,
              justifyContent: 'space-around',
              flexDirection: 'row',
              backgroundColor: '#FFF',
              borderRadius: 10,
              padding: 5,
            }}>
            <View style={{width: 80, borderWidth: 1, borderRadius: 10}}>
              <Image
                resizeMode={'stretch'}
                style={{width: 80, height: 80, borderWidth: 1}}
                source={{uri: data.image}}
              />
            </View>
            <View style={{justifyContent: 'center', alignItems: 'center'}}>
              <TouchableOpacity onPress={selectPhotoFromGallery}>
                <FontAwesome name="plus" size={50} />
              </TouchableOpacity>
            </View>
          </View>
        </View>
        <View
          style={{justifyContent: 'center', padding: 40, alignItems: 'center'}}>
          <TouchableOpacity
            onPress={() => {
              data.amount !== undefined && data.date !== undefined
                ? handleSubmit()
                : alert('please enter amount and date');
            }}
            style={{
              backgroundColor: '#60BABC',
              borderWidth: 1,
              borderColor: '#000',
            }}>
            <Text style={{padding: 10, color: '#fff'}}>SUBMIT</Text>
          </TouchableOpacity>
        </View>
      </SafeAreaView>
    </View>
  );
}

const mapStateToProps = (state) => {
  return {
    transactionRecord: state.transactionRecord,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    atnAddTransaction: (e) => dispatch(atnAddTransaction(e)),
    atnUpdateTransaction: (e, idx) => dispatch(atnUpdateTransaction(e, idx)),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(DetailsForm);
