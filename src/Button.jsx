
import PropTypes from 'prop-types';

function Button(props) {

    return (
      <button
        className="bg-white border border-black py-1 px-2 rounded cursor-pointer"
        type="button"
        onClick={props.onClick}
      >
        {props.children}
      </button>
    );
  }
  
  Button.propTypes = {
    text: PropTypes.string.isRequired,
    onClick: PropTypes.func.isRequired,
    children: PropTypes.node.isRequired
  };
  
  export default Button;