import client from "@/services/client";
import axios, { AxiosError } from "axios";
import { useEffect } from "react";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import B2BitLogo from "@/assets/B2Bit-Logo.png";
import { toast } from "sonner";
import { useNavigate } from "react-router-dom";

const formSchema = z.object({
  email: z.string().email({
    message: "Please enter a valid email address",
  }),
  password: z.string().min(8, {
    message: "Password must be at least 8 characters long",
  }),
});

interface LoginResponse {
  user: {
    id: number;
    name: string;
  };
  tokens: {
    refresh: string;
    access: string;
  };
}

interface ApiResponseError {
  detail: string;
}

function LoginBox() {
  const navigate = useNavigate();
  useEffect(() => {
    const buscarDadosIniciais = async () => {
      try {
        const response = await client.get("/profile/");
        if (response.status === 200) {
          navigate("/account");
        }
      } catch (error) {
        console.log(error);
      }
    };
    buscarDadosIniciais();
  }, []);

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  });

  async function onSubmit(data: z.infer<typeof formSchema>) {
    try {
      const response = await client.post<LoginResponse>("/login/", data);
      localStorage.setItem("tokens", JSON.stringify(response.data.tokens));
      console.log("Sucesso!");
      navigate("/account");
    } catch (error) {
      if (axios.isAxiosError(error)) {
        const axiosError = error as AxiosError<ApiResponseError>;
        if (axiosError.response) {
          toast.error("Invalid email or password!", {
            description: "Please check your credentials and try again.",
          });
          console.log("Error status:", axiosError.response.status);
          console.log("Error details:", axiosError.response.data.detail);
        } else if (axiosError.request) {
          console.log("Connection error:", axiosError.message);
        }
      } else {
        console.log("Unknown error:", error);
      }
    }
  }

  const labelStyle = "pt-4 text-lg";
  const controlStyle = "pt-2 h-14 bg-gray-100 border-0 align-middle";

  return (
    <div className="h-full line">
      <Form {...form}>
        <form
          onSubmit={form.handleSubmit(onSubmit)}
          className="flex flex-col items-center justify-around h-full"
        >
          <img src={B2BitLogo} />
          <FormField
            control={form.control}
            name="email"
            render={({ field }) => (
              <FormItem className="w-full">
                <FormLabel className={labelStyle}>E-mail</FormLabel>
                <FormControl className={controlStyle}>
                  <Input type="email" placeholder="@gmail.com" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="password"
            render={({ field }) => (
              <FormItem className="w-full">
                <FormLabel className={labelStyle}>Password</FormLabel>
                <FormControl className={controlStyle}>
                  <Input type="password" placeholder="********" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <Button type="submit" className="mt-6 w-full h-16 text-2xl ">
            Sign in
          </Button>
        </form>
      </Form>
    </div>
  );
}

export default LoginBox;
