import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { getPackages, deletePackage } from '../api/packages';

const AdminPackages = () => {
  const { t } = useTranslation();
  const [packages, setPackages] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchPackages();
  }, []);

  const fetchPackages = () => {
    setLoading(true);
    getPackages().then(data => {
      setPackages(data);
      setLoading(false);
    });
  };

  const handleDelete = (id) => {
    if (window.confirm(t('admin.packages.deleteConfirm'))) {
      deletePackage(id).then(() => {
        fetchPackages();
      });
    }
  };

  if (loading) {
    return <div>{t('admin.packages.loading')}</div>;
  }

  return (
    <div>
      <div className="flex justify-between items-center mb-8">
        <h2 className="text-3xl font-bold">{t('admin.packages.title')}</h2>
        <Link to="/admin/packages/add" className="bg-teal-600 text-white px-4 py-2 rounded-lg hover:bg-teal-700 transition duration-300">
          {t('admin.packages.addButton')}
        </Link>
      </div>
      <div className="bg-white p-8 rounded-lg shadow-md">
        <ul className="space-y-4">
          {packages.map(pkg => (
            <li key={pkg.id} className="border-b pb-4 flex justify-between items-center">
              <div>
                <p className="font-bold">{pkg.name}</p>
                <p className="text-sm text-gray-600">${pkg.price}</p>
              </div>
              <div>
                <button className="text-blue-500 hover:underline mr-4">{t('admin.packages.editButton')}</button>
                <button onClick={() => handleDelete(pkg.id)} className="text-red-500 hover:underline">{t('admin.packages.deleteButton')}</button>
              </div>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default AdminPackages;
