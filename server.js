import handlers from './handlers';

import {setupServer} from 'msw/native';
export default setupServer(handlers)
