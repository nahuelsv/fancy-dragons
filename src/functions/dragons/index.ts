import schema from './schema';
import { handlerPath } from '@libs/handler-resolver';

export default {
  save: { 
    handler: `${handlerPath(__dirname)}/handler.SaveDragons`,
    events: [
      {
        http: {
          method: 'post',
          path: 'dragons',
          request: {
            schemas: {
              'application/json': schema,
            },
          },
        },
      },
    ],
  },
  get: {
    handler: `${handlerPath(__dirname)}/handler.ShowDragons`,
    events: [
      {
        http: {
          method: 'get',
          path: 'dragons'
        },
      },
    ],
  }
};
