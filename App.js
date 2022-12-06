import 'react-native-gesture-handler';
import { AuthContextProvider } from './store/auth-context';
import Main from './Main';


export default function App(){

  return (
    <AuthContextProvider>
      <Main/>
    </AuthContextProvider>
  );
}