import { createAppContainer , createSwitchNavigator } from 'react-navigation';

import login from './pages/login';
import list from './pages/list';
import book from './pages/book';

const Routes = createAppContainer(
    createSwitchNavigator({
        login,
        list,
        book
    })
);

export default Routes;