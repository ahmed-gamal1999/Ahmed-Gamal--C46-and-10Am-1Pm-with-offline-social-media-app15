export default function PostSkeleton() {
  return (
    <div className="bg-slate-400 p-3 rounded w-[50%] mx-auto pt-5 mb-4 text-white animate-pulse">
      <div className="flex gap-2 items-center mb-2">
        <div className="h-4 w-24 bg-slate-300 rounded"></div>
        <div className="rounded-full size-[36px] bg-slate-300"></div>
      </div>

      <div className="h-3 w-20 bg-slate-300 rounded mb-3"></div>

      <div className="h-4 w-full bg-slate-300 rounded mb-2"></div>
      <div className="h-4 w-[80%] bg-slate-300 rounded mb-4"></div>

      <div className="bg-slate-700 p-3 rounded">
        <div className="h-3 w-20 bg-slate-400 rounded mb-2"></div>
        <div className="h-3 w-32 bg-slate-400 rounded mb-2"></div>
        <div className="h-3 w-16 bg-slate-400 rounded"></div>
      </div>
    </div>
  );
}
