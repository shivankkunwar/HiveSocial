import { render, fireEvent} from "@testing-library/react"
import '@testing-library/jest-dom'

import Home from "../pages/Home"

import { test } from '@jest/globals';

import { PostProvider } from "../../Context/PostContext.tsx"
type CommentType = {
    id: number;
    content: string;
    author: string;
    date: string;
    isOwner: boolean;
  };
  
  type PostType = {
    id:number;
    name: string;
    photo: string;
    date: string;
    content: string;
    likes: number;
    bookmarks: number;
   
    isOwner: boolean;
    isLiked: boolean;
    isBookmarked: boolean;
    comments:CommentType[];
  };
const mockPosts: PostType[] = [
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
        "isLiked": false,
        "isBookmarked": false
      }
  ]
  
  const mockSetPosts = jest.fn()
  test('Form can be submitted correctly', async () => {
    const { getByText, getByPlaceholderText, queryByText } = render(
        <PostProvider value={{ posts: mockPosts, setPosts: mockSetPosts }}>
            <Home />
        </PostProvider>
    )
    const contentInput = getByPlaceholderText('Enter your post content here (max length: 200 characters)') as HTMLInputElement
    const submitButton = getByText('Post')

    // Check that the new post does not exist in the document before form submission
    expect(queryByText('This is a test post')).toBeNull()

    fireEvent.change(contentInput, { target: { value: 'This is a test post' } })
    fireEvent.click(submitButton)


    // Check that the form input is cleared after form submission
    expect(contentInput.value).toBe('')
})
test('Home component renders correctly', () => {
    const { getByText } = render(<Home />)
    expect(getByText('All posts')).toBeInTheDocument()
    expect(getByText('Create Post')).toBeInTheDocument()
})


test('Form inputs work correctly', () => {
    const { getByPlaceholderText } = render(<Home />)
    const contentInput = getByPlaceholderText('Enter your post content here (max length: 200 characters)') as HTMLInputElement

    fireEvent.change(contentInput, { target: { value: 'This is a test post' } })
    expect(contentInput.value).toBe('This is a test post')
})