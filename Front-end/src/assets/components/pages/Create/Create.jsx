import React, { useState, useEffect } from 'react';
import axios from 'axios';

const Create = () => {
    const [title, setTitle] = useState('');
    const [description, setDescription] = useState('');
    const [visible, setVisible] = useState(true);
    const [imgFile, setImgFile] = useState(null);
    const [categories, setCategories] = useState([]);
    const [selectedCategory, setSelectedCategory] = useState('');

    useEffect(() => {

        // Carica le categorie disponibili dal backend
        axios.get('http://localhost:3000/category')
            .then(response => {
                setCategories(response.data);
            })
            .catch(error => {
                console.error('Errore durante il caricamento delle categorie', error);
            });
    }, []);

    const handleSubmit = async (e) => {
        e.preventDefault();

        // Crea un oggetto FormData per inviare i dati del form
        const formData = new FormData();
        formData.append('title', title);
        formData.append('description', description);
        formData.append('visible', visible);
        formData.append('image', imgFile);
        formData.append('categories', selectedCategory);
        
        try {
            console.log(imgFile)
            const res = await axios.post('http://localhost:3000/photo', formData, {
                headers: {
                    "Content-Type": "multipart/form-data",
                }
            });

            console.log('Risposta dal server:', res.data);
        } catch (error) {
            console.error("Errore durante l'aggiunta della foto:", error);
        }
    };

    return (
        <main>
            <div className="container">
                <div className="row">
                    <div className="col-12 text-center">
                        <h1>Aggiungi la tua foto</h1>
                        <form onSubmit={handleSubmit}>
                            <div className="form-group">
                                <label htmlFor="title">Titolo</label>
                                <input
                                    type="text"
                                    id="title"
                                    value={title}
                                    onChange={(e) => setTitle(e.target.value)}
                                    className="form-control"
                                    required
                                />
                            </div>
                            <div className="form-group">
                                <label htmlFor="description">Descrizione</label>
                                <textarea
                                    id="description"
                                    value={description}
                                    onChange={(e) => setDescription(e.target.value)}
                                    className="form-control"
                                    required
                                ></textarea>
                            </div>
                            <div className="form-group">
                                <label htmlFor="visible">Visibile</label>
                                <select
                                    id="visible"
                                    value={visible ? 'true' : 'false'}
                                    onChange={(e) => setVisible(e.target.value === 'true')}
                                    className="form-control"
                                    required
                                >
                                    <option value="true">Sì</option>
                                    <option value="false">No</option>
                                </select>
                            </div>
                            <div className="form-group">
                                <label htmlFor="imgFile">Immagine</label>
                                <input
                                    type="file"
                                    id="imgFile"
                                    onChange={(e) => setImgFile(e.target.files[0])}
                                    className="form-control-file"
                                    accept="image/*"
                                    required
                                />
                            </div>
                            <div className="form-group">
                                <label htmlFor="category">Categoria</label>
                                <select
                                    id="category"
                                    value={selectedCategory}
                                    onChange={(e) => setSelectedCategory(e.target.value)}
                                    className="form-control"
                                    required
                                >
                                    <option value="">Seleziona una categoria</option>
                                    {categories.map(category => (
                                        <option key={category.id} value={category.id}>
                                            {category.name}
                                        </option>
                                    ))}
                                </select>
                            </div>
                            <button type="submit" className="btn btn-primary">Aggiungi Foto</button>
                        </form>
                    </div>
                </div>
            </div>
        </main>
    );
};

export default Create;
