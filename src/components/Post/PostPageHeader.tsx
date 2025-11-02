import Link from "next/link";
import { FaArrowLeft } from "react-icons/fa";

type PropsType = object;

export const PostPageHeader: React.FC<PropsType> = ({}) => {
    return (
        <header className="p-2 border-b border-gray-400">
            {/* TODO: add previous page */}
            <Link href={'/'} className="group flex items-center space-x-2 text-gray-600 cursor-pointer">
                <FaArrowLeft className="group-hover:translate-x-[-4px] size-4 duration-75" />
                <p className="text-lg font-bold">Back</p>
            </Link>
        </header>
    )
}
