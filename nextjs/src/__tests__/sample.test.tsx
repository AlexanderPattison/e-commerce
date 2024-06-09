import React from 'react';
import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom';

const SampleComponent = () => {
    return <div>Hello, world!</div>;
};

test('renders Hello, world!', () => {
    render(<SampleComponent />);
    expect(screen.getByText('Hello, world!')).toBeInTheDocument();
});
