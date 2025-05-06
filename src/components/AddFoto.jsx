import React, { useState, useRef, useEffect } from 'react';

const AddFoto = ({ onImageUpload, externalImage }) => {
    const [image, setImage] = useState(null);
    const [preview, setPreview] = useState(null);
    const [error, setError] = useState(null);
    const fileInputRef = useRef(null);

    useEffect(() => {
        if (externalImage) {
            setPreview(externalImage);  // Устанавливаем изображение
            setImage(null);  // Очищаем локальное состояние изображения
        } else {
            setPreview(null);
            setImage(null);
            if (fileInputRef.current) {
                fileInputRef.current.value = '';
            }
        }
    }, [externalImage]);


    const handleImageChange = async (e) => {
        const file = e.target.files[0];
        if (!file) {
            setError('Файл не выбран');
            return;
        }

        if (!['image/jpeg', 'image/png'].includes(file.type)) {
            setError('Допустимы только JPEG и PNG');
            setImage(null);
            setPreview(null);
            return;
        }

        if (file.size > 5 * 1024 * 1024) {
            setError('Размер файла не должен превышать 5 МБ');
            setImage(null);
            setPreview(null);
            return;
        }

        setError(null);
        setImage(file);
        setPreview(URL.createObjectURL(file));
        console.log('Файл выбран:', file.name, file.type, file.size);

        const formData = new FormData();
        formData.append('file', file);

        try {
            console.log('Отправляем запрос на /api/upload-image');
            const response = await fetch('http://localhost:8000/api/upload-image', { // Добавляем полный URL
                method: 'POST',
                headers: {
                    Authorization: `Bearer ${localStorage.getItem('authToken')}`,
                },
                body: formData,
            });

            if (!response.ok) {
                const errorData = await response.json();
                throw new Error(errorData.detail || 'Ошибка загрузки');
            }

            const data = await response.json();
            const imageUrl = `${data.imageUrl}?t=${Date.now()}`;
            setPreview(imageUrl);
            setImage(null);
            console.log('Успешная загрузка:', data);

            // Передаём URL изображения родителю
            if (onImageUpload) {
                onImageUpload(imageUrl);
            }
        } catch (err) {
            setError(err.message || 'Не удалось загрузить изображение');
            setImage(null);
            setPreview(null);
            console.log('Ошибка загрузки:', err.message);
        }
    };

    const handleDelete = async () => {
        try {
            console.log('Отправляем запрос на /api/delete-image');
            const response = await fetch('http://localhost:8000/api/delete-image', { // Добавляем полный URL
                method: 'DELETE',
                headers: {
                    Authorization: `Bearer ${localStorage.getItem('authToken')}`,
                    'Content-Type': 'application/json',
                },
            });

            if (!response.ok) {
                const errorData = await response.json();
                throw new Error(errorData.detail || 'Ошибка удаления');
            }

            setImage(null);
            setPreview(null);
            setError(null);
            if (fileInputRef.current) {
                fileInputRef.current.value = '';
            }
            console.log('Фото удалено');

            // Сбрасываем URL изображения в родителе
            if (onImageUpload) {
                onImageUpload("");
            }
        } catch (err) {
            setError(err.message || 'Не удалось удалить изображение');
            console.log('Ошибка удаления:', err.message);
        }
    };

    return (
        <>
            <input
                type="file"
                accept="image/jpeg,image/png"
                onChange={handleImageChange}
                id="foto-upload"
                style={{ display: 'none' }}
                ref={fileInputRef}
                disabled={preview && !image}
            />
            <label htmlFor="foto-upload" className="foto-label">
                {preview ? (
                    <img src={preview} alt="Превью" className="foto-preview" />
                ) : (
                    <div className="foto-placeholder">Выберите фото</div>
                )}
            </label>
            {preview && !image && (
                <button type="button" className="delete-button" onClick={handleDelete}>
                    Удалить
                </button>
            )}
            {error && <div className="error-message">{error}</div>}
        </>
    );
};

export default AddFoto;
