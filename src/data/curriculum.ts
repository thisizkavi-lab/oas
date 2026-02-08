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
            {
                id: "py-02",
                title: "02. Basic Operators",
                status: "open",
                description: "Int, float, str, abs, round, and division types.",
                content: `"""
Typing practice program.
Uses int, float, str, abs, round, repetition, and division operators.
Shows /, //, %, and basic formatting.
"""

# get inputs
price_text = input("Enter a price: ")
count_text = input("Enter a quantity: ")

price = float(price_text)
count = int(count_text)

# calculations
total = price * count
half = total / 2
whole = total // 2
remainder = total % 2

rounded_total = round(total, 2)
absolute_total = abs(total)

# string repetition
line = "-" * 30

# output
print(line)
print("Price: $" + str(price))
print("Count: " + str(count))

print("Total: $" + str(rounded_total))
print("Absolute total: " + str(absolute_total))

print("Half using /: " + str(half))
print("Whole using //: " + str(whole))
print("Remainder using %: " + str(remainder))
print(line)`
            },
            {
                id: "py-03",
                title: "03. Mixed Basics",
                status: "open",
                description: "Strings, indexing, f-strings, lists, tuples, and unicode.",
                content: `"""
Typing practice program.
Uses strings, indexes, f-strings, lists, tuples, ord, chr, id, and formatting.
Shows positive and negative indexing and escape sequences.
"""

# get input
text = input("Enter a word: ")

# string indexing
first_char = text[0]
last_char = text[-1]

# unicode conversion
first_code = ord(first_char)
next_char = chr(first_code + 1)

# formatting
length = len(text)
formatted_length = f"{length:02d}"

# list and tuple
letters_list = [first_char, last_char, next_char]
letters_tuple = (first_char, last_char, next_char)

# identity and type
text_id = id(text)
list_type = type(letters_list)
tuple_type = type(letters_tuple)

# output
print("\\nResult:\\t")
print(f"Text: {text}")
print(f"Length: {formatted_length}")

print(f"First char: {first_char}")
print(f"Last char: {last_char}")
print(f"Unicode of first: {first_code}")
print(f"Next char: {next_char}")

print(f"List: {letters_list}")
print(f"Tuple: {letters_tuple}")

print(f"List[0]: {letters_list[0]}")
print(f"Tuple[-1]: {letters_tuple[-1]}")

print(f"Text id: {text_id}")
print(f"List type: {list_type}")
print(f"Tuple type: {tuple_type}")`
            },
            {
                id: "py-04",
                title: "04. Control Flow",
                status: "open",
                description: "Booleans, comparisons, logic, and if/else statements.",
                content: `"""
Typing practice program.
Uses booleans, comparisons, logical operators, and decision statements.
Shows if, elif, else, nested if, and conditional expressions.
"""

# get inputs
age_text = input("Enter your age: ")
score_text = input("Enter your score: ")

age = int(age_text)
score = int(score_text)

# boolean values
is_adult = age >= 18
passed = score >= 60

# logical operations
can_enter = is_adult and passed
needs_review = not passed or age < 18

# comparisons
same_check = age == score
different_check = age != score

# decision statements
if can_enter:
    status = "Access granted"
elif passed:
    status = "Passed, but age too low"
else:
    status = "Access denied"

# nested decision
if age >= 18:
    if score >= 80:
        level = "Excellent"
    else:
        level = "Average"
else:
    if score >= 80:
        level = "Young high scorer"
    else:
        level = "Needs improvement"

# conditional expression
tag = "OK" if passed else "FAIL"

# output
print(f"Age: {age}")
print(f"Score: {score}")

print(f"Is adult: {is_adult}")
print(f"Passed: {passed}")

print(f"Can enter: {can_enter}")
print(f"Needs review: {needs_review}")

print(f"Age == Score: {same_check}")
print(f"Age != Score: {different_check}")

print(f"Status: {status}")
print(f"Level: {level}")
print(f"Tag: {tag}")`
            },
            {
                id: "py-05",
                title: "05. Loops & Iteration",
                status: "open",
                description: "While loops, for loops, nested loops, and control flow.",
                content: `"""
Typing practice program.
Uses while and for loops, range, nested loops, break, continue, and loop else.
Shows iteration and control flow.
"""

# while loop
count_text = input("Enter a limit: ")
limit = int(count_text)

i = 0
while i < limit:
    print(f"While count: {i}")
    i += 1

# for loop with range
for n in range(0, limit, 1):
    print(f"For count: {n}")

# nested loops
rows = 3
cols = 4

for r in range(rows):
    for c in range(cols):
        print(f"({r},{c})", end=" ")
    print()

# break and continue
for x in range(10):
    if x == 2:
        continue
    if x == 7:
        break
    print(f"Value: {x}")

# loop else
for y in range(5):
    print(f"Loop y: {y}")
else:
    print("Loop finished without break")`
            },
            {
                id: "py-06",
                title: "06. Functions",
                status: "open",
                description: "Definitions, parameters, returns, scope, and default args.",
                content: `"""
Typing practice program.
Uses function definitions, parameters, arguments, scope, returns,
keyword arguments, and default values.
Shows control flow between functions and main code.
"""

# global variable
base_value = 10

# function with parameters and return
def add_numbers(a, b):
    result = a + b
    return result

# function with default parameter
def multiply_number(x, factor=2):
    product = x * factor
    return product

# function showing local scope
def compute_total(value):
    local_total = value + base_value
    return local_total

# function with keyword arguments
def format_result(number, label="Result"):
    text = f"{label}: {number}"
    return text

# main program
first_text = input("Enter first number: ")
second_text = input("Enter second number: ")

first = int(first_text)
second = int(second_text)

sum_result = add_numbers(first, second)
mul_result = multiply_number(sum_result)
custom_mul = multiply_number(sum_result, factor=3)

total = compute_total(sum_result)

formatted_one = format_result(sum_result)
formatted_two = format_result(total, label="Total")

print(formatted_one)
print("After multiply:", mul_result)
print("After custom multiply:", custom_mul)
print(formatted_two)`
            },
            {
                id: "py-07",
                title: "07. Modules & Guards",
                status: "open",
                description: "Imports, standard library, help(), and main execution guard.",
                content: `"""
Typing practice program.
Uses import, from-import, help, and __name__ == "__main__".
Shows how modules and main guards work.
"""

import math
from datetime import date

# function using imported module
def circle_area(radius):
    area = math.pi * radius ** 2
    return area

# function using date
def make_date(year, month, day):
    d = date(year, month, day)
    return d

# main program
def main():
    radius_text = input("Enter radius: ")
    radius = float(radius_text)

    area = circle_area(radius)
    today = make_date(2023, 2, 14)

    print(f"Radius: {radius}")
    print(f"Area: {area}")
    print(f"Date: {today}")

    help(math)
    help(circle_area)

# main guard
if __name__ == "__main__":
    main()`
            }
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
