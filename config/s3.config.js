const { S3Client, DeleteObjectCommand } = require("@aws-sdk/client-s3")

require("dotenv").config()

// classe que simplifica as funções do cli da aws
class configS3 {
    constructor(){
        this.client = new S3Client({
            credentials: {
                accessKeyId: process.env.ACESS_KEY_ID,
                secretAccessKey: process.env.SECRET_ACESS_KEY
            },
            region: process.env.REGION
        })

        this.bucket = process.env.BUCKET_NAME
    }

    async deleteObject(key){
        try {
            
            const command = new DeleteObjectCommand({
                Bucket: this.bucket,
                Key: key
            })
        
            return await client.send(command);
        }
        catch(error){
            return error
        }
    }
}



module.exports = configS3