import React, { useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import Button from '../../components/Button';

function Main() {
  const [counter, setCount] = useState(0);
  /* return (
    <div>
      <Button onClick={() => alert('Hello!')}>
        Say Hi!
        <FontAwesomeIcon icon="star" />
      </Button>
    </div> */
  const increase = () => {
    setCount(prevCount => prevCount + 1);
  };

  const decrease = () => {
    setCount(prevCount => prevCount - 1);
  };

  const reset = () => {
    setCount(0);
  };

  const superIncrease = () => {
    setCount(prevState => (prevState + 1) * 2);
  };

  return (
    <div>
      <div>
        Count:
        {counter}
      </div>
      <Button type="info" onClick={increase}>
        +
      </Button>
      <Button type="warning" onClick={decrease}>
        -
      </Button>
      <Button type="success" onClick={reset}>
        reset
      </Button>
      <Button type="danger" onClick={superIncrease}>
        super
      </Button>
    </div>
  );
}

export default Main;
