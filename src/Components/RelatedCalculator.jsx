import Link from "next/link";

export default function RelatedCalculator({ name, path, first = false }) {
    let style = ' w-[208px] h-[65px] m-3 border-2 text-[18px] border-solid border-white shadow-md shadow-[#505C6227]  rounded-[15px] bg-[#EFFBF7] bg-opacity-80 backdrop-blur-[30px]   flex items-center justify-center flex-shrink-0';
    if (first) {
        style += ' ml-20 ';
    }
    return (
        <div className={style}>
            <Link href={path} className={'text-[#00D382] font-bold '}>{name}</Link>
        </div>
    );
}