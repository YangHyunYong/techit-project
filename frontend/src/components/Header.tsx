import { Button, Flex, Image, Menu, MenuButton } from "@chakra-ui/react";
import { JsonRpcSigner } from "ethers";
import { Dispatch, FC, SetStateAction } from "react";

interface HeaderProps {
  signer: JsonRpcSigner | null;
  setSigner: Dispatch<SetStateAction<JsonRpcSigner | null>>;
}

const Header: FC<HeaderProps> = ({ signer, setSigner }) => {
  return (
    <Flex h={16} justifyContent="space-between">
      <Flex
        flexDir={["column", "column", "row"]}
        w={40}
        fontSize={[16, 16, 20]}
        fontWeight="semibold"
        alignItems="center"
      >
        <Image w={16} src="/images/logo.svg" alt="logo" /> Slot
      </Flex>
      <Flex w={40} justifyContent="end" alignItems="center" mr="16px">
        {signer && (
          <Menu>
            <MenuButton
              size={["xs", "xs", "md"]}
              as={Button}
              onClick={() => setSigner(null)}
            >
              {signer.address.substring(0, 5)}...
              {signer.address.substring(signer.address.length - 5)}
            </MenuButton>
          </Menu>
        )}
      </Flex>
    </Flex>
  );
};

export default Header;
