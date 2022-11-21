export const Dropdown = (props: any) => (
  <>
    <div className={props?.className}>
      <label
        className="block mb-2 text-md font-medium text-gray-900"
        htmlFor={props.label}
      >
        {props.label}
      </label>

      <select
        onChange={(e) => {
          if (props?.for === "search") props?.onChange(e.target.value);
        }}
        name={props.label}
        id={props.label}
        className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg hover:cursor-pointer focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
      >
        {props.items?.map((item: any) => (
          <option key={item.key} value={item.value}>
            {item.key}
          </option>
        ))}
      </select>
    </div>
  </>
);
