import { IconType } from "react-icons";
import { ATHOSColors } from "../../colors/colors";
import { useATHOSSideMenu } from "../context";
import {
  ASMIconWrapper,
  ASMLabelIconWrapper,
  ASMOptionLabel,
  ASMOptionWrapper,
  defaulIconSize,
} from "../styled";

interface ASMOptionProps {
  Icon: IconType;
  iconSize?: string | number;
  label: string;
  onClick?: () => void;
}

const ASMExitOption = ({
  Icon,
  label,

  iconSize,
  onClick,
}: ASMOptionProps) => {
  const {
    props: { colors },
  } = useATHOSSideMenu();
  return (
    <ASMOptionWrapper
      accentColor={colors.accent}
      activeColor={colors.active}
      onClick={() => {
        onClick && onClick();
      }}
    >
      <ASMLabelIconWrapper>
        <ASMIconWrapper iconSize={defaulIconSize}>
          <Icon
            style={{
              pointerEvents: "none",
              color: ATHOSColors.red.default,
            }}
            size={iconSize ?? defaulIconSize}
          />
        </ASMIconWrapper>

        <ASMOptionLabel>{label}</ASMOptionLabel>
      </ASMLabelIconWrapper>
    </ASMOptionWrapper>
  );
};

export default ASMExitOption;
