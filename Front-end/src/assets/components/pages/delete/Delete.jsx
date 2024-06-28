import axios from "axios";
import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";

const Delete = () => {
    const { id } = useParams();
    const [photo, setPhoto] = useState(null);
    const navigate = useNavigate();
    

    useEffect(() => {
        axios.get(`http://localhost:3000/photo/${id}`)
            .then(({ data }) => setPhoto(data))
            .catch(error => {
                console.error(error);
            });

        return () => {
            setPhoto(null);
        };
    }, [id]);

    if (!photo) {
        return <div>Loading...</div>;
    }

    const deleteSubmit = async () => {
        try {
            await axios.delete(`http://localhost:3000/photo/${id}`);
            navigate('/');
        } catch (error) {
            console.error("There was an error deleting the photo!", error);
        }
    };

    return (
        <main>
            <div className="container">
                <div className="row">
                    <div className="col-12 text-center">
                        <h1>Sei sicuro di volerlo eliminare?</h1>
                    </div>
                    <div className="col-12 text-center">
                        <h2>{photo.title}</h2>
                        <figure>
                        <img src={`http://localhost:3000/${photo.img_path}`} alt={photo.title} />
                        </figure>
                        <p>{photo.description}</p>
                    </div>
                    <div className="col-12 text-center">
                        <button onClick={deleteSubmit}>Cancella la foto</button>
                    </div>
                </div>
            </div>
        </main>
    );
};

export default Delete;
