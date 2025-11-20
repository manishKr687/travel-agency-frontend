import apiConfig from './apiConfig';

export const getPackages = async () => {
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
