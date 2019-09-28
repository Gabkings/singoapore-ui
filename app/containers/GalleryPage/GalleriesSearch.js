/* eslint-disable no-underscore-dangle */
import React from 'react';
import {
  Grid,
  Card,
  Input,
  Icon,
  Label,
  Dropdown,
  Form,
} from 'semantic-ui-react';
import PropTypes from 'prop-types';
import './galleries-search.css';
import ButtonWrapper from '../../components/Base/Button';

/* eslint-disable react/prefer-stateless-function */
export default class GalleriesSearch extends React.PureComponent {
  static propTypes = {
    categoryOptions: PropTypes.array,
    onApplyFilter: PropTypes.func,
  };

  constructor() {
    super();
    this.state = {
      search: '',
      categories: [],
    };
  }

  onInputChange = (key, value) => {
    this.setState({ [key]: value });
  };

  render() {
    const { search, categories } = this.state;
    const { categoryOptions, onApplyFilter = () => {} } = this.props;

    const selectOptions = categoryOptions.map(category => ({
      key: category.id,
      value: category.id,
      text: category.name,
    }));

    return (
      <Card className="galleries-search">
        <Card.Content>
          <Form
            onSubmit={() => {
              onApplyFilter({
                search: this.state.search,
                categories:
                  this.state.categories.length > 0
                    ? this.state.categories
                    : null,
              });
            }}
          >
            <Grid padded className="galleries-search-grid">
              <Grid.Row>
                <Grid.Column mobile={16} computer={8}>
                  <Input
                    type="text"
                    className="galleries-search-input"
                    placeholder="Keywords"
                    labelPosition="right"
                    fluid
                    name="search"
                    value={search}
                    onChange={(e, data) =>
                      this.onInputChange('search', data.value)
                    }
                    label={
                      <Label basic>
                        <Icon fitted className="search" />
                      </Label>
                    }
                  />
                </Grid.Column>
                <Grid.Column mobile={16} computer={8}>
                  <Dropdown
                    className="gallery-category-filter"
                    placeholder="Filter by category"
                    name="categories"
                    fluid
                    multiple
                    search
                    selection
                    options={selectOptions}
                    value={categories}
                    onChange={(e, data) =>
                      this.onInputChange('categories', data.value)
                    }
                  />
                </Grid.Column>
                <Grid.Column width={16} textAlign="right">
                  <ButtonWrapper width={150} design="outline" type="submit">
                    Apply filters
                  </ButtonWrapper>
                </Grid.Column>
              </Grid.Row>
            </Grid>
          </Form>
        </Card.Content>
      </Card>
    );
  }
}
