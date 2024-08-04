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
  isCorporateAffair: boolean;
  isSetupComplete: boolean;
  logo: string;
  kyc: IKyc;
  created_at: string;
  updated_at: string;
}

export interface IKyc {
  id: number;
  certificateOfRegistration: string;
  proofOfAddress: string;
  bvn: string;
  created_at: string;
  updated_at: string;
}
