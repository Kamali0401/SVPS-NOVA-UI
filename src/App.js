import logo from './logo.svg';
import './App.css';
import AppStackRoot from './app/routes';
import store from './app/redux/store';
import { Provider } from 'react-redux';

function App() {

  console.log("store is ",store)
  return (
    <Provider store={store}>

    <AppStackRoot  />

    </Provider>
  );
}

export default App;
