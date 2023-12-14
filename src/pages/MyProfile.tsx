import  { useState } from 'react';
import { useUserContext } from '../../Context/context.tsx';
import styled from 'styled-components';
import { Modal } from 'antd';

const ProfileContainer = styled.div`
  display: grid;
  grid-template-columns: 1fr 2fr;
  grid-gap: 2rem;
  padding: 2rem;
  height: 100vh;
  align-items: center;
  justify-content: center;
  background: #f5f5f5;
`;

const ProfileImage = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  img {
    width: 150px;
    height: 150px;
    border-radius: 50%;
    object-fit: cover;
  }
`;

const ProfileDetails = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: flex-start;
  width: 100%;
  max-width: 400px;
  border-radius: 5px;
  padding: 2rem;
  background: white;
  box-shadow: 0px 10px 30px -5px rgba(0, 0, 0, 0.1);
`;

const ProfileField = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 1rem;
`;

const ProfileLabel = styled.label`
  font-weight: bold;
  margin-right: 1rem;
`;

const ProfileInput = styled.input`
  flex-grow: 1;
  border: none;
  border-bottom: 2px solid #1890ff;
  &:focus {
    outline: none;
  }
`;

const ProfileButton = styled.button`
  background-color: #1890ff;
  color: white;
  padding: 0.5rem 1rem;
  border: none;
  border-radius: 4px;
  cursor: pointer;
  margin-top: 1rem;
  align-self: flex-end;
`;

function MyProfile() {
  const { user, setUser } = useUserContext();
  const [isEditing, setIsEditing] = useState(false);

  const handleEdit = () => {
    setIsEditing(!isEditing);
  };

  const handleChange = (e: any) => {
    setUser({ ...user, [e.target.name]: e.target.value });
  };
  const handleConfirmEdit = () => {
    Modal.confirm({
      title: 'Confirm Edit',
      content: 'Are you sure you want to save these changes?',
      onOk: handleEdit,
      onCancel() {
        console.log('Cancel');

      },
      okText:"Yes",
            cancelText:"No"
    });
  };

  return (
    <ProfileContainer>
      <ProfileImage>
        <img src={user.photo} alt="Profile" />
      </ProfileImage>
      <ProfileDetails>
        <ProfileField>
          <ProfileLabel>Email:</ProfileLabel>
          <span>{user.email}</span>
        </ProfileField>
        <ProfileField>
          <ProfileLabel>Name:</ProfileLabel>
          {isEditing ? (
            <ProfileInput name="name" value={user.name} onChange={handleChange} />
          ) : (
            <span>{user.name}</span>
          )}
        </ProfileField>
        <ProfileField>
          <ProfileLabel>Photo:</ProfileLabel>
          {isEditing ? (
            <ProfileInput name="photo" value={user.photo} onChange={handleChange} />
          ) : (
            <span>{user.photo}</span>
          )}
        </ProfileField>
        <ProfileButton onClick={isEditing ? handleConfirmEdit : handleEdit} >{isEditing ? 'Save' : 'Edit'}</ProfileButton>
      </ProfileDetails>
    </ProfileContainer>
  );
}

export default MyProfile;
