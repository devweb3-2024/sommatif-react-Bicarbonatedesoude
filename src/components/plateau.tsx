import React from 'react';
import { Grid } from '@mui/material';


interface PlateauProps {
  plateau: string[]; 
  cartesRetourne: number[]; 
  cartesCorrectes: number[];
  retournerCarte: (index: number) => void; 
}

const Plateau: React.FC<PlateauProps> = ({
  plateau,
  cartesRetourne, 
  cartesCorrectes,
  retournerCarte 
}) => {
  return (
    <Grid container spacing={2} justifyContent="center" sx={{ marginTop: 2 }}>
      {plateau.map((image, index) => (
        <Grid item xs={3} key={index} justifyContent="center"
        // si cliquer on va methode retournerCarte
        onClick={() => retournerCarte(index)} 
        style={{ height: 100,
          // .includes() vérifie si un élément est dans un tableau
          // Si l'index est dans le tableau cartesRetourne,
          // on affiche l'image de la carte. sinon defaut carte
          background: cartesRetourne.includes(index) || cartesCorrectes.includes(index) ? 
          `url(../public/${image}) center/cover` 
            : `url(../public/dessus-carte.svg) center/cover`,
          border: '1px solid black',
          cursor: 'pointer',
          opacity: 1,
        }}
      />      
      ))}
    </Grid>
  );
};

export default Plateau;
