import React from 'react';
import PropTypes from 'prop-types';
import v4 from 'uuid/v4';
import FormioUtils from 'formiojs/utils';

import PaperWrapper from '../Base/Paper/index';
import Subsection from '../Section/Subsection';
import { Api } from '../../utils/api';

class FormResult extends React.PureComponent {
  static propTypes = {
    submission: PropTypes.object,
    url: PropTypes.string,
  };
  state = {};
  formatFormData(formData) {
    const { submission } = this.props;
    return (
      <div style={{ textAlign: 'left' }}>
        {Object.keys(submission).map(k => {
          const component = FormioUtils.getComponent(formData.components, k);
          const { label } = component;
          let a = '';
          switch (component.type) {
            case 'radio':
              a = component.values.filter(v => v.value === submission[k])[0]
                .label;
              break;
            case 'selectboxes':
              a = Object.keys(submission[k])
                .filter(o => submission[k][o])
                .map(submissionOption => {
                  for (let i = 0; i < component.values.length; i += 1) {
                    if (submissionOption === component.values[i].value) {
                      return component.values[i].label;
                    }
                  }
                  return null;
                })
                .join(', ');
              break;
            case 'file':
              a =
                submission[k].length > 0 ? (
                  <div>
                    {submission[k].map(file => {
                      const { name, url } = file;
                      return (
                        <img
                          alt={name}
                          src={url}
                          style={{ maxWidth: '100%' }}
                        />
                      );
                    })}
                  </div>
                ) : (
                  'None'
                );
              break;
            case 'address':
              a = submission[k].formatted_address;
              break;
            case 'checkbox':
              a = submission[k].toString();
              break;
            case 'textarea':
              a = submission[k].length > 0 ? submission[k] : 'None';
              break;
            default:
              a = submission[k];
              break;
          }
          return (
            <div key={v4()}>
              <strong>{label}</strong>
              <p>{a}</p>
              <br />
            </div>
          );
        })}
      </div>
    );
  }
  render() {
    return (
      <Subsection style={{ paddingBottom: '10px', maxWidth: '1024px' }}>
        <PaperWrapper>
          <Subsection style={{ paddingBottom: '10px' }}>
            {this.state.form && this.formatFormData(this.state.form)}
          </Subsection>
        </PaperWrapper>
      </Subsection>
    );
  }
  componentDidMount() {
    const { url } = this.props;
    Api(url, { method: 'GET' }).then(response => {
      this.setState({ form: response.data });
    });
  }
}

export default FormResult;
