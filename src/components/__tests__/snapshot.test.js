import React from 'react';
import TestRenderer from 'react-test-renderer';
import { Provider } from 'react-redux';
import App from '../../App';
import store from '../../redux/configureStore';
import Header from '../Header/Header';
import GniWorld from '../GniWorld/GniWorld';
import Details from '../../pages/Details';

describe('App', () => {
  it('Renders the Homepage', () => {
    const app = TestRenderer.create(
      <Provider store={store}>
        <App />
      </Provider>,
    ).toJSON();
    expect(app).toMatchSnapshot();
  });
});

describe('Header', () => {
  it('Renders the Header', () => {
    const initialPath = {
      path: '/',
      groupId: '',
      currentCategory: {
        current: 'region',
        other: 'income',
      },
    };

    const header = TestRenderer.create(
      <Header currentPath={initialPath} />,
    ).toJSON();
    expect(header).toMatchSnapshot();
  });
});

describe('GniWorld', () => {
  it('Renders the homepage GniWorld', () => {
    const pathX = '/';

    const setPath = jest.fn();

    const func = (newPath) => {
      if (pathX !== newPath) {
        setPath(() => newPath);
      }
    };

    const current = {
      currentCategory: {
        current: 'region',
        other: 'income',
      },
    };

    const gniWorld = TestRenderer.create(
      <Provider store={store}>
        <GniWorld
          updatePath={func}
          currentCategory={current}
        />
      </Provider>,
    ).toJSON();
    expect(gniWorld).toMatchSnapshot();
  });
});

describe('Details', () => {
  it('Renders the Details page', () => {
    const groupId = 'EAS';
    const pathX = '/';

    const details = TestRenderer.create(
      <Provider store={store}>
        <Details
          groupId={groupId}
          currentPath={pathX}
        />
      </Provider>,
    ).toJSON();
    expect(details).toMatchSnapshot();
  });
});
