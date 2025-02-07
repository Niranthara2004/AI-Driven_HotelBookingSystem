import PropTypes from 'prop-types';

const Greeting = (props) => {
  console.log(props); // Log props to debug

  return (
    <h1 className="text-blue-500 text-2xl mt-4">
      Hello, {props.name}! You are {props.age} years old.
    </h1>
  );
};

Greeting.propTypes = {
  name: PropTypes.string.isRequired,
  age: PropTypes.number.isRequired,
};

export default Greeting;