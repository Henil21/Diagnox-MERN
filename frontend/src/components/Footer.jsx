import "./Footer.css";

const Footer = () => {
  return (
    <>
  <section className="footer">
    <div className="container">
      <div className="row">
        <div className="footer-column">
          <div className="footer-block">
            <h4>Address</h4>
            <hr />
            <p>Parul University, Post Limda, Waghodia, Gujarat-391760.</p>
          </div>
        </div>
        <div className="footer-column">
          <div className="footer-block">
            <h4>Useful Links</h4>
            <hr />
            <ul className="footer-links">
              <li><a href="/home">Home</a></li>
              <li><a href="/Brain">Brain Diagnosis</a></li>
              <li><a href="/diabetes">Diabetes</a></li>
              <li><a href="/vision_assist">Vision Assist</a></li>
              <li><a href="/contect">Contact Us</a></li>
              <li><a href="/help">Help</a></li>
            </ul>
          </div>
        </div>
        <div className="footer-column">
          <div className="footer-block">
            <h4>Contact</h4>
            <hr />
            <p>
              Phone: +91 000 111 0101<br />
              Mobile No: +91 111 000 1010<br /><br />
              Email Address: diagnoxai@gmail.com
            </p>
          </div>
        </div>
      </div>
    </div>
  </section>

  <section className="bottom-footer">
    <div className="container">
      <div className="row">
        <div className="bottom-footer-links">
          <a href="#">Privacy Policy</a>
          <a href="#">Terms of Use</a>
        </div>
        <div className="bottom-footer-credits">
          Developed by:Aarati Joshi
        </div>
      </div>
    </div>
  </section>
</>
  );
};
export default Footer;
