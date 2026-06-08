import { Field } from "@/components/ui/field";
import { Input } from "@/components/ui/input";
import { EmailFieldProps } from "@/types/my-page";
import { Label } from "@radix-ui/react-label";

export default function EmailField({ email }: EmailFieldProps) {
  return (
    <>
      <Field>
        <Label htmlFor="email">이메일 *</Label>
        <div className="relative space-y-1">
          <Input
            type="email"
            placeholder="이메일을 입력하세요."
            className="pr-9"
            value={email}
            disabled
          />
          {/* <p className="text-text-sub text-xs">유효한 이메일 주소를 입력하세요.</p> */}
        </div>
      </Field>
      {/* <Field>
              <Label htmlFor="emailConfirm">이메일 확인</Label>
              <div className="relative space-y-1">
                <div className="flex gap-1">
                  <Input
                    type="emailConfirm"
                    placeholder="이메일을 입력하세요."
                    className="pr-9"
                    value={emailConfirm}
                  />
                  <Button>확인</Button>
                </div>
                <p className="text-text-sub text-xs">유효한 이메일 주소를 입력하세요.</p>
              </div>
            </Field> */}
    </>
  );
}
