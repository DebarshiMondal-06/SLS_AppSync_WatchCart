import React from 'react';
import './spinner.css'

const Spinner = () => {
  return <section style={{ marginTop: '10%', textAlign: 'center' }}>
    <div className="lds-ripple"><div></div><div></div></div>
  </section>
}

export default Spinner;