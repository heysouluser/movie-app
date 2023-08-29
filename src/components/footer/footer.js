import { Pagination } from 'antd';
import './footer.css';

function Footer(props) {
  const { currentPage, totalPages, updateCurrentPage, searchValue } = props;
  const pageList = (
    <Pagination current={currentPage} total={totalPages} onChange={updateCurrentPage} showSizeChanger={false} />
  );
  const pagination = searchValue !== '' ? pageList : null;
  return <footer className="movie-app__footer">{pagination}</footer>;
}

export default Footer;
