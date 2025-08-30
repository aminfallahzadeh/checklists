// IMPORTS
import toast, {Toaster,  type ToasterProps } from "react-hot-toast";

const toastProviderOptions: ToasterProps = {
  position: "top-center",
  containerStyle: {
    fontSize: "12px",
    // backgroundColor:'#f9f9f9'
  },
  toastOptions: {
    success: {
      iconTheme: {
        primary: "#15803d",
        secondary: "#fff",
      },

      style: {
        background: "#f9f9f9",
      },
    },
    error: {
      iconTheme: {
        primary: "#ff7186",
        secondary: "#fff",
      },
      style: {
        background: "#f9f9f9",
      },
    },
  },
};

export const toastHelper = {
  toastProvider: () => <Toaster {...toastProviderOptions} />,
  success: (message: string) => toast.success(message),
  error: (message: string) => toast.error(message),
};
