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
            },
            {
                id: "py-08",
                title: "08. String Methods",
                status: "open",
                description: "Slicing, methods (upper/lower/split/join), and formatting.",
                content: `"""
Typing practice program.
Uses string indexing, slicing, comparison, methods, and loops.
Shows upper, lower, count, find, index, split, join, format, and in.
"""

# get input
text = input("Enter a sentence: ")

# basic info
length = len(text)
upper_text = text.upper()
lower_text = text.lower()

# slicing
first_part = text[:5]
last_part = text[-5:]

# comparison
starts_with_a = text > "a"

# searching
count_a = text.count("a")
find_a = text.find("a")

if "a" in text:
    index_a = text.index("a")
else:
    index_a = -1

# split and join
words = text.split(" ")
joined = "-".join(words)

# format
formatted = "Length: {}, Upper: {}".format(length, upper_text)

# loop through string
letters = []
for ch in text:
    letters.append(ch.upper())

result_letters = "".join(letters)

# output
print("Text:", text)
print("Length:", length)

print("Upper:", upper_text)
print("Lower:", lower_text)

print("First part:", first_part)
print("Last part:", last_part)

print("Text > 'a':", starts_with_a)

print("Count of 'a':", count_a)
print("Find 'a':", find_a)
print("Index 'a':", index_a)

print("Words:", words)
print("Joined:", joined)

print("Formatted:", formatted)
print("Letters:", result_letters)`
            },
            {
                id: "py-09",
                title: "09. Lists & Mutations",
                status: "open",
                description: "Creation, mutation, sorting, nested lists, and comprehensions.",
                content: `"""
Typing practice program.
Uses list creation, mutation, iteration, sorting, copying,
nested lists, and list comprehensions.
"""

# create list
numbers_text = input("Enter numbers separated by space: ")
parts = numbers_text.split(" ")

numbers = []
for p in parts:
    numbers.append(int(p))

# modify list
numbers.append(100)

if len(numbers) > 0:
    numbers.pop()

if len(numbers) > 1:
    numbers.remove(numbers[0])

# copy list
numbers_copy = numbers.copy()

# sort and reverse
numbers.sort()
numbers.reverse()

# list info
maximum = max(numbers)
minimum = min(numbers)
total = sum(numbers)

# nested list
matrix = [
    numbers,
    numbers_copy
]

# list comprehension
evens = [n for n in numbers if n % 2 == 0]

# iteration by index
indexed_values = []
for i in range(len(numbers)):
    indexed_values.append(numbers[i] * 2)

# output
print("Numbers:", numbers)
print("Copy:", numbers_copy)

print("Max:", maximum)
print("Min:", minimum)
print("Sum:", total)

print("Matrix:", matrix)
print("Evens:", evens)
print("Indexed values:", indexed_values)`
            },
            {
                id: "py-10",
                title: "10. Dictionaries",
                status: "open",
                description: "Key-value pairs, nested dicts, and comprehensions.",
                content: `"""
Typing practice program.
Uses dictionary creation, access, update, delete, iteration,
nested dictionaries, and dictionary comprehensions.
"""

# create dictionary
name = input("Enter a name: ")
age_text = input("Enter age: ")

age = int(age_text)

person = {
    "name": name,
    "age": age,
    "city": "Unknown"
}

# access values
person_name = person["name"]
person_age = person.get("age")

# update and add
person["age"] = person_age + 1
person["country"] = "Earth"

person.update({"city": "Somewhere"})

# delete
removed_city = person.pop("city")

# conditional checks
has_name = "name" in person
has_city = "city" in person

# iteration
keys_list = []
values_list = []
items_list = []

for key in person:
    keys_list.append(key)

for value in person.values():
    values_list.append(value)

for item in person.items():
    items_list.append(item)

# nested dictionary
people = {
    "person1": person,
    "person2": {
        "name": "Alex",
        "age": 30,
        "country": "Earth"
    }
}

# dictionary comprehension
age_map = {k: v["age"] for k, v in people.items()}

# output
print("Person:", person)
print("Removed city:", removed_city)

print("Has name:", has_name)
print("Has city:", has_city)

print("Keys:", keys_list)
print("Values:", values_list)
print("Items:", items_list)

print("People:", people)
print("Age map:", age_map)`
            },
            {
                id: "py-11",
                title: "11. Classes & Objects",
                status: "open",
                description: "Class definitions, methods, magic methods, and operator overloading.",
                content: `"""
Typing practice program.
Uses class definition, instance and class attributes, methods,
magic methods, operator overloading, and object creation.
"""

# class definition
class Box:
    """Represents a box with width and height."""

    category = "Shape"

    def __init__(self, width, height):
        self.width = width
        self.height = height

    def area(self):
        result = self.width * self.height
        return result

    def scale(self, factor):
        self.width = self.width * factor
        self.height = self.height * factor

    def __mul__(self, other):
        new_width = self.width * other.width
        new_height = self.height * other.height
        return Box(new_width, new_height)

    def __str__(self):
        return f"Box({self.width}, {self.height})"


# create instances
box1_text = input("Enter width and height for box1: ")
box2_text = input("Enter width and height for box2: ")

p1 = box1_text.split(" ")
p2 = box2_text.split(" ")

box1 = Box(int(p1[0]), int(p1[1]))
box2 = Box(int(p2[0]), int(p2[1]))

# use methods
area1 = box1.area()
area2 = box2.area()

box1.scale(2)

# operator overloading
box3 = box1 * box2
area3 = box3.area()

# output
print("Category:", Box.category)

print("Box1:", box1)
print("Box2:", box2)
print("Box3:", box3)

print("Area1:", area1)
print("Area2:", area2)
print("Area3:", area3)`
            },
            {
                id: "py-12",
                title: "12. Recursion",
                status: "open",
                description: "Recursive functions for math, strings, and list searching.",
                content: `"""
Typing practice program.
Uses recursion with base and recursive cases.
Shows factorial, fibonacci, string reverse, list search,
and simple recursive processing.
"""

# factorial recursion
def factorial(n):
    if n <= 1:
        return 1
    return n * factorial(n - 1)

# fibonacci recursion
def fibonacci(n):
    if n <= 1:
        return n
    return fibonacci(n - 1) + fibonacci(n - 2)

# string recursion
def reverse_string(text):
    if text == "":
        return ""
    return reverse_string(text[1:]) + text[0]

# list recursion search
def search_list(items, target, index=0):
    if index >= len(items):
        return -1
    if items[index] == target:
        return index
    return search_list(items, target, index + 1)

# recursive count
def recursive_count(items, value, index=0):
    if index >= len(items):
        return 0
    found = 1 if items[index] == value else 0
    return found + recursive_count(items, value, index + 1)


# main program
num_text = input("Enter a number: ")
num = int(num_text)

text = input("Enter a word: ")

list_text = input("Enter numbers separated by space: ")
parts = list_text.split(" ")

numbers = []
for p in parts:
    numbers.append(int(p))

fact_result = factorial(num)
fib_result = fibonacci(num)
rev_result = reverse_string(text)

target = numbers[0]
search_result = search_list(numbers, target)
count_result = recursive_count(numbers, target)

# output
print("Factorial:", fact_result)
print("Fibonacci:", fib_result)
print("Reversed:", rev_result)

print("Numbers:", numbers)
print("Search index:", search_result)
print("Count:", count_result)`
            },
            {
                id: "py-13",
                title: "13. Inheritance & Polymorphism",
                status: "open",
                description: "Inheritance, super(), mixins, and polymorphism.",
                content: `"""
Typing practice program.
Uses inheritance, method overriding, super(),
hierarchical inheritance, multiple inheritance, and polymorphism.
"""

# superclass
class Animal:
    def __init__(self, name):
        self.name = name

    def speak(self):
        return "Animal sound"


# hierarchical inheritance
class Dog(Animal):
    def __init__(self, name, breed):
        super().__init__(name)
        self.breed = breed

    def speak(self):
        return f"{self.name} says Woof"


class Cat(Animal):
    def __init__(self, name, color):
        super().__init__(name)
        self.color = color

    def speak(self):
        return f"{self.name} says Meow"


# mixin class
class FlyMixin:
    def fly(self):
        return f"{self.name} is flying"


# multiple inheritance
class Bird(Animal, FlyMixin):
    def __init__(self, name, wingspan):
        super().__init__(name)
        self.wingspan = wingspan

    def speak(self):
        return f"{self.name} says Chirp"


# main program
dog_name = input("Enter dog name: ")
cat_name = input("Enter cat name: ")
bird_name = input("Enter bird name: ")

dog = Dog(dog_name, "Bulldog")
cat = Cat(cat_name, "Black")
bird = Bird(bird_name, 20)

animals = [dog, cat, bird]

# polymorphism
sounds = []
for a in animals:
    sounds.append(a.speak())

# output
print("Dog:", dog.speak())
print("Cat:", cat.speak())
print("Bird:", bird.speak())

print("Bird fly:", bird.fly())

print("All sounds:", sounds)`
            },
            {
                id: "py-14",
                title: "14. File I/O & Exceptions",
                status: "open",
                description: "Reading/writing files, try/except blocks, and raising errors.",
                content: `"""
Typing practice program.
Uses file reading and writing, newline handling,
try/except blocks, and raising exceptions.
"""

# get input
filename = input("Enter file name: ")
number_text = input("Enter a number: ")

# exception handling
try:
    number = int(number_text)
except ValueError as err:
    print("Invalid number")
    raise ValueError("Input must be an integer")

# write to file
file = open(filename, "w")

file.write("Number: " + str(number) + "\\n")
file.write("Square: " + str(number * number) + "\\n")
file.write("Cube: " + str(number ** 3) + "\\n")

file.close()

# append to file
file = open(filename, "a")
file.write("Status: Saved successfully\\n")
file.close()

# read entire file
file = open(filename, "r")
data = file.read()
file.close()

# read line by line
file = open(filename, "r")
line1 = file.readline()
lines = file.readlines()
file.close()

# output
print("\\nFull file content:")
print(data)

print("First line:")
print(line1.strip())

print("Remaining lines:")
for line in lines:
    print(line.strip())`
            },
            {
                id: "py-15",
                title: "15. Data Science Basics",
                status: "open",
                description: "NumPy arrays, Pandas DataFrames, and Matplotlib sizing.",
                content: `"""
Typing practice program.
Uses NumPy arrays, Pandas DataFrames, indexing, slicing, filtering,
missing values, and basic Matplotlib plots.
"""

import numpy as np
import pandas as pd
import matplotlib.pyplot as plt


# numpy arrays
arr = np.array([10, 20, 30, 40, 50])
zeros = np.zeros((2, 3))
ones = np.ones((2, 3))
randoms = np.random.rand(3, 3)


# pandas dataframe
data = {
    "name": ["A", "B", "C", "D", "E"],
    "age": [20, 25, None, 30, 22],
    "score": [88, 92, 79, None, 85]
}

df = pd.DataFrame(data)


# explore data
head_data = df.head()
tail_data = df.tail()
info_data = df.info()
desc_data = df.describe()


# indexing and slicing
first_row = df.loc[0]
score_column = df["score"]
slice_rows = df.loc[1:3, ["name", "age"]]
iloc_rows = df.iloc[0:3, 0:2]


# filtering
filtered = df[df["age"] > 22]


# missing values
null_map = df.isnull()
filled = df.fillna(0)
dropped = df.dropna()


# value counts and unique
unique_names = df["name"].unique()
age_counts = df["age"].value_counts(dropna=False)


# plotting data
x = np.array([1, 2, 3, 4, 5])
y = np.array([2, 4, 6, 8, 10])

plt.bar(x, y)
plt.show()

plt.plot(x, y)
plt.show()

plt.scatter(x, y)
plt.show()

plt.hist(arr)
plt.show()

plt.boxplot(arr)
plt.show()


# output
print("Array:", arr)
print("Zeros:\\n", zeros)
print("Ones:\\n", ones)
print("Randoms:\\n", randoms)

print("\\nDataFrame:\\n", df)
print("\\nHead:\\n", head_data)
print("\\nTail:\\n", tail_data)

print("\\nFirst row:\\n", first_row)
print("\\nScore column:\\n", score_column)
print("\\nSlice rows:\\n", slice_rows)
print("\\nILOC rows:\\n", iloc_rows)

print("\\nFiltered:\\n", filtered)

print("\\nNull map:\\n", null_map)
print("\\nFilled:\\n", filled)
print("\\nDropped:\\n", dropped)

print("\\nUnique names:", unique_names)
print("\\nAge counts:\\n", age_counts)`
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
