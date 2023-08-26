import { Pagination } from 'antd';
import './footer.css';

function Footer() {
  return (
    <footer className="movie-app__footer">
      <Pagination defaultCurrent={1} total={50} />
    </footer>
  );
}

export default Footer;
