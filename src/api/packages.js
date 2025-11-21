import apiConfig from './apiConfig';

const SITE_MODE = process.env.REACT_APP_SITE_MODE;

export const getPackages = async () => {
  if (SITE_MODE === 'static') {
    try {
      // In static mode, fetch from the public folder
      const response = await fetch('/packages.json');
      if (!response.ok) {
        throw new Error('Failed to fetch static packages');
      }
      return await response.json();
    } catch (error) {
      console.error('Error fetching static packages:', error);
      throw error;
    }
  }
  try {
    const response = await fetch(`${apiConfig.baseURL}/packages`);
    if (!response.ok) {
      throw new Error('Failed to fetch packages');
    }
    return await response.json();
  } catch (error) {
    console.error('Error fetching packages:', error);
    throw error;
  }
};

export const addPackage = async (pkg) => {
  if (SITE_MODE === 'static') {
    console.log('addPackage is disabled in static mode');
    return pkg;
  }
  try {
    const response = await fetch(`${apiConfig.baseURL}/packages`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: 'Bearer ' + localStorage.getItem('token'),
      },
      body: JSON.stringify(pkg),
    });
    if (!response.ok) {
      throw new Error('Failed to add package');
    }
    return await response.json();
  } catch (error) {
    console.error('Error adding package:', error);
    throw error;
  }
};

export const deletePackage = async (id) => {
  if (SITE_MODE === 'static') {
    console.log('deletePackage is disabled in static mode');
    return { success: true };
  }
  try {
    const response = await fetch(`${apiConfig.baseURL}/packages/${id}`, {
      method: 'DELETE',
      headers: {
        Authorization: 'Bearer ' + localStorage.getItem('token'),
      },
    });
    if (!response.ok) {
      throw new Error('Failed to delete package');
    }
    return { success: true };
  } catch (error) {
    console.error('Error deleting package:', error);
    throw error;
  }
};
