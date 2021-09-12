import React from 'react';
import { createStore, combineReducers, applyMiddleware } from 'redux';
import thunk from 'redux-thunk';
import { Provider } from 'react-redux';
import { render, cleanup } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import App from '../App';
import LoadAnimation from '../components/LoadAnimation/LoadAnimation';
import Header from '../components/Header/Header';
import Filter from '../components/Filter/Filter';
import gniWorldReducer from '../mocks/gniReducer';
import detailsReducer from '../mocks/detailsReducer';

afterEach(cleanup);

const reducer = combineReducers({
  gniWorld: gniWorldReducer,
  details: detailsReducer,
});

const renderWithRedux = (component,
  { initialState, store = createStore(reducer, applyMiddleware(thunk), initialState) } = {}) => ({
  ...render(<Provider store={store}>{component}</Provider>),
});

test('Shows correct hidden text', () => {
  const { getByTestId } = renderWithRedux(<LoadAnimation />);
  expect(getByTestId('spinnerSpan').textContent).toBe('Loading...');
});

test('Shows correct title when in homepage', () => {
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

test('Show group regions in homepage on first render of app', async () => {
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

test('When user clicks a region in the homepage, the app renders the corrsponding details page', async () => {
  const { findByText } = renderWithRedux(<App />);

  expect(await findByText(/^south asia$/i)).toBeInTheDocument();
  userEvent.click(await findByText(/^south asia$/i));
  // expect(findByText(/^india$/i)).toBe('India');
  expect(await findByText(/^india$/i)).toBeInTheDocument();
  // expect(getByTestId('currentCategory').textContent).not.toBe('REGIONS');
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
