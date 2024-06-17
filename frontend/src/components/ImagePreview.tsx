import { Button, Flex, Image } from "@chakra-ui/react";
import axios from "axios";
import { Contract } from "ethers";
import { FC, useState } from "react";

interface ImagePreviewProps {
  dataUri: string;
  mintContract: Contract | null;
}

export const ImagePreview: FC<ImagePreviewProps> = ({ dataUri, mintContract }) => {
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [isDone, setIsDone] = useState<boolean>(false);
  const [imageUrl, setImageUrl] = useState<string>("");

  const transferDataURI = async () => {
    setIsLoading(true);

    const byteString = atob(dataUri.split(",")[1]);
    const mimeString = dataUri.split(",")[0].split(":")[1].split(";")[0];
    const ab = new ArrayBuffer(byteString.length);
    const ia = new Uint8Array(ab);
    for (let i = 0; i < byteString.length; i++) {
      ia[i] = byteString.charCodeAt(i);
    }
    const blob = new Blob([ia], { type: mimeString });

    // FormData 객체에 Blob 추가
    const formData = new FormData();
    formData.append("file", blob, `photo.png`);

    const imageUrl = await sendImage(formData);

    setImageUrl(imageUrl!);
  };

  const sendImage = async (formData: FormData) => {
    try {
      const response = await axios.post(
        "https://api.pinata.cloud/pinning/pinFileToIPFS",
        formData,
        {
          headers: {
            Authorization: `Bearer ${import.meta.env.VITE_PINATA_JWT_TOKEN}`,
            "Content-Type": `multipart/form-data`,
            pinata_api_key: `${import.meta.env.VITE_PINATA_API_KEY}`,
            pinata_secret_api_key: `${
              import.meta.env.VITE_PINATA_SECRET_API_KEY
            }`,
          },
        }
      );

      setIsLoading(false);
      setIsDone(true);

      console.log("꾸미기 완료");

      return `https://salmon-solid-tern-442.mypinata.cloud/ipfs/${response.data.IpfsHash}`;
    } catch (error) {
      console.error("Error uploading to Pinata:", error);
      setIsLoading(false);
    }
  };

  const sendMetadata = async (image: string) => {
    try {
      setIsLoading(true);

      const metadata = JSON.stringify({
        pinataContent: {
          name: "Test",
          description: "Test",
          image,
          attributes:[
            {trait_type: "Border", value: "Wood"}
          ]
        },
        pinataMetadata: {
          name: "test.json",
        },
      });


      const response = await axios.post(
        "https://api.pinata.cloud/pinning/pinJSONToIPFS",
        metadata,
        {
          headers: {
            Authorization: `Bearer ${import.meta.env.VITE_PINATA_JWT_TOKEN}`,
            "Content-Type": `application/json`,
            pinata_api_key: `${import.meta.env.VITE_PINATA_API_KEY}`,
            pinata_secret_api_key: `${
              import.meta.env.VITE_PINATA_SECRET_API_KEY
            }`,
          },
        }
      );

      setIsLoading(false);
      
      console.log("민팅완료");

      return `https://salmon-solid-tern-442.mypinata.cloud/ipfs/${response.data.IpfsHash}`;
    } catch (error) {
      console.error(error);
      setIsLoading(false);

    }
  };

  const onClickMint = async () => {
    try {
      if(!mintContract) return;

      const metadataUrl = await sendMetadata(imageUrl);

      const response = await mintContract.mintNft(metadataUrl);

      await response.wait();
      
      console.log(response);
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <Flex flexDir="column">
      <Image src={dataUri} />
      {!isDone ? (
        <Button
          onClick={transferDataURI}
          isLoading={isLoading}
          loadingText="꾸미는 중..."
        >
          랜덤 꾸미기
        </Button>
      ) : (
        <Button
          onClick={onClickMint}
          isLoading={isLoading}
          loadingText="민팅 중..."
        >
          민팅하기
        </Button>
      )}
    </Flex>
  );
};

export default ImagePreview;
