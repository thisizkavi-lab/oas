"use client";

import { useState, useRef, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Link from "next/link";
import { JP_MAC_SYMBOL_MAP } from "@/utils/keyboardMaps";
import { VisualKeyboard } from "@/components/VisualKeyboard";

export default function Home() {
  const [code, setCode] = useState("");
  const [isPracticing, setIsPracticing] = useState(false);
  const [showJPKeyboard, setShowJPKeyboard] = useState(false); // Legacy hint bar
  const [showKeyboardGuide, setShowKeyboardGuide] = useState(true); // New visual guide
  const [recents, setRecents] = useState<string[]>([]);

  // Practice State
  const [input, setInput] = useState("");
  const [cursorPos, setCursorPos] = useState(0);
  const [errors, setErrors] = useState(0);
  const inputRef = useRef<HTMLTextAreaElement>(null);

  // Load recents on mount
  useEffect(() => {
    const saved = localStorage.getItem("oas-recents");
    if (saved) setRecents(JSON.parse(saved));
  }, []);

  const saveToRecents = (snippet: string) => {
    const updated = [snippet, ...recents.filter(r => r !== snippet)].slice(0, 5);
    setRecents(updated);
    localStorage.setItem("oas-recents", JSON.stringify(updated));
  };

  const startPractice = () => {
    if (!code.trim()) return;
    saveToRecents(code.trim());
    setIsPracticing(true);
    setInput("");
    setCursorPos(0);
    setErrors(0);
  };

  const reset = () => {
    setIsPracticing(false);
    // Keep the code in the textarea
  };

  const handleInput = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    if (!isPracticing) return;

    const newValue = e.target.value;
    const expectedChar = code[cursorPos];

    // Simple shadow typing logic
    if (newValue.length < input.length) {
      setInput(newValue);
      setCursorPos(Math.max(0, cursorPos - 1));
      return;
    }

    const lastChar = newValue[newValue.length - 1];
    if (lastChar === expectedChar) {
      setInput(newValue);
      setCursorPos(cursorPos + 1);
    } else {
      setErrors(prev => prev + 1);
    }
  };

  useEffect(() => {
    if (isPracticing && inputRef.current) {
      inputRef.current.focus();
    }
  }, [isPracticing]);

  // Syntax highlighting simulation helper
  const renderCodeWithHighlighting = (text: string) => {
    // Definitive coloring rules
    const rules = [
      { regex: /\b(def|class|import|from|return|if|else|for|while|yield|lambda|with|as|try|except|finally|pass|break|continue|True|False|None)\b/g, className: "syntax-keyword" },
      { regex: /\b(self|cls|attr|id|type|print|len|range|enumerate|zip|sum|max|min|abs|round)\b/g, className: "syntax-function" },
      { regex: /(['"])(?:(?!\1|\\).|\\.)*\1/g, className: "syntax-string" },
      { regex: /\b\d+(\.\d*)?\b/g, className: "syntax-number" },
      { regex: /(#.*|\/\/.*)/g, className: "syntax-comment" },
      { regex: /[(){}\[\]]/g, className: "syntax-operator" },
    ];

    // Build map of char index to class
    const charClasses = new Array(text.length).fill("");
    rules.forEach(rule => {
      let match;
      const regex = new RegExp(rule.regex); // Clone with global flag reset
      while ((match = regex.exec(text)) !== null) {
        for (let i = match.index; i < match.index + match[0].length; i++) {
          charClasses[i] = rule.className;
        }
      }
    });

    return text.split("").map((char, i) => {
      let className = "char-pending";
      if (isPracticing) {
        if (i < cursorPos) className = "char-correct";
        else if (i === cursorPos) className = "char-current";
      }

      const colorClass = charClasses[i];

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
        <div className="minimal-logo">OAS / MINIMAL</div>
        <div style={{ display: "flex", gap: "var(--space-md)", alignItems: "center" }}>
          <Link href="/path" style={{ fontSize: "10px", color: "var(--forest)", textDecoration: "none", opacity: 0.7, textTransform: "uppercase", letterSpacing: "1px" }}>Path</Link>
          <Link href="/drills" style={{ fontSize: "10px", color: "var(--khaki)", textDecoration: "none", opacity: 0.7, textTransform: "uppercase", letterSpacing: "1px" }}>Drills</Link>
          <button
            className="btn-minimal"
            style={{ fontSize: "10px", opacity: showKeyboardGuide ? 1 : 0.5, borderColor: showKeyboardGuide ? "var(--khaki)" : "var(--forest)" }}
            onClick={() => setShowKeyboardGuide(!showKeyboardGuide)}
          >
            GUIDE: {showKeyboardGuide ? "ON" : "OFF"}
          </button>
          {isPracticing && (
            <button className="btn-minimal" onClick={reset}>EXIT</button>
          )}
        </div>
      </nav>

      <main>
        <AnimatePresence mode="wait">
          {!isPracticing ? (
            <motion.div
              key="notepad"
              initial={{ opacity: 0, scale: 0.99 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.98 }}
            >
              <div className="card-minimal">
                <textarea
                  className="notepad-textarea"
                  placeholder="Paste code chunk here..."
                  value={code}
                  onChange={(e) => setCode(e.target.value)}
                  autoFocus
                />
                <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginTop: "var(--space-md)" }}>
                  <div style={{ display: "flex", gap: "var(--space-sm)" }}>
                    <button className="btn-minimal" onClick={() => setCode("")} style={{ opacity: 0.5 }}>Clear</button>
                  </div>
                  <button className="btn-minimal" onClick={startPractice}>Practice Chunk</button>
                </div>
              </div>

              {showKeyboardGuide && (
                <div style={{ marginTop: "var(--space-xl)" }}>
                  <VisualKeyboard activeChar="" />
                </div>
              )}

              {recents.length > 0 && (
                <div style={{ marginTop: "var(--space-xl)" }}>
                  <h4 style={{ fontSize: "12px", opacity: 0.3, textTransform: "uppercase", letterSpacing: "2px", marginBottom: "var(--space-md)" }}>Recent Snippets</h4>
                  <div style={{ display: "flex", flexWrap: "wrap", gap: "var(--space-sm)" }}>
                    {recents.map((r, idx) => (
                      <button
                        key={idx}
                        className="btn-minimal"
                        style={{ fontSize: "11px", opacity: 0.6, maxWidth: "200px", overflow: "hidden", textOverflow: "ellipsis", whiteSpace: "nowrap" }}
                        onClick={() => setCode(r)}
                      >
                        {r.split("\n")[0].slice(0, 30)}...
                      </button>
                    ))}
                  </div>
                </div>
              )}
            </motion.div>
          ) : (
            <motion.div
              key="practice"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="card-minimal"
              style={{ position: "relative", minHeight: "400px", padding: 0, overflow: "hidden" }}
            >
              <div className="editor-header">
                <div className="editor-dots">
                  <div className="dot" style={{ background: "#ff5f56" }}></div>
                  <div className="dot" style={{ background: "#ffbd2e" }}></div>
                  <div className="dot" style={{ background: "#27c93f" }}></div>
                </div>
                <div style={{ opacity: 0.5, fontSize: "10px" }}>workspace / practice_chunk.py</div>
                <div style={{ opacity: 0.3 }}>UTF-8</div>
              </div>

              <div className="code-practice-container" style={{ padding: "var(--space-md) 0 var(--space-md) var(--space-md)" }}>
                <div className="line-numbers">
                  {code.split("\n").map((_, i) => (
                    <div key={i}>{i + 1}</div>
                  ))}
                </div>
                {renderCodeWithHighlighting(code)}
              </div>

              <textarea
                ref={inputRef}
                className="notepad-textarea"
                style={{
                  position: "absolute",
                  top: "30px", /* Below header */
                  left: 0,
                  opacity: 0,
                  height: "calc(100% - 30px)",
                  zIndex: 1
                }}
                value={input}
                onChange={handleInput}
                autoFocus
              />

              <div style={{ padding: "0 var(--space-lg) var(--space-lg)" }}>
                {showKeyboardGuide && (
                  <VisualKeyboard activeChar={code[cursorPos] || ""} />
                )}

                <div style={{ marginTop: "var(--space-lg)", display: "flex", justifyContent: "space-between", opacity: 0.3, fontSize: "11px", letterSpacing: "1px" }}>
                  <span>PROGRESS: {Math.round((cursorPos / code.length) * 100)}%</span>
                  <span>ERRORS: {errors}</span>
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </main>

      <footer style={{ marginTop: "var(--space-xl)", textAlign: "center" }}>
        <div style={{ marginBottom: "var(--space-md)", maxWidth: "600px", margin: "0 auto var(--space-xl)", opacity: 0.4 }}>
          <h4 style={{ fontSize: "10px", letterSpacing: "2px", textTransform: "uppercase", marginBottom: "var(--space-sm)" }}>Philosophy</h4>
          <p style={{ fontSize: "12px", fontStyle: "italic", lineHeight: "1.6" }}>
            "Body before mind, fluency before understanding. The key to operational intelligence is physical automaticity. Stop think-typing; start flow-typing."
          </p>
        </div>
        <div style={{ opacity: 0.1, fontSize: "10px", letterSpacing: "3px" }}>
          OAS / THE SEARCH SPACE / 2026
        </div>
      </footer>
    </div>
  );
}
