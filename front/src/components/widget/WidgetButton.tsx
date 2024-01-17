import Card from "components/card";

const WidgetButton = (props: {
  title: string;
  onclick:()=>any;
  innerContent: JSX.Element;
}) => {
  const { title,innerContent } = props;
  return (
    <div className="mt-3 cursor-pointer">
      <Card extra="!flex-row flex-grow items-center rounded-[20px]  p-4 transition duration-300 hover:text-brand-500 ">
        <div className="flex flex-grow !flex-row items-center rounded-[20px] p-4 transition duration-300 hover:text-brand-500  ">
          <p>{title}</p>
          {/* Content that appears on hover */}
        {innerContent}
        </div>
    </Card>
    </div>
  );
};

export default WidgetButton;
