export const getS3Image = path => encodeURI(`${process.env.S3_URL}${path}`);
