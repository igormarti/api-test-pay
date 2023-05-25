import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateUserDto } from '../../dto/create-user.dto';
import { Model } from 'mongoose';
import { InjectModel } from '@nestjs/mongoose';
import { User } from '../../entities/user.entity';
import { userAvatar } from '../../entities/userAvatar.entity';
import { map } from 'rxjs';
import { MessagersService } from '../mensagers/messagers.service';
import { EmailService } from '../email/email.service';
import { UserRequest } from 'src/users/requests/users.request';
import { FileService } from '../files/file.service';
import { UserAvatarService } from '../user-avatar/user-avatar.service';

@Injectable()
export class UsersService {

  constructor(@InjectModel('User')private readonly userModel:Model<User>, 
  private readonly msgService:MessagersService,
  private readonly emailService:EmailService,
  private readonly fileService:FileService,
  private readonly userAvatarService:UserAvatarService,
  private readonly userRequest:UserRequest){}

  async create(createUserDto: CreateUserDto): Promise<User>  {
    const user = new this.userModel(createUserDto);
    this.emailService.sendEmail(user.email, 'teste', 'teste');
    this.msgService.sendToQueue('user', user);
    return user.save();
  }

  async findOne(id: number){
    return this.userRequest.getUserInReqRes(id);
  }

  async findAvatarUserId(id: string){

    const userExists = await this.userAvatarService.findOne(id);

    if(userExists){
        const fileContent = this.fileService.imageFileToBase64(userExists.hash);
        return {avatar: fileContent}
    }

    return (await this.userRequest.getUserInReqRes(+id)).pipe( 
      map(
        async (user) => this.saveAvatarUser(user)
      )
    )

  }

  async removeAvatarUserId(id: string) : Promise<void>{
    const userExists = await this.userAvatarService.findOne(id);
    if(!userExists){
      throw new NotFoundException(`Avatar not found.`); 
    }
    this.fileService.removeFile(userExists.hash);
    await userExists.deleteOne()
  }

  private async saveAvatarUser(user){
    if (!('data' in user && 'avatar' in user.data)){
      throw new NotFoundException(`User not found.`); 
    }

    const {id, avatar} = user.data;

    const path = await this.fileService.saveImageByUrl(avatar, 'images');

    const userAvatar:userAvatar = {
      userId: id,
      hash: path,
    }
    await this.userAvatarService.create(userAvatar);

    const fileContent = this.fileService.imageFileToBase64(path);
    return {avatar:fileContent};
  }

}
