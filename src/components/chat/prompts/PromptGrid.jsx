import quickPrompts from "../../../data/quickPrompts";
import PromptCard from "./PromptCard";

export default function PromptGrid() {
  return (
    <section
      className="
        mt-6
        grid
        grid-cols-1
        gap-3
      "
    >
      {quickPrompts.map((item) => (
        <PromptCard key={item.id} {...item} />
      ))}
    </section>
  );
}
