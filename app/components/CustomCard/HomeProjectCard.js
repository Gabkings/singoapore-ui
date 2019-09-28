import React from 'react';
import PropTypes from 'prop-types';

import './custom-card.css';
import CardImage from '../Base/Card/CardImage';
import FavoriteButton from '../CustomButton/FavoriteButton';
import SliderCircle from '../SliderCircle';
import CardHeader from '../Base/Card/CardHeader';
import Card from '../Base/Card/Card';

function HomeProjectCard(props) {
  return (
    <div className="home-project-card">
      <Card style={{ boxShadow: 'none' }}>
        <CardImage source={props.item.imageSource} />
        <div className="favourite-wrapper">
          <FavoriteButton
            buttonProps={{ className: 'favourite' }}
            iconProps={{}}
          />
        </div>
        <div className="left-arrow">
          <i className="angle left icon" />
        </div>
        <div className="right-arrow">
          <i className="angle right icon" />
        </div>
        <div className="slider-circle-wrapper">
          <SliderCircle
            numDots={4}
            active={2}
            iconProps={{ style: { fontSize: '8px' } }}
          />
        </div>
        <CardHeader>
          <div className="project-text-wrapper">
            <h1 className="project-title">{props.item.title}</h1>
            <h3 className="project-subtitle">Condo・S$40,000</h3>
          </div>
        </CardHeader>
      </Card>
    </div>
  );
}

HomeProjectCard.propTypes = {
  item: PropTypes.object,
};

export default HomeProjectCard;
