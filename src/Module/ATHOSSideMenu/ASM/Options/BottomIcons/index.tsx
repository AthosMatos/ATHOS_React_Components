import { BiSolidPencil } from "react-icons/bi";
import { GoSignOut } from "react-icons/go";
import { useATHOSSideMenu } from "../../../context/context";
import { ASMArrowLeft, BottomIconsWrapper } from "../../../styled";
import ASMEditOption from "./EditOption";
import ASMExitOption from "./ExitOption";
import ASMHideOption from "./HideOption";

const BottomIcons = () => {
  const {
    props: {
      onExit,
      collapsable,
      editable,
      colors: { active, accent },
    },
    hideMenu,
  } = useATHOSSideMenu();
  return (
    <BottomIconsWrapper hideMenu={hideMenu}>
      {onExit && !hideMenu && (
        <ASMExitOption
          onClick={onExit.onClick}
          Icon={onExit.Icon ?? GoSignOut}
          label={onExit.label}
        />
      )}
      {editable && !hideMenu && (
        <ASMEditOption
          Icon={editable.Icon ?? BiSolidPencil}
          label={editable.label ?? ""}
        />
      )}
      {collapsable && (
        <ASMHideOption
          Icon={
            collapsable.Icon ?? (
              <ASMArrowLeft clicked={hideMenu} activeColor={accent} />
            )
          }
          label={collapsable.label ?? ""}
        />
      )}
    </BottomIconsWrapper>
  );
};

export default BottomIcons;
