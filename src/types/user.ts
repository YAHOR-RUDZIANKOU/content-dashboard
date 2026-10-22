export type User = {
  id: number;
  name: string;
  username: string;
  email: string;
  phone: string;
  company: CompanyInfo;
  address: Address;
  website: string;
};

type CompanyInfo = {
  name: string;
  catchPhrase: string;
};

type Address = {
  city: string;
  street: string;
  geo: geoTypes;
};

type geoTypes = {
  lat: string;
  lng: string;
};
