const ormconfig = require('./config/ormconfig');
import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UserModule } from './user/user.module';
import { MeasurementModule } from './measurement/measurement.module';
import { CacheModule } from '@nestjs/common';
import { AuthModule } from './auth/auth.module';
import { redisConfig } from './config/redisConfig';
import * as redisStore from 'cache-manager-redis-store';
@Module({
  imports: [
    TypeOrmModule.forRoot(ormconfig),
    CacheModule.register({ store: redisStore, ...redisConfig }),
    UserModule,
    MeasurementModule,
    AuthModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
