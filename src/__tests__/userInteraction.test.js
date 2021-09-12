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
import detailsReducer from '../mocks/detailsReducer';

afterEach(cleanup);

beforeEach(() => {
  jest.resetModules();
});

const reducer = combineReducers({
  gniWorld: gniWorldReducer,
  details: detailsReducer,
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

    const setPath = (newPath) => initialPath = newPath;

    const updatePath = (newPath) => {
      if (pathX !== newPath) {
        setPath(newPath);
      }
    };

    const { getByTestId } = renderWithRedux(<Header currentPath={initialPath} updatePath={updatePath} />);
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
    expect(await findByText(/^north america$/i)).toBeInTheDocument();
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

  test('When user clicks a region area, the app renders the corrsponding details page', async () => {
    const { findByText } = renderWithRedux(<App />);

    expect(await findByText(/^south asia$/i)).toBeInTheDocument();
    userEvent.click(await findByText(/^south asia$/i));
    expect(await findByText(/^india$/i)).toBeInTheDocument();
    expect(await findByText(/^pakistan$/i)).toBeInTheDocument();
    const aus = screen.queryByText(/^australia$/i);
    expect(aus).not.toBeInTheDocument();
    const bhu = screen.queryByText(/^bhutan$/i);
    expect(bhu).toBeInTheDocument();
    const arrowBtn = screen.queryByText(/^<$/i);
    userEvent.click(arrowBtn);
  });
});

describe('Details page by current group', () => {
  test('When user clicks the back arrow, app goes back to homepage', async () => {
    let initialPath = {
      path: '/',
      groupId: '',
      currentCategory: {
        current: 'region',
        other: 'income',
      },
    };

    const { findByText, getByTestId } = renderWithRedux(<App />, applyMiddleware(thunk), {
      initialState: {
        gniWorld: {
          status: 'idle',
          entities: [
            {name: "East Asia & Pacific", indicator: 11706.2486723881, id: "EAS", date: "2020", category: "region"},
            {name: "Europe & Central Asia", indicator: 25212.5210325623, id: "ECS", date: "2020", category: "region"},
            {name: "High income", indicator: 46036.0466787998, id: "XD", date: "2020", category: "income"},
            {name: "Latin America & Caribbean", indicator: 7715.11850464998, id: "LCN", date: "2020", category: "region"},
            {name: "Low income", indicator: 810.751972755762, id: "XM", date: "2020", category: "income"},
            {name: "Lower middle income", indicator: 2200.71995911578, id: "XN", date: "2020", category: "income"},
            {name: "Middle East & North Africa", indicator: 6917.78109613348, id: "MEA", date: "2020", category: "region"},
            {name: "North America", indicator: 63921.605596663, id: "NAC", date: "2020", category: "region"},
            {name: "South Asia", indicator: 1820.60030063242, id: "SAS", date: "2020", category: "region"},
            {name: "Sub-Saharan Africa", indicator: 1478.56962278708, id: "SSF", date: "2020", category: "region"},
            {name: "Upper middle income", indicator: 9425.53004618163, id: "XT", date: "2020", category: "income"},
          ],
        },
        details: {
          status: 'idle',
          entities: {},
        }
      }
    });

    userEvent.click(await findByText(/^south asia$/i));
    expect(await findByText(/^india$/i)).toBeInTheDocument();
    const arrowBtn = screen.queryByText(/^<$/i);
    userEvent.click(arrowBtn);
    expect(await findByText(/^north america$/i)).toBeInTheDocument();
    expect(getByTestId('currentCategory').textContent).toBe('REGIONS');
  });
});
