interface Window {
    ethereum:any;
}

interface NftMetadata {
    name: string;
    description: string;
    image: string;
    attributes?: {
      trait_type: string;
      value: string;
    }[];
  }

  interface SaleNftMetadata extends NftMetadata {
    price: bigint;
    tokenOwner: string;
  }

interface RollAvatar{
    brows: string[];
    eyes: string[];
    background: string[];
    glasses: string[];
    lips: string[];
    nose: string[];
  }
