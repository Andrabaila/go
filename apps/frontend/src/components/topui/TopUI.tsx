import { StatusBar } from '@/components';

export default function TopUI() {
  return (
    <div className="fixed top-0 left-0 right-0 z-[1000] h-0 pointer-events-none ">
      <div className="w-full pointer-events-auto">
        <StatusBar />
      </div>

      {/* Бургер */}
      <div className="pointer-events-auto flex justify-end h-0 mt-2 pr-2 ">
        <button
          className="
            bg-gray-900/80 text-white
            rounded-xl shadow-md
            w-11 h-11
            flex items-center justify-center
          "
        >
          ☰
        </button>
      </div>
    </div>
  );
}
