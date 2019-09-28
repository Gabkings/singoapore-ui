import React from 'react';
import PropTypes from 'prop-types';
import { Form as Formio } from 'react-formio';

import PaperWrapper from '../Base/Paper/index';
import Subsection from '../Section/Subsection';
import './formio-bootstrap.css';
import './formio.css';
import './form.css';
import ButtonWrapper from '../Base/Button';

class Form extends React.PureComponent {
  static propTypes = {
    url: PropTypes.string,
    onSubmit: PropTypes.func,
    submission: PropTypes.object,
    showForm: PropTypes.bool,
    email: PropTypes.string,
    address: PropTypes.string,
    phone: PropTypes.string,
    name: PropTypes.string,
  };
  state = {
    formPage: 0,
    totalPages: null,
    stepProgress: 0,
  };

  render() {
    const { showForm } = this.props;
    if (this.form && this.form.formio) {
      this.state.totalPages = this.form.formio.pages;
      this.state.stepProgress =
        (this.state.formPage / this.state.totalPages.length) * 100;

      // console.log(
      //   this.state.stepProgress,
      //   this.state.formPage,
      //   this.state.totalPages,
      // );
    }
    const showSubmit =
      this.form &&
      this.form.formio &&
      this.state.formPage === this.form.formio.pages.length - 1;
    const emailInput = document.querySelector("[name='data[Email]']");
    if (emailInput !== null && this.props.email) {
      emailInput.value = this.props.email;
    }
    const addressInput = document.querySelector(
      "[name='data[whatsyourprojectaddress]']",
    );
    if (addressInput !== null && this.props.address) {
      addressInput.value = this.props.address;
    }
    const phoneInput = document.querySelector(
      "[name='data[page10Fieldset2Number]']",
    );
    if (phoneInput !== null && this.props.phone) {
      phoneInput.value = this.props.phone;
    }
    const nameInput = document.querySelector(
      "[name='data[page10Fieldset2Name]']",
    );
    if (nameInput !== null && this.props.name) {
      nameInput.value = this.props.name;
    }
    const dayInput = document.querySelector("[id='day-year']");
    if (dayInput !== null) {
      dayInput.value = new Date().getFullYear();
    }

    return (
      <Subsection
        style={{
          paddingBottom: '10px',
          maxWidth: '1024px',
          display: showForm ? '' : 'none',
        }}
      >
        <PaperWrapper className="paper">
          <Subsection style={{ paddingBottom: '10px' }}>
            <div className="form-progress">
              <div
                className="form-progress-indicator"
                style={{
                  width: this.state.stepProgress
                    ? `${this.state.stepProgress}%`
                    : 0,
                }}
              />
            </div>
            <Formio
              src={this.props.url}
              onNextPage={this.onPageChange}
              onPrevPage={this.onPageChange}
              submission={this.props.submission}
              ref={r => {
                this.form = r;
              }}
            />
            {showSubmit && (
              <ButtonWrapper design="filled" onClick={this.props.onSubmit}>
                Submit
              </ButtonWrapper>
            )}
          </Subsection>
        </PaperWrapper>
      </Subsection>
    );
  }
  componentDidMount() {
    // const formio = new Formio('https://sghomeneeds-formio.herokuapp.com/test');
    // console.log(formio);
  }
  onPageChange = d => {
    this.setState({ formPage: d.page });
  };
}

export default Form;
