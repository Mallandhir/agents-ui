import { Button } from "@/components/start-mission/ui/button";

interface ICategorySuggestions {
  categories: {
    id: string;
    name: string;
    tasks: {
      id: number;
      text: string;
    }[];
  }[];
  selectedCategory: string | null;
  onSelect: (id: string) => void;
}

const CategorySuggestions: React.FC<ICategorySuggestions> = ({ categories, selectedCategory, onSelect }) => {
  return (
    <>
      <div className="flex flex-wrap items-start justify-center gap-2 w-full">
        {categories.map((category) => {
          const isSelected = selectedCategory === category.id;
          return (
            <>
              <Button
                key={category.id}
                variant="outline"
                className={`px-3 py-1 h-auto rounded-lg shadow-[inset_0px_4px_8.9px_#ffffff40] ${
                  isSelected
                    ? "[background:linear-gradient(0deg,rgba(218,203,225,0.13)_0%,rgba(218,203,225,0.13)_100%),linear-gradient(173deg,rgba(187,144,242,1)_0%,rgba(227,146,227,1)_100%)] border-none"
                    : "[background:linear-gradient(0deg,rgba(218,203,225,0.13)_0%,rgba(218,203,225,0.13)_100%)] border-[#00000008]"
                }`}
                onClick={() => onSelect(category.id)}
              >
                <span
                  className={`font-ppNeue-medium text-[10px] leading-[14px] whitespace-nowrap text-[#353535]  ${
                    isSelected ? "text-white" : "text-[#353535]"
                  }`}
                >
                  {category.name}
                </span>
              </Button>
            </>
          );
        })}
      </div>
    </>
  );
};

export default CategorySuggestions;
