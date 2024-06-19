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
import { FC } from "react";
import { CgChevronRight } from "react-icons/cg";

interface DailyModalProps {
  isOpen: boolean;
  onClose: () => void;
  answer: NftMetadata | undefined;
}

const DailyModal: FC<DailyModalProps> = ({ isOpen, onClose, answer }) => {
  const onClickClose = () => {
    localStorage.setItem("isFirst", "false");
    onClose();
  };

  return (
    <Modal
      isOpen={isOpen}
      onClose={onClickClose}
      closeOnOverlayClick={false}
      autoFocus={false}
    >
      <ModalOverlay />
      <ModalContent>
        <ModalHeader margin="0 auto" fontWeight="semibold">
          Daily NFT
        </ModalHeader>
        <ModalCloseButton />
        <ModalBody display="flex" flexDir="column">
          <Image
            border="1px solid gray"
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
          <Flex alignItems="center">
            <Button
              variant="ghost"
              border="1px"
              borderColor="gray"
              mr={2}
              onClick={onClickClose}
            >
              Go
              <CgChevronRight />
            </Button>
          </Flex>
        </ModalFooter>
      </ModalContent>
    </Modal>
  );
};

export default DailyModal;
