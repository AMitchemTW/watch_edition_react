import React from 'react';
import { shallow } from 'enzyme';
import WatchApp from './WatchApp';

const DummyComponent = () => <div>Hello World</div>;

describe('WatchApp', () => {
  let pages;
  beforeEach(() => {
    pages = [
      { path: '/', Component: DummyComponent },
    ];
  });
  test('it should display the Watch component', () => {
    expect(shallow(<WatchApp pages={ pages } />).find('Watch')).toBePresent();
  });

  test('it should display the LevelUp title', () => {
    const result = shallow(<WatchApp pages={ pages } />).find('h1');
    expect(result).toHaveText('LevelUp Watch Edition');
  });

  describe('When rendered with NotificationForm as a child component', () => {
    test('it should display the NotificationForm', () => {
      expect(shallow(<WatchApp pages={ pages } />).find('NotificationForm')).toBePresent();
    });

    test('it should have an event handler that updates the components state', () => {
      const wrapper = shallow(<WatchApp pages={ pages } />);
      const dummyNotificationEvent = { text: 'wowow', show: true };
      wrapper.instance().notificationHandler(dummyNotificationEvent);
      expect(wrapper.state('notificationEvent')).toMatchObject(dummyNotificationEvent);
    });

    test('it should pass the defaultText prop to NotificationForm', () => {
      const componentWrapper = shallow(<WatchApp pages={ pages } />);
      const dummyState = { notificationEvent: { ...componentWrapper.state('notificationEvent'), text: 'testText' } };
      componentWrapper.setState(dummyState);
      expect(componentWrapper.find('NotificationForm')).toHaveProp('defaultText', dummyState.notificationEvent.text);
    });

    test('it should pass notificationEvent callback handler to NotificationForm', () => {
      const componentWrapper = shallow(<WatchApp pages={ pages } />);
      expect(componentWrapper.find('NotificationForm'))
        .toHaveProp('handleEvent', componentWrapper.instance().notificationHandler);
    });
  });

  describe('Page Components', () => {
    it('should display the DummyComponent screen', () => {
      const watchWrapper = shallow(<WatchApp pages={ pages } />).find('Watch');

      expect(watchWrapper.find(DummyComponent)).toBePresent();
    });

    it('should attach the path prop', () => {
      pages[0].path = '/';
      const watchWrapper = shallow(<WatchApp pages={ pages } />).find('Watch');

      expect(watchWrapper.find(DummyComponent)).toHaveProp('path', '/');
    });

    it('should attach the path prop', () => {
      pages[0].props = { some: 'prop' };
      const watchWrapper = shallow(<WatchApp pages={ pages } />).find('Watch');

      expect(watchWrapper.find(DummyComponent)).toHaveProp('some', 'prop');
    });
  });

  describe('popupButtons.OVERRIDE', () => {
    it('Should hide the notification popup when called', () => {
      const wrapper = shallow(<WatchApp pages={ pages } />);
      const dummyNotificationEvent = { text: 'wowow', show: true };
      wrapper.instance().notificationHandler(dummyNotificationEvent);
      wrapper.instance().popupButtons.OVERRIDE();
      expect(wrapper.state('notificationEvent')).toMatchObject({ text: 'wowow', show: false });
    });
  });
});
