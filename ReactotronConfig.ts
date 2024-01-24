import Reactotron from 'reactotron-react-native';
import {setLogFunctions} from './src/utils/logger.util';

Reactotron.configure({}).useReactNative().connect();

setLogFunctions(Reactotron);
