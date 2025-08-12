export interface TarotCard {
  id: string;
  arcaneNumber: string;
  arcaneName: string;
  arcaneDescription: string;
  arcaneImage: {
    imageSrc: string;
    author: string;
    license: string;
  };
  goddessName: string;
  goddessDescription: string;
  goddessImage: {
    imageSrc: string;
    author: string;
    licenseUrl: string;
  };
}
