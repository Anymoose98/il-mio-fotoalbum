import { useEffect, useState } from "react";
import HomePageStyles from "./HomePage.module.scss";
import axios from "axios";
import { Link } from "react-router-dom";

const HomePage = () => {
    const [photos, setPhotos] = useState(null);

    useEffect(() => {
        axios.get('http://localhost:3000/photo')
            .then(({ data }) => {
                setPhotos(data);
                console.log(data);
            })
            .catch(error => {
                console.error("There was an error fetching the photos!", error);
            });
    }, []);

    return (
        <main>
            <div className="container">
                <div className="row">
                    <div className="col-12 text-center">
                        <h1>Le mie foto</h1>
                    </div>
                    {photos === null ? (
                        <div>Loading...</div>
                    ) : (
                        photos.map((p) => (
                            <div key={p.id} className="col-12 col-md-4 text-center">
                                <h1>
                                    <Link to={`http://localhost:5173/${p.id}`}>{p.title}</Link>
                                </h1>
                                <figure>
                                    <img src={`http://localhost:3000/${p.img_path.replace(/\\/g, '/')}`} alt={p.title} className={HomePageStyles.photo} />
                                </figure>
                            </div>
                        ))
                    )}
                </div>
            </div>
        </main>
    );
}

export default HomePage;
