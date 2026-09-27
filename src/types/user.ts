export type User = {
  id: number;
  name: string;
  username: string;
  email: string;
  phone: string;
  company: CompanyInfo;
};

type CompanyInfo = {
  name: string;
};
