export default function ScrollIndicator() {
  return (
    <div className="absolute bottom-16 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 animate-bounce z-20">
      <div className="text-white/50 text-xs font-medium tracking-wider uppercase">Scroll</div>
      <div className="w-[1px] h-6 bg-white/30" />
    </div>
  );
}
