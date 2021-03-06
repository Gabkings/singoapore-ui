import { generateText } from '../../utils/loremIpsumGenerator';

export const gallery = {
  id: 3,
  listing: 25641,
  wp_post_id: null,
  wp_post_title: 'Test Gallery',
  wp_author_id: null,
  wp_post_desc: null,
  address: 'Bishan',
  postal_code: null,
  city: null,
  country: null,
  latitude: null,
  longitude: null,
  gd_place_id: null,
  property_type: 'Condo',
  design_style: 'Muji Style',
  estimated_project_cost: '$40,000',
  year: null,
  files: [
    {
      id: 919,
      url: null,
      name: 'home-project-1.jpg',
      gallery: 3,
      listing: null,
      file_field:
        'https://sghomeneeds-gallery.s3.amazonaws.com/home-project-1.jpg',
      is_gallery_before_images: true,
    },
    {
      id: 920,
      url: null,
      name: 'home-project-2.jpg',
      gallery: 3,
      listing: null,
      file_field:
        'https://sghomeneeds-gallery.s3.amazonaws.com/home-project-2.jpg',
      is_gallery_before_images: false,
    },
  ],
  about_rich_text: generateText(1000),
};
