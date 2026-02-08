"use client";

import { useState, useRef, useEffect, Suspense } from "react";
import { useSearchParams } from "next/navigation";
import { motion } from "framer-motion";
import Link from "next/link";
import { VisualKeyboard } from "@/components/VisualKeyboard";
import { CURRICULUM } from "@/data/curriculum";

function PracticeContent() {
    const searchParams = useSearchParams();
    const subjectId = searchParams.get("subject");
    const chapterId = searchParams.get("chapter");

    const subject = CURRICULUM.find(s => s.id === subjectId);
    const chapter = subject?.chapters.find(c => c.id === chapterId);

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

    const code = chapter?.content || "";

    useEffect(() => {
        if (inputRef.current) {
            inputRef.current.focus();
        }
    }, []);

    const handleInput = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
        if (isComplete) return;

        if (!startTime) {
            setStartTime(Date.now());
            setIsPracticing(true);
        }

        const newValue = e.target.value;
        const expectedChar = code[cursorPos];

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
            if (nextPos === code.length) {
                setIsComplete(true);
                const endTime = Date.now();
                const durationMin = (endTime - (startTime || endTime)) / 60000;
                const calculatedWpm = Math.round((code.length / 5) / (durationMin || 0.01));
                setWpm(calculatedWpm);
            }
        } else {
            setErrors(prev => prev + 1);
        }
    };

    // Syntax Highlighting Simulation
    const renderCodeWithHighlighting = (text: string) => {
        const rules = [
            { regex: /\b(def|class|import|from|return|if|else|for|while|yield|lambda|with|as|try|except|finally|pass|break|continue|True|False|None)\b/g, className: "syntax-keyword" },
            { regex: /\b(print|len|range|enumerate|str|int|float|list|dict|set|tuple|super|input|open)\b/g, className: "syntax-function" },
            { regex: /"(?:[^"\\]|\\.)*"|'(?:[^'\\]|\\.)*'/g, className: "syntax-string" },
            { regex: /#.*$/gm, className: "syntax-comment" },
            { regex: /\b\d+(\.\d+)?\b/g, className: "syntax-number" },
            { regex: /[\+\-\*\/%=&|!<>:;,.]/g, className: "syntax-operator" },
        ];

        let parts: { text: string; className: string }[] = [{ text, className: "" }];

        rules.forEach(rule => {
            const newParts: { text: string; className: string }[] = [];
            parts.forEach(part => {
                if (part.className) {
                    newParts.push(part);
                    return;
                }

                let match;
                let lastIndex = 0;
                const regex = new RegExp(rule.regex); // Clone regex to avoid state issues if greedy

                while ((match = regex.exec(part.text)) !== null) {
                    if (match.index > lastIndex) {
                        newParts.push({ text: part.text.slice(lastIndex, match.index), className: "" });
                    }
                    newParts.push({ text: match[0], className: rule.className });
                    lastIndex = match.index + match[0].length;
                }

                if (lastIndex < part.text.length) {
                    newParts.push({ text: part.text.slice(lastIndex), className: "" });
                }
            });
            parts = newParts;
        });

        return (
            <>
                {parts.map((part, i) => (
                    <span key={i} className={part.className}>{part.text}</span>
                ))}
            </>
        );
    };

    // Overlay logic for practice
    const getRenderedCode = () => {
        // We will render specific spans for what has been typed vs what is pending
        const typed = code.slice(0, cursorPos);
        const current = code[cursorPos];
        const items = [];

        // This is a simplified view: we just render the raw code with coloring, 
        // but overlay the typed status. 
        // Actually, for the "Practice" feel in the page.tsx, we redrew the whole code block.
        // Here, let's keep it consistent with the Drill page logic which works well for chars.

        // However, for long python files, we want syntax highlighting on the *pending* text too.
        // So we render the whole block with syntax highlighting, and then apply a "dimmed" mask or similar?
        // Or we just use the cursor overlay method.

        // Let's reuse the simple character-spanning method for now for precision.
        return code.split("").map((char, i) => {
            let statusClass = "char-pending";
            if (i < cursorPos) statusClass = "char-correct";
            else if (i === cursorPos) statusClass = "char-current";

            return <span key={i} className={statusClass}>{char}</span>;
        });
    };

    if (!chapter) return <div className="container">Chapter not found.</div>;

    return (
        <div className="container" style={{ maxWidth: "1200px" }}>
            <nav className="minimal-nav" style={{ border: "none", marginBottom: "var(--space-md)" }}>
                <Link href="/path" className="minimal-logo" style={{ textDecoration: "none" }}>OAS / {subject?.title} / {chapter.title}</Link>
                <div style={{ display: "flex", gap: "var(--space-md)" }}>
                    <button
                        className="btn-minimal"
                        style={{ fontSize: "10px", opacity: showKeyboard ? 1 : 0.5 }}
                        onClick={() => setShowKeyboard(!showKeyboard)}
                    >
                        GUIDE: {showKeyboard ? "ON" : "OFF"}
                    </button>
                    <Link href="/path" className="btn-minimal">EXIT</Link>
                </div>
            </nav>

            <main style={{ display: "flex", flexDirection: "column", height: "calc(100vh - 100px)" }}>
                <div className="card-minimal" style={{ flex: 1, position: "relative", padding: 0, overflow: "hidden", display: "flex", flexDirection: "column" }}>

                    <div className="editor-header">
                        <div className="editor-dots">
                            <div className="dot" style={{ background: "#ff5f56" }}></div>
                            <div className="dot" style={{ background: "#ffbd2e" }}></div>
                            <div className="dot" style={{ background: "#27c93f" }}></div>
                        </div>
                        <div style={{ opacity: 0.5, fontSize: "10px" }}>workspace / {subject?.id} / {chapter.id}.py</div>
                        <div style={{ opacity: 0.3 }}>UTF-8</div>
                    </div>

                    <div style={{ flex: 1, position: "relative", overflow: "auto", display: "flex" }}>
                        {/* Line Numbers */}
                        <div className="line-numbers" style={{ background: "rgba(0,0,0,0.2)", minHeight: "100%", padding: "var(--space-md) var(--space-sm)", fontFamily: "var(--font-mono)", fontSize: "14px", lineHeight: "1.6", textAlign: "right", userSelect: "none", opacity: 0.5 }}>
                            {code.split("\n").map((_, i) => (
                                <div key={i}>{i + 1}</div>
                            ))}
                        </div>

                        {/* Code Area */}
                        <div className="code-practice-container" style={{ flex: 1, position: "relative", padding: "var(--space-md)", fontFamily: "var(--font-mono)", fontSize: "14px", lineHeight: "1.6", whiteSpace: "pre" }}>
                            {/* 
                       We want syntax highlighting AND typing status. 
                       The easiest way is to render the code TWICE perfectly overlapping:
                       1. Bottom layer: Syntax highlighted code (dimmed for pending)
                       2. Top layer: Typed characters (bright), Current cursor, Pending (transparent)
                   */}

                            <div style={{ position: "absolute", top: "var(--space-md)", left: "var(--space-md)", pointerEvents: "none", userSelect: "none" }}>
                                {/* Background Layer: Syntax Highlighting */}
                                <span style={{ opacity: 0.5 }}>{renderCodeWithHighlighting(code)}</span>
                            </div>

                            <div style={{ position: "relative", zIndex: 2 }}>
                                {/* Interactive Layer: Typing Status */}
                                {code.split("").map((char, i) => {
                                    let style = {};
                                    let className = "";

                                    if (i < cursorPos) {
                                        className = "char-correct";
                                        // We could apply syntax highlighting colors here too but keeping it simple "Bright White/Green" might be better for "done" state.
                                        // Actually, users prefer to see the colorful code as they type.
                                        // For now, let's stick to the "char-correct" (which is usually bright text) method.
                                    } else if (i === cursorPos) {
                                        className = "char-current";
                                    } else {
                                        style = { opacity: 0 }; // Hide pending chars in this layer so background shows through
                                    }

                                    return <span key={i} className={className} style={style}>{char}</span>;
                                })}
                            </div>
                        </div>

                        <textarea
                            ref={inputRef}
                            className="notepad-textarea"
                            style={{ position: "absolute", top: 0, left: 0, opacity: 0, height: "100%", width: "100%", zIndex: 10 }}
                            value={input}
                            onChange={handleInput}
                            disabled={isComplete}
                            autoFocus
                        />
                    </div>

                    {/* Footer / Stats */}
                    <div style={{ padding: "var(--space-md)", borderTop: "1px solid var(--forest)", background: "rgba(10, 20, 10, 0.4)", display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                        <div style={{ display: "flex", gap: "var(--space-xl)", fontSize: "12px", fontFamily: "var(--font-mono)", opacity: 0.7 }}>
                            <span>REQ: {code.length} CHARS</span>
                            <span>ERRORS: {errors}</span>
                            <span>WPM: {wpm}</span>
                        </div>
                        {isComplete && (
                            <div style={{ display: "flex", gap: "var(--space-md)" }}>
                                <button className="btn-minimal" onClick={() => window.location.reload()}>RETRY</button>
                                <Link href="/path" className="btn-minimal" style={{ background: "var(--khaki)", color: "var(--bg-primary)" }}>COMPLETE</Link>
                            </div>
                        )}
                        {!isComplete && (
                            <div style={{ width: "200px", height: "6px", background: "var(--forest)", borderRadius: "3px" }}>
                                <div style={{ width: `${Math.round((cursorPos / code.length) * 100)}%`, height: "100%", background: "var(--khaki)", borderRadius: "3px", transition: "width 0.2s" }}></div>
                            </div>
                        )}
                    </div>
                </div>

                {showKeyboard && (
                    <div style={{ marginTop: "var(--space-md)", height: "260px", flexShrink: 0 }}>
                        <VisualKeyboard activeChar={code[cursorPos] || ""} />
                    </div>
                )}
            </main>
        </div>
    );
}

export default function PracticePage() {
    return (
        <Suspense fallback={<div>Loading practice session...</div>}>
            <PracticeContent />
        </Suspense>
    );
}
