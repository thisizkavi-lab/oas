"use client";

import React from "react";

interface KeyProps {
    label: string;
    sub?: string;
    isActive?: boolean;
    type?: "normal" | "wide" | "extra-wide" | "space" | "return";
}

const Key = ({ label, sub, isActive, type = "normal" }: KeyProps) => {
    const typeClass = type === "normal" ? "" : `kb-key-${type}`;
    return (
        <div className={`kb-key ${typeClass} ${isActive ? "active" : ""}`}>
            <span className="kb-key-label">{label}</span>
            {sub && <span className="kb-key-sub">{sub}</span>}
        </div>
    );
};

interface VisualKeyboardProps {
    activeChar: string;
}

export const VisualKeyboard = ({ activeChar }: VisualKeyboardProps) => {
    // Mapping of characters to physical key labels for highlighting
    const getActiveKeyInfo = (char: string): { key: string; shift?: boolean } => {
        if (!char) return { key: "" };
        const upper = char.toUpperCase();

        // Numbers & Top row
        if (char === "1" || char === "!") return { key: "1", shift: char === "!" };
        if (char === "2" || char === "\"") return { key: "2", shift: char === "\"" };
        if (char === "3" || char === "#") return { key: "3", shift: char === "#" };
        if (char === "4" || char === "$") return { key: "4", shift: char === "$" };
        if (char === "5" || char === "%") return { key: "5", shift: char === "%" };
        if (char === "6" || char === "&") return { key: "6", shift: char === "&" };
        if (char === "7" || char === "'") return { key: "7", shift: char === "'" };
        if (char === "8" || char === "(") return { key: "8", shift: char === "(" };
        if (char === "9" || char === ")") return { key: "9", shift: char === ")" };
        if (char === "0" || char === "を") return { key: "0", shift: char === "を" };
        if (char === "-" || char === "=") return { key: "-", shift: char === "=" };
        if (char === "^" || char === "~") return { key: "^", shift: char === "~" };
        if (char === "¥" || char === "|") return { key: "¥", shift: char === "|" };

        // Alphabet
        if (/^[A-Z]$/.test(upper)) return { key: upper, shift: char === upper && char !== char.toLowerCase() };

        // Symbols
        if (char === "@" || char === "`") return { key: "@", shift: char === "`" };
        if (char === "[" || char === "{") return { key: "[", shift: char === "{" };
        if (char === ";" || char === "+") return { key: ";", shift: char === "+" };
        if (char === ":" || char === "*") return { key: ":", shift: char === "*" };
        if (char === "]" || char === "}") return { key: "]", shift: char === "}" };
        if (char === "," || char === "<") return { key: ",", shift: char === "<" };
        if (char === "." || char === ">") return { key: ".", shift: char === ">" };
        if (char === "/" || char === "?") return { key: "/", shift: char === "?" };
        if (char === " " || char === "_") return { key: char === " " ? "SPACE" : "_", shift: char === "_" };

        if (char === "\n") return { key: "RETURN" };

        return { key: "" };
    };

    const { key: activeKey, shift: needsShift } = getActiveKeyInfo(activeChar);

    return (
        <div className="keyboard-section">
            <div className="keyboard-title">Japanese MacBook Keyboard</div>
            <div className="kb-container">
                {/* Row 1 */}
                <div className="kb-row">
                    <Key label="1" sub="!" isActive={activeKey === "1"} />
                    <Key label="2" sub={'"'} isActive={activeKey === "2"} />
                    <Key label="3" sub="#" isActive={activeKey === "3"} />
                    <Key label="4" sub="$" isActive={activeKey === "4"} />
                    <Key label="5" sub="%" isActive={activeKey === "5"} />
                    <Key label="6" sub="&" isActive={activeKey === "6"} />
                    <Key label="7" sub="'" isActive={activeKey === "7"} />
                    <Key label="8" sub="(" isActive={activeKey === "8"} />
                    <Key label="9" sub=")" isActive={activeKey === "9"} />
                    <Key label="0" sub="を" isActive={activeKey === "0"} />
                    <Key label="-" sub="=" isActive={activeKey === "-"} />
                    <Key label="^" sub="~" isActive={activeKey === "^"} />
                    <Key label="¥" sub="|" isActive={activeKey === "¥"} />
                    <Key label="delete" type="wide" />
                </div>

                {/* Row 2 */}
                <div className="kb-row">
                    <Key label="tab" type="wide" />
                    <Key label="Q" isActive={activeKey === "Q"} />
                    <Key label="W" isActive={activeKey === "W"} />
                    <Key label="E" isActive={activeKey === "E"} />
                    <Key label="R" isActive={activeKey === "R"} />
                    <Key label="T" isActive={activeKey === "T"} />
                    <Key label="Y" isActive={activeKey === "Y"} />
                    <Key label="U" isActive={activeKey === "U"} />
                    <Key label="I" isActive={activeKey === "I"} />
                    <Key label="O" isActive={activeKey === "O"} />
                    <Key label="P" isActive={activeKey === "P"} />
                    <Key label="@" sub="`" isActive={activeKey === "@"} />
                    <Key label="[" sub="{" isActive={activeKey === "["} />
                    <div className={`kb-row-return ${activeKey === "RETURN" ? "active" : ""}`}>
                        <span>return</span>
                    </div>
                </div>

                {/* Row 3 */}
                <div className="kb-row">
                    <Key label="control" type="wide" />
                    <Key label="A" isActive={activeKey === "A"} />
                    <Key label="S" isActive={activeKey === "S"} />
                    <Key label="D" isActive={activeKey === "D"} />
                    <Key label="F" isActive={activeKey === "F"} />
                    <Key label="G" isActive={activeKey === "G"} />
                    <Key label="H" isActive={activeKey === "H"} />
                    <Key label="J" isActive={activeKey === "J"} />
                    <Key label="K" isActive={activeKey === "K"} />
                    <Key label="L" isActive={activeKey === "L"} />
                    <Key label=";" sub="+" isActive={activeKey === ";"} />
                    <Key label=":" sub="*" isActive={activeKey === ":"} />
                    <Key label="]" sub="}" isActive={activeKey === "]"} />
                </div>

                {/* Row 4 */}
                <div className="kb-row">
                    <Key label="shift" type="extra-wide" isActive={needsShift} />
                    <Key label="Z" isActive={activeKey === "Z"} />
                    <Key label="X" isActive={activeKey === "X"} />
                    <Key label="C" isActive={activeKey === "C"} />
                    <Key label="V" isActive={activeKey === "V"} />
                    <Key label="B" isActive={activeKey === "B"} />
                    <Key label="N" isActive={activeKey === "N"} />
                    <Key label="M" isActive={activeKey === "M"} />
                    <Key label="," sub="<" isActive={activeKey === ","} />
                    <Key label="." sub=">" isActive={activeKey === "."} />
                    <Key label="/" sub="?" isActive={activeKey === "/"} />
                    <Key label="_" sub="\\" isActive={activeKey === "_"} />
                    <Key label="shift" type="extra-wide" isActive={needsShift} />
                </div>

                {/* Row 5 */}
                <div className="kb-row">
                    <Key label="fn" />
                    <Key label="⌥" sub="option" />
                    <Key label="⌘" sub="command" />
                    <Key label="英数" />
                    <Key label="space" type="space" isActive={activeKey === "SPACE"} />
                    <Key label="かな" />
                    <Key label="⌘" sub="command" />
                    <Key label="⌥" />
                    <div className="kb-arrows">
                        <div className="kb-key kb-arrow-key"><span>←</span></div>
                        <div className="kb-arrow-stack">
                            <div className="kb-key kb-arrow-key-small"><span>↑</span></div>
                            <div className="kb-key kb-arrow-key-small"><span>↓</span></div>
                        </div>
                        <div className="kb-key kb-arrow-key"><span>→</span></div>
                    </div>
                </div>
            </div>
        </div>
    );
};
