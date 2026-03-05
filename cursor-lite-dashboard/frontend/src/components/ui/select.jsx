import * as React from "react";
import { ChevronDown, Check } from "lucide-react";
import { cn } from "@/lib/utils";

const Select = ({ children, value, onChange, placeholder }) => {
    const [isOpen, setIsOpen] = React.useState(false);
    const containerRef = React.useRef(null);

    React.useEffect(() => {
        const handleClickOutside = (event) => {
            if (containerRef.current && !containerRef.current.contains(event.target)) {
                setIsOpen(false);
            }
        };
        document.addEventListener("mousedown", handleClickOutside);
        return () => document.removeEventListener("mousedown", handleClickOutside);
    }, []);

    const handleSelect = (val) => {
        onChange(val);
        setIsOpen(false);
    };

    // Find the selected label from children
    const selectedChild = React.Children.toArray(children).find(
        (child) => child.props.value === value
    );
    const selectedLabel = selectedChild?.props.children || placeholder;

    return (
        <div className="relative" ref={containerRef}>
            <button
                type="button"
                onClick={() => setIsOpen(!isOpen)}
                className={cn(
                    "w-full flex items-center justify-between h-9 px-3 bg-[#0d1117] border border-[#30363d] rounded-md text-sm text-white hover:border-[#484f58] focus:outline-none focus:border-[#1f6feb] focus:ring-1 focus:ring-[#1f6feb]/20 transition-colors",
                    isOpen && "border-[#1f6feb] ring-1 ring-[#1f6feb]/20"
                )}
            >
                <span className="truncate">{selectedLabel}</span>
                <ChevronDown
                    className={cn(
                        "h-4 w-4 text-[#8b949e] transition-transform",
                        isOpen && "rotate-180"
                    )}
                />
            </button>

            {isOpen && (
                <div className="absolute z-50 w-full mt-1 bg-[#161b22] border border-[#30363d] rounded-md shadow-lg overflow-hidden">
                    <div className="max-h-60 overflow-auto py-1">
                        {React.Children.map(children, (child) =>
                            React.cloneElement(child, {
                                onSelect: handleSelect,
                                isSelected: child.props.value === value,
                            })
                        )}
                    </div>
                </div>
            )}
        </div>
    );
};

const SelectItem = ({ children, value, onSelect, isSelected }) => {
    return (
        <button
            type="button"
            onClick={() => onSelect(value)}
            className={cn(
                "w-full flex items-center justify-between px-3 py-2 text-sm text-left text-white hover:bg-[#21262d] transition-colors",
                isSelected && "bg-[#1f6feb]/10 text-[#1f6feb]"
            )}
        >
            <span>{children}</span>
            {isSelected && <Check className="h-4 w-4 text-[#1f6feb]" />}
        </button>
    );
};

export { Select, SelectItem };
