# xy-serverless
Dynamic image resizing

# TODO
- create S3 Bucket (xao-med-images-resize)
- Update serverless.yaml to give the lambda role S3FullAccess etc
- Add docker to be able to switch between different environments, lambda uses a linux runtime so we have to install sharp for that particular runtime. via: `npm install --arch=x64 --platform=linux --target=10.15.0 sharp`