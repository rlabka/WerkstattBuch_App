export interface Auftrag {
  kundeinformationen: {
  firstName: string;
  lastName: string;
  tel: string;
  email: string;
  adresse: string;
  hausnummer: string;
  plz: string;
  stadt: string;
  auswahl: string;
};
  autoinformationen: {
    automarke: string;
    fahrzeugtyp: string;
    reifengroesse: string;
    radgroesse: string;
    raederart: string;
    anzahlreifen: number;
  };
  timestamp: Date;
  termin: {
    termindatum: Date;
    terminuhrzeit: string;
  };
}
