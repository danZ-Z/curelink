import AccountManager from "@/components/AccountManager";
import Footer from "@/components/Footer";
import Image from "next/image";

const Page = () => {
  return (
    <main className="flex min-h-screen overflow-hidden ">
      
      <div className="flex flex-col w-full md:w-3/5 p-10 md:p-20 text-white gap-5">
        <Image src="/CarePulseLogo.png" alt="Logo" width={150} height={150} />
        <h1 className="font-semibold text-4xl">Hi there!👋</h1>
        <p className="text-md text-zinc-500">If you want to get started, please login or create an account.</p>
        <AccountManager/>
        <Footer />
      </div>

      <div className="w-0 md:w-2/5">
        <Image
          src="/MainPagePhoto.jpg"
          alt="Doctor"
          width={1000}
          height={1000}
          className="hidden h-screen object-cover md:block max-w-[100%]"
        />
      </div>
    </main>
  );
};

export default Page;
