import Wagi from './Wagi.js'



const MathFunctions = {
   profil: ( inputs ) =>
   {
      let { a, b, c, d } = inputs

      // waga
      const obj = a * b * c
      const obj1 = ( a - d * 2 ) * ( b - d * 2 ) * c
      const obj2 = obj - obj1;
      const weight = obj2 * Wagi.stal / 1000000

      // surface
      const bok1 = a * c
      const bok2 = b * c
      const wszystkieBoki = bok1 * 2 + bok2 * 2
      const surface = wszystkieBoki / 100000

      return { weight, surface, itemName: `Profil ${ a }x${ b }x${ d }` }

   },

   pret_k: ( inputs ) =>
   {
      let { a, b, c } = inputs

      // waga
      const weight = a * b * c * Wagi.stal / 1000000;

      //surface
      const bok1 = a * c
      const bok2 = b * c
      const bok3 = a * b
      const wszystkieBoki = bok1 * 2 + bok2 * 2 + bok3 * 2
      const surface = wszystkieBoki / 100000
      return { weight, surface, itemName: `Pręt kwadratowy ${ a }x${ b }` }
   },


   rura: ( inputs ) =>
   {
      // WAGA
      // wynik pręta
      const { a, b, c } = inputs
      const a_2 = a / 2 * a / 2
      const pp1 = Math.PI * a_2
      const wynik = pp1 * c * Wagi.stal / 1000000

      // wynik pręta po odjęciu ścian
      const a_2_ = ( a / 2 - b ) * ( a / 2 - b )
      const pp2 = Math.PI * a_2_
      const wynik1 = pp2 * c * Wagi.stal / 1000000

      // Waga rury
      const weight = wynik - wynik1


      //surface
      const Pb = 2 * Math.PI * ( a / 2 ) * c
      const surface = Pb / 100000

      return { weight, surface, itemName: `Rura fi: ${ a }` }
   },


   pret_o: ( inputs ) =>
   {
      const { a, b } = inputs
      const r2 = ( a / 2 ) * ( a / 2 )

      const weight = Math.PI * r2 * b * Wagi.stal / 1000000

      //surface
      const Pb = 2 * Math.PI * ( a / 2 ) * b
      const pp = Math.PI * Math.pow( a / 2, 2 )
      const pc = Pb + ( 2 * pp )

      const surface = pc / 100000

      return { weight, surface, itemName: `Pręt okrągły fi: ${ a }` }
   }
}


export default MathFunctions