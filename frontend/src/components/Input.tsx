import { useField } from 'formik';
import React from 'react';
import clsx from 'clsx'

interface InputProps {
  label: string;
  name: string;
  type?: string;
  placeholder?: string;
}

const Input: React.FC<InputProps> = ({ label, ...props }) => {
  const [field, meta] = useField(props.name);

  return (
    <div>
      <label className="block font-medium text-gray-900">
        <span>{label}</span>
        <input
            {...field}
            name={props.name}
            type={props.type || "text"}
            className={clsx('mt-2 w-full block rounded-md bg-white outline outline-gray-300 outline-offset-[-1px] px-3 py-1.5',{
                'outline-red-400 outline-2':meta.touched && meta.error
            })}
            // className={`mt-1 block w-full px-3 py-2 border ${
            //     meta.touched && meta.error ? 'border-red-500' : 'border-gray-300'
            // } rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500`}
        />
        </label>
          <p className="mt-1 text-sm text-red-500">{meta.touched && meta.error && meta.error}</p>
    </div>
  );
};

export default Input;