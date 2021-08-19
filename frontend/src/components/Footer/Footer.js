import React from 'react'
import styles from './Footer.module.css'

const Footer = () => {
  return (
    <div className={styles.footer}>
      <div className={styles.footer__content}>
        <div className={styles.addressInfo}>
          <h4><a  style={{'color':'#00205c'}} href="https://www.cabrini.edu/">Cabrini University</a></h4>
          <a href="https://www.google.com/maps/place/610+King+of+Prussia+Rd,+Strafford,+PA+19087/@40.0552064,-75.376199,17z/data=!3m1!4b1!4m2!3m1!1s0x89c69512858ae5df:0x8a30630b304c7ef3">
            <p>610 King of Prussia Road</p>
            <p>Radnor, PA 19087</p>
            <p>United States</p> 
          </a>
          <p style={{'paddingTop':'5px'}}><strong style={{'color':'#00205c'}}>610.902.8100</strong></p>
        </div>

        <div className={styles.about}>
          <div className={styles.blurb}>
            <p> <strong style={{'color':'#00205c'}}>Cabrini University</strong> is a Catholic, liberal-arts university dedicated to academic excellence, leadership development, and a commitment to social justice.</p>
          </div>
          <div className={styles.socials}>
            <a href="http://twitter.com/CabriniUniv"><i className="fab fa-twitter"></i></a>
            <a href="http://instagram.com/cabriniuniversity"><i className="fab fa-instagram"></i></a>
            <a href="http://facebook.com/Cabrini"><i className="fab fa-facebook"></i></a>
            <a href="http://linkedin.com/company/cabrini-university"><i className="fab fa-linkedin"></i></a>
            <a href="http://youtube.com/CabriniCollege"><i className="fab fa-youtube"></i></a>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Footer
