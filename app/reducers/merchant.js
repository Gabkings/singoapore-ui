import { fromJS } from 'immutable';
import { MERCHANTS } from '../actions/restApi';

// Initial routing state
const initialState = fromJS({
  merchants: {
    count: 2111,
    next: 'http://localhost:8000/api/merchants/?limit=10&offset=10',
    previous: null,
    results: [],
  },
  merchant: {
    id: 12007,
    wp_post_id: 7408,
    wp_user_id: 1,
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
});

/**
 * Merge route into the global application state
 */
export default function merchantReducer(state = initialState, action) {
  switch (action.type) {
    /* istanbul ignore next */
    case MERCHANTS.LIST.SUCCESS:
      return state.merge({
        merchants: action.payload,
      });
    case MERCHANTS.GET.SUCCESS:
      return state.merge({
        merchant: action.payload,
      });
    default:
      return state;
  }
}
