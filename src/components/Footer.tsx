import Link from "next/link"

export default function Footer() {
    return (
        <div className="max-w-[304px] w-full mx-auto flex justify-center items-center">
            <p className="text-white text-xs">made by <Link href={""} className="underline">naufal ihza</Link></p>
        </div>
    )
}