var React = require('react');
require("../../styles/footer.scss");

const Footer = (props) => {
	 return (
	  <footer className="footer-distributed">
          <div className="footer-left text_center white"  >
              <img src="img/fotor_penna.png"/>

               <p  ><span>Hospital Internacional General</span> <br/>
                  DR José Penna
               </p>
          </div>
          <div className="footer-center">
              <div>
                  <i className="glyphicon glyphicon-map-marker"></i>
                  <p><span>Avda. Lainez 2401</span> Bahía Blanca, Argentina</p>
              </div>
              <div>
                  <i className="glyphicon glyphicon-earphone"></i>
                  <p>(0291) 459 3600</p>
              </div>
              <div>
                  <i className=" glyphicon glyphicon-envelope"></i>
                  <p><a href="mailto:support@company.com">support@company.com</a></p>
              </div>
          </div>

          <div className="footer-right text_center">
              <a href="http://www.hospitalpenna.com.ar"><img src="img/datafiscal.jpg"/></a>
          </div>

      </footer>
  )
}

export default Footer
