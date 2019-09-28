/* eslint-disable react/no-did-mount-set-state */
/* eslint-disable array-callback-return */
/* eslint-disable no-unused-expressions */
/* eslint-disable prettier/prettier */
import React from 'react';
import v4 from 'uuid/v4';
import PropTypes from 'prop-types';
import { Grid, Icon, Modal, Dropdown } from 'semantic-ui-react';
import renderHTML from 'react-render-html';
import moment from 'moment'
import CardContent from '../../components/Base/Card/CardContent';
import RatingStar from '../../components/Base/RatingStar';
import TwoColumn from '../../components/Section/TwoColumn';
import Label from '../../components/Base/Label';
import Card from '../../components/Base/Card/Card';
import './styles.css';
import FavoriteButton from '../../components/CustomButton/FavoriteButton';
import UserIcon from '../../images/user-icon.png';
import LinkWrapper from '../../components/Base/Link';
import { CONSUMERS, FORM_SUBMISSIONS, FEATURE_SWITCHES } from '../../actions/restApi';
import OneColumn from '../../components/Section/OneColumn';
import ImageWrapper from '../../components/Base/Image';
import ButtonWrapper from '../../components/Base/Button';
import ChatNowButton from '../../components/CustomButton/ChatNowButton';
import Section from '../../components/Section/Section';
import IconWrapper from '../../components/Base/Icon';
import Form from '../../components/Form/Form';
import { SERVICES_VIEW } from '../../reducers/services';
// import { Api, API_URL, FORMIO_URL } from '../../utils/api';
import { Api, API_URL, FORMIO_URL } from '../../utils/api';
import { getFeatureIsOn } from '../../utils/featureUtils';
/* eslint-disable react/prefer-stateless-function */
export default class ProfessionalsInfoCard extends React.PureComponent {
  static propTypes = {
    professional: PropTypes.object,
    view: PropTypes.string,
    goTo: PropTypes.func,
    categories: PropTypes.object,
    user: PropTypes.object,
    dispatchAction: PropTypes.func,
    dispatchServicesAction: PropTypes.func,
    isOnline: PropTypes.bool,
  };
  constructor(props) {
    super(props)
    const { professional } = props
    const phoneNumber = professional.phone ? professional.phone : ''
    this.state = {
      showCategoryModal: false,
      categorySlug: '',
      showCategoryForm: false,
      phoneClickRecord: {},
      phone: phoneNumber,
    }
  }
  showCategoryModal = () => {
    this.setState({
      showCategoryModal: true,
    })
  }
  closeCategoryModal = () => {
    this.setState({
      showCategoryModal: false,
      categorySlug: null,
      showCategoryForm: false,
    })
  }

  handleOnCategoryDropdownChange = (e, data) => {
    const categoryName = data.value
    let categorySlug = ''
    data.options.map(category => {
      if(category.value === categoryName){
        categorySlug = category.slug
      }
    })
    this.setState({
      showCategoryForm: true,
      categorySlug,
    })
  }
  recordPhoneClick = () => {
    const { professional, user } = this.props
    const {phone} = this.state
    if(user.isLoggedIn && user.user !== null) {
      if(phone.includes('Show')) {
        this.setState({
          phone: professional.phone && professional.phone,
        })
      }
      else {
        const userData = {
          id: user.user.id,
          email: user.user.email,
          name: user.user.long_first_name,
        } 
        const date = moment(new Date()).format('MM-DD-YYYY')
        const time = moment(new Date()).format('hh:mm:ss a')
        const phoneClickArr = {
          id: professional.id,
          user: userData, 
          date,
          time,
        }
        this.setState({
          phoneClickRecord: [...this.state.phoneClickRecord, phoneClickArr],
        },() => console.log('phoneClickRecord',this.state.phoneClickRecord))
        // const url = `${API_URL}/api/listings` 
        // () =>  console.log('this.state.phoneClickRecord',this.state.phoneClickRecord),
        // Api(url, { method: 'POST', data: phoneClickArr }).then(response => {
        //   // this.setState({ apiData: response.data });
        //   console.log('response',response)
        // }) 
      }
    }
    else {
      this.props.goTo({
        path: `/login`,
        state: `professionals/${professional.slug}`,
      });
    }
  }
  handleSubmit = () => {
    const { user } = this.props;
    const { categorySlug } = this.state;
    localStorage.setItem(
      'form',
      JSON.stringify({
        category: categorySlug,
        form_data: this.form.form.formio.data,
      }),
    );
    const isMerchant = user.LOAD_AUTH.data.merchantId !== 0 && user.LOAD_AUTH.data.merchantId !== null && user.LOAD_AUTH.data.merchantId !== -1;
    if (isMerchant) {
      // eslint-disable-next-line no-alert
      window.alert('Professionals cannot submit the form');
      return;
    }
    this.props.dispatchServicesAction({
      type: FORM_SUBMISSIONS.POST.REQUESTED,
      payload: {
        data: {
          form_data: this.form.form.formio.data,
          category_slug: categorySlug,
          email: this.form.form.formio.data.Email,
        },
      },
    }); 
  };
  // eslint-disable-next-line no-unused-vars
  componentDidUpdate(prevProps, prevState, ss) {
    if (
      prevProps[SERVICES_VIEW][FORM_SUBMISSIONS.MODEL].POST.id !== this.props[SERVICES_VIEW][FORM_SUBMISSIONS.MODEL].POST.id &&
      this.props[SERVICES_VIEW][FORM_SUBMISSIONS.MODEL].POST.id !== undefined
    ) {
      const { user } = this.props;
      // console.log(' user',user)
    
      const featureList = this.props[FEATURE_SWITCHES.MODEL][FEATURE_SWITCHES.MODEL].LIST;
      const featureHasProjects = getFeatureIsOn(featureList, 'has_projects', false);

      if (user.isLoggedIn) {
        if (
          user.LOAD_AUTH.data.consumerId !== null &&
          user.LOAD_AUTH.data.consumerId !== -1
        ) {
          if (featureHasProjects) {
            this.props.goTo({ path: '/dashboard/projects/create' });
          } else {
            window.alert('Your form has been submitted.');
            this.props.goTo({ path: '/dashboard' });
          }
        }
      } else {
        const email = this.form.form.formio.data.Email;
        Api(`${API_URL}/api/users/exists_with_email?email=${email}`, {
          method: 'GET',
        }).then(response => {
          // eslint-disable-next-line no-alert
          let message = 'Your form has been submitted.';
          let redirectUrl = '/dashboard';
          if (featureHasProjects) {
            message = `${message} To choose your desired professional(s), please log in or register immediately after.`
            redirectUrl = '/dashboard/projects/create';
          }
          window.alert(message);
          // Check if email is associated with a user
          const isUser = response.data.exists;
          if (isUser) {
            // Go to Login Page, with redirect to /dashboard/projects/create
            this.props.goTo({ path: `/login?redirect=${redirectUrl}` });
          } else {
            // Go to SignUp Page, with redirect to /dashboard/projects/create
            this.props.goTo({ path: `/register?redirect=${redirectUrl}` });
          }
        });
      }
    }
  }
  renderCategoryModal(showModal) {
    const { professional, user } = this.props;
    const { categorySlug, showCategoryForm } = this.state;
    const categoryOptions = []
    this.props.categories &&
      this.props.categories.results &&
      professional.categories &&
      professional.categories.length > 0 &&
      professional.categories.map(c => {
        const category = this.getCategory(c)        
        category && categoryOptions.push({
          key: category.slug,
          value: category.name,
          text: category.name,
          slug: category.slug,
        })
      }
      )
    return (
      <Section className="services-child">
        <div
          className="banner_child_services"
          style={{
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
            flexDirection: 'column',
          }}
        >
          {showModal && 
            <Grid style={{margin: '5px 0px 0px 5px'}} columns={2}>
              <Grid.Row>
                <Grid.Column mobile={8}>
                  <h3>Select Category</h3>
                </Grid.Column>
                <Grid.Column mobile={16}>
                  <Dropdown style={{minWidth: '20rem'}} placeholder='Select Category' search selection options={categoryOptions} onChange={this.handleOnCategoryDropdownChange}/>
                </Grid.Column>
              </Grid.Row>
            </Grid>
          }
          <Form
            url={`${FORMIO_URL}/${categorySlug}`}
            onSubmit={this.handleSubmit}
            ref={r => {
              this.form = r;
            }}
            showForm={showCategoryForm}
            email={user.user.username}
            address={user.user.home_address}
            phone={user.user.phone_number}
            name={user.user.long_first_name}
          />
        </div>
      </Section>
    )
  }

  componentDidMount() {
    const { professional } = this.props;
    const phone = professional.phone && professional.phone.split(' ')
    phone[1] = ' Show '
    const halfPhone = `${phone[0]} ${phone[1]}`
    this.setState({
      phone: halfPhone,
    })
  }
  render() {
    const { professional, view, isOnline, user } = this.props;
    const attributes = [
      professional.phone && {
        attribute: 'Phone Number',
        // value: professional.phone && professional.phone.split(',').map(phone => <a
        //   key={v4()}
        //   href={`tel:${phone}`}>{phone}</a>),
        value: <button
          key={v4()}
          className="phone-button"
          onClick={this.recordPhoneClick}>{this.state.phone}</button>,
        icon: 'phone',
        key: '2',
      },
      {
        attribute: 'Address',
        value: professional.postal_code ? ` ${professional.address} Singapore ${professional.postal_code} ` : professional.address,
        icon: 'map marker alternate',
        key: '3',
      },
      {
        attribute: 'Opening Hours',
        value: professional.timing,
        icon: 'clock',
        key: '4',
      },
      {
        attribute: 'Website',
        value: professional.website && <a href={`${professional.website}`}>{professional.website}</a>,
        icon: 'globe',
        key: '5',
      },
      // {
      //   attribute: 'Postal Code',
      //   value: professional.postal_code ? ` ${professional.address} Singapore ${professional.postal_code} ` : professional.address,
      //   icon: 'envelope',
      //   key: '6',
      // },
      /* {
        attribute: 'Email',
        value: professional.email && <a href={`mailto:${professional.email}`}>{professional.email}</a>,
        icon: 'envelope outline',
        key: '6',
      }, */
    ];

    let numChatColumn = 2;
    if (view === 'professionals') {
      if (!professional.chat_activated) {
        numChatColumn = 1;
      } else if (!isOnline || !this.props.user.LOAD_AUTH.data.consumerId) {
        numChatColumn = 1;
      }
    }
    return (
      <Card>
        {<Modal closeOnDimmerClick={false} open={this.state.showCategoryModal} onClose={this.closeCategoryModal} closeIcon>
          <div>
            {this.renderCategoryModal(true)}
          </div>
          {/* <Modal.Actions actions={[{key: 'ok', content: 'Ok', positive: true}, {key: 'cancel', content: 'Cancel', positive: false}]}/> */}
        </Modal>}
        <CardContent>
          <TwoColumn stackable={false}>
            <Grid.Column>
              {professional.facebook && professional.facebook !== "" && (
                <a href={professional.facebook} target="_blank">
                  <button
                    className="ui circular facebook icon button"
                    style={{ float: 'left', textAlign: 'center', padding: "12px 7px 5px 7px", borderRadius: "50%" }}
                  >
                    <Icon name="facebook f" style={{ fontSize: '22px', padding: 0, margin: 0, color: 'white' }} />
                  </button>
                </a>
              )}
              {professional.linkedin && professional.linkedin !== "" && (
                <a href={professional.linkedin} target="_blank">
                  <button
                    className="ui circular linkedin icon button"
                    style={{ float: 'left', padding: "10px 7px 6px 7px", borderRadius: "50%" }}
                  >
                    <Icon name="linkedin in" style={{ fontSize: '22px', padding: 0, margin: 0, color: 'white' }} />
                  </button>
                </a>
              )}
              {professional.instagram && professional.instagram !== "" && (
                <a href={professional.instagram} target="_blank">
                  <button
                    className="ui circular instagram icon button"
                    style={{ float: 'left', backgroundColor: "saddlebrown", padding: "10px 7px 5px 7px", borderRadius: "50%" }}
                  >
                    <Icon name="instagram" style={{ fontSize: '22px', padding: 0, margin: 0, color: 'white' }} />
                  </button>
                </a>
              )}
              {professional.twitter && professional.twitter !== "" && (
                <a href={professional.twitter} target="_blank">
                  <button
                    className="ui circular twitter icon button"
                    style={{ float: 'left', backgroundColor: "#1DA1F2", padding: "10px 7px 5px 7px", borderRadius: "50%" }}
                  >
                    <Icon name="twitter" style={{ fontSize: '22px', padding: 0, margin: 0, color: 'white' }} />
                  </button>
                </a>
              )}
            </Grid.Column>
            <Grid.Column>
              {this.props.user.isLoggedIn && this.props.user.LOAD_AUTH.data.consumerId !== null && (
                <FavoriteButton
                  buttonProps={{
                    style: {
                      float: 'right',
                    },
                    onClick: () => {
                      this.props.dispatchAction({
                        type: CONSUMERS.POST.REQUESTED,
                        payload: {
                          url: 'favourite',
                          id: this.props.user.LOAD_AUTH.data.consumerId,
                          data: {
                            listing_slug: professional.slug,
                          },
                        },
                      });
                    },
                  }}
                  iconProps={{}}
                  isFavourite={this.props.user[CONSUMERS.MODEL].favourite_listings && this.props.user[CONSUMERS.MODEL].favourite_listings.indexOf(professional.slug) !== -1}
                />
              )}
            </Grid.Column>
          </TwoColumn>
          {professional.logo ? (
            <OneColumn>
              <Grid.Column>
                <ImageWrapper src={professional.logo} width="33%"   alt={professional.name} title={professional.name}/>
              </Grid.Column>
            </OneColumn>
          ) : null}
          <OneColumn>
            <h2 style={{ fontWeight: 'normal', fontSize: '18px' }}>
              {professional.name}
            </h2>
            <div className="inline">
              <h3
                style={{
                  fontWeight: 'normal',
                  fontSize: '12px',
                  color: 'rgb(75, 75, 75)',
                }}
              >
                Review:
              </h3>
            </div>
            <div className="inline">
              {((professional.reviews && professional.reviews.length === 0) ||
                professional.reviews === undefined) && (
                <RatingStar
                  size="huge"
                  maxRating={5}
                  defaultRating={0}
                  disabled
                />    
              )}
              {professional.reviews &&
                professional.reviews.length > 0 && (
                <RatingStar
                  size="huge"
                  maxRating={5}
                  defaultRating={
                    professional.reviews
                      .map(r => r.rating)
                      .reduce((a, b) => a + b, 0) /
                    professional.reviews.length
                  }
                  disabled
                />    
              )}
            </div>
            <div className="inline">
              <h3
                style={{
                  fontWeight: 'normal',
                  color: 'gray',
                  fontSize: '12px',
                }}
              >
                ({professional.reviews ? professional.reviews.filter(r => r.is_approved).length : 0})
              </h3>
            </div>
          </OneColumn>
          <Grid
            stackable
            columns={numChatColumn}
          >
            <Grid.Row>
              {view === 'professionals' && professional.chat_activated && isOnline && this.props.user.LOAD_AUTH.data.consumerId > 0 && (
                <Grid.Column>
                  <div id="online-wrapper">
                    <i className="icon small circle" />
                    <h3 id="online">Online</h3>
                  </div>
                </Grid.Column>
              )}
              {view === 'gallery' && (
                <Grid.Column>
                  <div id="view-profile-wrapper">
                    <ButtonWrapper
                      design="outline"
                      onClick={() => {
                        this.props.goTo({
                          path: `/professionals/${professional.slug}`,
                        });
                      }}
                    >
                      <ImageWrapper src={UserIcon} height="14px" alt="User icon"  title="User icon" />
                      {' | '}View Profile
                    </ButtonWrapper>
                  </div>
                </Grid.Column>
              )}
              <Grid.Column>
                {(professional.chat_activated && user.user.consumer && user.user.consumer.length > 0 && user.user.merchant && user.user.merchant.length === 0) && (
                  <div id="chatnow-wrapper">
                    <ChatNowButton
                      buttonProps={{ className: 'category-button', style: { padding: '11px 0' } }}
                      // onClick={this.showCategoryModal}
                      onClick={() => {
                        this.props.goTo({path: encodeURI(`/dashboard/chat?listing=${professional.slug}`)});
                      }}
                    />
                  </div>
                )}
              </Grid.Column>
            </Grid.Row>
          </Grid>
        </CardContent>
        <CardContent className="services-content">
          <span>Services: </span>
          {this.props.categories &&
            this.props.categories.results &&
            professional.categories &&
            professional.categories.length > 0 &&
            professional.categories.map(c => {
              const category = this.getCategory(c)
              return (
                <div key={v4()} style={{ display: 'inline' }}>
                  {category && (
                    <LinkWrapper key={v4()} href={`/services/${category.slug}`}>
                      <Label color="rgb(225, 225, 225)">
                        {renderHTML(category.name)}
                      </Label>
                    </LinkWrapper>
                  )}
                </div>
              )
            }
            )}
        </CardContent>
        {attributes && attributes.filter(item => item.value).map(item => (
          <CardContent key={v4()}>
            <Section style={{ padding: '10px' }}>
              <TwoColumn stackable={false}>
                <Grid.Column
                  className="attribute-name"
                  width={8}
                  style={{ textAlign: 'left' }}
                >
                  <IconWrapper name={item.icon} /> <span>{item.attribute}</span>
                </Grid.Column>
                <Grid.Column
                  width={8}
                  style={{ textAlign: 'left', overflowWrap: 'break-word' }}
                >
                  <p style={{ fontWeight: 600 }}>{item.value}</p>
                </Grid.Column>
              </TwoColumn>
            </Section>
          </CardContent>
        ))}
      </Card>
    );
  }
  getCategory = categoryId => this.props.categories && this.props.categories.results && this.props.categories.results.filter(c => c.id === categoryId)[0]
}
