import { Field } from "@/components/ui/field";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { NicknameFieldsProps } from "@/types/my-page";

export default function NicknameFields({ nickname, handleNicknameChange }: NicknameFieldsProps) {
  return (
    <Field>
      <Label htmlFor="nickname">닉네임 *</Label>
      <Input
        id="nickname"
        placeholder="닉네임을 입력해주세요."
        value={nickname}
        onChange={handleNicknameChange}
      />
    </Field>
  );
}
