import { Module } from '@nestjs/common';

import { UserModule } from './user/user.module';
import { ConfigModule } from '@nestjs/config';
import { MongooseModule } from '@nestjs/mongoose';
import * as dotenv from 'dotenv';
dotenv.config();

const DB_URL = process.env.DB_URL;

@Module({
  imports: [ConfigModule.forRoot(), MongooseModule.forRoot(DB_URL), UserModule],
})
export class AppModule {}
