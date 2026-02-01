import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import { v4 as uuidv4 } from 'uuid';
import {
    UserConfig,
    TrainingTopic,
    CodeBlock,
    PracticeSession,
    PracticeMode,
    DEFAULT_USER_CONFIG,
    DEFAULT_PRACTICE_MODE,
} from './types';

interface OASStore {
    // User configuration
    config: UserConfig;
    setConfig: (config: Partial<UserConfig>) => void;
    completeOnboarding: () => void;

    // Topics
    topics: TrainingTopic[];
    addTopic: (title: string, description?: string) => TrainingTopic;
    updateTopic: (id: string, updates: Partial<TrainingTopic>) => void;
    deleteTopic: (id: string) => void;
    getTopic: (id: string) => TrainingTopic | undefined;

    // Code blocks
    addBlock: (topicId: string, block: Omit<CodeBlock, 'id' | 'order'>) => CodeBlock | null;
    updateBlock: (topicId: string, blockId: string, updates: Partial<CodeBlock>) => void;
    deleteBlock: (topicId: string, blockId: string) => void;
    getBlock: (topicId: string, blockId: string) => CodeBlock | undefined;
    reorderBlocks: (topicId: string, blockIds: string[]) => void;

    // Practice sessions
    sessions: PracticeSession[];
    currentSession: PracticeSession | null;
    startSession: (topicId: string, blockId: string) => PracticeSession;
    updateSession: (updates: Partial<PracticeSession>) => void;
    endSession: (completed: boolean) => void;
    getBlockSessions: (blockId: string) => PracticeSession[];

    // Practice mode
    practiceMode: PracticeMode;
    setPracticeMode: (mode: Partial<PracticeMode>) => void;
}

export const useOASStore = create<OASStore>()(
    persist(
        (set, get) => ({
            // User configuration
            config: DEFAULT_USER_CONFIG,
            setConfig: (updates) =>
                set((state) => ({
                    config: { ...state.config, ...updates },
                })),
            completeOnboarding: () =>
                set((state) => ({
                    config: { ...state.config, onboardingCompleted: true },
                })),

            // Topics
            topics: [],
            addTopic: (title, description) => {
                const now = new Date().toISOString();
                const newTopic: TrainingTopic = {
                    id: uuidv4(),
                    title,
                    description,
                    blocks: [],
                    createdAt: now,
                    updatedAt: now,
                };
                set((state) => ({
                    topics: [...state.topics, newTopic],
                }));
                return newTopic;
            },
            updateTopic: (id, updates) =>
                set((state) => ({
                    topics: state.topics.map((t) =>
                        t.id === id
                            ? { ...t, ...updates, updatedAt: new Date().toISOString() }
                            : t
                    ),
                })),
            deleteTopic: (id) =>
                set((state) => ({
                    topics: state.topics.filter((t) => t.id !== id),
                })),
            getTopic: (id) => get().topics.find((t) => t.id === id),

            // Code blocks
            addBlock: (topicId, blockData) => {
                const topic = get().topics.find((t) => t.id === topicId);
                if (!topic) return null;

                const newBlock: CodeBlock = {
                    ...blockData,
                    id: uuidv4(),
                    order: topic.blocks.length,
                };

                set((state) => ({
                    topics: state.topics.map((t) =>
                        t.id === topicId
                            ? {
                                ...t,
                                blocks: [...t.blocks, newBlock],
                                updatedAt: new Date().toISOString(),
                            }
                            : t
                    ),
                }));
                return newBlock;
            },
            updateBlock: (topicId, blockId, updates) =>
                set((state) => ({
                    topics: state.topics.map((t) =>
                        t.id === topicId
                            ? {
                                ...t,
                                blocks: t.blocks.map((b) =>
                                    b.id === blockId ? { ...b, ...updates } : b
                                ),
                                updatedAt: new Date().toISOString(),
                            }
                            : t
                    ),
                })),
            deleteBlock: (topicId, blockId) =>
                set((state) => ({
                    topics: state.topics.map((t) =>
                        t.id === topicId
                            ? {
                                ...t,
                                blocks: t.blocks
                                    .filter((b) => b.id !== blockId)
                                    .map((b, i) => ({ ...b, order: i })),
                                updatedAt: new Date().toISOString(),
                            }
                            : t
                    ),
                })),
            getBlock: (topicId, blockId) => {
                const topic = get().topics.find((t) => t.id === topicId);
                return topic?.blocks.find((b) => b.id === blockId);
            },
            reorderBlocks: (topicId, blockIds) =>
                set((state) => ({
                    topics: state.topics.map((t) => {
                        if (t.id !== topicId) return t;
                        const blockMap = new Map(t.blocks.map((b) => [b.id, b]));
                        const reordered = blockIds
                            .map((id, i) => {
                                const block = blockMap.get(id);
                                return block ? { ...block, order: i } : null;
                            })
                            .filter((b): b is CodeBlock => b !== null);
                        return { ...t, blocks: reordered, updatedAt: new Date().toISOString() };
                    }),
                })),

            // Practice sessions
            sessions: [],
            currentSession: null,
            startSession: (topicId, blockId) => {
                const session: PracticeSession = {
                    id: uuidv4(),
                    blockId,
                    topicId,
                    startedAt: new Date().toISOString(),
                    keystrokes: [],
                    accuracy: 100,
                    completionTime: 0,
                    errorsCount: 0,
                    hesitationPoints: [],
                    completed: false,
                };
                set({ currentSession: session });
                return session;
            },
            updateSession: (updates) =>
                set((state) => ({
                    currentSession: state.currentSession
                        ? { ...state.currentSession, ...updates }
                        : null,
                })),
            endSession: (completed) =>
                set((state) => {
                    if (!state.currentSession) return {};
                    const completedSession: PracticeSession = {
                        ...state.currentSession,
                        completedAt: new Date().toISOString(),
                        completed,
                        completionTime:
                            Date.now() - new Date(state.currentSession.startedAt).getTime(),
                    };
                    return {
                        sessions: [...state.sessions, completedSession],
                        currentSession: null,
                    };
                }),
            getBlockSessions: (blockId) =>
                get().sessions.filter((s) => s.blockId === blockId),

            // Practice mode
            practiceMode: DEFAULT_PRACTICE_MODE,
            setPracticeMode: (mode) =>
                set((state) => ({
                    practiceMode: { ...state.practiceMode, ...mode },
                })),
        }),
        {
            name: 'oas-storage',
            partialize: (state) => ({
                config: state.config,
                topics: state.topics,
                sessions: state.sessions,
                practiceMode: state.practiceMode,
            }),
        }
    )
);
