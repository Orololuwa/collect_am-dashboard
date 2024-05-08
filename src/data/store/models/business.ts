export interface IBusinessState {
  loading: boolean;
  data: IGetBusiness | null;
  error: boolean;
}

export interface IGetBusiness {
  id: number;
  name: string;
  email: string;
  description: string;
  sector: string;
  is_corporate_affairs: boolean;
  is_setup_complete: boolean;
  logo: string;
  kyc: IKyc;
  created_at: string;
  updated_at: string;
}

export interface IKyc {
  id: number;
  certificate_of_registration: string;
  proof_of_address: string;
  bvn: string;
  created_at: string;
  updated_at: string;
}
