import { Button, Flex, Image } from "@chakra-ui/react";
import axios from "axios";
import { FC, useEffect, useState } from "react";

interface ImagePreviewProps {
  dataUri: string;
}

export const ImagePreview: FC<ImagePreviewProps> = ({ dataUri }) => {
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [isDone, setIsDone] = useState<boolean>(false);
  const [metadata, setMetadata] = useState({
    name: "이미지테스트",
    description: "This is a sample description.",
    image: "",
    attributes: [{ trait_type: "Border", value: "Wood" }],
  });

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
    // formData.append("pinataMetadata", "{\n  \"name\": \"Pinnie.json\"\n}");
    // formData.append("pinataOptions", "{\n  \"cidVersion\": 1\n}");

    sendImage(formData);
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

      setMetadata((metadata) => ({
        ...metadata,
        image: `https://salmon-solid-tern-442.mypinata.cloud/ipfs/${response.data.IpfsHash}`,
      }));

      setIsLoading(false);
      setIsDone(true);
    } catch (error) {
      console.error("Error uploading to Pinata:", error);
      setIsLoading(false);
    }
  };

  const sendMetadata = async (formData: FormData) => {
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
      console.log(response.data);
    } catch (error) {
      console.error(error);
    }
  };

  const onClickMint = async () => {
    try {
      // const response = await
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    if (!isDone) return;

    const formData = new FormData();
    formData.append("name", "이미지테스트");
    formData.append("description", "This is a sample description.");

    formData.append("image", metadata.image);

    // attributes 배열을 JSON 문자열로 변환하여 추가
    const attributes = [{ trait_type: "Border", value: "Wood" }];
    formData.append("attributes", JSON.stringify(attributes));

    sendMetadata(formData);
  }, [isDone]);

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
