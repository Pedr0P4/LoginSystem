import ProfileInfo from "@/components/project/ProfileInfo";
import { Button } from "@/components/ui/button";
import { Skeleton } from "@/components/ui/skeleton";
import client from "@/services/client";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

interface AccountData {
  name: string;
  email: string;
  avatar: {
    high: string;
    medium: string;
    low: string;
  };
}

function AccountPage() {
  const navigate = useNavigate();
  const [account, setAccount] = useState<AccountData | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const getAccountData = async () => {
      try {
        const response = await client.get<AccountData>("/profile/");
        setAccount(response.data);
      } catch (error) {
        localStorage.removeItem("token");
        console.log("Error:", error);
        navigate("/login");
      } finally {
        setLoading(false);
      }
    };
    getAccountData();
  }, []);

  if (loading) {
    return (
      <div className="w-screen h-screen bg-gray-100 flex items-center">
        <div className="mx-auto bg-white w-100 py-8 px-2 rounded-xl flex flex-col justify-center shadow-[0_0_10px_rgba(0,0,0,0.1)]">
          <Skeleton className="w-22 h-4 rounded-full mx-auto mb-2" />
          <Skeleton className="w-20 h-20 rounded-xl mx-auto bg-cover bg-center" />
          <div className="w-92/100 mx-auto pt-6">
            <Skeleton className="w-22 h-4 rounded-full mb-2" />
            <Skeleton className="p-3 py-4 pl-4 bg-gray-100 rounded-sm" />
          </div>
          <div className="w-92/100 mx-auto pt-6">
            <Skeleton className="w-22 h-4 rounded-full mb-2" />
            <Skeleton className="p-3 py-4 pl-4 bg-gray-100 rounded-sm" />
          </div>
        </div>
      </div>
    );
  }

  return (
    <div>
      <div className="w-screen h-25 bg-white fixed top-0 flex items-center">
        <Button
          className="w-70 h-12 text-lg bg-blue-950 hover:cursor-pointer hover:bg-blue-900 font-bold absolute right-10"
          onClick={() => {
            localStorage.removeItem("tokens");
            navigate("/");
          }}
        >
          Logout
        </Button>
      </div>
      <div className="w-screen h-screen bg-gray-100 flex items-center">
        <div className="mx-auto bg-white w-100 py-8 px-2 rounded-xl flex flex-col justify-center shadow-[0_0_10px_rgba(0,0,0,0.1)]">
          <h1 className="mx-auto text-sm font-light mb-2">profile picture</h1>
          <div
            className="w-20 h-20 rounded-xl mx-auto bg-cover bg-center"
            style={{ backgroundImage: `url(${account?.avatar.medium})` }}
          ></div>
          <ProfileInfo info="Name">{account?.name}</ProfileInfo>
          <ProfileInfo info="E-mail">{account?.email}</ProfileInfo>
        </div>
      </div>
    </div>
  );
}

export default AccountPage;
