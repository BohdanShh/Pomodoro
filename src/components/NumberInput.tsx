import classNames from 'classnames';
import { FC, InputHTMLAttributes } from 'react';

type Props = {
  label?: string;
} & Omit<InputHTMLAttributes<HTMLInputElement>, 'type'>;

const NumberInput: FC<Props> = ({ label, className, ...props }) => {
  const inputClasses = classNames(
    'w-full p-2 rounded-xl bg-lightgrey outline-none border-[1px] border-transparent font-medium out-of-range:border-[1px] out-of-range:border-[red] out-of-range:border-solid',
    className
  );

  return (
    <div className="flex flex-col gap-2">
      {label && <h4 className="text-xs text-[#999] font-bold">{label}</h4>}
      <input
        className={inputClasses}
        type="number"
        {...props}
      />
    </div>
  );
};

export default NumberInput;
