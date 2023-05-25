import { HttpService } from '@nestjs/axios'
import { Injectable } from '@nestjs/common';
import * as fs from 'fs';
import * as Path  from 'path';

@Injectable()
export class FileService {

    constructor(private readonly http: HttpService) {}

    async saveImageByUrl(url:string, toFolder:string){
        const folder = toFolder;
        const ImageHash = await new Date().getTime().toString();
        const path = `${folder}/${ImageHash}.png`
        const writer = fs.createWriteStream(path, {flags: 'w'});
        
        const response = await this.http.axiosRef({
            url: url,
            method: 'GET',
            responseType: 'stream',
        });
  
        response.data.pipe(writer);
  
        await new Promise((resolve, reject) => {
            writer.on('finish', resolve);
            writer.on('error', reject);
        })

        return path;
    }

    imageFileToBase64(path:string){
        return fs.readFileSync(Path.resolve(path)).toString('base64');
    }

    removeFile(path:string){
        fs.unlinkSync(path);
    }
}