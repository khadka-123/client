import React from 'react';

function Navbar() {
  return (
    <header className="p-3 text-bg-dark">
      <div className="container">
        <div className="d-flex flex-wrap align-items-center justify-content-center justify-content-lg-start">
          <a href="/" className="d-flex align-items-center mb-2 mb-lg-0 text-white text-decoration-none">
          <img 
              src="/images/election-logo.png" 
              alt="Election Logo" 
              style={{ width: "80px", height: "35px", marginRight: "10px",borderRadius: "50%"}} 
            />
          </a>
          {/* <ul className="nav col-12 col-lg-auto me-lg-auto mb-2 justify-content-center mb-md-0">
            <li>
        
              <a href="/home" className="nav-link px-2 text-secondary">
                Home
              </a>
            </li>
            <li>
              <a href="/features" className="nav-link px-2 text-white">
                Features
              </a>
            </li>
            <li>
              <a href="/pricing" className="nav-link px-2 text-white">
                Pricing
              </a>
            </li>
            <li>
              <a href="/faqs" className="nav-link px-2 text-white">
                FAQs
              </a>
            </li>
            <li>
              <a href="/about" className="nav-link px-2 text-white">
                About
              </a>
            </li>
          </ul> */}
          
          {/* <div className="text-end">
            <button type="button" className="btn btn-outline-light me-2">
              Login
            </button>
            <button type="button" className="btn btn-warning">
              Sign-up
            </button>
          </div> */}
        </div>
      </div>
    </header>
  );
}

export default Navbar;
