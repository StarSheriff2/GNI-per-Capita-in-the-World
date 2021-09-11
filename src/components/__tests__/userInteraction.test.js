import React from 'react';
import { rest } from 'msw';
import { setupServer } from 'msw/node';
// import TestRenderer from 'react-test-renderer';
import { createStore, combineReducers, applyMiddleware } from 'redux';
import thunk from 'redux-thunk';
import { Provider } from 'react-redux';
import {
  fireEvent, render, cleanup,
} from '@testing-library/react';
import App from '../../App';
import LoadAnimation from '../LoadAnimation/LoadAnimation';
import Header from '../Header/Header';
import Filter from '../Filter/Filter';
import gniWorldReducer from './__mocks__/gniReducer';
import detailsReducer from './__mocks__/detailsReducer';

const jsonResponse = [
  {
    page: 1,
    pages: 1,
    per_page: 50,
    total: 3,
    sourceid: '2',
    sourcename: 'World Development Indicators',
    lastupdated: '2021-07-30',
  },
  [
    {
      indicator: {
        id: 'NY.GNP.PCAP.CD',
        value: 'GNI per capita, Atlas method (current US$)',
      },
      country: {
        id: 'XU',
        value: 'North America',
      },
      countryiso3code: 'NAC',
      date: '2020',
      value: 63921.605596663,
      unit: '',
      obs_status: '',
      decimal: 0,
    },
    {
      indicator: {
        id: 'NY.GNP.PCAP.CD',
        value: 'GNI per capita, Atlas method (current US$)',
      },
      country: {
        id: '8S',
        value: 'South Asia',
      },
      countryiso3code: 'SAS',
      date: '2020',
      value: 1820.60030063242,
      unit: '',
      obs_status: '',
      decimal: 0,
    },
    {
      indicator: {
        id: 'NY.GNP.PCAP.CD',
        value: 'GNI per capita, Atlas method (current US$)',
      },
      country: {
        id: 'ZG',
        value: 'Sub-Saharan Africa',
      },
      countryiso3code: 'SSF',
      date: '2020',
      value: 1478.56962278708,
      unit: '',
      obs_status: '',
      decimal: 0,
    },
  ],
];

const handlers = [
  rest.get('http://api.worldbank.org/v2/country/Z4;Z7;ZJ;ZQ;XU;8S;ZG;XM;XN;XT;XD/indicator/NY.GNP.PCAP.CD?format=json&mrv=1&gapfill=Y', (req, res, ctx) => res(ctx.json(jsonResponse), ctx.delay(150))),
];

const server = setupServer(...handlers);

// Enable API mocking before tests.
beforeAll(() => server.listen());

// Reset any runtime request handlers we may add during the tests.
afterEach(() => server.resetHandlers());

// Disable API mocking after the tests are done.
afterAll(() => server.close());

afterEach(cleanup);

const reducer = combineReducers({
  gniWorld: gniWorldReducer,
  details: detailsReducer,
});

const renderWithRedux = (component,
  { initialState, store = createStore(reducer, applyMiddleware(thunk), initialState) } = {}) => ({
  ...render(<Provider store={store}>{component}</Provider>),
});

test('Shows spinner while status of state is \'starting\'', () => {
  const { getByTestId } = renderWithRedux(<LoadAnimation />);
  expect(getByTestId('spinnerSpan').textContent).toBe('Loading...');
});

test('Render homepage after successfully making API call', () => {
  const initialPath = {
    path: '/',
    groupId: '',
    currentCategory: {
      current: 'region',
      other: 'income',
    },
  };

  const { getByTestId } = renderWithRedux(<Header currentPath={initialPath} />);
  expect(getByTestId('headerText').textContent).toBe('gni per capita in the world');
});

test('Render \'Regions\' in homepage on first App render', () => {
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

test('Change category title when user clicks filter button', async () => {
  /* const setCategoryFilter = jest.fn();

  const changeCategoryFilter = () => setCategoryFilter((actualCategory) => ({
    current: actualCategory.other,
    other: actualCategory.current,
  }));

  const props = {
    currentCategory: 'region',
    otherCategory: 'income',
    changeCategoryFilter,
  }; */

  const { getByTestId, getByText } = renderWithRedux(<App />);

  fireEvent.click(getByText('REGIONS'));
  expect(await getByTestId('currentCategory').textContent).toBe('INCOME LEVELS');
});

/* describe('Header', () => {
  it('Shows proper header', () => {
    const app = TestRenderer.create(
      <Provider store={store}>
        <App />
      </Provider>,
    ).toJSON();

    fireEvent.click(screen.getByTestId('linkCalc'));

    const title = screen.getByTestId('header');
    expect(title.textContent).toBe('gni per capita in the world');
  });

  it('Renders home page', () => {
    render(<App />);

    fireEvent.click(screen.getByTestId('linkHome'));

    const title = screen.getByTestId('homeTitle');
    expect(title.textContent).toBe('Welcome To Our Page!');
  });

  it('Renders quote page', () => {
    render(<App />);

    fireEvent.click(screen.getByTestId('linkQuote'));

    const title = screen.getByTestId('quoteTitle');
    expect(title.textContent).toBe('Quote of the day:');
  });
});

describe('CalculatorPage', () => {
  it('displays a number', () => {
    render(<CalculatorPage />);

    fireEvent.click(screen.getByRole('button', { name: '0' }));

    const display = screen.getByTestId('display');
    expect(display.textContent).toBe('  0');
  });

  it('displays a number', () => {
    render(<CalculatorPage />);

    fireEvent.click(screen.getByRole('button', { name: '4' }));
    fireEvent.click(screen.getByRole('button', { name: '+' }));
    fireEvent.click(screen.getByRole('button', { name: '8' }));
    fireEvent.click(screen.getByRole('button', { name: '=' }));

    const display = screen.getByTestId('display');
    expect(display.textContent).toBe('12 + ');
  });

  it('displays a number', () => {
    render(<CalculatorPage />);

    fireEvent.click(screen.getByRole('button', { name: '1' }));
    fireEvent.click(screen.getByRole('button', { name: '0' }));
    fireEvent.click(screen.getByRole('button', { name: '-' }));
    fireEvent.click(screen.getByRole('button', { name: '5' }));
    fireEvent.click(screen.getByRole('button', { name: '=' }));

    const display = screen.getByTestId('display');
    expect(display.textContent).toBe('5 - ');
  });

  it('displays a number', () => {
    render(<CalculatorPage />);

    fireEvent.click(screen.getByRole('button', { name: '8' }));
    fireEvent.click(screen.getByRole('button', { name: '÷' }));
    fireEvent.click(screen.getByRole('button', { name: '2' }));
    fireEvent.click(screen.getByRole('button', { name: '=' }));

    const display = screen.getByTestId('display');
    expect(display.textContent).toBe('4 ÷ ');
  });
}); */
