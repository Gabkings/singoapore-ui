/* eslint-disable prettier/prettier, no-alert */
import React from 'react';
import PropTypes from 'prop-types';
import queryString from 'query-string';
import renderHTML from 'react-render-html';
import { Grid, Loader, Modal } from 'semantic-ui-react';
import Section from '../../components/Section/Section';
import Subsection from '../../components/Section/Subsection';
import Form from '../../components/Form/Form';
import CompanyList from '../../components/CompanyList';
import CustomPagination from '../../components/CustomPagination';
import './styles.css';
import { Api, API_URL, FORMIO_URL } from '../../utils/api';
import PaperWrapper from '../../components/Base/Paper';
import ButtonWrapper from '../../components/Base/Button';
import TwoColumn from '../../components/Section/TwoColumn';
import OneColumn from '../../components/Section/OneColumn';
import ConnectProfessionalsSubsection from './ConnectProfessionalsSubsection'
import GetMatchedPaper from '../../components/GetMatchedPaper/GetMatchedPaper';
import { FEATURE_SWITCHES, FORM_SUBMISSIONS } from '../../actions/restApi';
import { SERVICES_VIEW } from '../../reducers/services';
import PagePaginationHelmet from '../../components/Helmet/PagePaginationHelmet';
import { getFeatureIsOn } from '../../utils/featureUtils';

/* eslint-disable react/prefer-stateless-function */
export default class ChildCategory extends React.Component {
  static propTypes = {
    goTo: PropTypes.func,
    listings: PropTypes.object,
    main: PropTypes.object,
    slug: PropTypes.string,
    name: PropTypes.string,
    page: PropTypes.number,
    isPhone: PropTypes.bool,
    users: PropTypes.object,
    dispatchAction: PropTypes.func,
    description: PropTypes.string,
    location: PropTypes.object,
  };
  state = {
    showForm: false,
    showFormButton: true,
    showHouseCleaningFormModal: false,
  };
  renderForm(showForm) {
    const {
      slug,
      name,
      listings,
    } = this.props;
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
          {!showForm && (
            <Subsection id="form-landing">
              <PaperWrapper className='paper'>
                <Subsection style={{ paddingBottom: '10px' }}>
                  <div id="start-wrapper" >
                    <h1>
                      <strong>{listings.count}</strong> {name} Professionals in Singapore
                    </h1>
                    {this.state.showFormButton &&
                      <div>
                        <h2>
                          We <strong style={{ fontWeight: 900 }}>instantly filter merchants</strong> based on your inputs. Let’s bring you to the right PRO!
                        </h2>
                        <ButtonWrapper
                          className="start-button"
                          design="filled"
                          onClick={() => {
                            this.setState({ showForm: true });
                          }}
                        >
                          Start Now
                        </ButtonWrapper>
                      </div>
                    }
                  </div>
                </Subsection>
              </PaperWrapper>
            </Subsection>
          )}
          <Form
            url={`${FORMIO_URL}/${slug}`}
            onSubmit={this.handleSubmit}
            ref={r => {
              this.form = r;
            }}
            showForm={showForm}
            email={this.props.users.user.username}
            address={this.props.users.user.home_address}
            phone={this.props.users.user.phone_number}
            name={this.props.users.user.long_first_name}
          />
        </div>
      </Section>
    )
  }
  renderHouseCleaningForm(showForm) {
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
          <div>
            <h3>House Cleaning Form</h3>
          </div>
          <Form
            url={`${FORMIO_URL}/house-cleaning`}
            onSubmit={this.handleSubmit}
            ref={r => {
              this.form = r;
            }}
            showForm={showForm}
            email={this.props.users.user.username}
            address={this.props.users.user.home_address}
            phone={this.props.users.user.phone_number}
            name={this.props.users.user.long_first_name}
          />
        </div>
      </Section>
    )
  }
  goToPage = page => {
    const query = page >= 1 ? { page } : {};
    const search = queryString.parse(this.props.location.search);
    const newQuery = {
      ...search,
      ...query,
    };
    this.props.goTo({
      path: `${this.props.location.pathname}?${queryString.stringify(newQuery)}`,
    });
  };
  handleSubmit = () => {
    const { users } = this.props;
    localStorage.setItem(
      'form',
      JSON.stringify({
        category: this.props.slug,
        form_data: this.form.form.formio.data,
      }),
    );
    const isMerchant = users.LOAD_AUTH.data.merchantId !== 0 && users.LOAD_AUTH.data.merchantId !== null && users.LOAD_AUTH.data.merchantId !== -1;
    if (isMerchant) {
      // eslint-disable-next-line no-alert
      window.alert('Professionals cannot submit the form');
      return;
    }
    this.props.dispatchAction({
      type: FORM_SUBMISSIONS.POST.REQUESTED,
      payload: {
        data: {
          form_data: this.form.form.formio.data,
          category_slug: this.props.slug,
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
      const { users } = this.props;
      const featureList = this.props[FEATURE_SWITCHES.MODEL][FEATURE_SWITCHES.MODEL].LIST;
      const featureHasProjects = getFeatureIsOn(featureList, 'has_projects', false);

      if (users.isLoggedIn) {
        if (
          users.LOAD_AUTH.data.consumerId !== null &&
          users.LOAD_AUTH.data.consumerId !== -1
        ) {
          if (featureHasProjects) {
            this.props.goTo({ path: '/dashboard/projects/create' });
            // this.props.goTo({ path: `/dashboard/chat?project=${this.state.query.project}` });
          } else {
            window.alert('Your form has been submitted.');
            this.props.goTo({ path: '/dashboard' });
          }
        }
      } 
      else {
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
  componentDidMount() {
    // // const { slug } = this.props
    // Api(`${FORMIO_URL}/filters/${slug}`, { method: 'GET' }).then(response => {
    //   // this.setState({ formData: response.data });
    //   console.log('filters/response.data',response.data)
    // });
    // Api(`${FORMIO_URL}/professionals/${slug}`, { method: 'GET' }).then(response => {
    //   // this.setState({ formData: response.data });
    //   // console.log('professionals/response.data',response.data)
    // });
  }
  goToCategoryPage = (slug) => {
    this.props.goTo({ path: `/services/${slug}` });
  }
  showHouseCleaningFormModal = () => {
    this.setState({
      showHouseCleaningFormModal: true,
    })
  }
  closeHouseCleaningFormModal = () => {
    this.setState({
      showHouseCleaningFormModal: false,
    })
  }
  render() {
    const {
      isPhone,
      listings,
      page = 1,
      goTo,
      description,
      main,
      name,
      slug,
    } = this.props;
    const { showForm } = this.state;
    const queryLimit = 10;
    const totalPages = listings.count
      ? Math.ceil(listings.count / queryLimit)
      : 1;
    const renderPagination = () => (
      <Subsection className="pagination">
        <CustomPagination
          onPageChange={(e, data) => {
            this.goToPage(data.activePage);
          }}
          activePage={page}
          totalPages={totalPages}
          siblingRange={isPhone ? 0 : 1}
        />
        <PagePaginationHelmet location={this.props.location} pageLimit={queryLimit} pageNumber={page} totalPages={totalPages} />
      </Subsection>
    );
    const featureList = this.props[FEATURE_SWITCHES.MODEL][FEATURE_SWITCHES.MODEL].LIST;
    const featureShowForm = getFeatureIsOn(featureList, 'category_child_show_form', false);
    const featureSideFormButton = getFeatureIsOn(featureList, 'category_child_side_form_button', true);
    // featureShowForm = false
    // featureSideFormButton = true
    
    return (
      <div>

        {featureShowForm && this.renderForm(showForm)}
        {<Modal 
          open={this.state.showHouseCleaningFormModal} 
          closeIcon={{ style: { top: '0.05rem', right: '1rem' }, color: 'black', name: 'close' }} 
          onClose={this.closeHouseCleaningFormModal}>
          <div style={{ height: '630px' }}>
            {this.renderHouseCleaningForm(true)}
          </div>
        </Modal>}
        <div className="xMobileView">
          <TwoColumn className="category_body">
            <Grid.Column computer={12} tablet={10} mobile={16}>
              {!featureShowForm && (
                <Subsection style={{ paddingBottom: '10px', textAlign: 'left' }}>
                  <div id="category-title">
                    <h1>
                      <strong>{listings.count}</strong> {name} Professionals in Singapore
                    </h1>
                  </div>
                  {/* {!listings.requesting &&
                  <div>
                    {moreCategoriesLinks && moreCategoriesLinks.length > 0 && 
                    moreCategoriesLinks.map(category => (
                      <button className="category-link-wrapper" onClick={() => this.goToCategoryPage(category.slug)}>{category.name}</button>
                    ))}
                  </div>
                  } */}
                </Subsection>
              )}
              {listings.requesting && <Loader active />}

              {!listings.requesting && (
                <Subsection style={{ paddingTop: '0px' }}>
                  {listings.results && listings.results.length > 0 && (
                    <div>
                      <CompanyList
                        companies={listings}
                        goTo={goTo}
                        dispatchAction={this.props.dispatchAction}
                        user={this.props.users}
                        showForm={this.showHouseCleaningFormModal}
                        slug={slug}
                      />
                      {renderPagination()}
                    </div>
                  )}
                  {listings.results && listings.results.length === 0 && (
                    <p>No listings found.</p>
                  )}
                </Subsection>
              )}
            </Grid.Column>
            <Grid.Column computer={4} tablet={6} mobile={16}>
              <Subsection style={{ width: '95%', paddingTop: '0px' }}>
                {featureSideFormButton && (
                  <OneColumn>
                    <PaperWrapper className='paper'>
                      <Subsection>
                        <Modal trigger={<ConnectProfessionalsSubsection />}>
                          <div style={{ height: '530px' }}>
                            {this.renderForm(showForm)}
                          </div>
                        </Modal>
                      </Subsection>
                    </PaperWrapper>
                  </OneColumn>
                )}
                {main &&
                  main.banners &&
                  main.banners.length > 0 &&
                  main.banners.sort((a, b) => (a.banner_order - b.banner_order)).map(banner => (
                    <OneColumn>
                      <PaperWrapper className='paper'>
                        <Section>
                          <a href={banner.external_link}>
                            <img style={{ width: '100%' }} src={banner.file_field} alt="" />
                          </a>
                        </Section>
                      </PaperWrapper>
                    </OneColumn>
                  ))}
                {main &&
                  main.looking_for_categories_links &&
                  main.looking_for_categories_links.length > 0 && (
                  <OneColumn>
                    <PaperWrapper className='paper'>
                      <Subsection>
                        <h3>Are you looking for:</h3>
                        <div style={{ textAlign: 'left' }}>
                          <ul>
                            {main.looking_for_categories_links.map(
                              category => (
                                <li>
                                  <span>
                                    <a href={`/services/${category.slug}`}>
                                      {category.name}
                                    </a>
                                  </span>
                                </li>
                              ),
                            )}
                          </ul>
                        </div>
                      </Subsection>
                    </PaperWrapper>
                  </OneColumn>
                )}
                <OneColumn>
                  <GetMatchedPaper />
                </OneColumn>
              </Subsection>
            </Grid.Column>
          </TwoColumn>
          {description && (
            <Subsection>
              <PaperWrapper id="category-description-paper">
                <Section className="body">
                  {description && renderHTML(description)}
                </Section>
              </PaperWrapper>
            </Subsection>
          )}
        </div>
      </div>
    );
  }

}
