import "./styles.scss";
import { FacebookIcon } from "../../assets/icons/facebook";
import { InstagramIcon } from "../../assets/icons/instagram";
import { TwitterIcon } from "../../assets/icons/twitter";
import { LinkedinIcon } from "../../assets/icons/linkedin";

export default function Footer() {
 return (
  <div className="footer">
   <div className="footer__container">
    <div className="footer__main">
     <div className="footer__main--section-description">
      <h3>BuyMe!</h3>
      <p>
       Lorem ipsum dolor sit amet consectetur adipisicing elit. Doloribus quis
       amet corporis. Rem consectetur fugit maxime, distinctio deleniti
       necessitatibus minus laborum magni eveniet similique nesciunt natus
       minima, veniam optio odit.
      </p>
      <div>
       <FacebookIcon />
       <InstagramIcon />
       <TwitterIcon />
       <LinkedinIcon />
      </div>
      <div></div>
     </div>
     <div className="footer__main--section">
      <h3>Explore</h3>
      <ul>
       <li>
        <a>Resources</a>
       </li>
       <li>
        <a>Blog</a>
       </li>
       <li>
        <a>Docs</a>
       </li>
      </ul>
     </div>
     <div className="footer__main--section">
      <h3>
       <a>Help</a>
      </h3>
      <ul>
       <li>
        <a>FAQ</a>
       </li>
      </ul>
     </div>
     <div className="footer__main--section">
      <h3>Company</h3>
      <ul>
       <li>
        <a>About</a>
       </li>
       <li>
        <a>Partners</a>
       </li>
       <li>
        <a>Customers</a>
       </li>
       <li>
        <a>Careers</a>
       </li>
       <li>
        <a>Contact us</a>
       </li>
      </ul>
     </div>
    </div>
    <div className="footer__additional">
     <p>© 2024 Buyme Inc.</p>
     <div>
      <ul className="footer__additional--links">
       <li>
        <a>Security</a>
       </li>
       <li>
        <a>Privacy</a>
       </li>
       <li>
        <a>Terms</a>
       </li>
      </ul>
     </div>
    </div>
   </div>
  </div>
 );
}
