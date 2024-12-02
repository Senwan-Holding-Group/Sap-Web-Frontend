import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import log from "/loginLogo.svg";

const LoginPage = () => {
  return (
    <div className="bg-geantSap-bg flex items-center justify-center w-screen h-screen">
      <div className="bg-white shadow  rounded-3xl px-10 py-6">
        <div className="flex flex-col gap-y-12">
          <div className="flex justify-center">
            <img src={log} alt="logo" className="w-[5.391rem] h-[5.252rem]" />
          </div>
          <div className="flex flex-col gap-y-8">
            <Label className="text-lg font-bold">
              Welcome to Géant SAP Mirroring{" "}
            </Label>
            <div className="flex flex-col gap-y-2">
              <Label>Username</Label>
              <Input className="w-[21.313rem]" />
            </div>
            <div className="flex flex-col gap-y-2">
              <Label>Password</Label>
              <Input className="w-[21.313rem]" />
            </div>
          </div>
          <Button className="w-[21.313rem] bg-geantSap-primary-500">
            Login
          </Button>
        </div>
      </div>
    </div>
  );
};

export default LoginPage;
