import { Button, Flex } from "@chakra-ui/react";
import { FC } from "react";
import { useOutletContext } from "react-router-dom";
import { OutletContext } from "../components/Layout";
import { ethers } from "ethers";
import CameraModule from "../components/CameraModule";

const Home: FC = () => {
  const { signer, setSigner, mintContract } = useOutletContext<OutletContext>();

  const onClickMetamask = async () => {
    try{
      if(!window.ethereum) return;

      const provider = new ethers.BrowserProvider(window.ethereum);

      setSigner(await provider.getSigner());
    }
    catch(error){
      console.error(error);
    }
  }
  

  return (
    <Flex
      bgColor="red.100"
      w="100%"
      minH="100vh"
      justifyContent="center"
      alignItems="center"
      flexDir="column"
    >
      {signer ? (
        <>
          <CameraModule mintContract={mintContract}/>
        </>
      ) : (
        <Button onClick={onClickMetamask}>🦊 로그인</Button>
      )}
    </Flex>
  );
};

export default Home;