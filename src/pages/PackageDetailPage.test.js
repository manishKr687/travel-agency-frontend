import React from 'react';
import { render, screen } from '@testing-library/react';
import { MemoryRouter, Routes, Route } from 'react-router-dom';
import PackageDetailPage from './PackageDetailPage';

// Mock the useOutletContext hook
jest.mock('react-router-dom', () => ({
  ...jest.requireActual('react-router-dom'),
  useOutletContext: () => ({
    packages: [
      { id: '1', name: 'Test Package 1', destination: 'Test Destination 1', duration: '7', price: 1000, theme: 'Adventure', type: 'Luxury' },
      { id: '2', name: 'Test Package 2', destination: 'Test Destination 2', duration: '5', price: 800 },
    ],
    loading: false,
  }),
}));

describe('PackageDetailPage', () => {
  it('renders package details correctly when all data is present', () => {
    render(
      <MemoryRouter initialEntries={['/packages/1']}>
        <Routes>
          <Route path="/packages/:id" element={<PackageDetailPage />} />
        </Routes>
      </MemoryRouter>
    );

    expect(screen.getByText('Test Package 1')).toBeInTheDocument();
    expect(screen.getByText('Test Destination 1')).toBeInTheDocument();
    expect(screen.getByText('7 Days')).toBeInTheDocument();
    expect(screen.getByText('Adventure')).toBeInTheDocument();
    expect(screen.getByText('Luxury Package')).toBeInTheDocument();
  });

  it('renders package details with default values when theme and type are missing', () => {
    render(
      <MemoryRouter initialEntries={['/packages/2']}>
        <Routes>
          <Route path="/packages/:id" element={<PackageDetailPage />} />
        </Routes>
      </MemoryRouter>
    );

    expect(screen.getByText('Test Package 2')).toBeInTheDocument();
    expect(screen.getByText('Test Destination 2')).toBeInTheDocument();
    expect(screen.getByText('5 Days')).toBeInTheDocument();
    expect(screen.getByText('General')).toBeInTheDocument();
    expect(screen.getByText('Standard Package')).toBeInTheDocument();
  });

  it('renders package not found message for invalid package id', () => {
    render(
      <MemoryRouter initialEntries={['/packages/99']}>
        <Routes>
          <Route path="/packages/:id" element={<PackageDetailPage />} />
        </Routes>
      </MemoryRouter>
    );

    expect(screen.getByText('Package not found')).toBeInTheDocument();
  });
});
