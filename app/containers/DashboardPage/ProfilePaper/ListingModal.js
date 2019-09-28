/* eslint-disable react/no-did-update-set-state */
/* eslint-disable no-nested-ternary */
/* eslint-disable radix */
/* eslint-disable jsx-a11y/no-static-element-interactions */
/* eslint-disable jsx-a11y/click-events-have-key-events */
/* eslint-disable prettier/prettier */
import React from 'react';
import PropTypes from 'prop-types';
import renderHTML from 'react-render-html';
import v4 from 'uuid/v4';
import { Modal, Form, Grid, Dropdown, Menu } from 'semantic-ui-react';
import { isEqual } from 'lodash';
import Subsection from '../../../components/Section/Subsection';
import TwoColumn from '../../../components/Section/TwoColumn';
import OneColumn from '../../../components/Section/OneColumn';
import FilesTable from './FilesTable';
import FormIO from '../../../components/Form/ProfessionalsForm'
import './styles.css'
import ButtonWrapper from '../../../components/Base/Button';
import FAQTable from './FAQTable';
import { FORMIO_URL } from '../../../utils/api';
import CustomEditor from '../../../components/WYSIWYGEditor';
/* eslint-disable react/prefer-stateless-function */
export default class ListingModal extends React.Component {
  static propTypes = {
    modalProps: PropTypes.object,
    formProps: PropTypes.object,
    categories: PropTypes.object,
    listing: PropTypes.object,
    isCreate: PropTypes.bool,
    dispatchAction: PropTypes.func,
    error: PropTypes.string,
  };
  constructor(props) {
    super(props);
    // create a ref to store the textInput DOM element
    this.submitButton = React.createRef();
    this.form = React.createRef();
  }
  state = {
    hiddenCategoryValue: this.props.listing
      ? this.props.listing.categories
      : [],
    parentCategoryValue: this.props.listing
      ? this.props.listing.parent_categories
      : [],
    listing: this.props.listing === null ? {} : this.props.listing,
    activeItem: 'details',
    openOptions: '',
    editorValue: '',
    openCategoryTab: false,
    openCategoryModal: false,
    selectedCategory: {},
  };
  formio = {};

  // clickOnDropDownValue = (target, clickedDropdownValue) => {
  //   let value = target.getAttribute('value')
  //   value = parseInt(value)
  //   const clickedValueArray = clickedDropdownValue.filter(obj => obj.value === value)
  //   const clickedValue = clickedValueArray[0]
  //   if (clickedValue && clickedValue.value) {
  //     this.setState({
  //       // openCategoryTab: true,
  //       openCategoryModal: true,
  //       // activeItem: 'category',
  //       selectedCategory: clickedValueArray,
  //     })
  //   }
  // }
  componentDidUpdate(prevProps) {
    if (!isEqual(prevProps.listing, this.props.listing)) {
      this.setState({ listing: this.props.listing });
    }
  }
  handleFileChange = (e, listing, fieldProps) => {
    e.preventDefault();

    const reader = new FileReader();
    const file = e.target.files[0];

    reader.onloadend = () => {
      this.state.listing[fieldProps.inputProps.name] = reader.result;
      this.forceUpdate();
      this.setState({
        [fieldProps.inputProps.name]: file,
      });
    };

    reader.readAsDataURL(file);
  };
  handleItemClick = (e, { name }) => {
    const newState = {
      activeItem: name,
    };
    if (this.state.activeItem === 'options' || this.state.activeItem === 'category') {
      const formData = {};
      Object.keys(this.formio).forEach(ky => {
        if (this.formio[ky]) {
          formData[ky] = this.formio[ky].props.submission.data;
        }
      });
      newState.listing = { ...this.state.listing, form_data: { ...formData } }
    }
    this.setState(newState);
  };
  handleCancelFile = f => {
    this.state.listing[f] = '';
    this.setState({
      [f]: '',
    });
    this.forceUpdate();
  };
  handleSubmit = e => {
    let data;
    if (e) {
      e.preventDefault();
      data = new FormData(e.target);
    } else {
      data = new FormData(this.form.current);
    }
    let hasFormio = false;
    const formData = {};
    // if (this.state.activeItem === 'options') {
    //   if (typeof(this.formio) === 'object') {
    //     Object.keys(this.formio).forEach(k => {
    //       if (this.formio[k]) {
    //         hasFormio = true;
    //         formData[k] = this.formio[k].props.submission.data;
    //       }
    //     });
    //   }
    //   // eslint-disable-next-line no-restricted-syntax
    //   for (const key of data.keys()) {
    //     if (/^data\[[a-zA-Z0-9]+\]\[\]$/.test(key)) {
    //       data.delete(key);
    //     }
    //   }
    // }
    // if (this.state.activeItem === 'category') {
    //   if (typeof (this.formio) === 'object') {
    //     Object.keys(this.formio).forEach(k => {
    //       console.log('this.formio[k]',this.formio[k])
    //       if (this.formio[k]) {
    //         hasFormio = true;
    //         formData[k] = this.formio[k].props.submission.data;
    //       }
    //     });
    //   }
    //   // eslint-disable-next-line no-restricted-syntax
    //   for (const key of data.keys()) {
    //     if (/^data\[[a-zA-Z0-9]+\]\[\]$/.test(key)) {
    //       data.delete(key);
    //     }
    //   }
    // }
    if (this.state.openCategoryModal) {
      if (typeof (this.formio) === 'object') {
        Object.keys(this.formio).forEach(k => {
          if (this.formio[k]) {
            hasFormio = true;
            formData[k] = this.formio[k].props.submission.data;
          }
        });
      }
      // eslint-disable-next-line no-restricted-syntax
      for (const key of data.keys()) {
        if (/^data\[[a-zA-Z0-9]+\]\[\]$/.test(key)) {
          data.delete(key);
        }
      }
    }
    else if (typeof (this.state.listing.form_data) === 'object') {
      Object.keys(this.state.listing.form_data).forEach(k => {
        if (this.state.listing.form_data[k]) {
          hasFormio = true;
          formData[k] = this.state.listing.form_data[k];
        }
      })
    }
    if (hasFormio) {
      data.set('form_data', JSON.stringify(formData));
    }

    const f = 'logo';
    if (this.state[f] || this.state[f] === '') {
      data.set(f, this.state[f]);
    } else {
      data.delete(f);
    }
    this.props.formProps.onSubmit(data);
    this.setState({
      openCategoryTab: false,
      openCategoryModal: false,
      activeItem: 'details',
    })
  };
  getCategory = categoryId => this.props.categories.results.filter(c => c.id === categoryId)[0]

  onEditorStateChange = (editorState) => {
    this.setState({
      editorState,
    });
  };
  renderCategoryDropdown() {
    const clickedDropdownValue = []
    return (
      <div className="listing-category-field">
        {/* eslint-disable-next-line jsx-a11y/label-has-for */}
        <label htmlFor="categories">Parent Categories</label>
        <p>Refer <a href="https://sghomeneeds.com/services">here</a> for a list of categories available</p>
        <Dropdown
          fluid
          multiple
          search
          selection
          options={this.props.categories.results.filter(c => c.parent.length === 0 || c.parent.indexOf(c.id) !== -1).map(c => ({
            key: v4(),
            value: c.id,
            text: renderHTML(c.name),
          }))}
          value={this.state.parentCategoryValue}
          onChange={(e, data) => {
            const hiddenCategoryValue = this.props.categories.results.filter(c =>
              c.parent.filter(p => data.value.indexOf(p) !== -1).length >= 1
            ).filter(c => this.state.hiddenCategoryValue.includes(c.id)).map(c => c.id);
            this.setState({ parentCategoryValue: data.value, hiddenCategoryValue });
          }}
        />
        {/* eslint-disable-next-line jsx-a11y/label-has-for */}
        <label htmlFor="categories">Categories</label>
        <Dropdown
          fluid
          multiple
          search
          selection
          options={this.props.categories.results.filter(c =>
            c.parent.filter(p => this.state.parentCategoryValue.indexOf(p) !== -1).length >= 1
          ).map(c => {
            clickedDropdownValue.push({
              value: c.id,
              name: c.name,
            })
            return ({
              key: v4(),
              value: c.id,
              text: renderHTML(c.name),
            })
          })}
          // onMouseDown={(e) => this.clickOnDropDownValue(e.target, clickedDropdownValue)}
          value={this.state.hiddenCategoryValue}
          onChange={(e, data) => {
            this.setState({
              hiddenCategoryValue: data.value,
            }) 
          }}
        />
        <select
          className="ui fluid search dropdown"
          multiple="true"
          name="parent_categories"
          style={{ display: 'none' }}
          value={this.state.parentCategoryValue}
          readOnly
        >
          {this.state.parentCategoryValue.map(c => (
            <option key={v4()} value={c}>
              {c}
            </option>
          ))}
        </select>
        <select
          className="ui fluid search dropdown"
          multiple="true"
          name="categories"
          style={{ display: 'none' }}
          value={this.state.hiddenCategoryValue}
          readOnly
        >
          {this.state.hiddenCategoryValue.map(c => (
            <option key={v4()} value={c}>
              {c}
            </option>
          ))}
        </select>
      </div>
    );
  }
  renderFormField(listing, fieldProps) {
    return (
      <Form.Field
        {...fieldProps}
        defaultValue={
          listing ? listing[fieldProps.name] : fieldProps.defaultValue
        }
      />
    );
  }
  renderFileInput(listing, fieldProps) {
    return (
      <div className={`field listing-${fieldProps.inputProps.name}`}>
        {/* eslint-disable-next-line jsx-a11y/label-has-for */}
        <label htmlFor={fieldProps.label}>{fieldProps.label}</label>
        {listing &&
          listing[fieldProps.inputProps.name] &&
          typeof listing[fieldProps.inputProps.name] === 'string' && (
          <div>
            <div className="cancel-button-wrapper">
              <ButtonWrapper
                className="cancel-button"
                design="outline"
                type="button"
                onClick={() => { this.handleCancelFile(fieldProps.inputProps.name) }}
              >
                X
              </ButtonWrapper>
            </div>
            <img src={listing[fieldProps.inputProps.name]} alt="" width="100%" />
          </div>
        )}  
        <input
          type="file"
          {...fieldProps.inputProps}
          onChange={e => {
            this.handleFileChange(e, listing, fieldProps);
          }}
        />
      </div>
    );
  }

  renderWYSIWYG(listing, fieldProps) {
    return (
      <div className={`field listing-${fieldProps.name}`}>
        <Form.Field
          {...fieldProps}
          defaultValue={
            listing ? listing[fieldProps.name] : fieldProps.defaultValue
          }
          style={{ display: 'none' }}
          value={this.state.editorValue}
        />
        <div className="listing-about">
          <CustomEditor
            rich_text={this.props.listing && this.props.listing.about_rich_text}
            onChange={editorValue => { this.setState({ editorValue }) }}
          />
        </div>
      </div>
    );
  }
  renderVideoEmbed(listing, fieldProps) {
    return (
      <div>
        <Form.Field
          {...fieldProps}
          defaultValue={
            listing ? listing[fieldProps.name] : fieldProps.defaultValue
          }
        />
        {listing && listing[fieldProps.name] && renderHTML(listing[fieldProps.name])}
      </div>
    );
  }

  render() {
    const { modalProps, formProps, error } = this.props;
    const { listing, activeItem, openOptions, openCategoryModal } = this.state;
    return (
      <div>
        {<Modal {...modalProps} closeIcon>
          <Subsection>
            {Object.entries(listing).length !== 0 ? <h1>Edit Listing</h1> : <h1>Add Listing</h1>}
            <Menu tabular>
              <Menu.Item name='details' active={activeItem === 'details'} onClick={this.handleItemClick} />
              {!this.props.isCreate && <Menu.Item name='faq' active={activeItem === 'faq'} onClick={this.handleItemClick} />}
              {/* {!this.props.isCreate && listing.chat_activated && <Menu.Item name='options' active={activeItem === 'options'} onClick={this.handleItemClick} />} */}
              {!this.props.isCreate && <Menu.Item name='options' active={activeItem === 'options'} onClick={this.handleItemClick} />}
              {!this.props.isCreate && <Menu.Item name='images' active={activeItem === 'images'} onClick={this.handleItemClick} />}
              {!this.props.isCreate && this.state.openCategoryTab && <Menu.Item name='category' active={activeItem === 'category'} onClick={this.handleItemClick} />}
            </Menu>
            <form {...formProps} onSubmit={this.handleSubmit} ref={this.form} className={`ui form ${formProps.className}`}>
              <div style={{ height: activeItem === 'details' ? undefined : '1px', overflow: 'hidden' }}>
                <OneColumn>
                  {this.renderCategoryDropdown(listing)}
                  {this.renderFormField(listing, {
                    label: 'Company Name',
                    control: 'input',
                    placeholder: 'Name',
                    name: 'name',
                    className: 'listing-name',
                    required: true,
                  })}
                  {this.renderWYSIWYG(listing, {
                    label: 'About',
                    control: 'textarea',
                    placeholder: 'About Me',
                    name: 'about_rich_text',
                    className: 'listing-about',
                  })}
                  {this.renderFormField(listing, {
                    label: 'Address',
                    control: 'textarea',
                    rows: 3,
                    placeholder: 'Address',
                    name: 'address',
                    className: 'listing-address',
                  })}
                  {this.renderFormField(listing, {
                    label: 'Postal Code',
                    control: 'input',
                    placeholder: 'Postal Code',
                    name: 'postal_code',
                    className: 'listing-postal-code',
                  })}
                  {this.renderVideoEmbed(listing,
                    {
                      label: 'Video Embed Code',
                      control: 'textarea',
                      placeholder: 'Video Embed',
                      name: 'video_embed_code',
                      defaultValue: '',
                      className: 'listing-video-embed',
                    })}
                </OneColumn>
                <TwoColumn>
                  <Grid.Column key={v4()}>
                    {this.renderFileInput(listing, {
                      label: 'Logo',
                      inputProps: {
                        name: 'logo',
                      },
                    })}
                  </Grid.Column>
                  <Grid.Column>
                    {this.renderFormField(listing,
                      {
                        label: 'Instagram',
                        control: 'input',
                        placeholder: 'Instagram',
                        name: 'instagram',
                        className: 'listing-instagram',
                      })}
                  </Grid.Column>
                  {/* <Grid.Column>
                    {this.renderFormField(listing,
                      {
                        label: 'Email',
                        control: 'input',
                        placeholder: 'Email',
                        name: 'email',
                        className: 'listing-email',
                      })}
                  </Grid.Column> */}
                  <Grid.Column>
                    {this.renderFormField(listing,
                      {
                        label: 'Phone',
                        control: 'input',
                        placeholder: 'Phone',
                        name: 'phone',
                        className: 'listing-phone',
                      })}
                  </Grid.Column>
                  <Grid.Column>
                    {this.renderFormField(listing,
                      {
                        label: 'Timing',
                        control: 'input',
                        placeholder: 'Timing',
                        name: 'timing',
                        className: 'listing-timing',
                      })}
                  </Grid.Column>
                  <Grid.Column>
                    {this.renderFormField(listing,
                      {
                        label: 'Website (Please include https:// or http:// for link to work)',
                        control: 'input',
                        placeholder: 'website',
                        name: 'website',
                        className: 'listing-website',
                      })}
                  </Grid.Column>
                  <Grid.Column>
                    {this.renderFormField(listing,
                      {
                        label: 'Facebook',
                        control: 'input',
                        placeholder: 'Facebook',
                        name: 'facebook',
                        className: 'listing-facebook',
                      })}
                  </Grid.Column>
                  <Grid.Column>
                    {this.renderFormField(listing,
                      {
                        label: 'Twitter',
                        control: 'input',
                        placeholder: 'Twitter',
                        name: 'twitter',
                        className: 'listing-twitter',
                      })}
                  </Grid.Column>
                </TwoColumn>
              </div>

              {activeItem === 'faq' && (
                <div>
                  <FAQTable faqData={listing.faq_data} />
                </div>
              )}

              {activeItem === 'options' && this.state.hiddenCategoryValue.map(categoryId => {
                const c = this.getCategory(categoryId);
                const k = v4();
                return (
                  <div key={k}>
                    <h2 className="listing-options-title">{renderHTML(c.name)} Options <ButtonWrapper
                      type="button" design="outline" onClick={() => {
                        const formData = {};
                        Object.keys(this.formio).forEach(ky => {
                          if (this.formio[ky]) {
                            formData[ky] = this.formio[ky].props.submission.data;
                          }
                        });
                        if (openOptions === c.name) {
                          this.setState({ openOptions: '', listing: { ...listing, form_data: { ...formData } } });
                        } else {
                          this.setState({ openOptions: c.name, listing: { ...listing, form_data: { ...formData } } });
                        }
                      }}>
                      {openOptions === c.name && '-'}
                      {openOptions !== c.name && '+'}
                    </ButtonWrapper></h2>
                    <div style={{ height: openOptions === c.name ? 'inherit' : '1px', transition: 'height 2s', overflow: 'hidden' }}>
                      <FormIO
                        url={`${FORMIO_URL}/professionals/${c.slug}`}
                        submission={{ data: listing.form_data[c.slug] !== undefined ? listing.form_data[c.slug] : {} }}
                        ref={f => { this.formio[c.slug] = f }}
                      />
                    </div>
                  </div>
                )
              })}
              {activeItem === 'category' && this.state.selectedCategory && this.state.selectedCategory.length > 0 && this.state.selectedCategory.map(category => {
                const c = this.getCategory(category.value);
                const k = v4();
                return (
                  <div key={k}>
                    <h2 className="listing-options-title">{renderHTML(c.name)}</h2>
                    <div>
                      <FormIO
                        url={`${FORMIO_URL}/professionals/${c.slug}`}
                        submission={{ data: listing.form_data[c.slug] !== undefined ? listing.form_data[c.slug] : {} }}
                        ref={f => { this.formio[c.slug] = f }}
                      />
                    </div>
                  </div>
                )
              })}
              <ButtonWrapper
                style={{ display: ['details', 'faq', 'options', 'category'].indexOf(activeItem) !== -1 ? 'inline-block' : 'none' }}
                className="ui button listing-submit"
                design="filled"
                type="submit"
                inputRef={el => { this.submitButton = el }}
              >
                Submit
              </ButtonWrapper>
            </form>
            {activeItem === 'images' && !this.props.isCreate && (
              <div>
                <h1 className="listing-image-table-title">Listing Images</h1>
                <p align="left"> Note: Maximum image size allowed is 1MB </p>
                <FilesTable
                  files={listing.files}
                  dispatchAction={this.props.dispatchAction}
                  listingId={listing.id}
                />

              </div>
            )}
            <ButtonWrapper
              style={{ display: ['details', 'faq', 'options', 'category'].indexOf(activeItem) === -1 ? 'inline-block' : 'none' }}
              className="ui button listing-submit"
              design="filled"
              type="submit"
              onClick={() => { this.handleSubmit() }}
            >
              Save
            </ButtonWrapper>
            {error && <p style={{ color: 'red' }}>{error}</p>}
          </Subsection>
        </Modal>
        }
        {<Modal
          open={openCategoryModal}
          closeIcon={{ style: { top: '0.05rem', right: '1rem' }, color: 'black', name: 'close' }}          
          onClose={() => {
            this.setState({ openCategoryModal: false });
          }}>
          <div style={{textAlign: 'center'}}><h1>Category</h1></div>
          <form {...formProps} onSubmit={this.handleSubmit} ref={this.form} className={`ui form ${formProps.className}`}>
            {openCategoryModal && this.state.selectedCategory && this.state.selectedCategory.length > 0 && this.state.selectedCategory.map(category => {
              const c = this.getCategory(category.value);
              const k = v4();
              return (
                <div key={k}>
                  <h2 className="listing-options-title" style={{textAlign: 'center'}}>{renderHTML(c.name)}</h2>
                  <div>
                    <FormIO
                      url={`${FORMIO_URL}/professionals/${c.slug}`}
                      submission={{ data: listing.form_data !== null ? listing.form_data[c.slug] !== undefined ? listing.form_data[c.slug] : {} : {} }}
                      ref={f => { this.formio[c.slug] = f }}
                    />
                  </div>
                </div>
              )
            })}
            <div style={{textAlign: 'center'}}>
              <ButtonWrapper
                style={{ display: ['details', 'faq', 'options', 'category'].indexOf(activeItem) !== -1 ? 'inline-block' : 'none' }}
                className="ui button listing-submit"
                design="filled"
                type="submit"
                inputRef={el => { this.submitButton = el }}
              >
                Submit
              </ButtonWrapper>
            </div>
          </form>
        </Modal>}
      </div>
    );
  }

}
