import { Module } from '@nestjs/common';
import { UsersModule } from './users/users.module';
import { MongooseModule } from '@nestjs/mongoose';

@Module({
  imports: [MongooseModule.forRoot('mongodb://127.0.0.1:27017/local?authSource=admin', {
    useUnifiedTopology:true,
    useNewUrlParser:true,
  }), UsersModule],
})
export class AppModule {}
