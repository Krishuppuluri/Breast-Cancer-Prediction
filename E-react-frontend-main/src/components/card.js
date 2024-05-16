import React from 'react';
import PropTypes from 'prop-types';
import '../styles/components/modelCard.css';
import { Link } from 'react-router-dom';

const Card = ({ src, alt, title, description, text,page  }) => {
  return (
    <div className="card">
      <CardImage src={src} alt={alt} />
      <CardTitle title={title} />
      <CardDescription description={description} />
      <ActionButton text={text}  page={page} />
    </div>
  );
}

Card.propTypes = {
  src: PropTypes.string.isRequired,
  alt: PropTypes.string.isRequired,
  title: PropTypes.string.isRequired,
  description: PropTypes.string.isRequired,
  text: PropTypes.string.isRequired,
  page: PropTypes.string

};

const CardImage = ({ src, alt }) => {
  return <img src={src} alt={alt} className="cardImage" />;
}

CardImage.propTypes = {
  src: PropTypes.string.isRequired,
  alt: PropTypes.string.isRequired,
};

const CardTitle = ({ title }) => {
  return <h2 className="cardTitle">{title}</h2>;
}

CardTitle.propTypes = {
  title: PropTypes.string.isRequired,
};

const CardDescription = ({ description }) => {
  return <p className="cardDescription">{description}</p>;
}

CardDescription.propTypes = {
  description: PropTypes.string.isRequired,
};

const ActionButton = ({ text, page }) => {
  if(page) {
    return (
      <Link to={page} className="actionButtonLink">
        <button className="actionButton">{text}</button>
      </Link>
    );
  } else {
    return <button className="actionButton">{text}</button>;
  }
}

ActionButton.propTypes = {
  text: PropTypes.string.isRequired,
  page: PropTypes.string
};

export default Card;
