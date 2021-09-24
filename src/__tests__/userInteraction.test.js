import React from 'react';
import { createStore, combineReducers, applyMiddleware } from 'redux';
import thunk from 'redux-thunk';
import { Provider } from 'react-redux';
import { render, cleanup, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import App from '../App';
import LoadAnimation from '../components/LoadAnimation/LoadAnimation';
import Header from '../components/Header/Header';
import Filter from '../components/Filter/Filter';
import gniWorldReducer from '../mocks/gniReducer';
import countriesReducer from '../mocks/countriesReducer';

afterEach(cleanup);

const reducer = combineReducers({
  gniWorld: gniWorldReducer,
  countries: countriesReducer,
});

const renderWithRedux = (component,
  { initialState, store = createStore(reducer, applyMiddleware(thunk), initialState) } = {}) => ({
  ...render(<Provider store={store}>{component}</Provider>),
});

describe('Hompage', () => {
  test('Shows correct hidden text', () => {
    const { getByTestId } = renderWithRedux(<LoadAnimation />);
    expect(getByTestId('spinnerSpan').textContent).toBe('Loading...');
  });

  test('Shows correct title when in homepage', () => {
    let initialPath = {
      path: '/',
      groupId: '',
      currentCategory: {
        current: 'region',
        other: 'income',
      },
    };

    const pathX = '/';

    const setPath = (newPath) => {
      initialPath = newPath;
    };

    const updatePath = (newPath) => {
      if (pathX !== newPath) {
        setPath(newPath);
      }
    };

    const { getByTestId } = renderWithRedux(<Header
      currentPath={initialPath}
      updatePath={updatePath}
    />);
    expect(getByTestId('headerText').textContent).toBe('gni per capita in the world');
  });

  test('Shows correct title', () => {
    const setCategoryFilter = jest.fn();

    const changeCategoryFilter = () => setCategoryFilter((actualCategory) => ({
      current: actualCategory.other,
      other: actualCategory.current,
    }));

    const props = {
      currentCategory: 'region',
      otherCategory: 'income',
      changeCategoryFilter,
    };

    const { getByTestId } = renderWithRedux(<Filter
      currentCategory={props.currentCategory}
      otherCategory={props.otherCategory}
      changeCategoryFilter={props.changeCategoryFilter}
    />);

    expect(getByTestId('currentCategory').textContent).toBe('REGIONS');
  });

  test('Show group regions on first render of app', async () => {
    const { findByText } = renderWithRedux(<App />);
    expect(await findByText('North America')).toBeInTheDocument();
  });

  test('Change category title when user clicks filter button', async () => {
    const { getByTestId, findByRole } = renderWithRedux(<App />);

    expect(getByTestId('spinnerSpan').textContent).toBe('Loading...');

    userEvent.click(await findByRole('button'));
    expect(getByTestId('currentCategory').textContent).toBe('INCOME LEVELS');
    expect(getByTestId('currentCategory').textContent).not.toBe('REGIONS');
  });

  test('Should briefly show Spinner when status of state is \'starting\'', async () => {
    const { getByTestId } = renderWithRedux(<App />);

    expect(getByTestId('spinnerSpan').textContent).toBe('Loading...');
  });

  test('When user clicks a region area, the app renders the corresponding countries page', async () => {
    const { findByText } = renderWithRedux(<App />);

    expect(await findByText('South Asia')).toBeInTheDocument();
    userEvent.click(await findByText('South Asia'));
    expect(await findByText('India')).toBeInTheDocument();
    expect(await findByText('Pakistan')).toBeInTheDocument();
    const aus = screen.queryByText('Australia');
    expect(aus).not.toBeInTheDocument();
    const bhu = screen.queryByText('Bhutan');
    expect(bhu).toBeInTheDocument();
    const arrowBtn = screen.queryByText('<');
    userEvent.click(arrowBtn);
  });
});

describe('Countries page by current group', () => {
  test('When user clicks the back arrow, app goes back to homepage', async () => {
    const { findByText, getByTestId } = renderWithRedux(<App />);

    userEvent.click(await findByText('South Asia'));
    expect(await findByText('India')).toBeInTheDocument();
    const arrowBtn = screen.queryByText('<');
    userEvent.click(arrowBtn);
    expect(await findByText('North America')).toBeInTheDocument();
    expect(getByTestId('currentCategory').textContent).toBe('REGIONS');
  });
});
