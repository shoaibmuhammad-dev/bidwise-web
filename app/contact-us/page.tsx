import ContactPage from "@/components/contact/ContactForm";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Contact Us - bidwise",
  description: "Contact bidwise for more details.",
};

const page = () => {
  return <ContactPage />;
};

export default page;
