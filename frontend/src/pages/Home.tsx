import { Button, Flex, Image, useDisclosure } from "@chakra-ui/react";
import { FC, useEffect, useState } from "react";
import { useNavigate, useOutletContext } from "react-router-dom";
import { OutletContext } from "../components/Layout";
import { ethers } from "ethers";
import axios from "axios";
import MyAvatar from "../components/MyAvatar";
import DailyModal from "../components/DailyModal";
import { CgCardHearts, CgHomeAlt } from "react-icons/cg";

const Home: FC = () => {
  const { signer, setSigner, mintContract } = useOutletContext<OutletContext>();
  const { isOpen, onOpen, onClose } = useDisclosure();

  const [answer, setAnswer] = useState<NftMetadata | null>(null);
  const [isRoll, setIsRoll] = useState<number>(0);

  const navigate = useNavigate();

  const onClickMetamask = async () => {
    try {
      if (!window.ethereum) return;

      const provider = new ethers.BrowserProvider(window.ethereum);

      setSigner(await provider.getSigner());
    } catch (error) {
      console.error(error);
    }
  };

  const onClickInsertCoin = () => {
    setIsRoll(isRoll + 1);
  };

  const getAnswer = async () => {
    // if (!mintContract) return;
    try {
      // const response = await mintContract.getAnswer();
      const response =
        "https://salmon-solid-tern-442.mypinata.cloud/ipfs/QmPfcRYHSJGBiZshxvWDNnsimS2Vjg525HEcripyi84ZVz";

      const result = await axios.get<NftMetadata>(response);

      setAnswer(result.data);
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    if (!localStorage.getItem("isFirst")) {
      onOpen();
    }
  }, []);

  useEffect(() => {
    getAnswer();
  }, []);

  useEffect(() => {
    console.log("ANS", answer);
  }, [answer]);
  return (
    <>
      {!localStorage.getItem("isFirst") ? (
        <DailyModal
          isOpen={isOpen}
          onClose={onClose}
          answer={answer!}
        ></DailyModal>
      ) : (
        <>
          {signer && (
            <Flex
              position="absolute"
              top="20px"
              right="20px"
              gap={6}
              color="#101010"
            >
              <Flex
                flexDir="column"
                alignItems="center"
                onClick={() => navigate("/my-nft")}
                cursor="pointer"
              >
                <CgCardHearts size={30} />
                <Flex fontSize={12}>My NFT</Flex>
              </Flex>
              <Flex
                flexDir="column"
                alignItems="center"
                onClick={() => navigate("/sale-nft")}
                cursor="pointer"
              >
                <CgHomeAlt size={30} />
                <Flex fontSize={12}>Market</Flex>
              </Flex>
            </Flex>
          )}

          <Flex w="35%" justifyContent="center" alignItems="center">
            <Flex
              border="10px solid brown"
              pl="10px"
              pr="10px"
              ml="40px"
              mr="-40px"
              mt="20px"
              w="100%"
              h="60%"
              boxSizing="border-box"
              justifyContent="center"
              bgColor="white"
            >
              <Flex
                flexDir="column"
                justifyContent="center"
                alignItems="center"
              >
                <Flex fontSize="x-large" mb="16px" fontWeight="semibold">
                  Today NFT
                </Flex>
                {/* mintNFT에서 등록된 NFT 가져오기 */}
                <Image width="240px" src={answer?.image} border="1px"></Image>
                <Button bgColor="transparent" />
              </Flex>
            </Flex>
          </Flex>
          <Flex
            w="100%"
            justifyContent="center"
            alignItems="center"
            flexDir="column"
          >
            <Flex
              h="51%"
              w="60%"
              clipPath="polygon(5% 0%, 95% 0%, 100% 100%, 0% 100%)"
              backgroundClip="padding-box"
              bgColor="#C1D2D6"
              borderRadius="7% 7% 0 0"
              justifyContent="center"
            >
              <Flex
                flexGrow="1"
                clipPath="polygon(5% 0%, 95% 0%, 100% 100%, 0% 100%)"
                justifyContent="center"
                bgColor="white"
                m="10px"
                alignItems="center"
              >
                {signer ? (
                  <Flex flexDir="row" w="300px">
                    <MyAvatar
                      answer={answer!}
                      mintContract={mintContract}
                      signer={signer}
                      isRoll={isRoll}
                      setIsRoll={setIsRoll}
                    />
                  </Flex>
                ) : (
                  <Button onClick={onClickMetamask}>🦊 Login to Play</Button>
                )}
              </Flex>
            </Flex>
            <Flex
              h="3%"
              w="65%"
              bgColor="#C1D2D6"
              clipPath="polygon(4% 0%, 96% 0%, 100% 100%, 0% 100%)"
              backgroundClip="padding-box"
              borderRadius="0 0 10% 10%"
            ></Flex>
            <Flex
              w="66%"
              h="12%"
              mt="-3px"
              bgColor="#FFD529"
              clipPath="polygon(1% 0%, 99% 0%, 100% 100%, 0% 100%)"
            >
              <Flex
                bgColor="white"
                m="10px"
                flexGrow="1"
                justifyContent="space-between"
                alignItems="center"
                rounded="8"
              >
                <Flex
                  flexGrow="1"
                  mx={2}
                  h="80%"
                  bgColor="white"
                  border="1px solid #101010"
                  borderRadius="5"
                  py={1}
                  px={2}
                >
                  업데이트 예정...
                </Flex>
                <Flex>
                  <Flex
                    mr="24px"
                    flexDir="column"
                    alignItems="center"
                    border="1px solid gray"
                    borderRadius="5"
                    px={1}
                  >
                    <Flex fontSize="14px">coins</Flex>
                    <Flex fontWeight="semibold">{isRoll}</Flex>
                  </Flex>
                  <Button
                    borderRadius="100%"
                    bgColor="#FFD529"
                    w="48px"
                    h="48px"
                    justifyContent="center"
                    alignItems="center"
                    mr="20px"
                    onClick={onClickInsertCoin}
                  >
                    insert coin
                  </Button>
                </Flex>
              </Flex>
            </Flex>
          </Flex>
        </>
      )}
    </>
  );
};

export default Home;
