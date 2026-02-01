// JP MacBook keyboard symbol mappings
// Used to provide hints for finding symbols on Japanese keyboard layout

export interface KeyMapping {
    key: string;
    modifiers: ('Shift' | 'Option' | 'Control' | 'Command')[];
    hint: string;
}

// Japanese MacBook keyboard symbol map
export const JP_MAC_SYMBOL_MAP: Record<string, KeyMapping> = {
    // Numbers row symbols
    '!': { key: '1', modifiers: ['Shift'], hint: 'Shift + 1' },
    '"': { key: '2', modifiers: ['Shift'], hint: 'Shift + 2' },
    '#': { key: '3', modifiers: ['Shift'], hint: 'Shift + 3' },
    '$': { key: '4', modifiers: ['Shift'], hint: 'Shift + 4' },
    '%': { key: '5', modifiers: ['Shift'], hint: 'Shift + 5' },
    '&': { key: '6', modifiers: ['Shift'], hint: 'Shift + 6' },
    "'": { key: '7', modifiers: ['Shift'], hint: 'Shift + 7' },
    '(': { key: '8', modifiers: ['Shift'], hint: 'Shift + 8' },
    ')': { key: '9', modifiers: ['Shift'], hint: 'Shift + 9' },

    // Special characters
    '=': { key: '-', modifiers: ['Shift'], hint: 'Shift + -' },
    '~': { key: '^', modifiers: ['Shift'], hint: 'Shift + ^' },
    '|': { key: '¥', modifiers: ['Shift'], hint: 'Shift + ¥' },
    '`': { key: '@', modifiers: ['Shift'], hint: 'Shift + @' },

    // Brackets
    '{': { key: '[', modifiers: ['Shift'], hint: 'Shift + [' },
    '}': { key: ']', modifiers: ['Shift'], hint: 'Shift + ]' },
    '[': { key: '[', modifiers: [], hint: '[' },
    ']': { key: ']', modifiers: [], hint: ']' },

    // Punctuation
    '+': { key: ';', modifiers: ['Shift'], hint: 'Shift + ;' },
    '*': { key: ':', modifiers: ['Shift'], hint: 'Shift + :' },
    '<': { key: ',', modifiers: ['Shift'], hint: 'Shift + ,' },
    '>': { key: '.', modifiers: ['Shift'], hint: 'Shift + .' },
    '?': { key: '/', modifiers: ['Shift'], hint: 'Shift + /' },
    '_': { key: '\\', modifiers: ['Shift'], hint: 'Shift + \\' },

    // Common programming symbols
    '@': { key: '@', modifiers: [], hint: '@' },
    ':': { key: ':', modifiers: [], hint: ':' },
    ';': { key: ';', modifiers: [], hint: ';' },

    // Backslash - special on JP keyboard (uses ¥ key)
    '\\': { key: '¥', modifiers: ['Option'], hint: 'Option + ¥' },
};

// US keyboard symbol map (for reference/comparison)
export const US_SYMBOL_MAP: Record<string, KeyMapping> = {
    '!': { key: '1', modifiers: ['Shift'], hint: 'Shift + 1' },
    '@': { key: '2', modifiers: ['Shift'], hint: 'Shift + 2' },
    '#': { key: '3', modifiers: ['Shift'], hint: 'Shift + 3' },
    '$': { key: '4', modifiers: ['Shift'], hint: 'Shift + 4' },
    '%': { key: '5', modifiers: ['Shift'], hint: 'Shift + 5' },
    '^': { key: '6', modifiers: ['Shift'], hint: 'Shift + 6' },
    '&': { key: '7', modifiers: ['Shift'], hint: 'Shift + 7' },
    '*': { key: '8', modifiers: ['Shift'], hint: 'Shift + 8' },
    '(': { key: '9', modifiers: ['Shift'], hint: 'Shift + 9' },
    ')': { key: '0', modifiers: ['Shift'], hint: 'Shift + 0' },
    '_': { key: '-', modifiers: ['Shift'], hint: 'Shift + -' },
    '+': { key: '=', modifiers: ['Shift'], hint: 'Shift + =' },
    '{': { key: '[', modifiers: ['Shift'], hint: 'Shift + [' },
    '}': { key: ']', modifiers: ['Shift'], hint: 'Shift + ]' },
    '|': { key: '\\', modifiers: ['Shift'], hint: 'Shift + \\' },
    ':': { key: ';', modifiers: ['Shift'], hint: 'Shift + ;' },
    '"': { key: "'", modifiers: ['Shift'], hint: "Shift + '" },
    '<': { key: ',', modifiers: ['Shift'], hint: 'Shift + ,' },
    '>': { key: '.', modifiers: ['Shift'], hint: 'Shift + .' },
    '?': { key: '/', modifiers: ['Shift'], hint: 'Shift + /' },
    '~': { key: '`', modifiers: ['Shift'], hint: 'Shift + `' },
};

// Get the keyboard map based on layout
export function getKeyboardMap(layout: 'jp-mac' | 'us' | 'custom'): Record<string, KeyMapping> {
    switch (layout) {
        case 'jp-mac':
            return JP_MAC_SYMBOL_MAP;
        case 'us':
            return US_SYMBOL_MAP;
        default:
            return JP_MAC_SYMBOL_MAP; // Default to JP Mac
    }
}

// Get hint for a specific character
export function getKeyHint(char: string, layout: 'jp-mac' | 'us' | 'custom'): string | null {
    const map = getKeyboardMap(layout);
    return map[char]?.hint || null;
}

// Check if a character needs special keyboard handling
export function isSpecialChar(char: string): boolean {
    return char in JP_MAC_SYMBOL_MAP || char in US_SYMBOL_MAP;
}
