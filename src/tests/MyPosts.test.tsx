import { render, screen, fireEvent } from '@testing-library/react';

import MyPosts from '../pages/MyPosts';
import { PostProvider } from '../../Context/PostContext';
import '@testing-library/jest-dom';

describe('MyPosts Component', () => {
  const mockPosts = [
    {
      id: 21,
      name: "Alice",
      photo: "https://robohash.org/hassc2?size=50x50",
      date: "12/12/2023",
      content: "This is a post by Alice.",
      likes: 10,
      bookmarks: 5,
      comments: [
        {
          id: 1,
          content: "first comment test",
          author: "you",
          date: "15/12/2023",
          isOwner: true
        },
        {
          id: 2,
          content: "excited for your comment",
          author: "Alice",
          date: "15/12/2023",
          isOwner: false
        }
      ],
      isOwner: true,
      isLiked: false,
      isBookmarked: false
    }
    // Add more mock posts as needed
  ];
  const mockSetPosts = jest.fn();

  it('renders without crashing', () => {
    render(
      <PostProvider value={{ posts: mockPosts, setPosts: mockSetPosts }}>
        <MyPosts />
      </PostProvider>
    );
    expect(screen.getByText('Your Posts')).toBeInTheDocument();
  });

  it('displays all posts', () => {
    render(
      <PostProvider value={{ posts: mockPosts, setPosts: mockSetPosts }}>
        <MyPosts />
      </PostProvider>
    );

    const posts = screen.getAllByText("Name");
    expect(posts.length).toBe(mockPosts.length);
  });

  it('handles post deletion', () => {
    render(
      <PostProvider value={{ posts: mockPosts, setPosts: mockSetPosts }}>
        <MyPosts />
      </PostProvider>
    );

    const deleteButtons = screen.getAllByText('Delete');
    fireEvent.click(deleteButtons[0]);
    fireEvent.click(screen.getByText('Yes'));
    expect(mockSetPosts).toHaveBeenCalled();
  });

  it('handles post editing', async () => {
    render(
      <PostProvider value={{ posts: mockPosts, setPosts: mockSetPosts }}>
        <MyPosts />
      </PostProvider>
    );

    const editButtons = screen.getAllByText('Edit');
    fireEvent.click(editButtons[0]);
    
    const modalInput = await screen.getByPlaceholderText('Enter your post content here (max length: 200 characters)');

    fireEvent.change(modalInput, { target: { value: 'Edited post content' } });

    const modalOkButton = screen.getByText('Yes');
    fireEvent.click(modalOkButton);

    expect(mockSetPosts).toHaveBeenCalled();
    expect(mockSetPosts).toHaveBeenCalledWith(expect.arrayContaining([expect.objectContaining({ content: 'Edited post content' })]));
  });
});
