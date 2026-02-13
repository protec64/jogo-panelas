import { cn } from "@/lib/utils";

interface ProgressDotsProps {
  total: number;
  current: number;
}

const ProgressDots = ({ total, current }: ProgressDotsProps) => {
  return (
    <div className="flex items-center gap-2 mb-8">
      {Array.from({ length: total }).map((_, index) => (
        <div
          key={index}
          className={cn(
            "rounded-full transition-all duration-300",
            index === current
              ? "w-6 h-2.5 bg-white"
              : index < current
              ? "w-2.5 h-2.5 bg-white/80"
              : "w-2.5 h-2.5 bg-white/40"
          )}
        />
      ))}
    </div>
  );
};

export default ProgressDots;
