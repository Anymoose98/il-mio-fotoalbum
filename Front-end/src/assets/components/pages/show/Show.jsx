import axios from "axios";
import { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";

const Show = () => {
    const { id } = useParams();
    const [photo, setPhoto] = useState(null);

    useEffect(() => {
        axios.get(`http://localhost:3000/photo/${id}`)
            .then(({ data }) => setPhoto(data))
            .catch(error => {
                console.error(error);
            });

        return () => {
            setPhoto(null);
        }
    }, [id]);

    if (!photo) {
        return <div>Loading...</div>;
    }

    return (
        <main>
            <div className="container">
                <div className="row">
                    <div className="col-12 text-center">
                        <h1>{photo.title}</h1>
                        <figure>
                            <img src={`http://localhost:3000/${photo.img_path}`} alt={photo.title} />
                        </figure>
                        <p>{photo.description}</p>
                    </div>
                    <div className="col-12 text-center">
                        <button>
                            <Link to={`/delete/${photo.id}`}>Elimina</Link>
                        </button>
                    </div>
                </div>
            </div>
        </main>
    );
}

export default Show;
