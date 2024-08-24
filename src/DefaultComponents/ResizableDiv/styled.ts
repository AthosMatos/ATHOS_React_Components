import { TbResize } from "react-icons/tb";
import styled from "styled-components";
import { JvrisColors } from "../colors/colors";

export const defaultBorder = " 1px solid rgba(0, 0, 0, 0.2)";
export const highlightBorder = `3px solid ${JvrisColors.jvrisAqua.default}`;

interface RDWrapperProps {
    width: string;
    height: string;
}

export const RDContainer = styled.div<RDWrapperProps>`
    overflow: auto;
    width: ${(props) => props.width};
    height: ${(props) => props.height};
    border: ${defaultBorder};
    border-radius: 10px;

    transition: border 0.08s;
`;
export const RDWrapper = styled.div<{ matchChildSize?: boolean }>`
    display: flex;
    width: ${({ matchChildSize }) => (matchChildSize ? "100%" : "fit-content")};
    height: ${({ matchChildSize }) =>
        matchChildSize ? "100%" : "fit-content"};
`;
export const RDPreWrapper = styled.div<{ withToogle?: boolean }>`
    ${(props) =>
        props.withToogle &&
        `
    display: flex;
    flex-direction: column;
    align-items: flex-end;
    width: fit-content;
    height: fit-content;
    padding: 1rem;
    gap: 1rem;
    `}
`;
export const RDDot = styled.div`
    width: 4px;
    height: 4px;
    background-color: ${JvrisColors.jvrisAqua.default};
    border-radius: 50%;
`;

export const RDResizeIcon = styled(TbResize)<{ toogle: boolean }>`
    width: 20px;
    height: 20px;
    color: ${JvrisColors.grey.default};
    cursor: pointer;
    opacity: 0.5;

    transition: opacity 0.14s;

    ${(props) =>
        props.toogle &&
        `
        opacity: 1;
         color: ${JvrisColors.jvrisAqua.default};
       
    `}
`;
