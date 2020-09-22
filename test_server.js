import handlers from './handlers';

import {setupServer} from 'msw/node';
export default setupServer(handlers)
