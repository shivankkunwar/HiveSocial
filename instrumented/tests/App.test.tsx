
import { render } from "@testing-library/react"
import '@testing-library/jest-dom'
import App from "../App"
import {  test } from '@jest/globals';

test('demo', () => {
    expect(true).toBe(true)
})

test("Renders the main page", () => {
    render(<App />)
    expect(true).toBeTruthy()
})

