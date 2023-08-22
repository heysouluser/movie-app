import { Button, Space } from 'antd';
import './movies-list.css';

import Movie from '../movie';

function MoviesList() {
  return (
    <div>
      <Space direction="vertical">
        <Button type="primary">Primary Button</Button>
      </Space>
      <Movie />
    </div>
  );
}

export default MoviesList;
