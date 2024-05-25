import { FC } from "react";

interface Props {
  text: string;
}

const AuthButtons: FC<Props> = ({
  text
}: {
  text: string;
}) => {
  return (
    <button className="bg-persiangreen w-60 p-2 rounded-2xl !text-black text-center cursor-pointer text-lg font-semibold">
      {text}
    </button>
  );
};

export default AuthButtons;
