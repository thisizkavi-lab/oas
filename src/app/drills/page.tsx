"use client";

import { useState, useRef, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Link from "next/link";
import { VisualKeyboard } from "@/components/VisualKeyboard";

// Drill Data
const DRILL_CATEGORIES = [
    {
        id: "brackets",
        title: "Brackets & Braces",
        goal: "Perfect symmetric symbols",
        snippets: [
            "() () () () ()",
            "[] [] [] [] []",
            "{} {} {} {} {}",
            "<> <> <> <> <>",
            "({[]})",
            "<({[]})>",
            "[{()}]"
        ]
    },
    {
        id: "quotes",
        title: "Quotes & Strings",
        goal: "Stop freezing on strings",
        snippets: [
            "'' '' '' '' ''",
            "\"\" \"\" \"\" \"\" \"\"",
            "`` `` `` `` ``",
            "\"hello\"",
            "'world'",
            "`template`",
            "\"mix'ed\""
        ]
    },
    {
        id: "arithmetic",
        title: "Arithmetic & Assignment",
        goal: "Flow without thinking",
        snippets: [
            "+ - * / %",
            "a+b",
            "a-b",
            "a*b",
            "a/b",
            "a%b",
            "x=1",
            "y=2",
            "z=x+y"
        ]
    },
    {
        id: "logic",
        title: "Comparison & Logic",
        goal: "Operators feel automatic",
        snippets: [
            "== != <= >= < >",
            "&& || !",
            "a==b",
            "a!=b",
            "a<=b && b>=c",
            "!flag || ready"
        ]
    },
    {
        id: "punctuation",
        title: "Punctuation & Glue",
        goal: "Kill syntax errors",
        snippets: [
            "; ; ; ; ;",
            ": : : : :",
            ", , , , ,",
            ". . . . .",
            "foo(a,b,c);",
            "obj.method(x);",
            "key:value;"
        ]
    },
    {
        id: "advanced",
        title: "Arrows, Pipes, Weird Stuff",
        goal: "Advanced fluency",
        snippets: [
            "-> => :: ...",
            "x -> y",
            "(a) => a+1",
            "std::vector",
            "func(...args)",
            "cat file | grep foo",
            "cmd && next || fail"
        ]
    },
    {
        id: "final",
        title: "Full-stack Symbol Hell",
        goal: "The Final Boss",
        snippets: [
            "if (a >= b && b != 0) {\n    return foo(bar[x], y->z);\n}",
            "result = data?.items ?? []",
            "total += item.price * qty",
            "if(a<b){\nx=y+z;\n}"
        ]
    }
];

export default function DrillsPage() {
    const [selectedCategory, setSelectedCategory] = useState<string | null>(null);
    const [drillIndex, setDrillIndex] = useState(0);
    const [isPracticing, setIsPracticing] = useState(false);
    const [showKeyboard, setShowKeyboard] = useState(true);

    // Practice State
    const [input, setInput] = useState("");
    const [cursorPos, setCursorPos] = useState(0);
    const [errors, setErrors] = useState(0);
    const [startTime, setStartTime] = useState<number | null>(null);
    const [wpm, setWpm] = useState(0);
    const [isComplete, setIsComplete] = useState(false);
    const inputRef = useRef<HTMLTextAreaElement>(null);

    const activeCategory = DRILL_CATEGORIES.find(c => c.id === selectedCategory);
    const activeSnippet = activeCategory?.snippets[drillIndex] || "";

    const startDrill = (catId: string, idx: number = 0) => {
        setSelectedCategory(catId);
        setDrillIndex(idx);
        setIsPracticing(true);
        setInput("");
        setCursorPos(0);
        setErrors(0);
        setStartTime(null);
        setWpm(0);
        setIsComplete(false);
    };

    const resetDrill = () => {
        startDrill(selectedCategory!, drillIndex);
    };

    const handleInput = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
        if (isComplete) return;

        if (!startTime) setStartTime(Date.now());

        const newValue = e.target.value;
        const expectedChar = activeSnippet[cursorPos];

        // Handle backspace
        if (newValue.length < input.length) {
            setInput(newValue);
            setCursorPos(Math.max(0, cursorPos - 1));
            return;
        }

        const lastChar = newValue[newValue.length - 1];
        if (lastChar === expectedChar) {
            setInput(newValue);
            const nextPos = cursorPos + 1;
            setCursorPos(nextPos);

            // Check for completion
            if (nextPos === activeSnippet.length) {
                setIsComplete(true);
                const endTime = Date.now();
                const durationMin = (endTime - (startTime || endTime)) / 60000;
                const calculatedWpm = Math.round((activeSnippet.length / 5) / (durationMin || 0.01));
                setWpm(calculatedWpm);
            }
        } else {
            setErrors(prev => prev + 1);
        }
    };

    useEffect(() => {
        if (isPracticing && inputRef.current) {
            inputRef.current.focus();
        }
    }, [isPracticing, drillIndex]);

    const renderHighlightedSnippet = () => {
        return activeSnippet.split("").map((char, i) => {
            let className = "char-pending";
            if (i < cursorPos) className = "char-correct";
            else if (i === cursorPos) className = "char-current";

            // Color digits and operators for a "mini editor" look
            let colorClass = "";
            if (/[0-9]/.test(char)) colorClass = "syntax-number";
            else if (/[(){}\[\]]/.test(char)) colorClass = "syntax-operator";
            else if (/[+\-*/%=&|!<>:;,.]/.test(char)) colorClass = "syntax-operator";

            return (
                <span key={i} className={`${className} ${colorClass}`}>
                    {char === "\n" ? "↵\n" : char}
                </span>
            );
        });
    };

    return (
        <div className="container">
            <nav className="minimal-nav" style={{ border: "none", marginBottom: "var(--space-md)" }}>
                <Link href="/" className="minimal-logo" style={{ textDecoration: "none" }}>OAS / SYMBOLS</Link>
                <div style={{ display: "flex", gap: "var(--space-md)" }}>
                    <button
                        className="btn-minimal"
                        style={{ fontSize: "10px", opacity: showKeyboard ? 1 : 0.5 }}
                        onClick={() => setShowKeyboard(!showKeyboard)}
                    >
                        GUIDE: {showKeyboard ? "ON" : "OFF"}
                    </button>
                    {selectedCategory && (
                        <button className="btn-minimal" onClick={() => setSelectedCategory(null)}>EXIT</button>
                    )}
                </div>
            </nav>

            <main>
                <AnimatePresence mode="wait">
                    {!selectedCategory ? (
                        <motion.div
                            key="list"
                            initial={{ opacity: 0, scale: 0.99 }}
                            animate={{ opacity: 1, scale: 1 }}
                            exit={{ opacity: 0 }}
                            style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(280px, 1fr))", gap: "var(--space-md)" }}
                        >
                            {DRILL_CATEGORIES.map(cat => (
                                <div
                                    key={cat.id}
                                    className="card-minimal"
                                    style={{ cursor: "pointer", transition: "transform 0.2s" }}
                                    onClick={() => startDrill(cat.id)}
                                >
                                    <h3 style={{ fontSize: "14px", color: "var(--khaki-bright)" }}>{cat.title}</h3>
                                    <p style={{ fontSize: "11px", opacity: 0.5, textTransform: "uppercase", letterSpacing: "1px" }}>{cat.goal}</p>
                                </div>
                            ))}
                        </motion.div>
                    ) : (
                        <motion.div
                            key="practice"
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            exit={{ opacity: 0 }}
                        >
                            <div className="card-minimal" style={{ position: "relative", padding: 0, overflow: "hidden", minHeight: "200px" }}>
                                <div className="editor-header">
                                    <div className="editor-dots">
                                        <div className="dot" style={{ background: "#ff5f56" }}></div>
                                        <div className="dot" style={{ background: "#ffbd2e" }}></div>
                                        <div className="dot" style={{ background: "#27c93f" }}></div>
                                    </div>
                                    <div style={{ opacity: 0.5, fontSize: "10px" }}>
                                        drills / {selectedCategory} / chunk {drillIndex + 1}
                                    </div>
                                    <div style={{ opacity: 0.3 }}>{activeSnippet.length} chars</div>
                                </div>

                                <div className="code-practice-container" style={{ padding: "var(--space-lg)" }}>
                                    {renderHighlightedSnippet()}
                                </div>

                                <textarea
                                    ref={inputRef}
                                    className="notepad-textarea"
                                    style={{ position: "absolute", top: "30px", left: 0, opacity: 0, height: "100%", zIndex: 1 }}
                                    value={input}
                                    onChange={handleInput}
                                    disabled={isComplete}
                                    autoFocus
                                />
                            </div>

                            {showKeyboard && !isComplete && (
                                <div style={{ marginTop: "var(--space-lg)" }}>
                                    <VisualKeyboard activeChar={activeSnippet[cursorPos] || ""} />
                                </div>
                            )}

                            {isComplete && (
                                <motion.div
                                    initial={{ opacity: 0, y: 10 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    className="card-minimal"
                                    style={{ marginTop: "var(--space-lg)", textAlign: "center", borderColor: "var(--khaki)" }}
                                >
                                    <div style={{ fontSize: "24px", color: "var(--khaki-bright)", fontWeight: "bold" }}>{wpm} WPM</div>
                                    <div style={{ fontSize: "10px", opacity: 0.5, letterSpacing: "2px", margin: "8px 0 16px" }}>
                                        DRILL COMPLETE WITH {errors} ERRORS
                                    </div>
                                    <div style={{ display: "flex", justifyContent: "center", gap: "var(--space-md)" }}>
                                        <button className="btn-minimal" onClick={resetDrill}>TRY AGAIN</button>
                                        {drillIndex < activeCategory!.snippets.length - 1 ? (
                                            <button className="btn-minimal" onClick={() => startDrill(selectedCategory!, drillIndex + 1)} style={{ background: "var(--khaki)", color: "var(--bg-primary)" }}>NEXT CHUNK</button>
                                        ) : (
                                            <button className="btn-minimal" onClick={() => setSelectedCategory(null)}>FINISH CATEGORY</button>
                                        )}
                                    </div>
                                </motion.div>
                            )}

                            {!isComplete && (
                                <div style={{ marginTop: "var(--space-md)", display: "flex", justifyContent: "space-between", opacity: 0.3, fontSize: "11px", letterSpacing: "1px" }}>
                                    <span>PROGRESS: {Math.round((cursorPos / activeSnippet.length) * 100)}%</span>
                                    <span>ERRORS: {errors}</span>
                                </div>
                            )}
                        </motion.div>
                    )}
                </AnimatePresence>
            </main>

            <footer style={{ marginTop: "var(--space-xl)", textAlign: "center", opacity: 0.1, fontSize: "10px", letterSpacing: "4px" }}>
                SYMBOL HELL / PHYSICAL FLUENCY
            </footer>
        </div>
    );
}
