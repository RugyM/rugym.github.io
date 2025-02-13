import { jsx as _jsx } from "react/jsx-runtime";
import { Footer as FlowbiteFooter } from "flowbite-react";
const Footer = () => {
    return (_jsx(FlowbiteFooter, { className: "border-t border-gray-200 p-4", container: true, theme: {
            root: {
                base: "border-gray-500 bg-white dark:border-t dark:bg-gray-800",
            },
        }, children: _jsx(FlowbiteFooter.Copyright, { by: `${process.env.VITE_APP_NAME}`, year: 2024 }) }));
};
export default Footer;
