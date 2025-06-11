import React, { useState, useRef, useEffect } from 'react';

const AddFoto = ({ onImageUpload, externalImage }) => {
    const [image, setImage] = useState(null);
    const [preview, setPreview] = useState(null);
    const [filename, setFilename] = useState(null); // Новое состояние для хранения имени файла
    const [error, setError] = useState(null);
    const fileInputRef = useRef(null);

    useEffect(() => {
        if (externalImage) {
            // Извлекаем filename из externalImage (например, /uploads/<filename>)
            const extractedFilename = externalImage.split('/').pop().split('?')[0]; // Убираем параметры запроса, если есть
            setPreview(externalImage);
            setFilename(extractedFilename);
            setImage(null);
        } else {
            setPreview(null);
            setFilename(null);
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
            setFilename(null);
            return;
        }

        if (file.size > 5 * 1024 * 1024) {
            setError('Размер файла не должен превышать 5 МБ');
            setImage(null);
            setPreview(null);
            setFilename(null);
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
            const response = await fetch('http://localhost:3000/api/upload-image', {
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
            const extractedFilename = data.imageUrl.split('/').pop(); // Извлекаем имя файла из URL
            setPreview(imageUrl);
            setFilename(extractedFilename); // Сохраняем имя файла
            setImage(null);
            console.log('Успешная загрузка:', data);

            if (onImageUpload) {
                onImageUpload(imageUrl);
            }
        } catch (err) {
            setError(err.message || 'Не удалось загрузить изображение');
            setImage(null);
            setPreview(null);
            setFilename(null);
            console.log('Ошибка загрузки:', err.message);
        }
    };

    const handleDelete = async () => {
        if (!filename) {
            setError('Имя файла не указано');
            return;
        }

        const confirmDelete = window.confirm('Вы действительно хотите удалить изображение?');
        if (!confirmDelete) return;

        try {
            console.log(`Отправляем запрос на /api/delete-image/${filename}`);
            const response = await fetch(`http://localhost:3000/api/delete-image/${filename}`, {
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
            setFilename(null);
            setError(null);
            if (fileInputRef.current) {
                fileInputRef.current.value = '';
            }
            console.log('Фото удалено');

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
