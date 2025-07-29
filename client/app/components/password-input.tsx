import { useState } from "react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Eye, EyeOff } from "lucide-react"; // swap if you use other icons

interface PasswordInputProps {
  field: any;
  placeholder?: string;
}

export function PasswordInput({
  field,
  placeholder = "***********",
}: PasswordInputProps) {
  const [show, setShow] = useState(false);

  return (
    <div className="relative">
      <Input
        {...field}
        type={show ? "text" : "password"}
        placeholder={placeholder}
        className="pr-10"
      />
      <Button
        type="button"
        variant="ghost"
        size="icon"
        onClick={() => setShow((prev) => !prev)}
        className="absolute top-1/2 right-2 -translate-y-1/2 p-1 h-auto w-auto"
        tabIndex={-1}
      >
        {show ? <EyeOff className="h-5 w-5" /> : <Eye className="h-5 w-5" />}
      </Button>
    </div>
  );
}
