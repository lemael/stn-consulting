import React from "react";
type Bild = {
  id: number;
  image: string;
};

interface Props {
  bilder: Bild[];
}
const PhotoGaleryImmobilien: React.FC<Props> = ({ bilder }) => {
  if (bilder.length === 0) {
    return <p>Keine Bilder verfügbar.</p>;
  }

  return (
    <div>
      {bilder.map((bild) => (
        <img
          key={bild.id}
          src={bild.image}
          alt={`Bild ${bild.id}`}
          style={{ width: "100%", marginBottom: "1rem", borderRadius: "8px" }}
        />
      ))}
    </div>
  );
};

export default PhotoGaleryImmobilien;
