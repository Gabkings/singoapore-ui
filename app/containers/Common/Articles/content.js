import { generateText } from '../../../utils/loremIpsumGenerator';
export const articles = Array.from(Array(4).keys()).map(i => ({
  imageSource:
    'https://s3-ap-southeast-1.amazonaws.com/sghomeneeds-gallery/images/alberto-castillo-q-346020-unsplash.jpg',
  alt: i.toString(),
  name: generateText(30),
  key: i.toString(),
}));
