import { FaGithub } from "react-icons/fa";
import { FaGoogle } from "react-icons/fa";
import { BsTwitterX } from "react-icons/bs";

type PropsType = {};

export const SocialSignIn: React.FC<PropsType> = ({}) => {
    return (
        <div className="flex flex-col items-center">
            <h3 className="mb-2">Вхід за допомогою</h3>
            <div className="flex gap-2">
                <button className="w-12 h-12 flex items-center justify-center border-1 border-gray-300 rounded-md cursor-pointer group">
                    <FaGithub className="size-5 hover:scale-120 duration-75" />
                </button>
                <button className="w-12 h-12 flex items-center justify-center border-1 border-gray-300 rounded-md cursor-pointer group">
                    <FaGoogle className="size-5 hover:scale-120 duration-75" />
                </button>
                <button className="w-12 h-12 flex items-center justify-center border-1 border-gray-300 rounded-md cursor-pointer group">
                    <BsTwitterX className="size-5 hover:scale-120 duration-75" />
                </button>
            </div>
        </div>
    )
}
