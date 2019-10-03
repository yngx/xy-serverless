const ResizeHandler = require("./resizeHandler");

exports.handler = async (event) => {
  try {
    
    const resizeHandler = new ResizeHandler();
    const imagePath = await resizeHandler.process(event);
    const URL = `http://${process.env.BUCKET}.s3-website.${process.env.REGION}.amazonaws.com`;

    return {
      headers: { location: `${URL}/${imagePath}` },
      statusCode: 301,
      body: ""
    };

  } catch (error) {
    console.log(error);
    return new Error(error);
  }
};