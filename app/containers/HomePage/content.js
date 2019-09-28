import { generateText } from '../../utils/loremIpsumGenerator';
import { getS3Image } from '../../utils/images';
// import Home from '../../images/HomePage/home.jpg';
// import Carpenter from '../../images/HomePage/carpenter.jpg';
// import HandyMan from '../../images/HomePage/handyman.jpg';
// import PestControl from '../../images/HomePage/pest-control.jpg';
// import AirConditioner from '../../images/HomePage/air-conditioner.jpg';
//
// import homeProject2 from '../../images/18505_Bedroom-.jpg';
//
// import Tammy from '../../images/Placeholder/profile.png';

const Home = getS3Image('/images/HomePage/home.jpg');
const Carpenter = getS3Image('/images/HomePage/carpenter.jpg');
const HandyMan = getS3Image('/images/HomePage/handyman.jpg');
const PestControl = getS3Image('/images/HomePage/pest-control.jpg');
const AirConditioner = getS3Image('/images/HomePage/air-conditioner.jpg');
const homeProject2 = getS3Image('/images/18505_Bedroom-.jpg');
const Tammy = getS3Image('/images/Placeholder/profile.png');

export const categories = [
  {
    text: 'Home',
    imageSource: Home,
    key: 'Home',
    backgroundColor: '#fff',
  },
  {
    text: 'Carpenters',
    imageSource: Carpenter,
    key: 'Carpenters',
    backgroundColor: '#fff',
  },
  {
    text: 'Handyman',
    imageSource: HandyMan,
    key: 'HandyMan',
    backgroundColor: '#fff',
  },
  {
    text: 'Pest Control',
    imageSource: PestControl,
    key: 'Pest Control',
    backgroundColor: '#fff',
  },
  {
    text: 'Air Conditioner',
    imageSource: AirConditioner,
    key: 'Air Conditioner',
    backgroundColor: '#fff',
  },
];

export const howItWorks = [
  {
    imageSource: 'http://via.placeholder.com/100x100',
    step: '1',
    text: generateText(100),
    key: '1',
  },
  {
    imageSource: 'http://via.placeholder.com/100x100',
    step: '2',
    text: generateText(100),
    key: '2',
  },
  {
    imageSource: 'http://via.placeholder.com/100x100',
    step: '3',
    text: generateText(100),
    key: '3',
  },
];
export const homeProjects = [
  {
    imageSource: homeProject2,
    title: `Quee's Close`,
    company: 'Lux Design Pte Ltd',
    type: 'Interior Design',
    key: `Quee's Close`,
  },
  {
    imageSource: homeProject2,
    title: `Serangoon Avenue 4`,
    company: 'Lux Design Pte Ltd',
    type: 'Interior Design',
    key: 'Interior Design',
  },
  {
    imageSource: homeProject2,
    title: `Serangoon Avenue 4`,
    company: 'Lux Design Pte Ltd',
    type: 'Interior Design',
    key: 'Serangoon Avenue 4',
  },
];

export const differenceList = [
  {
    text: 'Entirely free',
    key: '11',
  },
  {
    text: 'Good rated & reliable professionals',
    key: '12',
  },
  {
    text: 'Find any home service easily',
    key: '13',
  },
  {
    text: 'Speak to professionals directly',
    key: '14',
  },
  {
    text: 'Quick responses from professionals',
    key: '15',
  },
];
export const clientReviews = [
  {
    imageSource: Tammy,
    name: 'Tammy Perry',
    company: 'Lux Design Pte Ltd',
    type: 'Interior Design',
    reviewText:
      'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut',
    key: 'Tammy Perry1',
  },
  {
    imageSource: Tammy,
    name: 'Tammy Perry',
    company: 'Lux Design Pte Ltd',
    type: 'Interior Design',
    reviewText:
      'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut',
    key: 'Tammy Perry2',
  },
  {
    imageSource: Tammy,
    name: 'Tammy Perry',
    company: 'Lux Design Pte Ltd',
    type: 'Interior Design',
    reviewText:
      'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut',
    key: 'Tammy Perry3',
  },
];

export const articles = [
  {
    imageSource: homeProject2,
    title: 'Lorem ipsum dolor sit amet',
    descriptionText:
      'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut',
    key: 'Tammy Perry4',
  },
  {
    imageSource: homeProject2,
    title: 'Lorem ipsum dolor sit amet',
    descriptionText:
      'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut',
    key: 'Tammy Perry5',
  },
  {
    imageSource: homeProject2,
    title: 'Lorem ipsum dolor sit amet',
    descriptionText:
      'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut',
    key: 'Tammy Perry6',
  },
  {
    imageSource: homeProject2,
    title: 'Lorem ipsum dolor sit amet',
    descriptionText:
      'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut',
    key: 'Tammy Perry7',
  },
  {
    imageSource: homeProject2,
    title: 'Lorem ipsum dolor sit amet',
    descriptionText:
      'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut',
    key: 'Tammy Perry8',
  },
  {
    imageSource: homeProject2,
    title: 'Lorem ipsum dolor sit amet',
    descriptionText:
      'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut',
    key: 'Tammy Perry9',
  },
];

export const galleries = {
  count: 3,
  next: null,
  previous: null,
  results: [
    {
      id: 26,
      slug: 'serangoon-avenue-4-26',
      listing: null,
      wp_post_id: 18511,
      wp_post_title: 'Serangoon Avenue 4',
      wp_author_id: 1,
      wp_post_desc: 'interior design,Lux Design,Serangoon Avenue 4',
      address: '215 Serangoon Ave 4',
      postal_code: '550215',
      city: 'Singapore',
      country: 'Singapore',
      latitude: '1.358037',
      longitude: '103.873305',
      gd_place_id: 7832,
      property_type: 'HDB',
      design_style: 'Retro',
      estimated_project_cost: 'S$40000 to S$60000',
      year: 2017,
      files: [
        {
          id: 307,
          url:
            'https://s3-ap-southeast-1.amazonaws.com/sghomeneeds-gallery//uploads/2018/08/18511_dining-2.jpg',
          name: '/uploads/2018/08/18511_dining-2.jpg',
          gallery: 26,
          listing: null,
          file_field:
            'https://sghomeneeds-gallery.s3.amazonaws.com/uploads/2018/08/18511_dining-2.jpg',
          is_gallery_before_images: false,
        },
        {
          id: 308,
          url:
            'https://s3-ap-southeast-1.amazonaws.com/sghomeneeds-gallery//uploads/2018/08/18511_kitchen-1.jpg',
          name: '/uploads/2018/08/18511_kitchen-1.jpg',
          gallery: 26,
          listing: null,
          file_field:
            'https://sghomeneeds-gallery.s3.amazonaws.com/uploads/2018/08/18511_kitchen-1.jpg',
          is_gallery_before_images: false,
        },
        {
          id: 309,
          url:
            'https://s3-ap-southeast-1.amazonaws.com/sghomeneeds-gallery//uploads/2018/08/18511_kitchen-2.jpg',
          name: '/uploads/2018/08/18511_kitchen-2.jpg',
          gallery: 26,
          listing: null,
          file_field:
            'https://sghomeneeds-gallery.s3.amazonaws.com/uploads/2018/08/18511_kitchen-2.jpg',
          is_gallery_before_images: false,
        },
        {
          id: 310,
          url:
            'https://s3-ap-southeast-1.amazonaws.com/sghomeneeds-gallery//uploads/2018/08/18511_living-room.jpg',
          name: '/uploads/2018/08/18511_living-room.jpg',
          gallery: 26,
          listing: null,
          file_field:
            'https://sghomeneeds-gallery.s3.amazonaws.com/uploads/2018/08/18511_living-room.jpg',
          is_gallery_before_images: false,
        },
        {
          id: 305,
          url:
            'https://s3-ap-southeast-1.amazonaws.com/sghomeneeds-gallery//uploads/2018/08/18511_bedroom.jpg',
          name: '/uploads/2018/08/18511_bedroom.jpg',
          gallery: 26,
          listing: null,
          file_field:
            'https://sghomeneeds-gallery.s3.amazonaws.com/uploads/2018/08/18511_bedroom.jpg',
          is_gallery_before_images: false,
        },
        {
          id: 306,
          url:
            'https://s3-ap-southeast-1.amazonaws.com/sghomeneeds-gallery//uploads/2018/08/18511_dining-1.jpg',
          name: '/uploads/2018/08/18511_dining-1.jpg',
          gallery: 26,
          listing: null,
          file_field:
            'https://sghomeneeds-gallery.s3.amazonaws.com/uploads/2018/08/18511_dining-1.jpg',
          is_gallery_before_images: false,
        },
        {
          id: 311,
          url:
            'https://s3-ap-southeast-1.amazonaws.com/sghomeneeds-gallery//uploads/2018/08/18511_walk-in-wardrobe.jpg',
          name: '/uploads/2018/08/18511_walk-in-wardrobe.jpg',
          gallery: 26,
          listing: null,
          file_field:
            'https://sghomeneeds-gallery.s3.amazonaws.com/uploads/2018/08/18511_walk-in-wardrobe.jpg',
          is_gallery_before_images: false,
        },
      ],
      about_rich_text:
        'Serangoon Avenue 4 - a home remodelling project completed by Lux Design.\n\nLux Design Pte Ltd was started with the foremost priority to build our customer dream house. Every customer’s needs and concerns form our core responsibility.\n\nEvery project we seek to translate customer’s dream living space into one that is rich in design, functionality and achieving it’s unique luxury characteristic. We have our own carpentry workshop. With it, we can provide more personalized services and better quality assurance.',
    },
    {
      id: 27,
      slug: 'lor-h-telok-kurau-27',
      listing: null,
      wp_post_id: 18512,
      wp_post_title: 'Lor H Telok Kurau',
      wp_author_id: 1,
      wp_post_desc: 'interior design,Lor H Telok Kurau,Lux Design',
      address: '118 Lor H Telok Kurau',
      postal_code: '426146',
      city: 'Singapore',
      country: 'Singapore',
      latitude: '1.316916',
      longitude: '103.914023',
      gd_place_id: 7832,
      property_type: 'Landed',
      design_style: 'Mid-century modern',
      estimated_project_cost: 'S$40000 to S$60000',
      year: 2017,
      files: [
        {
          id: 314,
          url:
            'https://s3-ap-southeast-1.amazonaws.com/sghomeneeds-gallery//uploads/2018/08/18512_bomb-shelther-3.jpg',
          name: '/uploads/2018/08/18512_bomb-shelther-3.jpg',
          gallery: 27,
          listing: null,
          file_field:
            'https://sghomeneeds-gallery.s3.amazonaws.com/uploads/2018/08/18512_bomb-shelther-3.jpg',
          is_gallery_before_images: false,
        },
        {
          id: 325,
          url:
            'https://s3-ap-southeast-1.amazonaws.com/sghomeneeds-gallery//uploads/2018/08/18512_patio-4.jpg',
          name: '/uploads/2018/08/18512_patio-4.jpg',
          gallery: 27,
          listing: null,
          file_field:
            'https://sghomeneeds-gallery.s3.amazonaws.com/uploads/2018/08/18512_patio-4.jpg',
          is_gallery_before_images: false,
        },
        {
          id: 315,
          url:
            'https://s3-ap-southeast-1.amazonaws.com/sghomeneeds-gallery//uploads/2018/08/18512_dining-1-1.jpg',
          name: '/uploads/2018/08/18512_dining-1-1.jpg',
          gallery: 27,
          listing: null,
          file_field:
            'https://sghomeneeds-gallery.s3.amazonaws.com/uploads/2018/08/18512_dining-1-1.jpg',
          is_gallery_before_images: false,
        },
        {
          id: 319,
          url:
            'https://s3-ap-southeast-1.amazonaws.com/sghomeneeds-gallery//uploads/2018/08/18512_living-room-2.jpg',
          name: '/uploads/2018/08/18512_living-room-2.jpg',
          gallery: 27,
          listing: null,
          file_field:
            'https://sghomeneeds-gallery.s3.amazonaws.com/uploads/2018/08/18512_living-room-2.jpg',
          is_gallery_before_images: false,
        },
        {
          id: 312,
          url:
            'https://s3-ap-southeast-1.amazonaws.com/sghomeneeds-gallery//uploads/2018/08/18512_bomb-shelther-1.jpg',
          name: '/uploads/2018/08/18512_bomb-shelther-1.jpg',
          gallery: 27,
          listing: null,
          file_field:
            'https://sghomeneeds-gallery.s3.amazonaws.com/uploads/2018/08/18512_bomb-shelther-1.jpg',
          is_gallery_before_images: false,
        },
        {
          id: 316,
          url:
            'https://s3-ap-southeast-1.amazonaws.com/sghomeneeds-gallery//uploads/2018/08/18512_dining-2-1.jpg',
          name: '/uploads/2018/08/18512_dining-2-1.jpg',
          gallery: 27,
          listing: null,
          file_field:
            'https://sghomeneeds-gallery.s3.amazonaws.com/uploads/2018/08/18512_dining-2-1.jpg',
          is_gallery_before_images: false,
        },
        {
          id: 313,
          url:
            'https://s3-ap-southeast-1.amazonaws.com/sghomeneeds-gallery//uploads/2018/08/18512_bomb-shelther-2.jpg',
          name: '/uploads/2018/08/18512_bomb-shelther-2.jpg',
          gallery: 27,
          listing: null,
          file_field:
            'https://sghomeneeds-gallery.s3.amazonaws.com/uploads/2018/08/18512_bomb-shelther-2.jpg',
          is_gallery_before_images: false,
        },
        {
          id: 322,
          url:
            'https://s3-ap-southeast-1.amazonaws.com/sghomeneeds-gallery//uploads/2018/08/18512_patio-1.jpg',
          name: '/uploads/2018/08/18512_patio-1.jpg',
          gallery: 27,
          listing: null,
          file_field:
            'https://sghomeneeds-gallery.s3.amazonaws.com/uploads/2018/08/18512_patio-1.jpg',
          is_gallery_before_images: false,
        },
        {
          id: 317,
          url:
            'https://s3-ap-southeast-1.amazonaws.com/sghomeneeds-gallery//uploads/2018/08/18512_kitchen-1-1.jpg',
          name: '/uploads/2018/08/18512_kitchen-1-1.jpg',
          gallery: 27,
          listing: null,
          file_field:
            'https://sghomeneeds-gallery.s3.amazonaws.com/uploads/2018/08/18512_kitchen-1-1.jpg',
          is_gallery_before_images: false,
        },
        {
          id: 320,
          url:
            'https://s3-ap-southeast-1.amazonaws.com/sghomeneeds-gallery//uploads/2018/08/18512_living-room-3.jpg',
          name: '/uploads/2018/08/18512_living-room-3.jpg',
          gallery: 27,
          listing: null,
          file_field:
            'https://sghomeneeds-gallery.s3.amazonaws.com/uploads/2018/08/18512_living-room-3.jpg',
          is_gallery_before_images: false,
        },
        {
          id: 318,
          url:
            'https://s3-ap-southeast-1.amazonaws.com/sghomeneeds-gallery//uploads/2018/08/18512_living-room-1.jpg',
          name: '/uploads/2018/08/18512_living-room-1.jpg',
          gallery: 27,
          listing: null,
          file_field:
            'https://sghomeneeds-gallery.s3.amazonaws.com/uploads/2018/08/18512_living-room-1.jpg',
          is_gallery_before_images: false,
        },
        {
          id: 321,
          url:
            'https://s3-ap-southeast-1.amazonaws.com/sghomeneeds-gallery//uploads/2018/08/18512_pathway-to-yard.jpg',
          name: '/uploads/2018/08/18512_pathway-to-yard.jpg',
          gallery: 27,
          listing: null,
          file_field:
            'https://sghomeneeds-gallery.s3.amazonaws.com/uploads/2018/08/18512_pathway-to-yard.jpg',
          is_gallery_before_images: false,
        },
        {
          id: 324,
          url:
            'https://s3-ap-southeast-1.amazonaws.com/sghomeneeds-gallery//uploads/2018/08/18512_patio-3.jpg',
          name: '/uploads/2018/08/18512_patio-3.jpg',
          gallery: 27,
          listing: null,
          file_field:
            'https://sghomeneeds-gallery.s3.amazonaws.com/uploads/2018/08/18512_patio-3.jpg',
          is_gallery_before_images: false,
        },
        {
          id: 323,
          url:
            'https://s3-ap-southeast-1.amazonaws.com/sghomeneeds-gallery//uploads/2018/08/18512_patio-2.jpg',
          name: '/uploads/2018/08/18512_patio-2.jpg',
          gallery: 27,
          listing: null,
          file_field:
            'https://sghomeneeds-gallery.s3.amazonaws.com/uploads/2018/08/18512_patio-2.jpg',
          is_gallery_before_images: false,
        },
        {
          id: 326,
          url:
            'https://s3-ap-southeast-1.amazonaws.com/sghomeneeds-gallery//uploads/2018/08/18512_shoe-cabinet-door.jpg',
          name: '/uploads/2018/08/18512_shoe-cabinet-door.jpg',
          gallery: 27,
          listing: null,
          file_field:
            'https://sghomeneeds-gallery.s3.amazonaws.com/uploads/2018/08/18512_shoe-cabinet-door.jpg',
          is_gallery_before_images: false,
        },
        {
          id: 327,
          url:
            'https://s3-ap-southeast-1.amazonaws.com/sghomeneeds-gallery//uploads/2018/08/18512_shoe-cabinet.jpg',
          name: '/uploads/2018/08/18512_shoe-cabinet.jpg',
          gallery: 27,
          listing: null,
          file_field:
            'https://sghomeneeds-gallery.s3.amazonaws.com/uploads/2018/08/18512_shoe-cabinet.jpg',
          is_gallery_before_images: false,
        },
        {
          id: 328,
          url:
            'https://s3-ap-southeast-1.amazonaws.com/sghomeneeds-gallery//uploads/2018/08/18512_toilet.jpg',
          name: '/uploads/2018/08/18512_toilet.jpg',
          gallery: 27,
          listing: null,
          file_field:
            'https://sghomeneeds-gallery.s3.amazonaws.com/uploads/2018/08/18512_toilet.jpg',
          is_gallery_before_images: false,
        },
        {
          id: 329,
          url:
            'https://s3-ap-southeast-1.amazonaws.com/sghomeneeds-gallery//uploads/2018/08/18512_yard.jpg',
          name: '/uploads/2018/08/18512_yard.jpg',
          gallery: 27,
          listing: null,
          file_field:
            'https://sghomeneeds-gallery.s3.amazonaws.com/uploads/2018/08/18512_yard.jpg',
          is_gallery_before_images: false,
        },
      ],
      about_rich_text:
        'This is a home remodelling project is completed by Lux Design.\n\nLux Design Pte Ltd was started with the foremost priority to build our customer dream house. Every customer’s needs and concerns form our core responsibility.\n\nEvery project we seek to translate customer’s dream living space into one that is rich in design, functionality and achieving it’s unique luxury characteristic. We have our own carpentry workshop. With it, we can provide more personalized services and better quality assurance.',
    },
    {
      id: 28,
      slug: '50-marine-parade-road-28',
      listing: null,
      wp_post_id: 18514,
      wp_post_title: '50 Marine Parade Road',
      wp_author_id: 1,
      wp_post_desc: '50 Marine Parade Road,interior design',
      address: '50 Marine Parade Road',
      postal_code: '449307',
      city: 'Singapore',
      country: 'Singapore',
      latitude: '1.299681',
      longitude: '103.901892',
      gd_place_id: 7832,
      property_type: 'Condo',
      design_style: 'Retro',
      estimated_project_cost: 'S$40000 to S$60000',
      year: 2015,
      files: [
        {
          id: 330,
          url:
            'https://s3-ap-southeast-1.amazonaws.com/sghomeneeds-gallery//uploads/2018/08/18514_Balcony-1.jpg',
          name: '/uploads/2018/08/18514_Balcony-1.jpg',
          gallery: 28,
          listing: null,
          file_field:
            'https://sghomeneeds-gallery.s3.amazonaws.com/uploads/2018/08/18514_Balcony-1.jpg',
          is_gallery_before_images: false,
        },
        {
          id: 331,
          url:
            'https://s3-ap-southeast-1.amazonaws.com/sghomeneeds-gallery//uploads/2018/08/18514_Balcony-2.jpg',
          name: '/uploads/2018/08/18514_Balcony-2.jpg',
          gallery: 28,
          listing: null,
          file_field:
            'https://sghomeneeds-gallery.s3.amazonaws.com/uploads/2018/08/18514_Balcony-2.jpg',
          is_gallery_before_images: false,
        },
        {
          id: 332,
          url:
            'https://s3-ap-southeast-1.amazonaws.com/sghomeneeds-gallery//uploads/2018/08/18514_Bedroom.jpg',
          name: '/uploads/2018/08/18514_Bedroom.jpg',
          gallery: 28,
          listing: null,
          file_field:
            'https://sghomeneeds-gallery.s3.amazonaws.com/uploads/2018/08/18514_Bedroom.jpg',
          is_gallery_before_images: false,
        },
        {
          id: 333,
          url:
            'https://s3-ap-southeast-1.amazonaws.com/sghomeneeds-gallery//uploads/2018/08/18514_Dining.jpg',
          name: '/uploads/2018/08/18514_Dining.jpg',
          gallery: 28,
          listing: null,
          file_field:
            'https://sghomeneeds-gallery.s3.amazonaws.com/uploads/2018/08/18514_Dining.jpg',
          is_gallery_before_images: false,
        },
        {
          id: 334,
          url:
            'https://s3-ap-southeast-1.amazonaws.com/sghomeneeds-gallery//uploads/2018/08/18514_Living-Room-1.jpg',
          name: '/uploads/2018/08/18514_Living-Room-1.jpg',
          gallery: 28,
          listing: null,
          file_field:
            'https://sghomeneeds-gallery.s3.amazonaws.com/uploads/2018/08/18514_Living-Room-1.jpg',
          is_gallery_before_images: false,
        },
        {
          id: 335,
          url:
            'https://s3-ap-southeast-1.amazonaws.com/sghomeneeds-gallery//uploads/2018/08/18514_Living-Room-2.jpg',
          name: '/uploads/2018/08/18514_Living-Room-2.jpg',
          gallery: 28,
          listing: null,
          file_field:
            'https://sghomeneeds-gallery.s3.amazonaws.com/uploads/2018/08/18514_Living-Room-2.jpg',
          is_gallery_before_images: false,
        },
        {
          id: 336,
          url:
            'https://s3-ap-southeast-1.amazonaws.com/sghomeneeds-gallery//uploads/2018/08/18514_Living-Room-3.jpg',
          name: '/uploads/2018/08/18514_Living-Room-3.jpg',
          gallery: 28,
          listing: null,
          file_field:
            'https://sghomeneeds-gallery.s3.amazonaws.com/uploads/2018/08/18514_Living-Room-3.jpg',
          is_gallery_before_images: false,
        },
        {
          id: 337,
          url:
            'https://s3-ap-southeast-1.amazonaws.com/sghomeneeds-gallery//uploads/2018/08/18514_Living-Room-4.jpg',
          name: '/uploads/2018/08/18514_Living-Room-4.jpg',
          gallery: 28,
          listing: null,
          file_field:
            'https://sghomeneeds-gallery.s3.amazonaws.com/uploads/2018/08/18514_Living-Room-4.jpg',
          is_gallery_before_images: false,
        },
        {
          id: 338,
          url:
            'https://s3-ap-southeast-1.amazonaws.com/sghomeneeds-gallery//uploads/2018/08/18514_Walk-in-Wardrobe-1.jpg',
          name: '/uploads/2018/08/18514_Walk-in-Wardrobe-1.jpg',
          gallery: 28,
          listing: null,
          file_field:
            'https://sghomeneeds-gallery.s3.amazonaws.com/uploads/2018/08/18514_Walk-in-Wardrobe-1.jpg',
          is_gallery_before_images: false,
        },
        {
          id: 339,
          url:
            'https://s3-ap-southeast-1.amazonaws.com/sghomeneeds-gallery//uploads/2018/08/18514_Walk-in-Wardrobe-2.jpg',
          name: '/uploads/2018/08/18514_Walk-in-Wardrobe-2.jpg',
          gallery: 28,
          listing: null,
          file_field:
            'https://sghomeneeds-gallery.s3.amazonaws.com/uploads/2018/08/18514_Walk-in-Wardrobe-2.jpg',
          is_gallery_before_images: false,
        },
      ],
      about_rich_text:
        '50 Marine Parade Road - a home remodelling project completed by Lux Design.\n\nLux Design Pte Ltd was started with the foremost priority to build our customer dream house. Every customer’s needs and concerns form our core responsibility.\n\nEvery project we seek to translate customer’s dream living space into one that is rich in design, functionality and achieving it’s unique luxury characteristic. We have our own carpentry workshop. With it, we can provide more personalized services and better quality assurance.',
    },
  ],
};

export const reviews = {
  count: 6,
  next: null,
  previous: null,
  results: [
    {
      id: 6,
      user: null,
      wp_user_id: 0,
      wp_comment_id: 3122,
      wp_comment_post_id: 18924,
      date: '2018-11-03T19:58:58Z',
      is_approved: true,
      commenter_name: 'Wong',
      commenter_email: 'Ahwong279@gmail.com',
      listing_name: 'Rhs Movers',
      listing: 1866,
      rating: 5,
      rating_category: null,
      comment: 'Very well done!',
      created_at: '2018-12-26T19:23:31.119648Z',
      category_name: 'Local Moving',
    },
    {
      id: 458,
      user: 107,
      wp_user_id: 387,
      wp_comment_id: 1999,
      wp_comment_post_id: 18348,
      date: '2018-07-29T09:59:37Z',
      is_approved: true,
      commenter_name: 'Customer Review',
      commenter_email: 'companyelon@gmail.com',
      listing_name: 'WINUS Blinds',
      listing: 1782,
      rating: 5,
      rating_category: null,
      comment:
        'Great service and attention rendered by staff Jia Ling.\nThey have a wide range of colors and products with reasonable price. especially combi blinds. I am satisfied with the product, good quality!\n\n\n\nEve Chong\n\nGoogle',
      created_at: '2018-12-26T19:23:37.064061Z',
      category_name: 'Window Coverings or Curtains Install',
    },
    {
      id: 7,
      user: null,
      wp_user_id: 0,
      wp_comment_id: 3100,
      wp_comment_post_id: 18472,
      date: '2018-10-29T14:17:34Z',
      is_approved: true,
      commenter_name: 'Shawn Lee',
      commenter_email: 'Shawnlee89@gmail.com',
      listing_name: 'I.J Home Maintenance & Services',
      listing: 1827,
      rating: 5,
      rating_category: null,
      comment:
        'No. 1 home maintenance company in singapore. Excellent service and provide good quality workmanship!',
      created_at: '2018-12-26T19:23:31.124552Z',
      category_name: 'Shower or Bathtub Repair',
    },
    {
      id: 8,
      user: null,
      wp_user_id: 0,
      wp_comment_id: 3099,
      wp_comment_post_id: 8766,
      date: '2018-10-29T11:15:33Z',
      is_approved: true,
      commenter_name: 'Fay Sim',
      commenter_email: 'Faysim_0308@gmail.com',
      listing_name: 'Cold Engine',
      listing: 1025,
      rating: 5,
      rating_category: null,
      comment:
        'Cold Engine came to my house today for chemical overhaul 3 air-conditioning. Professional and well explained. Will introduce to friends.\n\nFay Sim',
      created_at: '2018-12-26T19:23:31.129766Z',
      category_name: 'Aircon Installation or Replacement',
    },
    {
      id: 10,
      user: null,
      wp_user_id: 0,
      wp_comment_id: 2797,
      wp_comment_post_id: 8716,
      date: '2018-10-21T12:31:31Z',
      is_approved: true,
      commenter_name: 'Dr kosik',
      commenter_email: 'darwinkosik84@gmail.com',
      listing_name: 'Tech-V Air Cool Engineering',
      listing: 991,
      rating: 4,
      rating_category: null,
      comment:
        'Current have used them for the past 2 years, so far still ok even though sometimes the slots I wanted are taken. \n\nWill continue to renew contract if prices are good for me.',
      created_at: '2018-12-26T19:23:31.139420Z',
      category_name: 'Aircon Installation or Replacement',
    },
    {
      id: 11,
      user: null,
      wp_user_id: 0,
      wp_comment_id: 2572,
      wp_comment_post_id: 18796,
      date: '2018-10-15T13:16:49Z',
      is_approved: true,
      commenter_name: 'Sarina',
      commenter_email: 'rossar3111@yahoo.com',
      listing_name: 'Raffles Employment Services',
      listing: 1856,
      rating: 5,
      rating_category: null,
      comment:
        'I have always been taking my helpers from this Agency since they opened and it was a right choice made.  Pam is always very patient and she makes it a point to listen to my issues that i face with my helpers.  Customer service is good , they are efficient, and  their customers are based more on referrals.  my friends  whom i have referred to Raffles are also happy in their services .',
      created_at: '2018-12-26T19:23:31.144180Z',
      category_name: 'Maid Service',
    },
  ],
};

export const aboutUs = {
  count: 4,
  next: null,
  previous: null,
  results: [
    {
      id: 1,
      comment:
        'Looking for a handyman, mover or renovation, but don’t know where to find a reliable company? SGHomeneeds is a home improvement platform in Singapore for homeowners to find and engage reliable services, get home ideas and get matched with local home services companies.',
    },
    {
      id: 2,
      comment:
        'With hundreds of home improvement companies in the market to choose from, we filter thousands of companies to bring you only the best reviewed, reliable companies that suits your budget and needs.',
    },
    {
      id: 3,
      comment:
        'Let us help and connect you with home improvement companies based on budget and style requirements for free. Ask for home improvement quotes or advice from our list of professionals today.',
    },
    {
      id: 4,
      comment:
        'Browse through our gallery or cost guide for more home ideas and budgeting tips, everything for free, all under one roof. Let SGHomeNeeds be your trusted home partner in Singapore today.',
    },
      
  ],
}
