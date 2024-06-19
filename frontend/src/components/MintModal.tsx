import {
  Box,
  Button,
  Flex,
  Image,
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalFooter,
  ModalHeader,
  ModalOverlay,
  Text,
} from "@chakra-ui/react";
import { JsonRpcSigner } from "ethers";
import { Contract } from "ethers";
import { FC, useEffect, useState } from "react";

interface MintModalProps {
  isOpen: boolean;
  onClose: () => void;
  answer: NftMetadata | undefined;
  mintContract: Contract | null;
  signer: JsonRpcSigner | null;
}

const MintModal: FC<MintModalProps> = ({
  isOpen,
  onClose,
  answer,
  mintContract,
}) => {
  const [tokenId, setTokenId] = useState<number>(0);
  const [isLoading, setIsLoading] = useState<boolean>(false);

  const onClickMint = async () => {
    try {
      setIsLoading(true);
      const metaUri = await mintContract?.getAnswer();

      const response = await mintContract?.mintNft(metaUri);

      console.log(response);
      setIsLoading(false);
    } catch (error) {
      setIsLoading(false);
      console.error(error);
    }
  };

  const getTotalSupply = async () => {
    if (!mintContract) return;
    const response = await mintContract.totalSupply();
    console.log("RRESS", response);
    setTokenId(response);
  };

  useEffect(() => {
    if (!isOpen) return;

    getTotalSupply();
    console.log("check");
  }, [isOpen]);

  useEffect(() => {
    if (!isOpen) return;

    console.log(tokenId);
  }, [tokenId]);

  return (
    <Modal isOpen={isOpen} onClose={onClose}>
      <ModalOverlay />
      <ModalContent>
        <ModalHeader>성공!</ModalHeader>
        <ModalCloseButton />
        <ModalBody display="flex" flexDir="column">
          <Image
            alignSelf="center"
            w={60}
            h={60}
            src={answer?.image}
            alt={answer?.name}
          />
          <Text mt={4} fontSize={24} fontWeight="semibold">
            {answer?.name}
          </Text>
          <Text mt={4}>{answer?.description}</Text>
          <Flex flexWrap="wrap" mt={4} gap={2}>
            {answer?.attributes?.map((v, i) => (
              <Box key={i} border="2px solid olive" p={1}>
                <Text borderBottom="2px solid olive">{v.trait_type}</Text>
                <Text>{v.value}</Text>
              </Box>
            ))}
          </Flex>
        </ModalBody>

        <ModalFooter>
          <Button variant="ghost" mr={2} onClick={onClose}>
            Close
          </Button>
          <Button
            colorScheme="blue"
            onClick={onClickMint}
            isLoading={isLoading}
            loadingText="민팅중"
          >
            Get NFT
          </Button>
        </ModalFooter>
      </ModalContent>
    </Modal>
  );
};

export default MintModal;
