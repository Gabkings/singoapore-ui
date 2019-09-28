/* eslint-disable jsx-a11y/label-has-for,react/no-did-update-set-state */
import React from 'react';
import PropTypes from 'prop-types';
import { Modal } from 'semantic-ui-react';
import v4 from 'uuid/v4';
import ReactTable from 'react-table';
import SubPageWrapper from '../SubpageWrapper';
import SubPageDescription from '../SubpageWrapper/SubPageDescription';
import SubPageContent from '../SubpageWrapper/SubPageContent';
import './styles.css';
import ButtonWrapper from '../../../components/Base/Button';
import Subsection from '../../../components/Section/Subsection';
import { DASHBOARD_VIEW } from '../../../reducers/dashboard';
import { DEALS, LISTINGS } from '../../../actions/restApi';
import DealModal from './DealModal';

/* eslint-disable react/prefer-stateless-function */
export default class DealsSubPage extends React.PureComponent {
  static propTypes = {
    currentTab: PropTypes.string,
    dispatchAction: PropTypes.func.isRequired,
    // [DASHBOARD_VIEW]: PropTypes.object,
    user: PropTypes.object.isRequired,
  };
  state = {
    openDeleteModal: false,
    openAddModal: false,
    openEditModal: false,
  };

  render() {
    const { currentTab } = this.props;

    const columns = [
      {
        id: 'date',
        Header: 'Date',
        accessor: d => new Date(d.date).toDateString().slice(4),
      },
      {
        Header: 'Project Type',
        accessor: 'project_type',
        style: { 'white-space': 'unset' },
      },
      {
        Header: 'Customer',
        accessor: 'customer_email',
        style: { 'white-space': 'unset' },
      },
      {
        id: 'invoiceAmount',
        Header: 'Invoice Amount',
        accessor: d => `$${d.invoice_amount_dollars}`,
      },
      {
        id: 'percentCommission',
        Header: '% Comm',
        accessor: d => `${d.percent_commission}%`,
      },
      {
        id: 'remarks',
        Header: 'Promo Code',
        accessor: d => `${d.remarks}`,
      },

      {
        id: 'delete',
        Header: '',
        style: { 'white-space': 'unset' },
        accessor: d => (
          <div>
            <DealModal
              dispatchAction={this.props.dispatchAction}
              deal={d}
              listings={this.props[DASHBOARD_VIEW][LISTINGS.MODEL].LIST}
              open={this.state.openEditModal}
              setOpen={open => {
                this.setState({ openEditModal: open });
              }}
              {...{ [DASHBOARD_VIEW]: this.props[DASHBOARD_VIEW] }}
            />
            <Modal
              trigger={
                <ButtonWrapper
                  design="outline"
                  onClick={() => {
                    this.setState({ openDeleteModal: d.id });
                  }}
                >
                  X
                </ButtonWrapper>
              }
              size="mini"
              open={this.state.openDeleteModal === d.id}
              onClose={() => {
                this.setState({ openDeleteModal: false });
              }}
            >
              <Subsection>
                <h3>Are you sure you want to delete?</h3>
                <ButtonWrapper
                  design="filled"
                  onClick={() => {
                    this.props.dispatchAction({
                      type: DEALS.DELETE.REQUESTED,
                      payload: {
                        id: d.id,
                      },
                    });
                  }}
                >
                  CONFIRM
                </ButtonWrapper>
              </Subsection>
            </Modal>
          </div>
        ),
      },
    ];

    const tables = this.getMonthlyTables(this.props);
    const listings = this.props[DASHBOARD_VIEW][LISTINGS.MODEL].LIST;
    const projectTypes = listings.results
      .map(listing => listing.categories_name)
      .reduce((acc, val) => acc.concat(val), []);
    return (
      <SubPageWrapper currentTab={currentTab} tabTitle="Deals" tabLink="deals">
        <SubPageDescription>
          {'For merchants, please indicate your closed sales here.'}
        </SubPageDescription>
        <SubPageContent>
          <Subsection>
            <div className="add-button-wrapper">
              <Modal
                trigger={
                  <ButtonWrapper
                    design="filled"
                    onClick={() => {
                      this.setState({ openAddModal: true });
                    }}
                  >
                    ADD
                  </ButtonWrapper>
                }
                size="mini"
                dimmer="inverted"
                open={this.state.openAddModal}
                onClose={() => {
                  this.setState({ openAddModal: false });
                }}
                closeIcon
              >
                <Subsection>
                  <h3>Add Deal</h3>
                  <form
                    className="ui form"
                    onSubmit={e => {
                      e.preventDefault();
                      const {
                        date,
                        project_type: projectType,
                        invoice_amount_dollars: invoiceAmountDollars,
                        percent_commission: percentCommission,
                        customer_email: customerEmail,
                        listing,
                        remarks,
                      } = e.target;
                      this.props.dispatchAction({
                        type: DEALS.POST.REQUESTED,
                        payload: {
                          data: {
                            date: date.value,
                            project_type: projectType.value,
                            invoice_amount_dollars: invoiceAmountDollars.value,
                            percent_commission: percentCommission.value,
                            customer_email: customerEmail.value,
                            listing: listing.value,
                            remarks: remarks.value,
                          },
                        },
                      });
                    }}
                  >
                    <div className="field">
                      <label>Listing</label>
                      <select name="listing" className="ui fluid dropdown">
                        {listings.results.map(listing => (
                          <option value={listing.id}>{listing.name}</option>
                        ))}
                      </select>
                    </div>
                    <div className="field">
                      <label>Date</label>
                      <input type="date" name="date" />
                    </div>
                    <div className="field">
                      <label>Customer Email</label>
                      <input type="email" name="customer_email" />
                    </div>
                    <div className="field">
                      <label>Project Type</label>
                      <select name="project_type" className="ui fluid dropdown">
                        <option value="">None</option>
                        {projectTypes.map(projectType => (
                          <option value={projectType}>{projectType}</option>
                        ))}
                      </select>
                    </div>
                    <div className="field">
                      <label>Invoice Amount ($)</label>
                      <input type="number" name="invoice_amount_dollars" />
                    </div>
                    <div className="field">
                      <label>Commission (%)</label>
                      <input type="number" name="percent_commission" />
                    </div>
                    <div className="field">
                      <label>Promo Code</label>
                      <textarea name="remarks" />
                    </div>
                    <ButtonWrapper design="filled" type="submit">
                      SUBMIT
                    </ButtonWrapper>
                  </form>
                  {this.props[DASHBOARD_VIEW][DEALS.MODEL].POST.error && (
                    <p style={{ color: 'red' }}>
                      {this.props[DASHBOARD_VIEW][
                        DEALS.MODEL
                      ].POST.error.toString()}
                    </p>
                  )}
                </Subsection>
              </Modal>
            </div>
            {tables.map(table => (
              <div className="table-wrapper" key={v4()}>
                <h2>{table.name}</h2>
                <ReactTable
                  data={table.results}
                  columns={columns}
                  defaultPageSize={table.results.length}
                  showPageSizeOptions={false}
                />
                <div style={{ textAlign: 'right' }}>
                  <h2>
                    Total:{' $'}
                    {table.results
                      .map(
                        data =>
                          (data.invoice_amount_dollars *
                            data.percent_commission) /
                          100,
                      )
                      .reduce((a, b) => a + b, 0.0)
                      .toFixed(2)}
                  </h2>
                </div>
              </div>
            ))}
          </Subsection>
        </SubPageContent>
      </SubPageWrapper>
    );
  }
  componentDidMount() {
    this.fetchDeals();
    this.fetchListings();
  }
  componentDidUpdate(prevProps) {
    let shouldRefresh = false;
    if (
      this.props[DASHBOARD_VIEW][DEALS.MODEL].DELETE.id !==
        prevProps[DASHBOARD_VIEW][DEALS.MODEL].DELETE.id &&
      this.props[DASHBOARD_VIEW][DEALS.MODEL].DELETE.id !== undefined
    ) {
      shouldRefresh = true;
      this.setState({ openDeleteModal: false });
    }
    if (
      this.props[DASHBOARD_VIEW][DEALS.MODEL].POST.id !==
        prevProps[DASHBOARD_VIEW][DEALS.MODEL].POST.id &&
      this.props[DASHBOARD_VIEW][DEALS.MODEL].POST.id !== undefined
    ) {
      shouldRefresh = true;
      this.setState({ openAddModal: false });
    }
    if (shouldRefresh) {
      this.fetchDeals();
    }
  }
  fetchDeals = () => {
    this.props.dispatchAction({
      type: DEALS.LIST.REQUESTED,
      payload: {
        query: {
          merchant: this.props.user.LOAD_AUTH.data.merchantId,
        },
      },
    });
  };
  fetchListings = () => {
    this.props.dispatchAction({
      type: LISTINGS.LIST.REQUESTED,
      payload: {
        query: {
          merchant: this.props.user.LOAD_AUTH.data.merchantId,
        },
      },
    });
  };
  getMonthlyTables = props => {
    if (props[DASHBOARD_VIEW][DEALS.MODEL].LIST.results === undefined) {
      return [];
    }
    const monthlyTransactions = {};
    props[DASHBOARD_VIEW][DEALS.MODEL].LIST.results
      .map(t => ({
        ...t,
        year: new Date(t.date).getFullYear(),
        month: new Date(t.date).getMonth(),
      }))
      .forEach(t => {
        if (monthlyTransactions[t.year] === undefined) {
          monthlyTransactions[t.year] = {};
        }
        if (monthlyTransactions[t.year][t.month] === undefined) {
          monthlyTransactions[t.year][t.month] = {
            name: `${this.getMonthString(t.month)} ${t.year}`,
            results: [],
          };
        }
        monthlyTransactions[t.year][t.month].results.push(t);
        monthlyTransactions[t.year][t.month].results.sort();
      });
    const tables = [];
    Object.keys(monthlyTransactions)
      .sort()
      .forEach(year => {
        Object.keys(monthlyTransactions[year])
          .sort()
          .forEach(month => {
            tables.push(monthlyTransactions[year][month]);
          });
      });
    return tables;
  };
  getMonthString = monthIndex =>
    [
      'January',
      'February',
      'March',
      'April',
      'May',
      'June',
      'July',
      'August',
      'September',
      'October',
      'November',
      'December',
    ][monthIndex];
}
