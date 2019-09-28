import React from 'react';
import PropTypes from 'prop-types';
import { Accordion } from 'semantic-ui-react';
import PaperWrapper from '../../components/Base/Paper';
import Subsection from '../../components/Section/Subsection';

/* eslint-disable react/prefer-stateless-function */
export default class FaqSubsection extends React.PureComponent {
  static propTypes = {
    professional: PropTypes.object,
  };

  state = { activeIndex: -1 };

  handleClick = (e, titleProps) => {
    const { index } = titleProps;
    const { activeIndex } = this.state;
    const newIndex = activeIndex === index ? -1 : index;

    this.setState({ activeIndex: newIndex });
  };

  render() {
    const { activeIndex } = this.state;
    let faqData = [];
    if (
      this.props.professional.faq_data &&
      this.props.professional.faq_data.items
    ) {
      if (this.props.professional.faq_data.items.length > 0) {
        faqData = this.props.professional.faq_data.items;
      }
    }

    const faqContent = faqData.map((data, index) => {
      const iconStyle = activeIndex === index ? 'minus' : 'plus';
      const iconClass = `icon ${iconStyle} circle`;
      return (
        <div
          key={data.title + data.content}
          style={{
            borderTop: '1px solid #eeeeee',
            padding: '4px 0',
          }}
        >
          <Accordion.Title
            style={{ paddingLeft: '5px', paddingRight: '20px' }}
            active={activeIndex === index}
            index={index}
            onClick={this.handleClick}
          >
            <span style={{ fontWeight: 'bold' }}>{index + 1}.</span>{' '}
            {data.title}
            <i className={iconClass} style={{ float: 'right' }} />
          </Accordion.Title>
          <Accordion.Content active={activeIndex === index}>
            <p style={{ paddingLeft: '20px', color: 'black' }}>
              {data.content}
            </p>
          </Accordion.Content>
        </div>
      );
    });

    return (
      <Subsection id="faq">
        <PaperWrapper className="paper">
          <h1>FAQ:</h1>
          <Accordion fluid>{faqContent}</Accordion>
        </PaperWrapper>
      </Subsection>
    );
  }
}
