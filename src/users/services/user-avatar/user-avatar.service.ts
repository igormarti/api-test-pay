import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { userAvatar } from 'src/users/entities/userAvatar.entity';

@Injectable()
export class UserAvatarService {

    constructor(@InjectModel('UserAvatar')private readonly userAvatarModel:Model<userAvatar>,
    ){}

    async findOne(id){
        return await this.userAvatarModel.findOne({userId:id}).exec();
    }
  
    async create(userAvatar){
        const userAvatarObj = this.userAvatarModel.create(userAvatar);
        (await userAvatarObj).save();
    }

}