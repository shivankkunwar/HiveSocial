import { render, fireEvent, act } from "@testing-library/react"
import '@testing-library/jest-dom'
import { MemoryRouter } from 'react-router-dom'
import SignInForm from "../component/auth/SignInForm"

import { test } from '@jest/globals';
import axios from 'axios';

// Mock axios
jest.mock('axios');
const mockedAxios = axios as jest.Mocked<typeof axios>;

test('SignInForm submits the form correctly', async () => {
    // Setup mock response
    mockedAxios.post.mockResolvedValueOnce({ data: { status: 'ok' } });

    const { getByText, getByPlaceholderText } = render(
        <MemoryRouter>
            <SignInForm />
        </MemoryRouter>
    )

    // Simulate user input
    const emailInput = getByPlaceholderText('enter email')
    const passwordInput = getByPlaceholderText('Password')

    fireEvent.change(emailInput, { target: { value: 'test@test.com' } })
    fireEvent.change(passwordInput, { target: { value: 'password' } })

    // Simulate form submission
    const submitButton = getByText('Login')
    await act(async () => {
        fireEvent.click(submitButton)
    })

    // Check if axios.post was called with the correct arguments
    expect(mockedAxios.post).toHaveBeenCalledWith('/api/login', {
        email: 'test@test.com',
        password: 'password',
        remember: true
    });

    // Wait for promises to resolve
    await new Promise(resolve => setTimeout(resolve, 0));

    // Check if the form submission was successful
    expect(mockedAxios.post).toHaveBeenCalledTimes(1);
})
