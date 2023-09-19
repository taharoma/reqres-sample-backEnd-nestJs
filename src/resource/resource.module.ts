import { ResourceController } from './resource.controller';
import { ResourceService } from './resource.service';

import { Module, MiddlewareConsumer, RequestMethod } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { Resource, ResourceSchema } from './entities/resource.entity';
import { Heimdall } from '../middleware/heimdall';
import { IsAdmin } from '../middleware/isAdmin';

@Module({
  imports: [
    MongooseModule.forRoot(process.env.MONGOURL),
    MongooseModule.forFeature([
      { name: Resource.name, schema: ResourceSchema },
    ]),
  ],
  controllers: [ResourceController],
  providers: [ResourceService],
})
export class ResourceModule {
  configure(consumer: MiddlewareConsumer) {
    consumer.apply().forRoutes();
  }
}
