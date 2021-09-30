import React from 'react';
import TestRenderer from 'react-test-renderer';
import { Provider } from 'react-redux';
import App from '../App';
import store from '../redux/configureStore';
import Header from '../components/Header/Header';
import GniWorld from '../components/GniWorld/GniWorld';
import Countries from '../pages/Countries';

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

describe('Countries', () => {
  it('Renders the Countries page', () => {
    const groupId = 'EAS';
    const pathX = {
      currentCategory: {
        current: 'region',
        other: 'income',
      },
    };

    const countries = TestRenderer.create(
      <Provider store={store}>
        <Countries
          groupId={groupId}
          currentPath={pathX}
        />
      </Provider>,
    ).toJSON();
    expect(countries).toMatchSnapshot();
  });
});
