import React from 'react';
import PropTypes from 'prop-types';
import { Modal, Form } from 'semantic-ui-react';
import Subsection from '../../../components/Section/Subsection';
import ButtonWrapper from '../../../components/Base/Button';

/* eslint-disable react/prefer-stateless-function */
export default class FAQModal extends React.PureComponent {
  static propTypes = {
    modalProps: PropTypes.object,
    formProps: PropTypes.object,
    isCreated: PropTypes.bool,
    item: PropTypes.object,
  };
  state = {
    content: this.props.item ? this.props.item.content : '',
    title: this.props.item ? this.props.item.title : '',
  };
  render() {
    const { modalProps, formProps } = this.props;
    const { content, title } = this.state;
    return (
      <Modal {...modalProps}>
        <Subsection>
          <h1>Add/Edit FAQ</h1>
          <Form {...formProps} onSubmit={this.handleSubmit}>
            <div className="field faq-question">
              {/* eslint-disable-next-line jsx-a11y/label-has-for */}
              <label htmlFor="title">Question</label>
              <input
                type="text"
                name="title"
                value={title}
                onChange={e => {
                  this.setState({ title: e.target.value });
                }}
              />
            </div>
            <div className="field faq-answer">
              {/* eslint-disable-next-line jsx-a11y/label-has-for */}
              <label htmlFor="content">Answer</label>
              <input
                type="text"
                name="content"
                value={content}
                onChange={e => {
                  this.setState({ content: e.target.value });
                }}
              />
            </div>
            <ButtonWrapper
              className="ui button"
              design="filled"
              type="button"
              style={{ marginTop: '20px' }}
              onClick={() => {
                this.handleSubmit();
              }}
            >
              Submit
            </ButtonWrapper>
          </Form>
        </Subsection>
      </Modal>
    );
  }
  handleSubmit = () => {
    const { title, content } = this.state;
    const data = {
      title,
      content,
    };
    this.props.formProps.onSubmit(data);
    this.setState({ title: '', content: '' });
    this.props.modalProps.onClose();
  };
}
