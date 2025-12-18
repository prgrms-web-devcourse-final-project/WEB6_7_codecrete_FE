import { CardContent, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

export default function PreferenceSelectSection() {
  return (
    <CardContent className="grid grid-cols-3 gap-2">
      <div className="flex flex-col gap-2">
        <CardTitle>
          인원 수 <span className="text-text-sub">*</span>
        </CardTitle>
        <Input type="number" min={1} max={50} placeholder="선호 인원수를 선택하세요" className="" />
      </div>

      <div className="flex flex-col gap-2">
        <CardTitle>성별</CardTitle>
        <Select>
          <SelectTrigger className="w-full">
            <SelectValue placeholder="선호 성별을 선택하세요" />
          </SelectTrigger>
          <SelectContent>
            <SelectGroup>
              <SelectLabel>성별</SelectLabel>
              <SelectItem value="male">남성</SelectItem>
              <SelectItem value="female">여성</SelectItem>
            </SelectGroup>
          </SelectContent>
        </Select>
      </div>

      <div className="flex flex-col gap-2">
        <CardTitle>연령대</CardTitle>
        <Select>
          <SelectTrigger className="w-full">
            <SelectValue placeholder="선호 연령대를 선택하세요" />
          </SelectTrigger>
          <SelectContent>
            <SelectGroup>
              <SelectLabel>연령대</SelectLabel>
              <SelectItem value="teens">10대 (10~19세)</SelectItem>
              <SelectItem value="twenties">20대 (20~29세)</SelectItem>
              <SelectItem value="thirties">30대 (30~39세)</SelectItem>
              <SelectItem value="forties">40대 (40~49세)</SelectItem>
              <SelectItem value="fifties">50대 (50~59세)</SelectItem>
              <SelectItem value="sixties">60대 (60~69세)</SelectItem>
              <SelectItem value="seventies">70대 이상</SelectItem>
            </SelectGroup>
          </SelectContent>
        </Select>
      </div>
    </CardContent>
  );
}
