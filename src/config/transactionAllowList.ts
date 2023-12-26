export interface ComparisonOperation {
  eq?: string; // txValue == condition is allowed
  nq?: string; // txValue != condition is allowed
  gt?: string; // txValue > condition is allowed
  gte?: string; // txValue >= condition is allowed
  lt?: string; // txValue < condition is allowed
  lte?: string; // txValue <= condition is allowed
}

export interface RateLimit {
  name: string;
  perFrom?: boolean;
  perTo?: boolean;
  perMethod?: boolean;
  interval: number;
  limit: number;
}

export interface TransactionAllow {
  fromList: Array<string>;
  toList: Array<string>;
  value?: ComparisonOperation;
  rateLimit?: RateLimit;
}

export const getTxAllowList = (): Array<TransactionAllow> => {
  return [
    {
      fromList: ['*'],
      toList: ['*'],
    },
  ];
};

export const getDeployAllowList = (): Array<string> => {
  return [
    '0x68C297EDdd953961E81532202e48b048e459c7c3',
    '0xA9670dC72Edc9f4FB01f4DC0ba7F85CC62a152ff',
    '0xDd55AcB0f5305040F4242EA8DBa5417b5b76c20f',    
    '0x5E07339ef374E362E597AED56786F9D3FfA44C99',
    '0x7fA458110953C5D41e2cb4B398A20c1A28247F47',
    '0xcAeCa39050EE6F1c45f4a320D218b00156a08e07',
    '0xC5D9DB4A42447c1B2856B41c433B01f1f8c353A0',
    '0xc5d9db4a42447c1b2856b41c433b01f1f8c353a0',
    '0xBb7788BF80955E7A5B809cfD3869170985410A70',
    '0xcB9CeF1D2E83e143eA9ce576A5F0C8710dA2F60b',
    '0x322a60D8c965479229b13881B3298aC20BBe8aF8',
    '0xefb98d7283252d4f6f913e153688C015C18Fa396',
    '0xEF8DB6F738C348B36ce8Ab00B041701450F8D2b0',
    '0xef8db6f738c348b36ce8ab00b041701450f8d2b0',
    '0x75c0C766C7a4D0744544B4f8D37C8362f64219eC',
    '0x75c0c766c7a4d0744544b4f8d37c8362f64219ec'
  ];
};

export const getUnlimitedTxRateAddresses = (): Array<string> => {
  return [''];
};
