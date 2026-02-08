export type Chapter = {
    id: string;
    title: string;
    status: "locked" | "open" | "completed";
    content?: string;
    description?: string;
};

export type Subject = {
    id: string;
    title: string;
    description: string;
    chapters: Chapter[];
};

export const CURRICULUM: Subject[] = [
    {
        id: "python",
        title: "PYTHON",
        description: "The Language of AI",
        chapters: [
            {
                id: "py-01",
                title: "01. Variables & Types",
                status: "open",
                description: "Input, print, basic operators, and string concatenation.",
                content: `"""
Simple typing practice program.
Uses input, print, len, type, and basic operators.
Shows string concatenation with + and math with numbers.
"""

# ask for the user's name
name = input("Enter your name: ")

# ask for a number
number = input("Enter a number: ")

# convert string to int
num = int(number)

# basic math
add_result = num + 5
sub_result = num - 2
mul_result = num * 3
div_result = num / 2
pow_result = num ** 2

# string info
name_length = len(name)

# output with concatenation
print("Hello " + name)
print("Your name length is " + str(name_length))

print("Type of name is " + str(type(name)))
print("Type of number is " + str(type(num)))

print("Add 5: " + str(add_result))
print("Subtract 2: " + str(sub_result))
print("Multiply by 3: " + str(mul_result))
print("Divide by 2: " + str(div_result))
print("Power of 2: " + str(pow_result))`
            },

        ]
    },
    {
        id: "pytorch",
        title: "PYTORCH",
        description: "Deep Learning Framework",
        chapters: []
    },
    {
        id: "mathematics",
        title: "MATHEMATICS",
        description: "Linear Algebra & Calc",
        chapters: []
    }
];
