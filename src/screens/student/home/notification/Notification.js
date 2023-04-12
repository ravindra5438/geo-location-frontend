import React, { useState } from 'react';
import { useEffect } from 'react';
import { StyleSheet, View, Text, SectionList} from 'react-native';
import { useTheme } from 'react-native-paper';
import Message from '../../../../components/Message';
import useAxios from '../../../../services';
import MyListEmpty from '../../../../components/MyListEmpty';

   
const Notification = ({route}) => {
  const {courseId} = route.params;
  const [messages, setMessages] = useState([]);
  const theme = useTheme();
  const axiosInstance = useAxios();

  useEffect(() => {
    axiosInstance.get(`/message?courseId=${courseId}`)
    .then(res => {
      console.log("res from push notification",res.data)
      setMessages(res?.data?.data);
      console.log("messages",messages)
    }).catch(err => console.log(err.response.data.message))
  },[])

  const styles = StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor:"#E6E6E6",
    },
    sectionHeader: {
      backgroundColor: "#c8c8c8",
      padding:8,
    },
    sectionHeaderText: {
      fontWeight: 'bold',
      color: theme.colors.primary,
      alignSelf:'center',
    }
  });
  

  const renderMessage = ({ item }) => {
    return (
      <Message
        title={item.title}
        message={item.message}
        isFromMe={true}
      />
    );
  };

  const renderSectionHeader = ({ section: { title } }) => {
    const formattedDate = new Date(title).toDateString();

    return (
      <View style={styles.sectionHeader}>
        <Text style={styles.sectionHeaderText}>{formattedDate}</Text>
      </View>
    );
  };

  const messagesByDate = messages.reduce((acc, message) => {
    const date = new Date(message.createdAt).toDateString();
    if (acc[date]) {
      acc[date].data.push(message);
    } else {
      acc[date] = { title:message.createdAt, data: [message] };
    }
    return acc;
  }, {});

  const sections = Object.values(messagesByDate);

  return (
    <View style={styles.container}>
      <SectionList
        showsVerticalScrollIndicator={false}
        sections={sections}
        renderItem={renderMessage}
        keyExtractor={item => item._id.toString()}
        renderSectionHeader={renderSectionHeader}
        ListEmptyComponent={MyListEmpty}
      />
    </View>
  );
};


export default Notification;
