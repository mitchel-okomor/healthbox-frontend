import React from 'react';
import './address.css';

function Address() {
    return (
        <div>
            <h3 className="mt-5">The following are your provided addresses</h3>
          <div className="row mt-5"> 
          <div className="col-6 col-sm-6 col-ms-12">
              <div><h2>Billing address</h2>
              </div>
              </div>
          <div  className="col-6 col-sm-6 col-ms-12">
              <div><h2>Shipping address</h2>
              </div>
              </div> 
            </div>
        </div>
    )
}

export default Address;
