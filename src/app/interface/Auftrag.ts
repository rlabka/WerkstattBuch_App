export interface Auftrag {
  kundeinformationen: {
    firstName: string;
    lastName: string;
    tel: number;
    email: string;
    adresse: string;
    hausnummer: number;
    plz: number;
    stadt: string;
    auswahl: string;
  };
  autoinformationen: {
    automarke: string;
    fahrzeugtyp: string;
    reifengroesse: number;
    radgroesse: string;
    raederart: string;
    anzahlreifen: number;
  };
  timestamp: Date;
  status: string;
  termin: {
    termindatum: string;
    terminuhrzeit: string;
  };
}
