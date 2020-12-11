import React, { Component } from 'react'

// Import CSS Files
import '../style/desktop.css'
import '../style/tablet.css'
import '../style/mobile.css'

// Import Images
import footerIcons from '../img/footer.svg'

class Footer extends Component {

  render() {
    return (
      <div className="row justify-content-center d-flex align-items-center">
        <div className="col-12 text-center">
          <img className="footer-icons" src={footerIcons} alt="Logo da Batata e do segure.ai" />
          <div className="justify-content-center d-flex align-items-center">
            <a href="https://www.facebook.com/segureai" rel="noopener noreferrer" target="blank">
              <div className="footer-facebook" />
            </a>
            <a href="https://www.instagram.com/segure.ai" rel="noopener noreferrer" target="blank">
              <div className="footer-instagram" />
            </a>
          </div>
        </div>
      </div>
    )
  }
}

export default Footer
