import LoginBox from "@/components/project/LoginBox";
import { Toaster } from "@/components/ui/sonner";

function LoginPage() {
  return (
    <div className="w-screen h-screen bg-gray-100 flex items-center">
      <div className="mx-auto w-120 h-140 bg-white rounded-xl p-8 shadow-2xl">
        <LoginBox />
      </div>
      <Toaster />
    </div>
  );
}

export default LoginPage;
