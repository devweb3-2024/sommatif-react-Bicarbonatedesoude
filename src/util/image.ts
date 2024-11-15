export const listeImages = [
    '../public/chat1.png',
    '../public/chat2.png',
    '../public/chat3.png',
    '../public/chat4.png',
    '../public/chat5.png',
    '../public/chat6.png',
    '../public/chat7.png',
    '../public/chat8.png'
  ];
  
  export const imagesAleatoires = () => {
    // Crée une copie de 2 paquets de cartes 
    // pour faire 1 paquet de cartes mélangé
    const cartes = [...listeImages];
    const cartesDouble = [...listeImages];
    const paquet = [...cartes, ...cartesDouble];
    
    // - 1 parce que tableau commence à 0
    for (let i = paquet.length - 1; i > 0; i--) {
        // + 1 parce que tableau commence à 0
        const j = Math.floor(Math.random() * (i + 1)); 
        [paquet[i], paquet[j]] = [paquet[j], paquet[i]]; 
    }
    return paquet;
  };