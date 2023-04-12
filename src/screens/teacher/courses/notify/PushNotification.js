import React, { useState } from 'react';
import { useEffect } from 'react';
import { StyleSheet, View, Text, SectionList, TouchableOpacity} from 'react-native';
import { IconButton, TextInput,useTheme } from 'react-native-paper';
import Message from '../../../../components/Message';
import useAxios from '../../../../services';
import alert from '../../../../components/alert';
import MyListEmpty from '../../../../components/MyListEmpty';

   
const PushNotification = ({route,navigation}) => {
  const {courseId} = route.params;
  const [messages, setMessages] = useState([]);
  const [notification,setNotification] = useState({title:"",message:"",courseId:courseId});
  const theme = useTheme();
  const axiosInstance = useAxios();
  const [fetchData,setFetchData] = useState(false);
  const [isLoading,setIsLoading] = useState(false);

  useEffect(() => {
    axiosInstance.get(`/message?courseId=${courseId}`)
    .then(res => {
      console.log("res from push notification",res.data)
      setMessages(res?.data?.data);
      console.log("messages",messages);
    }).catch(err => console.log(err.response.data.message))
  },[fetchData])

  const handleNotify = async () => {
    try{
      setIsLoading(true)
      if(notification.title==="" || notification.message === "" || !courseId || !notification.title || !notification.message){
        alert("error","missing value","please enter all values");
        setIsLoading(false);
        return;
      }
    await axiosInstance.
        post("/message",notification).then(res =>
              {
                setIsLoading(false);
                alert("success","success",res.data.message)
              }
            )
            .catch(err => {
                console.log(err)
                setIsLoading(false);
            }
            )
    }catch(err) {
      console.log(err)
      setIsLoading(false);
    }

    setNotification((notification) => {
      return({...notification,title:"",message:""})
    });
    setFetchData((fetchData) => (!fetchData));
  }

  const deleteMessageHandler = async (id) => {
    try {
      await axiosInstance.delete(`/message/${id}`).then(res => {
        setFetchData((fetchData) => (!fetchData))
      }).catch(err => {
        alert("error","sorry",err?.response?.data?.message)
      })
    } catch (error) {
      console.log(error)
    }
  }

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
    },
    inputContainer: {
      paddingVertical: 4,
      paddingHorizontal:8,
      borderTopLeftRadius:4,
      borderTopRightRadius:4,
      backgroundColor: "#D8D9CF",
    
    },
    input: {
      borderTopEndRadius:24,
      borderTopStartRadius:24,
      borderBottomEndRadius:24,
      borderBottomStartRadius:24,
      paddingHorizontal: 20,
      marginVertical:4,
      backgroundColor: '#fff',
    },
  });
  

  const renderMessage = ({ item }) => {
  const [showDelete,setShowDelete] = useState(false);

  const handleShowDelete=()=>{
    setShowDelete((prev)=>!prev);
    setTimeout(()=>{
      setShowDelete(false)
    },3000)
  }

    return (
      <View>
        <TouchableOpacity onLongPress={handleShowDelete} onPress={()=>setShowDelete(false)}>
              <Message
                title={item.title}
                message={item.message}
                isFromMe={true}
              />
        </TouchableOpacity>
        {
          showDelete &&
          <IconButton style={{position:'absolute'}} iconColor='#D21312' icon="delete" onPress={() => deleteMessageHandler(item._id)}/>
        }
      </View>
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
      <View style={styles.inputContainer}>
        <View style={{flexDirection:"row",justifyContent:'space-between',alignItems:"center"}}>
        <TextInput
          style={[styles.input,{width:"80%"}]}
          underlineStyle={{height:0}}
          value={notification.title}
          underlineColor="transparent"
          activeUnderlineColor="rgb(255,0,170)"
          label="title"
          onSubmitEditing={() => {}}
          onChangeText={(text) => setNotification({...notification,title:text})}
        />
        <IconButton icon="send" size={32} onPress={() => handleNotify()} style={{width:'15%'}}/>
        </View>
        <TextInput
          style={[styles.input]}
          underlineStyle={{height:0}}
          underlineColor="green"
          value={notification.message}
          activeUnderlineColor="rgb(255,0,170)"
          label="message"
          onSubmitEditing={() => {}}
          multiline={true}
          onChangeText={(text) => setNotification({...notification,message:text})}
        />
      </View>
    </View>
  );
};


export default PushNotification;
