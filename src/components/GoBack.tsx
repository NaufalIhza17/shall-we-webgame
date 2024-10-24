import { useRouter } from "next/navigation";

export default function GoBack() {
  const router = useRouter();

  return (
    <section className="w-full h-screen flex items-center justify-center">
      <button
        onClick={() => router.push("/")}
        type="submit"
        className="bg-white rounded-full w-20 h-20"
      >
        <span className="text-[#989898]">return</span>
      </button>
    </section>
  );
}
