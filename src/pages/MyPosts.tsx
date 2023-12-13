import React from 'react';
import { Card } from 'antd';

const MyPosts = () => {
  return (
    <div>
      <Card title="My Post Title" extra={<a href="#">More</a>}>
        <p>Post content...</p>
      </Card>
      {/* More of my posts... */}
    </div>
  );
}

export default MyPosts;
