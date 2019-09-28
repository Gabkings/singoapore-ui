import { generateText } from '../../utils/loremIpsumGenerator';

export const items = [
  {
    name: 'home',
    content: 'Home',
    active: false,
    key: 'home',
  },
  {
    name: 'profile',
    content: 'Profile',
    active: true,
    key: 'profile',
  },
];

export const profile = {
  imageSource: 'http://via.placeholder.com/100x100',
  fullName: 'Amir Ali',
  numReviews: 0,
  numProjects: 0,
  email: 'info@gmail.com',
  phoneNumber: '+123-456-7890',
};

export const listings = [
  {
    logoImage: 'http://via.placeholder.com/100x100',
    name: 'Name',
    description: generateText(100),
    images: [
      {
        imageSource: 'http://via.placeholder.com/100x100',
        name: 'Bellewaters',
      },
      {
        imageSource: 'http://via.placeholder.com/100x100',
        name: 'Bellewaters',
      },
      {
        imageSource: 'http://via.placeholder.com/100x100',
        name: 'Bellewaters',
      },
    ],
  },
  {
    logoImage: 'http://via.placeholder.com/100x100',
    name: 'Name',
    description: generateText(100),
    images: [
      {
        imageSource: 'http://via.placeholder.com/100x100',
        name: 'Bellewaters',
      },
      {
        imageSource: 'http://via.placeholder.com/100x100',
        name: 'Bellewaters',
      },
    ],
  },
];

export const reviews = [
  {
    id: 'reviews_1',
    companyName: 'Company Name',
    rating: 5,
    date: '7 feb 2018',
    text: generateText(100),
    status: 'Pending',
  },
  {
    id: 'reviews_2',
    companyName: 'Company Name',
    rating: 5,
    date: '7 feb 2018',
    text: generateText(100),
    status: 'Approved',
  },
  {
    id: 'reviews_3',
    companyName: 'Company Name',
    rating: 5,
    date: '7 feb 2018',
    text: generateText(100),
    status: 'Approved',
  },
];

export const defaultListings = {
  count: 2112,
  next: 'http://localhost:8000/api/listings/?limit=10&offset=10',
  previous: null,
  results: [
    {
      id: 323,
      url:
        'http://localhost:8000/api/listings/0932-design-consultants-pte-ltd-323/',
      merchant: 1,
      wp_post_id: 7408,
      name: '0932 Design Consultants Pte Ltd',
      slug: '0932-design-consultants-pte-ltd-323',
      cateogries_text:
        'Architects &amp; Building Designers,Home Remodeling,Interior Designers',
      default_categories: 'Home Remodeling',
      tags: '',
      address: '388 Dunearn Road',
      city: 'Singapore',
      region: 'Singapore',
      country: 'Singapore',
      latitude: '1.324613',
      longitude: '103.811903',
      postal_code: '289600',
      timing: '',
      phone: '-',
      email: 'info@0932.am',
      website: 'http://www.0932design.sg',
      facebook: '',
      twitter: '',
      video: null,
      logo: null,
      home_match_badge: false,
      best_pros_badge: false,
      is_verified: false,
      about_rich_text:
        'Currently based in Singapore, 0932 Design Consultants is an architectural and interior design practice formally founded in twenty eleven.\n\nHere at 0932, the company founders Mr Low Chee Khiang and Mr Roystern Goh continue to personally helm each design project, tailoring every experience into unique spaces for each client.',
      special_offers: '',
      images: [
        {
          key: 1,
          imageSource:
            'https://cdn-images-1.medium.com/max/1600/0*16jXPVaLi2nBkz6m.jpg',
          name: 'Nice house',
        },
        {
          key: 2,
          imageSource:
            'https://cdn-images-1.medium.com/max/1600/0*16jXPVaLi2nBkz6m.jpg',
          name: 'Nice house',
        },
        {
          key: 3,
          imageSource:
            'https://cdn-images-1.medium.com/max/1600/0*16jXPVaLi2nBkz6m.jpg',
          name: 'Nice house',
        },
      ],
    },
    {
      id: 256,
      url: 'http://localhost:8000/api/listings/1-asia-manpower-services-256/',
      merchant: 81,
      wp_post_id: 6894,
      name: '1 Asia Manpower Services',
      slug: '1-asia-manpower-services-256',
      cateogries_text:
        'Full Time Maid,Maid Service,Maid Service for the Young,Maid Services for Seniors,Senior Caretaker,Young Caretaker',
      default_categories: 'Maid Service',
      tags: '',
      address: '51 Bukit Batok Crescent #07-32 Unity Centre',
      city: 'Singapore',
      region: 'Singapore',
      country: 'Singapore',
      latitude: '1.337794',
      longitude: '103.757088',
      postal_code: '',
      timing: '',
      phone: '9191 5229',
      email: 'emenching@gmail.com',
      website: 'http://www.bestmaid.com.sg/listagency.asp?id=1720',
      facebook: '',
      twitter: '',
      video: null,
      logo:
        'https://sghomeneeds-gallery.s3.amazonaws.com/com/wp-content/uploads/2018/03/6894_Asia-manpower-logo.gif?AWSAccessKeyId=AKIAJ5YKHY5YSYT5ZZDQ&Signature=IrTfGehcC5ao5Yc9FM1H6%2FgwGZ4%3D&Expires=1541875219',
      home_match_badge: false,
      best_pros_badge: false,
      is_verified: false,
      about_rich_text:
        "1 Asia Manpower Services is an established MOM registered manpower resource organization based in Singapore. Through the years, we have been highly successful in providing Filipino maids, Indonesian maids, Myanmar maids, etc. We have many satisfied Employers as our customers.\n\nWe are a manpower sourcing &amp; supply firm in the Asia region, providing recruiting and staffing solution to various business across different industries and to the domestic sector. Comprise of 2 division: Corporate B2B &amp; Retail. 1 Asia Manpower Resources offers dedicated human resources services that include:\n<ul>\n \t<li>Domestic Workers placement</li>\n \t<li>Part time maid recruitment &amp; assignment</li>\n \t<li>Permanent / Contract placement</li>\n \t<li>Work pass application</li>\n \t<li>Executive job placement</li>\n \t<li>Supply of skill / semi skill / general workers</li>\n \t<li>Our strong source of domestic workers are from Indonesia, Philippines &amp; Myanmar. We carefully select and train our maid for competency &amp; quality to meet the Employers' demands.</li>\n</ul>\n1 Asia Manpower Services strives to provide fast, reliable and value added services to our clients while keeping the price low and economical.\n\nWe are highly inspired &amp; determined to provide quality services to every of our Customer, with a dedicated and sincere people oriented approach to make every job placement a satisfaction to all of our Clients.\n\nPlease feel free to call us or drop us your enquiry and we are glad to be of your assistance.\n<h3>Services provided by 1 Asia Manpower Services:</h3>\n<ul>\n \t<li>Job placement services for foreign maids</li>\n \t<li>Direct hire your own foreign maids</li>\n \t<li>Placement of transfer maids</li>\n \t<li>Training courses &amp; Workshops\n<ul>\n \t<li>Training Care of Babies</li>\n</ul>\n<ul>\n \t<li>Care of Elderly or Disabled Training</li>\n \t<li>General Orientation for Employment as a Maid in Singapore</li>\n \t<li>Training in Cooking</li>\n \t<li>Training Lesson in Spoken English</li>\n</ul>\n</li>\n \t<li>Home Leave Processing</li>\n \t<li>Application of work permits</li>\n \t<li>Renewal of passports and work permits</li>\n \t<li>Embassy endorsement</li>\n \t<li>Cancellation of work permits</li>\n \t<li>Booking and Purchasing of air tickets</li>\n \t<li>Purchasing of banker guarantee and insurance for maids</li>\n \t<li>Repatriation of maids</li>\n \t<li>Arrangement of medical check up for maids</li>\n \t<li>Other foreign worker related services</li>\n</ul>",
      special_offers: '',
      images: [
        {
          key: 1,
          imageSource:
            'https://cdn-images-1.medium.com/max/1600/0*16jXPVaLi2nBkz6m.jpg',
          name: 'Nice house',
        },
        {
          key: 2,
          imageSource:
            'https://cdn-images-1.medium.com/max/1600/0*16jXPVaLi2nBkz6m.jpg',
          name: 'Nice house',
        },
        {
          key: 3,
          imageSource:
            'https://cdn-images-1.medium.com/max/1600/0*16jXPVaLi2nBkz6m.jpg',
          name: 'Nice house',
        },
      ],
    },
  ],
};
