import { Link } from 'react-router-dom';
import '../styles/components/ActionButton.css'
const ActionButton = ({ text, to }) => {
  return (
    <Link to={to} className="actionButtonLink">
      <button className="actionButton">{text}</button>
    </Link>
  );
}

ActionButton.propTypes = {
  text: PropTypes.string.isRequired,
  to: PropTypes.string.isRequired,  // Add this prop type validation
};
