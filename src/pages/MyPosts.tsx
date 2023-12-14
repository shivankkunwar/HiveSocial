import ProTable from '@ant-design/pro-table';
import { usePostContext } from '../../Context/context';
import { Avatar, Popconfirm, Button, Modal, Input, Tooltip, List} from 'antd';
import {  useState } from 'react';
type CommentType = {
  id: number;
  content: string;
  author: string;
  date: string;
  isOwner: boolean;
};
import { Comment } from '@ant-design/compatible';
function MyPosts() {
  const { posts, setPosts } = usePostContext();
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [editedContent, setEditedContent] = useState('');
  const [editingPostId, setEditingPostId] = useState(null);
  const myPostList = posts.filter((p)=>p.isOwner)
  const handleDeleteClick = (postId : number) => {
    const updatedPosts = posts.filter((p) => p.id !== postId);
    setPosts(updatedPosts);
  };

  const handleEditClick = (postId : any ) => {
    setIsModalVisible(true);
    setEditingPostId(postId);
  };

  const handleOk = () => {
    const today = new Date();
        const dateString = today.toLocaleDateString('en-US', { year: 'numeric', month: 'numeric', day: 'numeric' });
    const updatedPosts = posts.map((p) => {
      if (p.id === editingPostId) {
        return { ...p, date: dateString, content: editedContent };
      }
      return p;
    });
    setPosts(updatedPosts);
    setIsModalVisible(false);
  };

  const handleCancel = () => {
    setIsModalVisible(false);
  };

  const columns = [
    {
      title: 'Name',
      dataIndex: 'name',
      key: 'name',
      render: (_ : any, record: any) => <Avatar src={record.photo} />,
    },
    {
      title: 'Date',
      dataIndex: 'date',
      key: 'date',
    },
    {
      title: 'Content',
      dataIndex: 'content',
      key: 'content',
    },
    {
      title: 'Likes',
      dataIndex: 'likes',
      key: 'likes',
    },
    {
      title: 'Bookmarks',
      dataIndex: 'bookmarks',
      key: 'bookmarks',
    },
    {
      title: 'Action',
      dataIndex: 'action',
      key: 'action',
      render: (_: any, record: any) => (
        <div>
          <Button onClick={() => handleEditClick(record.id)}>Edit</Button>
          <Popconfirm
            title="Are you sure to delete this post?"
            onConfirm={() => handleDeleteClick(record.id)}
            okText="Yes"
            cancelText="No"
          >
            <Button>Delete</Button>
          </Popconfirm>
        </div>
      ),
    },
  ];

  return (
    <div>
      <ProTable
        columns={columns}
        dataSource={myPostList}
        rowKey="id"
        search={false} 
        expandable={{
          expandedRowRender: (record) => (
            <List
              dataSource={record.comments}
              renderItem={(comment: CommentType) => (
                <li>
                  <Comment
                    author={comment.author}
                    avatar={<Avatar src={`https://robohash.org/${comment.author}?size=50x50`} />}
                    content={comment.content}
                    datetime={
                      <Tooltip title={comment.date}>
                        <span>{comment.date}</span>
                      </Tooltip>
                    }
                  />
                </li>
              )}
            />
          ),
        }}
      />
      <Modal title="Edit Post" visible={isModalVisible} onOk={handleOk} onCancel={handleCancel}>
        <Input onChange={(e) => setEditedContent(e.target.value)} />
      </Modal>
    </div>
  );
}

export default MyPosts;
