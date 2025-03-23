/* eslint-disable */

import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Image } from './entities/image.entity';
import { ImageDto } from './dto/image.dto';
const cloudinary = require('cloudinary').v2

@Injectable()
export class ImageService {
    constructor(
        @InjectRepository(Image)
        private readonly imageRepository: Repository<Image>
    ) { }


    async create(createImageDto: ImageDto, idUser: number) {
        const image = this.imageRepository.create({ ...createImageDto, createdBy: idUser });
        return await this.imageRepository.save(image);
    }
  
    async uploadMultipleImageAndCreateImages(data: any, idUser: number) {
        cloudinary.config({
            cloud_name: process.env.CLOUDINARY_NAME,
            api_key: process.env.CLOUDINARY_API_KEY,
            api_secret: process.env.CLOUDINARY_API_SECRET
        })
        const uploadedImages: any[] = [];
        try {
            const uploadPromises = data.infosImages.map(image => {
                return new Promise((resolve, reject) => {
                    cloudinary.uploader.upload_large(image.path, { folder: data.folder,timeout: 120000, resource_type: 'auto', chunk_size: 5000000}, (error, result) => {
                        if (result && result.url) {   
                            uploadedImages.push({ path: result.url, label: image.label})

                            resolve(uploadedImages);
                        }else {
                            return reject(error);
                        }   
                    });
                });
            });

            let resultUploadImages = await Promise.all(uploadPromises)
            for (let imagePath of uploadedImages) {
                await this.create({ path: imagePath.path, label: imagePath.label,  createdAt: new Date(), productId: data.productId }, idUser);
            }
            return { message: 'All files uploaded successfully' };

        } catch (error) {
            console.error('Error during upload and creation image', error);
            
        }
      
    }

    async removeImageFromCloudinaryAndBdd(image: any) {
        cloudinary.config({
            cloud_name: process.env.CLOUDINARY_NAME,
            api_key: process.env.CLOUDINARY_API_KEY,
            api_secret: process.env.CLOUDINARY_API_SECRET
        })
        const promise1 = new Promise(async (resolve, reject) => {
            await cloudinary.api.delete_resources(image.publicId, function (error, result) {
                if (result) {
                    resolve(true);
                } else
                    reject()
            });
        });
        await promise1.then(async (value) => {
            if (value) {
                return await this.imageRepository.delete(image.imageId)
            }
        }).catch(function (err) {
            console.error('Observer got an error: ' + err)
        });
    
    }

}