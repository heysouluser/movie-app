import { Input, Tabs } from 'antd';
import './header.css';

const items = [
  {
    key: '1',
    label: 'Search',
  },
  {
    key: '2',
    label: 'Rated',
  },
];

function Header({ onInputChange, updateTab, tab }) {
  return (
    <header className="movie-app__header">
      <div className="movie-app__tabs-box">
        <Tabs defaultActiveKey="1" items={items} centered size="large" onTabClick={updateTab} />
      </div>
      <div className="movie-app__input-box">
        {tab === '1' ? <Input placeholder="Type to search..." size="large" onChange={onInputChange} /> : null}
      </div>
    </header>
  );
}

export default Header;
