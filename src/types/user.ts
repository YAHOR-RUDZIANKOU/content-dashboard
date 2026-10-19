export type User = {
  id: number;
  name: string;
  username: string;
  email: string;
  phone: string;
  company: CompanyInfo;
  address: Address;
};

type CompanyInfo = {
  name: string;
};

type Address = {
  city: string;
};
