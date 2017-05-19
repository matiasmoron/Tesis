import React from 'react';
import Button from 'react-bootstrap/lib/Button';
/**
 * A counter button: tap the button to increase the count.
 */
class Counter extends React.Component {
  constructor() {
    super();
    this.state = {
      count: 0,
    };
  }

  render() {
    return (
      <Button bsStyle="primary"
        onClick={() => {
          this.setState({ count: this.state.count + 1 });
        }}
      >
        Count: {this.state.count}
    </Button>
    );
  }
}
export default Counter;
