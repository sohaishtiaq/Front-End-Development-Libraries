export const Footer = () => {
  return (
    <footer>
      <div className="footer-container">
        <div>
          <h3>About Us</h3>
          <ul>
            <li><a href="#">Our Story</a></li>
            <li><a href="#">Our Team</a></li>
          </ul>
        </div>

        <div>
          <h3>Quick Links</h3>
          <ul>
            <li><a href="#">Home</a></li>
            <li><a href="#">Services</a></li>
          </ul>
        </div>

        <div>
          <h3>Follow Us</h3>
          <ul>
            <li><a href="#">Facebook</a></li>
            <li><a href="#">Instagram</a></li>
          </ul>
        </div>
      </div>

      <div className="footer-bottom">
        <p>Copyright © 2026 My Website. All rights reserved.</p>

        <div className="social-links">
          <a href="#">FB</a>
          <a href="#">IG</a>
          <a href="#">X</a>
        </div>
      </div>
    </footer>
  );
};
