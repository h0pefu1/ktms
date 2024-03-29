function Card(props: {
  variant?: string;
  extra?: string;
  onClick?:any;
  children?: JSX.Element | any[];
  [x: string]: any;
}) {
  const { variant, extra, children, onClick,...rest } = props;
  return (
    <div
    onClick={onClick}
      className={`relative flex flex-col rounded-[20px] border-[1px] border-gray-200 bg-white bg-clip-border shadow-md shadow-[#dfdede] dark:border-[#ffffff33] dark:!bg-navy-800 dark:text-white dark:shadow-none shadow-lg ${extra}`}
      {...rest}
    >
      {children}
    </div>
  );
}

export default Card;
