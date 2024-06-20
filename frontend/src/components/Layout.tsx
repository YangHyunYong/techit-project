import { Flex, Image } from "@chakra-ui/react";
import { Dispatch, FC, SetStateAction, useEffect, useState } from "react";
import Header from "./Header";
import { Outlet } from "react-router-dom";
import { JsonRpcSigner } from "ethers";
import { Contract } from "ethers";
import mintContractAbi from "../abis/mintContractAbi.json";
import saleContractAbi from "../abis/saleContractAbi.json";
import { mintContractAddress, saleContractAddress } from "../contractAddress";

export interface OutletContext {
  mintContract: Contract | null;
  saleContract: Contract | null;
  signer: JsonRpcSigner | null;
  setSigner: Dispatch<SetStateAction<JsonRpcSigner | null>>;
}

const Layout: FC = () => {
  const [signer, setSigner] = useState<JsonRpcSigner | null>(null);
  const [mintContract, setMintContract] = useState<Contract | null>(null);
  const [saleContract, setSaleContract] = useState<Contract | null>(null);

  useEffect(() => {
    if (!signer) return;
    setMintContract(new Contract(mintContractAddress, mintContractAbi, signer));
    setSaleContract(new Contract(saleContractAddress, saleContractAbi, signer));
  }, [signer]);

  return (
    <Flex mx="auto" minH="100vh" flexDir="column">
      <Header signer={signer} setSigner={setSigner} />
      <Flex flexGrow={1} position="relative">
        <Image
          src="/images/back2.png"
          position="absolute"
          top={0}
          left={0}
          width="100%"
          height="100%"
          objectFit="cover"
          alt="Background"
        />
        <Flex position="relative" zIndex={1} width="100%">
          <Outlet context={{ signer, setSigner, mintContract, saleContract }} />
        </Flex>
      </Flex>
    </Flex>
  );
};

export default Layout;
