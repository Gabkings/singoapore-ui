/* eslint-disable prettier/prettier */
import React from 'react';
import PropTypes from 'prop-types';
import v4 from 'uuid/v4';
import { Grid } from 'semantic-ui-react';
import Subsection from '../../components/Section/Subsection';
import Section from '../../components/Section/Section';
import Card from '../../components/Base/Card/Card';
import CardHeader from '../../components/Base/Card/CardHeader';
import './browse-home.css';
import FavoriteButton from '../../components/CustomButton/FavoriteButton';
// import { galleries as stubGalleries } from './content';
import GalleryCarouselFullWidth from '../../components/GalleryCarousel/GalleryCarouselFullWidth';
import { CONSUMERS, GALLERIES } from '../../actions/restApi';
import ButtonWrapper from '../../components/Base/Button';
import LinkWrapper from '../../components/Base/Link';
import { HOME_VIEW } from '../../reducers/home';

/* eslint-disable react/prefer-stateless-function */
export default class BrowseHomeProjectsSection extends React.PureComponent {
  static propTypes = {
    user: PropTypes.object,
    dispatchAction: PropTypes.func,
    // [HOME_VIEW]: PropTypes.object,
  };
  render() {
    const galleries = this.props[HOME_VIEW][GALLERIES.MODEL].results.length > 0 && this.props[HOME_VIEW][GALLERIES.MODEL];
    return (
      <Section id="browse-home">
        <div id="shape-2">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 477 376"
            width="338px"
            height="267px"
          >
            <path
              fillRule="evenodd"
              fill="rgba(255, 177, 0, 0.071)"
              d="M75.891,109.304 C207.548,-41.440 320.042,-37.917 425.417,130.266 C534.882,304.978 469.846,391.194 224.040,372.650 C-17.900,354.397 -58.297,262.944 75.891,109.304 Z"
            />
          </svg>
        </div>
        <Subsection>
          <h2 className="section-title">Browse Home Project:</h2>
          <Subsection style={{ width: '87%' }}>
            <Grid columns={3} stackable>
              <Grid.Row>
                {galleries && galleries.results && galleries.results.map(gallery => (
                  <Grid.Column key={v4()}>
                    <Card
                      className="gallery-card"
                      style={{ boxShadow: 'none' }}
                    >
                      <GalleryCarouselFullWidth
                        gallery={gallery}
                        images={gallery.files.map(file => ({
                          src: file.thumbnail || file.file_field,
                          alt: file.name,
                        }))}
                      />
                      <div className="favourite-wrapper">
                        {this.props.user.isLoggedIn &&
                          this.props.user.LOAD_AUTH.data.consumerId !==
                            null && (
                          <FavoriteButton
                            buttonProps={{
                              className: 'gallery-favourite',
                              onClick: () => {
                                this.props.dispatchAction({
                                  type: CONSUMERS.POST.REQUESTED,
                                  payload: {
                                    id: this.props.user.LOAD_AUTH.data
                                      .consumerId,
                                    url: 'favourite',
                                    data: {
                                      gallery_slug: gallery.slug,
                                    },
                                  },
                                });
                              },
                            }}
                            iconProps={{}}
                            isFavourite={
                              this.props.user[CONSUMERS.MODEL]
                                .favourite_galleries &&
                                this.props.user[
                                  CONSUMERS.MODEL
                                ].favourite_galleries.indexOf(gallery.slug) !==
                                  -1
                            }
                          />
                        )}
                      </div>
                      <CardHeader>
                        <LinkWrapper href={`/gallery/${gallery.slug}`}>
                          <div className="project-text-wrapper">
                            <h3 className="project-title">
                              {gallery.wp_post_title}
                            </h3>
                            <span className="project-subtitle">
                              {gallery.listing_name}
                            </span>
                          </div>
                        </LinkWrapper>
                      </CardHeader>
                    </Card>
                  </Grid.Column>
                ))}
              </Grid.Row>
            </Grid>
          </Subsection>
          <LinkWrapper href="/gallery">
            <ButtonWrapper design="filled">View All</ButtonWrapper>
          </LinkWrapper>
        </Subsection>
      </Section>
    );
  }
  componentDidMount() {
    this.props.dispatchAction({
      type: GALLERIES.LIST.REQUESTED,
      payload: {
        query: {
          showcase: true,
        },
      },
    })
  }
}
