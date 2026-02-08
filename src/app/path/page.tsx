"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Link from "next/link";
import { CURRICULUM } from "@/data/curriculum";

export default function PathPage() {
    const [selectedSubject, setSelectedSubject] = useState<string | null>("python");

    return (
        <div className="container" style={{ maxWidth: "1000px" }}>
            <nav className="minimal-nav" style={{ border: "none", marginBottom: "var(--space-xl)" }}>
                <Link href="/" className="minimal-logo" style={{ textDecoration: "none" }}>OAS / PATH</Link>
                <div style={{ display: "flex", gap: "var(--space-md)", alignItems: "center" }}>
                    <Link href="/path" style={{ fontSize: "10px", color: "var(--forest)", textDecoration: "none", opacity: 0.7, textTransform: "uppercase", letterSpacing: "1px" }}>Path</Link>
                    <Link href="/drills" style={{ fontSize: "10px", color: "var(--khaki)", textDecoration: "none", opacity: 0.7, textTransform: "uppercase", letterSpacing: "1px" }}>Drills</Link>
                    <Link href="/" style={{ fontSize: "10px", color: "var(--forest)", textDecoration: "none", opacity: 0.7, textTransform: "uppercase", letterSpacing: "1px" }}>Editor</Link>
                </div>
            </nav>

            <main>
                {/* Subject Cards */}
                <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(200px, 1fr))", gap: "var(--space-md)", marginBottom: "var(--space-xl)" }}>
                    {CURRICULUM.map((subject) => (
                        <div
                            key={subject.id}
                            onClick={() => setSelectedSubject(subject.id)}
                            className="card-minimal"
                            style={{
                                cursor: "pointer",
                                border: selectedSubject === subject.id ? "1px solid var(--khaki)" : "1px solid var(--forest)",
                                background: selectedSubject === subject.id ? "rgba(212, 212, 184, 0.05)" : "rgba(10, 26, 10, 0.6)",
                                transition: "all 0.2s ease"
                            }}
                        >
                            <h3 style={{ fontSize: "16px", color: selectedSubject === subject.id ? "var(--khaki-bright)" : "var(--text-muted)", marginBottom: "var(--space-sm)" }}>
                                {subject.title}
                            </h3>
                            <p style={{ fontSize: "11px", opacity: 0.5, letterSpacing: "0.5px" }}>{subject.description}</p>
                        </div>
                    ))}
                </div>

                {/* Selected Subject Content */}
                <AnimatePresence mode="wait">
                    {selectedSubject && (
                        <motion.div
                            key={selectedSubject}
                            initial={{ opacity: 0, y: 10 }}
                            animate={{ opacity: 1, y: 0 }}
                            exit={{ opacity: 0, y: -10 }}
                        >
                            <div
                                className="card-minimal"
                                style={{
                                    minHeight: "400px",
                                    background: "rgba(10, 26, 10, 0.4)",
                                    padding: "var(--space-xl)"
                                }}
                            >
                                <h2 style={{ fontSize: "12px", letterSpacing: "2px", textTransform: "uppercase", opacity: 0.4, marginBottom: "var(--space-lg)" }}>
                                    {CURRICULUM.find(s => s.id === selectedSubject)?.title} CURRICULUM
                                </h2>

                                <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(280px, 1fr))", gap: "var(--space-md)" }}>
                                    {CURRICULUM.find(s => s.id === selectedSubject)?.chapters.length === 0 ? (
                                        <div style={{ opacity: 0.3, fontStyle: "italic", fontSize: "14px" }}>Coming Soon...</div>
                                    ) : (
                                        CURRICULUM.find(s => s.id === selectedSubject)?.chapters.map((chapter) => (
                                            <Link
                                                key={chapter.id}
                                                href={chapter.status === "open" ? `/path/practice?subject=${selectedSubject}&chapter=${chapter.id}` : "#"}
                                                style={{
                                                    textDecoration: "none",
                                                    padding: "var(--space-md)",
                                                    border: "1px solid var(--forest)",
                                                    borderRadius: "4px",
                                                    background: "rgba(0,0,0,0.2)",
                                                    display: "flex",
                                                    justifyContent: "space-between",
                                                    alignItems: "center",
                                                    opacity: chapter.status === "open" ? 1 : 0.5,
                                                    cursor: chapter.status === "open" ? "pointer" : "default"
                                                }}
                                            >
                                                <span style={{ fontSize: "13px", color: chapter.status === "open" ? "var(--text-primary)" : "var(--text-muted)" }}>
                                                    {chapter.title}
                                                </span>
                                                {chapter.status === "locked" && <span style={{ fontSize: "10px", opacity: 0.3 }}>🔒</span>}
                                                {chapter.status === "open" && <span style={{ fontSize: "10px", color: "var(--khaki)" }}>START →</span>}
                                            </Link>
                                        ))
                                    )}
                                </div>
                            </div>
                        </motion.div>
                    )}
                </AnimatePresence>
            </main>

            <footer style={{ marginTop: "var(--space-xl)", textAlign: "center", opacity: 0.1, fontSize: "10px", letterSpacing: "3px" }}>
                OAS / STRUCTURED PATH / 2026
            </footer>
        </div>
    );
}
