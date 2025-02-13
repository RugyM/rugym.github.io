import { Footer as FlowbiteFooter } from "flowbite-react";

const Footer = () => {
  return (
    <FlowbiteFooter
      className="border-t border-gray-200 p-4"
      container
      theme={{
        root: {
          base: "border-gray-500 bg-white dark:border-t dark:bg-gray-800",
        },
      }}
    >
      <FlowbiteFooter.Copyright
        by={`${process.env.VITE_APP_NAME}`}
        year={2024}
      />
    </FlowbiteFooter>
  );
};

export default Footer;
