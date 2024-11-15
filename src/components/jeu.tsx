import React, { useState, useEffect } from 'react';
import { Container, Snackbar, Alert, Button, Box } from '@mui/material';
import Plateau from './plateau';
import { imagesAleatoires } from '../util/image';

const Jeu: React.FC = () => {
  const [plateau, setPlateau] = useState<string[]>([]); 
  const [cartesRetourne, setCartesRetourne] = useState<number[]>([]);
  const [coupsRestants, setCoupsRestants] = useState(20);
  const [cartesCorrectes, setCartesCorrectes] = useState<number[]>([]);
  const [message, setMessage] = useState<{
    texte: string;
    type: 'success' | 'error';
  } | null>(null); 

  useEffect(() => {
    construireJeu();
  }, []);

  // quand 2 retourner faire comparaison
  // appres verifie si on a gagner
  useEffect(() => {
    if (cartesRetourne.length === 2) {
      verifierPaire();
    }
    if (cartesCorrectes.length === plateau.length && coupsRestants >= 0) {
      setMessage({ texte: '🐈🐈‍⬛🎉🎆 Vous avez gagné ! adoptez vous un chat 🐈🐈‍⬛🎉🎆', type: 'success' });
    } 
  }, [cartesRetourne]);

  useEffect(() => {
    // le et c'est pour etre sur que tu perd pas si tu 
    // as trouvé toutes les paires mais au dernier coup
    if (coupsRestants <= 0 && cartesCorrectes.length !== plateau.length) {
      setMessage({ texte: 'Partie terminée ! oui oui ta perdu', type: 'error' });
      // -1 pour pas afficher le message de victoire apres
      setCoupsRestants(coupsRestants - 1);
      setCartesCorrectes(plateau.map((_, index) => index));
    }
  }, [coupsRestants]);

  // section de construction du plateau
  const construireJeu = () => {
    setPlateau(imagesAleatoires());
    setCartesRetourne([]);
    setCartesCorrectes([]); 
    setCoupsRestants(20); 
    setMessage({ texte: 'Jeu recommencé !', type: 'success' }); 
  };




  // verifier si les cartes sont les memes
  const verifierPaire = () => {
    // les 2 cartes retourné
    const premiereCarte = cartesRetourne[0];
    const deuxiemeCarte = cartesRetourne[1];
    if (plateau[premiereCarte] === plateau[deuxiemeCarte]) {
      setMessage({ texte: 'Bonne paire trouvée !', type: 'success' });
      // ajouter les cartes correctes dans le tableau correcte
      setCartesCorrectes((ancien) => [...ancien, premiereCarte, deuxiemeCarte]);
    } else {
      setMessage({ texte: 'Paire incorrecte.', type: 'error' });
    }  
    // un temps de delai pour voir les cartes 1sec
    setTimeout(() => setCartesRetourne([]), 1000);
    // enlever un coup
    setCoupsRestants(coupsRestants - 1); 
  };



  // savoir si on peut retourner la carte ou non
  const retournerCarte = (index: number) => {
    if (
      // si ya pas deja 2 cartes tourné (pour le delai)
      cartesRetourne.length < 2 &&
      // il reste des coups
      coupsRestants > 0 &&
      // la carte n'est pas déjà tourné
      !cartesRetourne.includes(index) &&
      // la carte n'est pas déjà trouvé
      !cartesCorrectes.includes(index) 
      ) {
      // ajouter la carte dans le tableau de carte a tourné dans 
      // le plateau
      setCartesRetourne((prevState) => [...prevState, index]);
    }
  };



  return (
    <Container maxWidth="sm" >
      <Plateau
        plateau={plateau}
        cartesRetourne={cartesRetourne}
        cartesCorrectes={cartesCorrectes}
        retournerCarte={retournerCarte} 
      />
      <Box sx={{ marginTop: 2 }} justifyContent="center">
        <div>
          Coups restants : {coupsRestants}
        </div>
      </Box>
      {message && (
        <Snackbar open autoHideDuration={6000} onClose={() => setMessage(null)}>
          <Alert
            onClose={() => setMessage(null)}
            severity={message.type}
            sx={{ width: '100%' }}
          >
            {message.texte}
          </Alert>
        </Snackbar>
      )}
      <Box sx={{display: 'flex', gap: 2 }} justifyContent="center">
      <Button variant="contained" onClick={construireJeu}>
          Relancer le jeu
        </Button>
      </Box>

    </Container>
  );
};

export default Jeu;



// emprunt et source : https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Operators/Spread_syntax
// emprunt et source : https://stackoverflow.com/questions/55495198/reacts-setstate-method-with-prevstate-argument
// j'est utiliser un projet react de model sur mon ordi local aussi. surtout pour la structure des affichage (grid et compagnie)