import HomeScreen from './WatchScreen/HomeScreen/HomeScreen';
import ContactListScreen from './WatchScreen/ContactListScreen/ContactsScreen';
import WatchScreen from './WatchScreen/WatchScreen';
import React from 'react';

export default class ScreenFactoryService {
  //todo is there a better way to handle screen component? i.e. instead of function we pass a component
  constructor() {
    this.screens = [{
      path: '/',
      isExactPath: true,
      component: this.buildScreenComponent(HomeScreen)
    },
      {
        path: '/contacts',
        component: this.buildScreenComponent(ContactListScreen, [{name: 'sinan'}])
      },
      {
        path: '/notfound',
        component: this.buildScreenComponent(() => { return <div> not found</div>})
      }];
  }

  buildScreenComponent = (component, props) => {
    return () => {
      return <WatchScreen content={ this.buildScreenWithProps(component, props) }/>
    }
  };

  buildScreenWithProps = (component, props) => {
    return () => {
      return component(props);
    };
  };


}

