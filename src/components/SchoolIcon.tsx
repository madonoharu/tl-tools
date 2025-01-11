import Image from "next/image";

type Props = {
  school: string;
};

export default function SchoolIcon({ school }: Props) {
  return (
    <Image
      alt={school}
      width={42}
      height={38}
      src={`/images/icon/${school}.png`}
    />
  );
}
