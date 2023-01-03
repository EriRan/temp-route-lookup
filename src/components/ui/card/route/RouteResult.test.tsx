import { Provider } from 'react-redux';
import renderer from 'react-test-renderer';
import { Store, AnyAction } from 'redux';
import { createRouteLookupStore } from '../../../../reducers';
import { RootState } from '../../../../reducers/types';
import RouteResult from './RouteResult';

let store: Store<RootState, AnyAction>; 

beforeEach(() => {
  store = createRouteLookupStore();
  // https://react.i18next.com/misc/testing
  jest.mock('react-i18next', () => ({
    // this mock makes sure any components using the translate hook can use it without a warning being shown
    useTranslation: () => {
      return {
        t: (str: string) => str,
        i18n: {
          changeLanguage: () => new Promise(() => {}),
        },
      };
    },
  }));
});

test('Renders empty div when no content', () => {
  store.getState().route.calculatedRoute = null;
  const component = renderer.create(
    <Provider store={store}><RouteResult /></Provider>,
  );

  expect(component).toMatchInlineSnapshot(`<div />`);
});