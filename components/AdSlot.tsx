interface AdSlotProps {
  size: "top" | "bottom";
}

/**
 * Reserved ad placeholder.
 * To activate ads: replace the inner content with your ad network's script/tag.
 * Top slot targets 728×90 (leaderboard), bottom targets 300×250 (medium rectangle).
 */
export default function AdSlot({ size }: AdSlotProps) {
  return (
    <div
      role="complementary"
      aria-label="Advertisement"
      className={[
        "w-full flex items-center justify-center",
        "bg-gray-50 border border-dashed border-gray-200 rounded-lg",
        "text-gray-400 text-xs tracking-wide select-none",
        size === "top" ? "h-16 sm:h-[90px]" : "h-[250px]",
      ].join(" ")}
    >
      Advertisement
    </div>
  );
}
