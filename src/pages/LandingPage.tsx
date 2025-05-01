import AuthForm from "../components/AuthForm";
import { JSX } from "react";

const LandingPage = (): JSX.Element => {
  return (
    <div className="min-h-screen w-screen flex flex-col md:flex-row">
      <div className="md:w-1/2 hidden md:flex items-center justify-center bg-gray-100">
        <img src="/assets/finance-illustration.svg" alt="Spendwise" className="w-3/4" />
      </div>
      <div className="md:w-1/2 w-full flex items-center justify-center bg-gray-900 p-4">
        <AuthForm />
      </div>
    </div>
  );
};

export default LandingPage;
