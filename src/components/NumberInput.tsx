import classNames from 'classnames';
import { FC, InputHTMLAttributes } from 'react';

type Props = {
  label?: string;
} & Omit<InputHTMLAttributes<HTMLInputElement>, 'type'>;

const NumberInput: FC<Props> = ({ label, className, ...props }) => {
  const inputClasses = classNames('w-full p-2 rounded-xl bg-lightgrey font-medium', className);

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
