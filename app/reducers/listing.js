import { fromJS } from 'immutable';
import { LISTINGS } from '../actions/restApi';

// Initial routing state
const initialState = fromJS({
  listings: {
    count: 2111,
    next: 'http://localhost:8000/api/listings/?limit=10&offset=10',
    previous: null,
    results: [],
  },
  listing: {
    id: 12007,
    wp_post_id: 7408,
    user_id: null,
    name: '0932 Design Consultants Pte Ltd',
    slug: '0932-design-consultants-pte-ltd',
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
    video: '',
    logo: '',
    home_match_badge: false,
    best_pros_badge: false,
    is_verified: false,
    about_rich_text:
      'Currently based in Singapore, 0932 Design Consultants is an architectural and interior design practice formally founded in twenty eleven.\n\nHere at 0932, the company founders Mr Low Chee Khiang and Mr Roystern Goh continue to personally helm each design project, tailoring every experience into unique spaces for each client.',
    special_offers: '',
    created_at: '2018-09-30T08:51:40.314625Z',
  },
  action: null,
});

/**
 * Merge route into the global application state
 */
export default function listingReducer(state = initialState, action) {
  switch (action.type) {
    /* istanbul ignore next */
    case LISTINGS.LIST.SUCCESS:
      return state.merge({
        listings: action.payload,
        action: action.type,
      });
    case LISTINGS.GET.SUCCESS:
      return state.merge({
        listing: action.payload,
        action: action.type,
      });
    case LISTINGS.POST.SUCCESS:
      return state.merge({
        listing: action.payload,
        action: action.type,
      });
    default:
      return state;
  }
}
