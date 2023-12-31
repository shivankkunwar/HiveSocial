import ProTable, {ProColumns} from '@ant-design/pro-table';
import { usePostContext } from '../../Context/PostContextUtils';
import { Avatar, Popconfirm, Button, Modal, Input, Tooltip, List, Grid} from 'antd';
import {   useState } from 'react';

const { useBreakpoint } = Grid;

type CommentType = {
  id: number;
  content: string;
  author: string;
  date: string;
  isOwner: boolean;
};
import { Comment } from '@ant-design/compatible';
import { PostType } from '../../utils/Types';
function MyPosts() {
  const { posts, setPosts } = usePostContext();
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [editedContent, setEditedContent] = useState('');
  const [editingPostId, setEditingPostId] = useState<number | null>(null);
  
 const myPostList= posts.filter((p)=>p.isOwner);
  
  const handleDeleteClick = (postId : number) => {
    const updatedPosts = posts.filter((p) => p.id !== postId);
    setPosts(updatedPosts);
  };

  const handleEditClick = (postId : number ) => {
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
  const screens = useBreakpoint();

  const columns:ProColumns<PostType, "text">[] = [
    {
      title: 'Name',
      dataIndex: 'name',
      key: 'name',
      render: (_, record) => <Avatar src={record.photo} />,
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
    
      render: (_, record) => (
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
      <p>Your Posts</p>
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
      <Modal title="Edit Post"  width={screens.xs ? '90vw' : '50vw'} open={isModalVisible} onOk={handleOk} onCancel={handleCancel} okText="Yes"
            cancelText="No">
        <Input onChange={(e) => setEditedContent(e.target.value)} placeholder='Enter your post content here (max length: 200 characters)'/>
      </Modal>
    </div>
  );
}

export default MyPosts;
