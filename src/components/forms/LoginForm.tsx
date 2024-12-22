import { useForm } from "react-hook-form";
import { Button } from "../ui/button";
import { Input } from "../ui/input";
import { Label } from "../ui/label";
import log from "/loginLogo.svg";
import { zodResolver } from "@hookform/resolvers/zod";
import { loginFormSchema, LoginRequest } from "@/lib/formsValidation";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "../ui/form";
import { useAuth } from "@/api/Auth/useAuth";
import { login } from "@/api/client";
import { useNavigate } from "react-router-dom";
import { faSpinner } from "@fortawesome/pro-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

const LoginForm = () => {
  const { setToken } = useAuth();
  const navigate = useNavigate();

  const form = useForm<LoginRequest>({
    resolver: zodResolver(loginFormSchema),
    defaultValues: {
      code: "",
      password: "",
    },
  });

  const onSubmit = async (values: LoginRequest) => {
    return login(values, setToken, navigate, form);
  };
  return (
    <div className="bg-white shadow  rounded-3xl px-10 py-6">
      <Form {...form}>
        <form
          onSubmit={form.handleSubmit(onSubmit)}
          className="flex flex-col gap-y-12"
        >
          <div className="flex justify-center">
            <img src={log} alt="logo" className="w-[5.391rem] h-[5.252rem]" />
          </div>
          <div className="flex flex-col gap-y-8">
            <Label className="text-lg font-bold">
              Welcome to Géant SAP Mirroring{" "}
            </Label>
            <FormField
              control={form.control}
              name="code"
              render={({ field }) => (
                <FormItem className="flex flex-col gap-y-2">
                  <FormLabel className="text-sm flex justify-between font-bold text-geantSap-black">
                    UserCode
                    <FormMessage />
                  </FormLabel>
                  <FormControl>
                    <Input
                      placeholder="Code"
                      className="h-10  w-[21.313rem] border border-geantSap-gray-50 p-2 rounded-lg"
                      {...field}
                    />
                  </FormControl>
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="password"
              render={({ field }) => (
                <FormItem className="flex flex-col gap-y-2">
                  <FormLabel className="flex justify-between text-sm font-bold text-geantSap-black">
                    Password
                    <FormMessage />
                  </FormLabel>
                  <FormControl>
                    <Input
                      placeholder="Password"
                      className="h-10  w-[21.313rem] border  border-geantSap-gray-50 p-2 rounded-lg"
                      {...field}
                    />
                  </FormControl>
                </FormItem>
              )}
            />
          </div>
          <div className="flex flex-col gap-y-2">
            <Button
              disabled={form.formState.isSubmitting}
              className="w-[21.313rem] disabled:opacity-50 bg-geantSap-primary-500"
            >
              {form.formState.isSubmitting && (
                <FontAwesomeIcon className="" icon={faSpinner} spin />
              )}
              Login
            </Button>
            {form.formState.errors.root && (
              <div className="text-center w-full text-sm rounded-lg border text-geantSap-error-600 border-red-500 bg-red-200  p-2">
                {form.formState.errors.root.message}
              </div>
            )}
          </div>
        </form>
      </Form>
    </div>
  );
};

export default LoginForm;
