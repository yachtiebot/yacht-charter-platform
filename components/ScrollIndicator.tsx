export default function ScrollIndicator({ dark = false }: { dark?: boolean }) {
  return (
    <div className="absolute bottom-16 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 animate-bounce z-20">
      <div className={`text-xs font-medium tracking-wider uppercase ${
        dark ? 'text-[#0f0f0f]/50' : 'text-white/50'
      }`}>Scroll</div>
      <div className={`w-[1px] h-6 ${
        dark ? 'bg-[#0f0f0f]/30' : 'bg-white/30'
      }`} />
    </div>
  );
}
