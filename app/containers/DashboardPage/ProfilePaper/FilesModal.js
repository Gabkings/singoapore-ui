/* eslint-disable prettier/prettier */
import React from 'react';
import PropTypes from 'prop-types';
import { Modal, Form, Grid } from 'semantic-ui-react';
// import ExifBlueimpImage from '../../../components/Base/Image/ExifBlueimpImage';
import Subsection from '../../../components/Section/Subsection';
import ButtonWrapper from '../../../components/Base/Button';
import './styles.css';
import ThreeColumn from '../../../components/Section/ThreeColumn';
/* eslint-disable react/prefer-stateless-function */
export default class FilesModal extends React.PureComponent {
  static propTypes = {
    modalProps: PropTypes.object,
    formProps: PropTypes.object,
    isCreated: PropTypes.bool,
    file: PropTypes.object,
    fieldName: PropTypes.string,
    multiple: PropTypes.bool,
  };
  state = {
    preview: this.props.isCreated ? null : this.props.file.file_field,
  };

  render() {
    const { preview } = this.state;
    const { modalProps, fieldName, formProps, multiple } = this.props;
    return (
      <Modal
        {...modalProps}
        ref={r => {
          this.modal = r;
        }}
        closeIcon
      >
        <Subsection>
          <h1>Add/Edit Images</h1>
          <Form {...formProps} onSubmit={this.handleSubmit}>
            <div className="field image-file_field">
              {/* eslint-disable-next-line jsx-a11y/label-has-for */}
              <label htmlFor="file_field">File</label>
              <input
                type="file"
                name={fieldName || 'file_field'}
                onChange={this.handleFileChange}
                multiple={this.props.multiple}
              />
            </div>
            <ThreeColumn>
              {preview &&
                multiple &&
                preview.map((file, i) => (
                  <Grid.Column>
                    <div className="cancel-button-wrapper">
                      <ButtonWrapper
                        className="cancel-button"
                        design="outline"
                        type="button"
                        onClick={() => {
                          this.handleCancelFile(this.state.file_field[i]);
                        }}
                      >
                        X
                      </ButtonWrapper>
                    </div>
                    <img src={file} alt={file} width="100%" />
                  </Grid.Column>
                ))}

              {preview &&
                !multiple && (
                <Grid.Column>
                  <div className="cancel-button-wrapper">
                    <ButtonWrapper
                      className="cancel-button"
                      design="outline"
                      type="button"
                      onClick={() => {
                        this.handleCancelSingleFile();
                      }}
                    >
                        X
                    </ButtonWrapper>
                  </div>
                  <img src={preview} alt={preview} width="100%" />
                </Grid.Column>
              )}
            </ThreeColumn>
            <ButtonWrapper
              className="ui button"
              design="filled"
              type="submit"
              style={{ marginTop: '20px' }}
            >
              Save
            </ButtonWrapper>
          </Form>
        </Subsection>
      </Modal>
    );
  }
  handleFileChange = e => {
    if (this.props.multiple) {
      this.setState({
        preview: [...Array(e.target.files.length).keys()].map(i =>
          URL.createObjectURL(e.target.files[i]),
        ),
        file_field: [...Array(e.target.files.length).keys()].map(
          i => e.target.files[i],
        ),
      });
      e.target.value = '';
    } else {
      this.setState({
        preview: URL.createObjectURL(e.target.files[0]),
        file_field: e.target.files[0],
      });
    }
  };
  handleCancelFile = file => {
    const fileName = file.name;
    const i = this.state.file_field.map(f => f.name).indexOf(fileName);
    if (i !== -1) {
      const updatedPreview = this.state.preview.slice();
      updatedPreview.splice(i, 1);
      const updatedFileField = this.state.file_field.slice();
      updatedFileField.splice(i, 1);
      this.setState({
        preview: updatedPreview,
        file_field: updatedFileField,
      });
    }
  };
  handleCancelSingleFile = () => {
    this.setState({
      preview: null,
      file_field: '',
    });
  }

  handleSubmit = e => {
    if (!this.props.multiple) {
      const data = new FormData(e.target);
      if (this.props.fieldName) {
        data.set(this.props.fieldName, this.state.file_field);
      } else {
        data.set('file_field', this.state.file_field);
      }
      if (this.props.file.listing) {
        data.set('listing', this.props.file.listing);
      }
      if (this.props.file.gallery) {
        data.set('gallery', this.props.file.gallery);
      }
      if (this.props.file.is_gallery_before_images) {
        data.set(
          'is_gallery_before_images',
          this.props.file.is_gallery_before_images,
        );
      }
      if (!this.props.fieldName && this.state.file_field && this.state.file_field.name) {
        data.set('name', this.state.file_field.name);
      } else if (!this.props.fieldName) {
        data.set('name', null);
      }
      // console.log(data.forEach((k, v) => {console.log(k,v)}))
      this.props.formProps.onSubmit(data);
      if (this.props.isCreated) {
        this.setState({
          preview: null,
          file_field: '',
        });
      }
      this.modal.handleClose();
    } else {
      [...Array(this.state.file_field.length).keys()].forEach(i => {
        const data = new FormData(e.target);
        if (this.props.fieldName) {
          data.set(this.props.fieldName, this.state.file_field[i]);
        } else {
          data.set('file_field', this.state.file_field[i]);
        }
        if (this.props.file.listing) {
          data.set('listing', this.props.file.listing);
        }
        if (this.props.file.gallery) {
          data.set('gallery', this.props.file.gallery);
        }
        if (this.props.file.is_gallery_before_images) {
          data.set(
            'is_gallery_before_images',
            this.props.file.is_gallery_before_images,
          );
        }
        if (this.state.file_field[i] && this.state.file_field[i].name) {
          data.set('name', this.state.file_field[i].name);
        } else {
          data.set('name', null);
        }
        this.props.formProps.onSubmit(data);
      });
      if (this.props.isCreated) {
        this.setState({
          preview: null,
          file_field: '',
        });
      }
      this.modal.handleClose();
    }
  };
  // eslint-disable-next-line no-unused-vars
  componentDidUpdate(prevProps, prevState, snapshot) {
    if (
      prevProps.file.file_field === undefined &&
      this.props.file.file_field !== undefined
    ) {
      // eslint-disable-next-line react/no-did-update-set-state
      this.setState({
        preview: this.props.isCreated ? null : this.props.file.file_field,
      });
    }
  }
}
