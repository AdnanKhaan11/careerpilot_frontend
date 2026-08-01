import { ArrowUp, Loader2 } from "lucide-react";

export default function SendButton({ disabled, loading = false, onClick }) {
  return (
    <button
      onClick={onClick}
      disabled={disabled || loading}
      className="
        flex
        h-11
        w-11
        items-center
        justify-center
        rounded-xl
        bg-cyan-500
        text-white
        transition-all
        duration-200
        hover:bg-cyan-400
        disabled:cursor-not-allowed
        disabled:opacity-50
      "
    >
      {loading ? (
        <Loader2 size={20} className="animate-spin" />
      ) : (
        <ArrowUp size={20} />
      )}
    </button>
  );
}
