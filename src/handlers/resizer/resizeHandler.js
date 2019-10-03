const S3Handler = require('./s3Handler');

//Core image processing package
const sharp = require('sharp')

class ResizerHandler {
  constructor(){ }

  async process(event) {
    const { size, image } = event.pathParameters
    return await this.resize(size, image)
  }

  async resize(size, path) {
    try {
        
        const s3Handler = new S3Handler();
        const Bucket = process.env.BUCKET;
        console.log(Bucket);

        s3Handler.readHead(Bucket);

        const sizeArray = size.split('x')
        const width = parseInt(sizeArray[0])
        const height = parseInt(sizeArray[1])
        const Key = path
        const newKey = '' + width + 'x' + height + '/' + path

        const streamResize = sharp()
        .resize(width, height)
        .toFormat('png')

        console.log(Key);
        const readStream = s3Handler.readStream({ Bucket, Key })
        const { writeStream, uploaded } = s3Handler.writeStream({ Bucket, Key: newKey })

        //data streaming
        readStream
        .pipe(streamResize)
        .pipe(writeStream)

        await uploaded
        return newKey
    } catch (error) {
        throw new Error(error)
    }
  }
}

module.exports = ResizerHandler;