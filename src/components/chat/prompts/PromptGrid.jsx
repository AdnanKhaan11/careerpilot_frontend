import quickPrompts from "../../../data/quickPrompts";
import PromptCard from "./PromptCard";

export default function PromptGrid() {
  return (
    <section className="grid gap-5 md:grid-cols-2 xl:grid-cols-3">
      {quickPrompts.map((item) => (
        <PromptCard key={item.id} {...item} />
      ))}
    </section>
  );
}
