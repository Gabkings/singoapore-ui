/* eslint-disable prettier/prettier */
/* eslint-disable jsx-a11y/label-has-for */
import React from 'react';
import PropTypes from 'prop-types';
import v4 from 'uuid/v4';
import { Modal, Form, Menu } from 'semantic-ui-react';
import Subsection from '../../../components/Section/Subsection';
import OneColumn from '../../../components/Section/OneColumn';
import FilesTable from './FilesTable';
import ButtonWrapper from '../../../components/Base/Button';
import CustomEditor from '../../../components/WYSIWYGEditor';




/* eslint-disable react/prefer-stateless-function */
export default class GalleryModal extends React.PureComponent {
  static propTypes = {
    modalProps: PropTypes.object,
    formProps: PropTypes.object,
    gallery: PropTypes.object,
    listings: PropTypes.object,
    isCreate: PropTypes.bool,
    dispatchAction: PropTypes.func,
    activeItem: PropTypes.string,
    onChangeTab: PropTypes.func,
  };

  state = {
    // listing: this.props.gallery ? this.props.gallery.listing : [],
    gallery: this.props.gallery,
    editorValue: '',
  };
  refs = {};

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

  renderWYSIWYG(listing, fieldProps) {
    return (
      <div className={`field listing-${fieldProps.name}`}>
        <Form.Field
          {...fieldProps}
          defaultValue={
            listing ? listing[fieldProps.name] : fieldProps.defaultValue
          }
          style={{display: 'none'}}
          value={this.state.editorValue}
        />
        <div className="listing-about">
          <CustomEditor
            rich_text={this.props.gallery && this.props.gallery.about_rich_text}
            onChange={editorValue => {this.setState({editorValue})}}
          />
        </div>
      </div>
    );
  }

  render() {
    const { modalProps, formProps, activeItem } = this.props;
    const { gallery } = this.state;
    return (
      <Modal {...modalProps} closeIcon>
        <Subsection>
          {gallery ? <h1>Edit Project</h1> : <h1>Create Project</h1>}
          <Menu tabular>
            <Menu.Item
              name="details"
              active={activeItem === 'details'}
              onClick={this.handleItemClick}
            />
            {!this.props.isCreate && (
              <Menu.Item
                name="images"
                active={activeItem === 'images'}
                onClick={this.handleItemClick}
              />
            )}
          </Menu>
          <Form {...formProps} onSubmit={this.handleSubmit}>
            {activeItem === 'details' && (
              <div>
                <OneColumn>
                  <p>Note: You need to create a listing before adding a project.</p>
                  <div className="select-listing">
                    <label htmlFor="listing">Listing</label>
                    <select className="ui fluid search dropdown" name="listing">
                      {this.props.listings &&
                        this.props.listings.results.map(c => (
                          <option key={v4()} value={c.id}>
                            {c.name}
                          </option>
                        ))}
                    </select>
                  </div>
                  {this.renderFormField(gallery, {
                    label: 'Project Name (E.g. 29 Ghim Moh Link or Post Reno Cleaning)',
                    control: 'input',
                    placeholder: 'Name',
                    name: 'wp_post_title',
                    className: 'gallery-name',
                    required: true,
                  })}
                  {this.renderWYSIWYG(gallery, {
                    label: 'About Project',
                    control: 'textarea',
                    placeholder: 'About Gallery',
                    name: 'about_rich_text',
                    className: 'gallery-about',
                  })}
                  {this.renderFormField(gallery, {
                    label: 'Estimated Cost of Project',
                    control: 'input',
                    placeholder: 'Estimated Cost',
                    name: 'estimated_project_cost',
                    className: 'gallery-cost',
                  })}
                </OneColumn>
                <ButtonWrapper
                  className="ui button"
                  type="submit"
                  design="filled"
                  style={{ marginTop: '20px' }}
                >
                  Submit
                </ButtonWrapper>
              </div>
            )}
          </Form>
          {activeItem === 'images' &&
            !this.props.isCreate && (
            <div>
              <p style={{textAlign: 'left'}}>Note: Maximum image size allowed is 1MB</p>
              {/* eslint-disable-next-line react/jsx-curly-brace-presence */}
              <p style={{textAlign: 'left'}}>{'Please upload under "After Images" if you do not have before and after comparison images.'}</p>
              <h2 className="gallery-image-table-title">Before Images</h2>
              <FilesTable
                files={gallery.files.filter(
                  f => f.is_gallery_before_images === true,
                )}
                dispatchAction={this.props.dispatchAction}
                galleryId={gallery.id}
                isBefore
              />
            </div>
          )}
          {activeItem === 'images' &&
            !this.props.isCreate && (
            <div>
              <h2 className="gallery-image-table-title">After Images</h2>
              <FilesTable
                files={gallery.files.filter(
                  f => f.is_gallery_before_images === false,
                )}
                dispatchAction={this.props.dispatchAction}
                galleryId={gallery.id}
                isBefore={false}
              />
            </div>
          )}
        </Subsection>
      </Modal>
    );
  }
  handleSubmit = e => {
    const data = new FormData(e.target);
    this.props.formProps.onSubmit(data);
  };
  handleItemClick = (e, { name }) => this.props.onChangeTab(name);
}
