export class CreditCard {
  type: string;
  account: string;
  associateProduct: string;
  currency: string;
  limitCOP: number;
  limitUSD: number;
  code: string;
  groupNom: string;
  payDate: string;
  insurancePlanInd: string;
  lockCode: string;
  bankCode: number;
  rateServTable: number;
  rateServInitDate: string;
  rateServEndDate: string;

  binCreditCard: string;
  statusCreditCard: boolean;
  expirationCreditCard: string;

  constructor(
    type: string,
    account: string,
    associateProduct: string,
    currency: string,
    limitCOP: number,
    limitUSD: number,
    code: string,
    groupNom: string,
    payDate: string,
    insurancePlanInd: string,
    lockCode: string,
    bankCode: number,
    rateServTable: number,
    rateServInitDate: string,
    rateServEndDate: string,
    binCreditCard: string,
    statusCreditCard: boolean,
    expirationCreditCard: string
  ) {
    this.type = type;
    this.account = account;
    this.associateProduct = associateProduct;
    this.currency = currency;
    this.limitCOP = limitCOP;
    this.limitUSD = limitUSD;
    this.code = code;
    this.groupNom = groupNom;
    this.payDate = payDate;
    this.insurancePlanInd = insurancePlanInd;
    this.lockCode = lockCode;
    this.bankCode = bankCode;
    this.rateServTable = rateServTable;
    this.rateServInitDate = rateServInitDate;
    this.rateServEndDate = rateServEndDate;
    this.binCreditCard = binCreditCard;
    this.statusCreditCard = statusCreditCard;
    this.expirationCreditCard = expirationCreditCard;
  }
}
