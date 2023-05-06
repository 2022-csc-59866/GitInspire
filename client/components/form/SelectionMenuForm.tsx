/*
  Design Reference: https://tailwindui.com/components/application-ui/feedback/empty-states#component-fdd158a00f60e3f9cdf9415b5835e139
*/
import { MdKeyboardArrowRight } from "react-icons/md";

export type SelectMenuOption = {
  title: string;
  description: string;
  value: string;
  icon: JSX.Element;
  bkgClr: string;
};

type SelectionMenuFormOptionsType = {
  options: SelectMenuOption[];
  selectOption: (value: string) => void;
  className?: string;
};

type SelectionMenuFormType = {
  title: string;
  description: string;
} & SelectionMenuFormOptionsType;

export default function SelectionMenuForm({
  title,
  description,
  options,
  selectOption,
  className,
}: SelectionMenuFormType) {
  return (
    <div className={className}>
      <h2 className="font-semibold sm:text-xl">{title}</h2>
      <p className="mt-1 text-xs sm:text-sm">{description}</p>

      <SelectionMenuFormOptions options={options} selectOption={selectOption} />
    </div>
  );
}

export function SelectionMenuFormOptions({
  options,
  selectOption,
  className,
}: SelectionMenuFormOptionsType) {
  return (
    <ul
      className={`mt-7 border-y-2 border-gray-200 dark:border-slate-700 ${className}`}
    >
      {options.map((opt, idx) => (
        <li
          key={idx}
          className="group flex gap-2 border-b-[1px] border-gray-200 py-4 last:border-0 hover:cursor-pointer dark:border-slate-700"
          onClick={() => selectOption(opt.value)}
        >
          <div
            className={`shrink-0 rounded-lg p-2 text-xl text-white sm:text-2xl ${opt.bkgClr}`}
          >
            {opt.icon}
          </div>

          <div className="min-w-0">
            <p className="flex items-center gap-1 truncate text-sm font-semibold sm:text-base">
              {opt.title}
            </p>
            <p className="truncate text-xxs sm:text-xs">{opt.description}</p>
          </div>

          <MdKeyboardArrowRight className="ml-auto shrink-0 self-center text-xl text-gray-300 group-hover:text-gray-400 dark:text-slate-700 group-hover:dark:text-slate-500 sm:text-2xl" />
        </li>
      ))}
    </ul>
  );
}
