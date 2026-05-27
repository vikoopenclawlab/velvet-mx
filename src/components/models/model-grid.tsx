import { ModelCard } from "./model-card";
import type { ModelProfile } from "@/lib/types";

interface ModelGridProps {
  models: ModelProfile[];
  columns?: 1 | 2 | 3 | 4;
}

export function ModelGrid({ models, columns = 3 }: ModelGridProps) {
  const gridCols = {
    1: "grid-cols-1",
    2: "grid-cols-1 sm:grid-cols-2",
    3: "grid-cols-1 sm:grid-cols-2 lg:grid-cols-3",
    4: "grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4",
  };

  return (
    <div className={`grid ${gridCols[columns]} gap-6`}>
      {models.map((model) => (
        <ModelCard key={model.id} model={model} />
      ))}
    </div>
  );
}
