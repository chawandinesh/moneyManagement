import React, {useState} from 'react';
import {Button, View} from 'react-native';
import DateTimePickerModal from 'react-native-modal-datetime-picker';
import moment from 'moment';
import Ionicons from 'react-native-vector-icons/Ionicons';

const Example = (props) => {
  const [isDatePickerVisible, setDatePickerVisibility] = useState(false);

  const showDatePicker = () => {
    setDatePickerVisibility(true);
  };

  const hideDatePicker = () => {
    setDatePickerVisibility(false);
  };

  const handleConfirm = (date) => {
    props.getDate(moment(date).format('DD-MM-YYYY HH:mm:ss'));
    hideDatePicker();
  };

  return (
    <View>
      <Ionicons name="time-outline" onPress={showDatePicker} size={30} />
      <DateTimePickerModal
        isVisible={isDatePickerVisible}
        mode="datetime"
        is24Hour={false}
        onConfirm={handleConfirm}
        onCancel={hideDatePicker}
      />
    </View>
  );
};

export default Example;
