import { Provider } from 'react-redux';
import renderer from 'react-test-renderer';
import { Store, AnyAction } from 'redux';
import { createRouteLookupStore } from '../../../../reducers';
import { RootState } from '../../../../reducers/types';
import RouteResult from './RouteResult';

let store: Store<RootState, AnyAction>; 

beforeEach(() => {
  store = createRouteLookupStore();
});

test('Renders empty div when no content', () => {
  store.getState().route.calculatedRoute = null;
  // TODO: Do something about i18n translation warning here
  const component = renderer.create(
    <Provider store={store}><RouteResult /></Provider>,
  );

  expect(component).toMatchSnapshot();
});