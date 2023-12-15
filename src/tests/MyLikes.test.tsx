import { render, screen } from '@testing-library/react';

import MyLikes from '../pages/MyLikes';
import { PostProvider } from '../../Context/PostContext';

describe('MyLikes Component', () => {
    const mockPosts = [
        {
            "id": 21,
            "name": "Alice",
            "photo": "https://robohash.org/hassc2?size=50x50",
            "date": "12/12/2023",
            "content": "This is a post by Alice.",
            "likes": 10,
            "bookmarks": 5,
            "comments":[
              {
                "id":1,
                "content": "first comment test",
                "author":"you",
                "date":"15/12/2023",
                "isOwner":true
              },
              {
                "id":2,
                "content": "excited for your comment",
                "author":"Alice",
                "date":"15/12/2023",
                "isOwner":false
              }
            ],
            "isOwner": false,
            "isLiked": true,
            "isBookmarked": false
          }
      ]
      const mockSetPosts = jest.fn()
  it('renders without crashing', () => {
    render(
      <PostProvider value={{ posts: mockPosts, setPosts:mockSetPosts  }}>
        <MyLikes />
      </PostProvider>
    );
  });

  it('displays only liked posts', () => {
    render(
      <PostProvider value={{ posts: mockPosts,setPosts:mockSetPosts }}>
        <MyLikes />
      </PostProvider>
    );

    const likedPosts = screen.getAllByTestId('post');
    expect(likedPosts.length).toBe(1); // Change this to the expected number of liked posts
  });
});
