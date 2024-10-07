import { AppRegistry } from 'react-native';
import App from './App'; // Certifique-se de que o caminho para App.js está correto
import { name as appName } from './app.json'; // Verifique o nome do app no app.json

AppRegistry.registerComponent(appName, () => App);
