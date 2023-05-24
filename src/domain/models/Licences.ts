interface Licenses {
  id: string;
  issuance_date: string;
  expiration_date : string;
  url: string;
  user_id: string;
  status?: LicencesStatus;
  createdAt?: Date;
  updatedAt?: Date;
}

enum LicencesStatus {
  ATIVO,
  SUSPENSO
}

export { Licenses };