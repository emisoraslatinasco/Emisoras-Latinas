import Image from "next/image";

export default function Header() {
  return (
    <header className="bg-transparent z-10">
      <div className=" ">
        <div className="flex items-center h-16 pl-10 gap-2">
          {/* Logo */}
          <Image 
            src="/antena.png" 
            alt="Universal Radio Logo" 
            width={35}
            height={35}
            className="object-contain"
            priority
          />
          <h1 className="text-neon-blue/80 text-xl font-bold drop-shadow-[0_0_6px_rgba(0,255,255,0.4)]">
            Universal Radio
          </h1>
        </div>
      </div>
    </header>
  );
}
