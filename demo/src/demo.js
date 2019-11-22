import React from 'react';
import ReactDOM from 'react-dom'
import VFormReactstrap from './VFormReactstrap'

import './demo.scss'

const Demo = () => {
  return (
    <div>
      <h1>
        VForm Reactstrap example
      </h1>
      <section>
        <VFormReactstrap/>
      </section>
    </div>
  );
}

ReactDOM.render(<Demo/>, document.getElementById('content'));
