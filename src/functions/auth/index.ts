import { handlerPath } from '@libs/handler-resolver';
import schema from './schema';

export default {
  login: { 
    handler: `${handlerPath(__dirname)}/handler.Login`,
    events: [
      {
        http: {
          method: 'post',
          path: 'auth',
          request: {
            schemas: {
              'application/json': schema,
            },
          },
        },
      },
      
    ],
  },
}