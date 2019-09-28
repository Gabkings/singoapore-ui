import React from 'react';
import PropTypes from 'prop-types';
import ReactTable from 'react-table';
import { Modal } from 'semantic-ui-react';
import 'react-table/react-table.css';
import ButtonWrapper from '../../../components/Base/Button';
import Subsection from '../../../components/Section/Subsection';
import FAQModal from './FAQModal';

/* eslint-disable react/prefer-stateless-function */
export default class FAQTable extends React.PureComponent {
  static propTypes = {
    faqData: PropTypes.object,
  };
  state = {
    faqData:
      this.props.faqData && this.props.faqData.items
        ? this.props.faqData
        : { items: [] },
    openAddModal: null,
    openDeleteModal: null,
  };

  render() {
    const { openAddModal, openDeleteModal } = this.state;
    const columns = [
      {
        Header: 'Question',
        accessor: 'title',
      },
      {
        Header: 'Answer',
        accessor: 'content',
      },
      {
        Header: 'Edit',
        accessor: 'title',
        Cell: props => (
          <FAQModal
            modalProps={{
              dimmer: 'inverted',
              trigger: (
                <ButtonWrapper
                  type="button"
                  design="outline"
                  onClick={() => {
                    this.setState({ openEditModal: props.index });
                  }}
                >
                  EDIT
                </ButtonWrapper>
              ),
              open: this.state.openEditModal === props.index,
              onClose: () => {
                this.setState({ openEditModal: null });
              },
            }}
            formProps={{
              onSubmit: formData => {
                this.editQuestion(formData, props.index);
              },
            }}
            item={props.original}
          />
        ),
      },
      {
        Header: 'Delete',
        accessor: 'title',
        Cell: props => (
          <Modal
            {...{
              dimmer: 'inverted',
              trigger: (
                <ButtonWrapper
                  type="button"
                  design="outline"
                  onClick={() => {
                    this.setState({ openDeleteModal: props.value });
                  }}
                >
                  DELETE
                </ButtonWrapper>
              ),
              open: openDeleteModal === props.value,
              onClose: () => {
                this.setState({ openDeleteModal: null });
              },
            }}
          >
            <Subsection>
              <h1>Are you sure your want to delete?</h1>
              <ButtonWrapper
                type="button"
                design="outline"
                onClick={() => {
                  this.deleteQuestion(props.value);
                }}
              >
                CONFIRM
              </ButtonWrapper>
            </Subsection>
          </Modal>
        ),
      },
    ];
    return (
      <div className="file-table">
        <FAQModal
          modalProps={{
            dimmer: 'inverted',
            trigger: (
              <ButtonWrapper
                type="button"
                design="outline"
                style={{ marginBottom: '10px' }}
                onClick={() => {
                  this.setState({ openAddModal: true });
                }}
              >
                Add Question
              </ButtonWrapper>
            ),
            open: openAddModal,
            onClose: () => {
              this.setState({ openAddModal: false });
            },
          }}
          formProps={{
            onSubmit: formData => {
              this.addQuestion(formData);
            },
          }}
        />
        <ReactTable
          data={this.state.faqData.items}
          columns={columns}
          defaultPageSize={5}
        />
        <input
          type="hidden"
          name="faq_data"
          value={JSON.stringify(this.state.faqData)}
        />
      </div>
    );
  }
  addQuestion = data => {
    const newFaqData = Object.assign(this.state.faqData, {});
    newFaqData.items.push(data);
    this.setState({ faqData: newFaqData });
  };
  editQuestion = (data, questionIndex) => {
    const newFaqData = Object.assign(this.state.faqData, {});
    newFaqData.items = this.state.faqData.items.map((item, index) => {
      if (questionIndex === index) {
        return data;
      }
      return item;
    });
    this.setState({ faqData: newFaqData });
  };
  deleteQuestion = title => {
    const newFaqData = Object.assign(this.state.faqData, {});
    newFaqData.items = this.state.faqData.items
      .slice()
      .filter(item => title !== item.title);
    this.setState({ faqData: newFaqData, openDeleteModal: null });
  };
}
