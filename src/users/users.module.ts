import { Module, MiddlewareConsumer, RequestMethod } from '@nestjs/common';
import { UsersService } from './users.service';
import { UsersController } from './users.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { User, UserSchema } from './entities/user.entity';
import { CreateNewUserMiddleware } from '../middleware/validators/users/createNewUser';
import { CreateNewUserByClient } from '../middleware/validators/users/createNewUserByClient';
import { UpdateUserMiddleware } from '../middleware/validators/users/updateUser';
import { Heimdall } from '../middleware/heimdall';
import { DelayMiddleware } from '../middleware/delayed';
import { IsAdmin } from '../middleware/isAdmin';
import { MailModule } from 'src/nest-mailer/mail.module';

@Module({
  imports: [
    MongooseModule.forRoot(process.env.MONGOURL),
    MongooseModule.forFeature([{ name: User.name, schema: UserSchema }]),
    MailModule,
  ],

  controllers: [UsersController],

  providers: [UsersService],
})
export class UsersModule {
  configure(consumer: MiddlewareConsumer) {
    consumer
      .apply(Heimdall, IsAdmin, CreateNewUserMiddleware)
      .forRoutes({ path: 'users', method: RequestMethod.POST }),
      consumer
        .apply(Heimdall, UpdateUserMiddleware)
        .forRoutes({ path: 'users/:id', method: RequestMethod.PUT }),
      consumer
        .apply(Heimdall)
        .forRoutes({ path: 'users/:id', method: RequestMethod.DELETE }),
      consumer
        .apply(DelayMiddleware)
        .forRoutes({ path: 'users/delayed', method: RequestMethod.GET }),
      consumer
        .apply(CreateNewUserByClient)
        .forRoutes({ path: 'users/register', method: RequestMethod.POST });
  }
}
