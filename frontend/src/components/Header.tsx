import { Button, Flex, Image, Menu, MenuButton, MenuItem, MenuList } from "@chakra-ui/react"
import { JsonRpcSigner } from "ethers"
import { Dispatch, FC, SetStateAction } from "react"
import { useNavigate } from "react-router-dom";

interface HeaderProps{
  signer: JsonRpcSigner | null;
  setSigner: Dispatch<SetStateAction<JsonRpcSigner | null>>;
}

const Header:FC<HeaderProps> = ({signer,setSigner}) => {
  const navigate = useNavigate();

  return (
    <Flex h={24} justifyContent="space-between">
      <Flex
        flexDir={["column", "column", "row"]}
        w={40}
        fontSize={[16, 16, 20]}
        fontWeight="semibold"
        alignItems="center"
      >
        <Image w={16} src="/images/logo.svg" alt="TIMING" /> TIMING
      </Flex>
      <Flex alignItems="center" gap={[2, 2, 4]}>
        <Button
          variant="link"
          colorScheme="green"
          onClick={() => navigate("/")}
          size={["xs", "xs", "md"]}
        >
          홈
        </Button>
        <Button
          variant="link"
          colorScheme="green"
          onClick={() => navigate("/my-nft")}
          size={["xs", "xs", "md"]}
        >
          내 NFT
        </Button>
        <Button
          variant="link"
          colorScheme="green"
          onClick={() => navigate("/sale-nft")}
          size={["xs", "xs", "md"]}
        >
          마켓
        </Button>
      </Flex>
      <Flex w={40} justifyContent="end" alignItems="center">
        {signer && (
          <Menu>
            <MenuButton size={["xs", "xs", "md"]} as={Button}>
              {signer.address.substring(0, 5)}...
              {signer.address.substring(signer.address.length - 5)}
            </MenuButton>
            <MenuList minW={[20, 20, 40]}>
              <MenuItem fontSize={[8, 8, 12]} onClick={() => setSigner(null)}>
                Log Out
              </MenuItem>
            </MenuList>
          </Menu>
        )}
      </Flex>
    </Flex>
  )
}

export default Header