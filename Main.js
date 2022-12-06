import { Provider as PaperProvider } from 'react-native-paper';
import Login from './screens/login/Login';
import Register from './screens/register/Register';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import {  useContext, useState } from 'react';
import TeacherHome from './screens/teacher/TeacherHome';
import { createDrawerNavigator } from '@react-navigation/drawer';
import TeacherNotification from './screens/teacher/TeacherNotification';
import StudentCourses from './screens/student/StudentCourses';
import StudentHome from './screens/student/StudentHome';
import AuthContext from './store/auth-context';

const Stack = createNativeStackNavigator();
const Drawer = createDrawerNavigator();

function TeacherDrawer() {

  return (
      <Drawer.Navigator initialRouteName="Home">
        <Drawer.Screen name="Home" component={TeacherHome} />
        <Drawer.Screen name="Notifications" component={TeacherNotification} />
      </Drawer.Navigator>
  );
}
function StudentDrawer() {
  return (
      <Drawer.Navigator initialRouteName="Home" screenOptions={{drawerType:'back'}}>
        <Drawer.Screen name="Home" component={StudentHome} />
        <Drawer.Screen name="Notifications" component={StudentCourses} />
      </Drawer.Navigator>
  );
}


export default function Main() {

    const authCtx = useContext(AuthContext);

    console.log("auth in main",authCtx.token);

  const [user,setUser] = useState(false);
  const [Student,setStudent] = useState(false);


  return (
      <NavigationContainer>
          <PaperProvider>
            {!user?<Stack.Navigator 
              initialRouteName='Login'
              screenOptions={{
                headerShown:false,
                headerMode: 'screen',
                headerTintColor: 'white',
                headerStyle: { backgroundColor: '#8758FF' },
                headerTitleAlign:'center',
                headerBackVisible:false,
              }}
              >
                  <Stack.Screen name='Login' component={Login}/>
                  <Stack.Screen name='Sign Up' component={Register}/>
            </Stack.Navigator>:
            <Stack.Navigator 
            initialRouteName='Teacher Home'
            screenOptions={{
              headerMode: 'screen',
              headerShown:false,
              headerTintColor: 'white',
              headerStyle: { backgroundColor: '#8758FF' },
              headerTitleAlign:'center',
              headerBackVisible:false,
            }}
            >{Student?
                <Stack.Screen name='Student Home' component={StudentDrawer}/>:
                <Stack.Screen name='Teacher Home' component={TeacherDrawer}/>
              }
          </Stack.Navigator>}
          </PaperProvider>
      </NavigationContainer>
  );
}