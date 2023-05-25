import { Module } from '@nestjs/common';
import { UsersService } from './services/users/users.service';
import { UsersController } from './controller/users.controller';
import { MongooseModule } from '@nestjs/mongoose';
import UserSchema from './entities/user.schema';
import { HttpModule } from '@nestjs/axios';
import UserAvatarSchema from './entities/userAvatar.schema';
import { EmailService } from './services/email/email.service';
import { MessagersService } from './services/mensagers/messagers.service';
import { UserRequest } from './requests/users.request';
import { FileService } from './services/files/file.service';
import { UserAvatarService } from './services/user-avatar/user-avatar.service';


@Module({
  imports:[MongooseModule.forFeature([
  {'name':'User',schema:UserSchema}, 
  {'name':'UserAvatar',schema:UserAvatarSchema} ]), HttpModule],
  controllers: [UsersController],
  providers: [UsersService, UserAvatarService, EmailService, MessagersService, FileService, UserRequest],
})
export class UsersModule {}
