import { generateText } from '../../utils/loremIpsumGenerator';

export const items = [
  {
    name: 'home',
    content: 'Home',
    active: false,
    key: 'home',
  },
  {
    name: 'listing',
    content: 'Listing',
    active: true,
    key: 'listing',
  },
];
export const filters = [
  {
    name: 'Property Type',
    options: [
      {
        label: 'All',
      },
      {
        label: 'HDB',
      },
      {
        label: 'Condo',
      },
      {
        label: 'Landed',
      },
      {
        label: 'Commercial',
      },
    ],
  },
  {
    name: 'Style',
    options: [
      {
        label: 'All',
      },
    ],
  },
  {
    name: 'Room',
    options: [
      {
        label: 'All',
      },
    ],
  },
  {
    name: 'Others',
    options: [
      {
        label: 'All',
      },
    ],
  },
];

export const projects = [
  {
    name: 'Bellewaters',
    imageSource: 'http://via.placeholder.com/100x100',
    propertyType: 'Condo',
    cost: 'S$40,000',
  },
  {
    name: 'Bellewaters',
    imageSource: 'http://via.placeholder.com/100x100',
    propertyType: 'Condo',
    cost: 'S$40,000',
  },
  {
    name: 'Bellewaters',
    imageSource: 'http://via.placeholder.com/100x100',
    propertyType: 'Condo',
    cost: 'S$40,000',
  },
  {
    name: 'Bellewaters',
    imageSource: 'http://via.placeholder.com/100x100',
    propertyType: 'Condo',
    cost: 'S$40,000',
  },
  {
    name: 'Bellewaters',
    imageSource: 'http://via.placeholder.com/100x100',
    propertyType: 'Condo',
    cost: 'S$40,000',
  },
];

export const companies = [
  {
    key: '1',
    imageSource: 'http://via.placeholder.com/100x100',
    name: 'Name',
    about:
      'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut',
  },
  {
    key: '2',
    imageSource: 'http://via.placeholder.com/100x100',
    name: 'Name',
    about:
      'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut',
  },
  {
    key: '3',
    imageSource: 'http://via.placeholder.com/100x100',
    name: 'Name',
    about:
      'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut',
  },
  {
    key: '4',
    imageSource: 'http://via.placeholder.com/100x100',
    name: 'Name',
    about:
      'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut',
  },
  {
    key: '5',
    imageSource: 'http://via.placeholder.com/100x100',
    name: 'Name',
    about:
      'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut',
  },
];

export const desc = generateText(5000);

export const listings = {
  count: 2112,
  next: 'http://localhost:8000/api/listings/?limit=10&offset=10',
  previous: null,
  results: [],
};
