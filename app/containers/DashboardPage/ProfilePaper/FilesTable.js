import React from 'react';
import PropTypes from 'prop-types';
import v4 from 'uuid/v4';
import { Modal, Grid } from 'semantic-ui-react';
import 'react-table/react-table.css';
// import ExifBlueimpImage from '../../../components/Base/Image/ExifBlueimpImage';
import ButtonWrapper from '../../../components/Base/Button';
import FilesModal from './FilesModal';
import { FILES } from '../../../actions/restApi';
import { MULTIPART_FORM_DATA } from '../../../utils/actionsUtil';
import Subsection from '../../../components/Section/Subsection';
import ThreeColumn from '../../../components/Section/ThreeColumn';

/* eslint-disable react/prefer-stateless-function */
export default class FilesTable extends React.PureComponent {
  static propTypes = {
    dispatchAction: PropTypes.func,
    files: PropTypes.array,
    listingId: PropTypes.number,
    galleryId: PropTypes.number,
    isBefore: PropTypes.bool,
  };
  state = {
    openDeleteModal: '',
  };

  render() {
    const data = this.props.files;
    const { openDeleteModal } = this.state;
    return (
      <div className="file-table">
        <FilesModal
          multiple
          modalProps={{
            dimmer: 'inverted',
            trigger: (
              <ButtonWrapper
                type="button"
                design="outline"
                style={{ marginBottom: '10px' }}
              >
                Add Images
              </ButtonWrapper>
            ),
          }}
          formProps={{
            onSubmit: formData => {
              this.props.dispatchAction({
                type: FILES.POST.REQUESTED,
                payload: { data: formData },
                contentType: MULTIPART_FORM_DATA,
              });
            },
          }}
          file={{
            gallery: this.props.galleryId ? this.props.galleryId : null,
            listing: this.props.listingId ? this.props.listingId : null,
            is_gallery_before_images:
              this.props.isBefore === undefined ? null : this.props.isBefore,
          }}
          isCreated
        />
        <ThreeColumn>
          {data.map(file => (
            <Grid.Column key={v4()}>
              <div className="cancel-button-wrapper">
                <Modal
                  {...{
                    dimmer: 'inverted',
                    trigger: (
                      <ButtonWrapper
                        className="cancel-button"
                        type="button"
                        design="outline"
                        onClick={() => {
                          this.setState({ openDeleteModal: file.id });
                        }}
                      >
                        X
                      </ButtonWrapper>
                    ),
                    open: openDeleteModal === file.id,
                    onClose: () => {
                      this.setState({ openDeleteModal: '' });
                    },
                  }}
                >
                  <Subsection>
                    <h1>Are you sure your want to delete?</h1>
                    <ButtonWrapper
                      type="button"
                      design="outline"
                      onClick={() => {
                        this.props.dispatchAction({
                          type: FILES.DELETE.REQUESTED,
                          payload: { id: file.id, showSpinner: false },
                        });
                      }}
                    >
                      CONFIRM
                    </ButtonWrapper>
                  </Subsection>
                </Modal>
              </div>
              <img src={file.file_field} alt={file.file_field} />
            </Grid.Column>
          ))}
        </ThreeColumn>
      </div>
    );
  }
}
