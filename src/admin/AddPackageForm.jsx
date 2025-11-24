import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import apiConfig from '../api/apiConfig';

const AddPackageForm = () => {
  const { t } = useTranslation();
  const [name, setName] = useState('');
  const [type, setType] = useState('');
  const [theme, setTheme] = useState('');
  const [price, setPrice] = useState('');
  const [duration, setDuration] = useState('');
  const [location, setLocation] = useState('');
  const [imageUrl, setImageUrl] = useState('');

  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();

    const newPackage = {
      name,
      type,
      theme,
      price: parseInt(price),
      duration: parseInt(duration),
      location,
      imageUrl
    };

    try {
      const response = await fetch(`${apiConfig.baseURL}/packages`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: "Bearer " + localStorage.getItem("token")
        },
        body: JSON.stringify(newPackage)
      });

      if (!response.ok) {
        throw new Error(t('admin.addPackage.failed'));
      }

      navigate('/admin/packages');

    } catch (err) {
      alert(t('admin.addPackage.error', { error: err.message }));
    }
  };

  return (
    <div>
      <h2 className="text-3xl font-bold mb-8">{t('admin.addPackage.title')}</h2>
      <form onSubmit={handleSubmit} className="bg-white p-8 rounded-lg shadow-md">

        <div className="mb-4">
          <label className="block text-gray-700">{t('admin.addPackage.nameLabel')}</label>
          <input
            type="text"
            className="w-full p-2 border rounded"
            value={name}
            onChange={(e) => setName(e.target.value)}
            required
          />
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label className="block text-gray-700">{t('admin.addPackage.typeLabel')}</label>
            <input
              type="text"
              className="w-full p-2 border rounded"
              value={type}
              onChange={(e) => setType(e.target.value)}
              placeholder={t('admin.addPackage.typePlaceholder')}
              required
            />
          </div>

          <div>
            <label className="block text-gray-700">{t('admin.addPackage.themeLabel')}</label>
            <input
              type="text"
              className="w-full p-2 border rounded"
              value={theme}
              onChange={(e) => setTheme(e.target.value)}
              placeholder={t('admin.addPackage.themePlaceholder')}
              required
            />
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-4">
          <div>
            <label className="block text-gray-700">{t('admin.addPackage.priceLabel')}</label>
            <input
              type="number"
              className="w-full p-2 border rounded"
              value={price}
              onChange={(e) => setPrice(e.target.value)}
              required
            />
          </div>

          <div>
            <label className="block text-gray-700">{t('admin.addPackage.durationLabel')}</label>
            <input
              type="number"
              className="w-full p-2 border rounded"
              value={duration}
              onChange={(e) => setDuration(e.target.value)}
              required
            />
          </div>

          <div>
            <label className="block text-gray-700">{t('admin.addPackage.locationLabel')}</label>
            <input
              type="text"
              className="w-full p-2 border rounded"
              value={location}
              onChange={(e) => setLocation(e.target.value)}
              required
            />
          </div>
        </div>

        <div className="mt-4 mb-4">
          <label className="block text-gray-700">{t('admin.addPackage.imageUrlLabel')}</label>
          <input
            type="text"
            className="w-full p-2 border rounded"
            value={imageUrl}
            onChange={(e) => setImageUrl(e.target.value)}
            required
          />
        </div>

        <div className="flex justify-end">
          <button
            type="button"
            onClick={() => navigate('/admin/packages')}
            className="bg-gray-400 text-white px-4 py-2 rounded-lg mr-4"
          >
            {t('admin.addPackage.cancelButton')}
          </button>

          <button
            type="submit"
            className="bg-teal-600 text-white px-4 py-2 rounded-lg"
          >
            {t('admin.addPackage.addButton')}
          </button>
        </div>
      </form>
    </div>
  );
};

export default AddPackageForm;
