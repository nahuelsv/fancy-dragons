import type { ValidatedEventAPIGatewayProxyEvent } from '@libs/api-gateway';
import { formatJSONResponse } from '@libs/api-gateway';
import { DragonsRepository } from '@repositories/dragons';
import { DragonInterface } from '@models/dragon';
import { middyfy } from '@libs/lambda';

import schema from './schema';

const saveDragons: ValidatedEventAPIGatewayProxyEvent<typeof schema> = async (event) => {
  return formatJSONResponse({
    message: `Saver ${event.body.name}, welcome to the exciting Serverless world!`,
    event,
  });
};

const showDragons: ValidatedEventAPIGatewayProxyEvent<any> = async () => {
  const dragonRepo = new DragonsRepository();
  const dragons: DragonInterface[] = await dragonRepo.getAllDragons();
  return formatJSONResponse({
    dragons
  });
}

export const SaveDragons = middyfy(saveDragons);

export const ShowDragons = middyfy(showDragons);


